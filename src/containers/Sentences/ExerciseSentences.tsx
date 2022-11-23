/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit';
import { Progress, Modal, message } from 'antd';
import Countdown, { CountdownApi } from 'react-countdown';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getListQuizSlide } from '../../features/Slide/quiz/QuizSlide';
import { getListAnswerQuizSlide } from '../../features/Slide/answerQuiz/AnswerQuizSlide';
import { useParams, NavLink } from 'react-router-dom';
import { detailQuiz, listQuiz } from '../../api/quiz';
import '../../css/quiz.css'
import moment from 'moment';
import { addUserQuiz } from '../../api/userQuiz';
import { addHistory, detailHistory } from '../../api/history';
import { HistoryType } from '../../types/history';
import { detailPracticeActivity } from '../../api/practiceActivity';
import { RootState } from '../../app/store';
import { UserType } from '../../types/user';
import QuizType5 from '../../components/quiz/QuizType5';
import ListenWriteType1 from '../../components/ListenWrite/ListenWriteType1';
import { detailLearningProgressByUser } from '../../api/learningProgress';
import { LearningProgressType } from '../../types/learningProgress';
import { editLearningProgressSlice } from '../../features/Slide/learningProgress/LearningProgress';
import { QuizType } from '../../types/quiz';
import { AnswerQuizType } from '../../types/answerQuiz';
import { PracticeActivityType } from '../../types/practiceActivity';
import { SentenceResult } from '../../types/sentence';
import Loading from '../../components/Loading';

let flag1: string = ""
let flag2: number = 0

const CountdownWrapper = ({ time, reset }) => {
  const Completionist = () => <span className="hidden">You are good to go!</span>;
  let timeLimit = 100
  let point = 1000
  const [state, setState] = useState<any>()
  let minutesUser = 0
  let secondsUser = 0

  //---TimeLimitCountdown---
  //Đếm ngược thời gian làm 
  const renderer = ({ total, hours, minutes, seconds, milliseconds, completed, api }) => {

    if (completed) {
      return <Completionist />;
    } else {
      api.start()
      let tempTime = moment.duration(time);

      if (tempTime.minutes() === 0) {
        const total = (1 / tempTime.seconds()) * 100
        const total2 = (1 / tempTime.seconds()) * 1000
        point = point - total2
        flag2 = point
        timeLimit = timeLimit - total
      } else {
        const total = (1 / (tempTime.minutes() * 60) + tempTime.seconds()) * 100
        const total2 = (1 / (tempTime.minutes() * 60) + tempTime.seconds()) * 1000
        point = point - total2
        flag2 = point
        timeLimit = timeLimit - total
      }
      if (flag2 < 0) {
        flag2 = 0
      }

      secondsUser = secondsUser + 1
      if (secondsUser === 60) {
        minutesUser = minutesUser + 1
        secondsUser = 0
      }
      flag1 = `${minutesUser}:${secondsUser}`

      if (timeLimit === 0) {
        timeLimit = 100;
      }

      return <div className="">
        <Progress
          strokeColor={{
            from: '#108ee9',
            to: '#87d068',
          }}
          percent={timeLimit}
          status="active"
          className="!mt-[3px] !h-4 !text-white "
          showInfo={false}
        />
      </div>
    }
  };

  useEffect(() => {
    setState(Date.now() + time)
  }, [time, reset])

  return <Countdown
    date={state}
    key={state}
    renderer={renderer}
  />
};

const MemoCountdown = React.memo(CountdownWrapper);

const ExerciseSentences = () => {
  const user = useSelector(((item: RootState) => item.auth.value)) as UserType
  const dispatch = useAppDispatch()
  const [select, setSelect] = useState<any>(null)
  const [check, setCheck] = useState(false)
  const [done, setDone] = useState(false)

  const audioCorrect = new Audio("../public/assets/audio/Quiz-correct-sound-with-applause.mp3")
  const audioWrong = new Audio("../public/assets/audio/Fail-sound-effect-2.mp3")

  const { speak, voices } = useSpeechSynthesis();
  const [quizList, setQuizList] = useState<any>()
  const [numQuizList, setNumQuizList] = useState(0)
  const [learningProgress, setLearningProgress] = useState<LearningProgressType>()
  const [percent, setPercent] = useState<number>(0);
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [point, setPoint] = useState<number>(0)
  const { id, dayId } = useParams()
  const [result, setResult] = useState<SentenceResult[]>([])
  const [onReset, setOnReset] = useState<boolean>(false)
  const [finish, setFinish] = useState<boolean>(false)

  const onHanldeSetSelect = (data: { answer?: String, quiz: String, id?: String, isCorrect: Boolean, type?: String }, check?: boolean) => {
    if (data.type === "selectAuto") {
      setSelect(data)
      onCheckType5(data)
      setTimeout(() => {
        onContinute()
      }, 1000)
    } else {
      setSelect(data)
      onCheckType6(data)
      setTimeout(() => {
        onContinute()
      }, 1000)
    }
  }

  //---Check---
  // check Đáp án
  const onCheckType5 = (data) => {
    setCheck(true)
    increase()
    setResult([...result, {
      quiz: quizList[questionIndex].quiz._id,
      answerQuiz: data.id,
      time: flag1,
      point: data.isCorrect ? Math.round(flag2) : 0,
      isCorrect: data.isCorrect,
    }])
    speak({ text: `${data.isCorrect === true ? "Correct" : "Wrong"}`, voice: voices[2] })
  }

  const onCheckType6 = (data) => {
    setCheck(true)
    increase()
    setResult([...result, {
      quiz: data.quiz,
      time: flag1,
      point: data.isCorrect ? Math.round(flag2) : 0,
      isCorrect: data.isCorrect,
      answer: data.answer
    }])
    speak({ text: `${data.isCorrect === true ? "Correct" : "Wrong"}`, voice: voices[2] })
  }

  //---Countinute---
  // Chuyển câu hỏi
  const onContinute = () => {
    setSelect(null)
    setCheck(false)
    setOnReset(!onReset)
    if (questionIndex >= quizList.length - 1) {
      setDone(true)
    } else {
      setQuestionIndex(questionIndex + 1)
    }
  }

  //---Finish---
  // Kết thúc làm bài và đẩy đáp án đã chọn lên server
  const onFinish = async () => {
    let totalPoint = 0
    let totalCorrect = 0
    const quizListHalf = quizList.length / 2
    let pass = 0
    result.forEach((item: SentenceResult, index: number) => {
      totalPoint = totalPoint + item.point
      if (item.isCorrect === true) {
        totalCorrect = totalCorrect + 1
      }
      if (totalCorrect > quizListHalf) {
        pass = 1
      }
    })
    const score = Math.round(10 / quizList.length * totalCorrect)
    setPoint(score)
    setFinish(true)
    const { data: data2 } = await addHistory({
      user: user._id,
      learningProgress: learningProgress?._id,
      practiceActivity: id,
      score: score,
      totalScore: totalPoint,
      totalCorrect: totalCorrect,
      result: pass,
      type: "sentences"
    })

    for (let index = 0; index < result.length; index++) {
      const flag: any = { ...result[index], history: data2._id }
      await addUserQuiz(flag)
    }

    const { payload } = await dispatch(editLearningProgressSlice({
      _id: learningProgress?._id,
      listeningSpeakingScore: learningProgress?.listeningSpeakingScore as number,
      vocabularyScore: learningProgress?.vocabularyScore as number,
      structureSentencesScore: score,
      conversationScore: learningProgress?.conversationScore as number,
      grammarScore: learningProgress?.grammarScore as number,
      oralScore: learningProgress?.oralScore as number,
      isPass: false,
      day: dayId as string,
      user: user._id as string
    }))
    if (payload) {
      message.success("Chúc mừng bạn đã hoàn thành bài thi !")
    }
  }

  //---QuizProgress---
  //Tiến trình làm bài Quiz
  const increase = () => {
    let newPercent = percent + (100 / quizList.length);
    if (newPercent > 100) {
      newPercent = 100;
    }
    setPercent(newPercent);
  };

  const getLearningProgressByUser = async () => {
    const { data } = await detailLearningProgressByUser(String(dayId), user._id)
    setLearningProgress(data);
  }

  useEffect(() => {
    dispatch(getListQuizSlide())
    dispatch(getListAnswerQuizSlide())
    getLearningProgressByUser()
    getQuiz()
  }, [id])

  const getQuiz = async () => {
    const { data } = await detailPracticeActivity(String(id), String(user._id))

    const test = await Promise.all(data?.quizs.map(async (item: QuizType, index) => {
      const { data } = await detailQuiz(String(item._id))
      return data
    }))

    let arr1: { quiz: QuizType, answerQuiz: AnswerQuizType }[] = [];
    let arr2: { quiz: QuizType, answerQuiz: AnswerQuizType[] }[] = [];
    test.map((item) => {
      if (item.quiz.type === "selectAuto") {
        arr1.push(item)
      } else {
        arr2.push(item)
      }
    })
    setNumQuizList(arr1.length)
    setQuizList([...arr1, ...arr2])
    const test2 = await Promise.all(data?.history.map(async (item: HistoryType) => {
      const { data } = await detailHistory(item._id)
      return data
    }))

  }

  const remake = () => {
    Modal.confirm({
      title: "Bạn có thật sự muốn làm lại ?",
      onOk: () => {
        setQuestionIndex(0)
        setFinish(false)
        setResult([])
        setDone(false)
      }
    })
  }
  return (
    <>
      <div>
        {quizList ?
          <div>
            <div className='font-bold'>Câu số {questionIndex + 1} / {quizList.length}</div>
            <div className='content__speaking'>
              <div className="flex flex-col qustion__content__speaking">
                <div className="">
                  <MemoCountdown time={quizList ? quizList[questionIndex].quiz.timeLimit : 40000} reset={onReset} />
                </div>
              </div>

              {finish &&
                <div className='text-center font-bold mt-5'>
                  Kết quả của bạn: <span className={`px-2 py-1 text-white rounded ml-2 ${point >= 8 ? 'bg-green-500' : 'bg-red-500'}`}>{point} / 10</span>
                </div>
              }

              <div className="p-5 ">
                {
                  quizList && numQuizList && questionIndex <= numQuizList - 1 ?
                    <QuizType5 questionQuiz={quizList[questionIndex].quiz} data={quizList[questionIndex].answerQuiz} check={check} select={select} onHanldeSetSelect={onHanldeSetSelect} />
                    :
                    quizList && questionIndex <= quizList.length - 1 &&
                    <ListenWriteType1 question={quizList[questionIndex].quiz} answerList={quizList[questionIndex].answerQuiz} questionIndex={done ? true : false} check={check} select={select} onHanldeSetSelect={onHanldeSetSelect} />
                }

                <div className="flex my-4 justify-center space-x-4 w-full" >
                  <div className='px-4 py-1 bg-[#4F46E5] cursor-pointer text-white rounded ' onClick={remake}>Làm lại </div>
                  <button className={`px-4 py-1 cursor-pointer  text-white rounded ${done ? 'bg-[#4F46E5]' : 'bg-[#7873d7]'}`} onClick={onFinish} disabled={done ? false : true}>Nộp bài</button>
                </div>

                <div className='flex flex-row gap-4'>
                  <div className='md:basis-3/4 '>
                    {done === true
                      ? <section className='w-full mx-auto md:py-[30px]'>
                        <div className="">
                          <div className="bg-[#D6EAF8] border-[#5DADE2] px-[15px]  rounded-md">
                            <p className=" py-[10px] text-[#2E86C1] font-bold">Chúc mừng bạn đã hoàn thành !</p>
                          </div>
                        </div>
                      </section>
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          <Loading />
        }
      </div>
    </>
  )
}

export default ExerciseSentences