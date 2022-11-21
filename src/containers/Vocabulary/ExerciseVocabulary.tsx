import { message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { addHistory, detailHistory } from '../../api/history'
import { detailLearningProgressByUser } from '../../api/learningProgress'
import { detailPracticeActivity } from '../../api/practiceActivity'
import { detailQuiz } from '../../api/quiz'
import { addUserQuiz } from '../../api/userQuiz'
import { useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store'
import { getListAnswerQuizSlide } from '../../features/Slide/answerQuiz/AnswerQuizSlide'
import { editLearningProgressSlice } from '../../features/Slide/learningProgress/LearningProgress'
import { getListQuizSlide } from '../../features/Slide/quiz/QuizSlide'
import { HistoryType } from '../../types/history'
import { QuizType } from '../../types/quiz'
import { SentenceResult } from '../../types/sentence'
import { UserType } from '../../types/user'
import { useSpeechSynthesis } from 'react-speech-kit';
import { LearningProgressType } from '../../types/learningProgress'
import { useParams } from 'react-router-dom'
import QuizType5 from '../../components/quiz/QuizType5'
import Loading from '../../components/Loading'

let flag1: string = ""
let flag2: number = 0

const ExerciseVocabulary = () => {
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
      time: "0",
      point: data.isCorrect ? Math.round(flag2) : 0,
      isCorrect: data.isCorrect,
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
      setCheck(true)
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
    setCheck(true)
    const { data: data2 } = await addHistory({
      user: user._id,
      learningProgress: learningProgress?._id,
      practiceActivity: id,
      score: score,
      totalScore: totalPoint,
      totalCorrect: totalCorrect,
      result: pass,
      type: "vocabulary"
    })

    for (let index = 0; index < result.length; index++) {
      const flag: any = { ...result[index], history: data2._id }
      await addUserQuiz(flag)
    }

    const { payload } = await dispatch(editLearningProgressSlice({
      _id: learningProgress?._id,
      listeningSpeakingScore: learningProgress?.listeningSpeakingScore as number,
      vocabularyScore: score,
      structureSentencesScore: learningProgress?.structureSentencesScore as number,
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

    setNumQuizList(test.length)
    setQuizList(test)
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
        setPoint(0)
        setFinish(false)
        setResult([])
        setDone(false)
        setCheck(false)
      }
    })
  }

  return (
    <>
      {quizList ?
        <div>
          <div className='content__speaking'>
            {finish &&
              <div className='text-center font-bold mt-5'>
                Kết quả của bạn: <span className={`px-2 py-1  text-white rounded ml-2 ${point >= 8 ? 'bg-green-500' : 'bg-red-500'}`}>{point} / 10</span>
              </div>
            }

            <div className="p-5 ">
              {
                quizList && numQuizList && questionIndex <= numQuizList - 1 &&
                <QuizType5 questionQuiz={quizList[questionIndex].quiz} data={quizList[questionIndex].answerQuiz} check={check} select={select} onHanldeSetSelect={onHanldeSetSelect} />
              }

              <div className="flex my-4 justify-center space-x-4 w-full" >
                <div className='px-4 py-1 bg-[#4F46E5] cursor-pointer text-white rounded ' onClick={remake}>Làm lại </div>
                <button className={`px-4 py-1 cursor-pointer  text-white rounded ${done ? 'bg-[#7873d7]' : 'bg-[#4F46E5]'}`} onClick={onFinish} disabled={done ? true : false}>Nộp bài</button>
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
    </>
  )
}

export default ExerciseVocabulary