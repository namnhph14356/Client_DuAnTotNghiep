// import React from 'react'

// const ExerciseSentences = () => {
//   return (
//     <div>ExerciseSentences</div>
//   )
// }
// export default ExerciseSentences

/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useRef, useState, useMemo, useCallback, useContext } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit';
import { Progress, Button, Modal, Collapse } from 'antd';
import Countdown, { CountdownApi } from 'react-countdown';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getListQuizSlide } from '../../features/Slide/quiz/QuizSlide';
import { getListAnswerQuizSlide } from '../../features/Slide/answerQuiz/AnswerQuizSlide';
import { detailCategory } from '../../api/category';
import { useParams, NavLink } from 'react-router-dom';
import { detailQuiz } from '../../api/quiz';
import reactStringReplace from 'react-string-replace'
import { motion, AnimatePresence } from "framer-motion"
import { DebounceInput } from 'react-debounce-input';
import '../../css/quiz.css'

import moment from 'moment';

import { addUserQuiz } from '../../api/userQuiz';
import { addHistory, detailHistory } from '../../api/history';
import { HistoryType } from '../../types/history';

import Menu from '../../components/Menu';
import { detailDay } from '../../api/day';
import { detailPracticeActivity } from '../../api/practiceActivity';
import { SpeechContext } from '../../context/GoogleSpeechContext';
import { RootState } from '../../app/store';
import { UserType } from '../../types/user';
import GoogleSpeechSpeaker from '../../components/GoogleSpeech/GoogleSpeechSpeaker';
import QuizType5 from '../../components/quiz/QuizType5';
import ListenWriteType1 from '../../components/ListenWrite/ListenWriteType1';


const listListenWrite = [
  {
    ques: { _id: "1", text: "What ___ you ___ here ?", quesAfter: "What are you doing here ?", type: "selectAuto" },
    ans: [
      { _id: "1", idQues: "1", answer: "are" },
      { _id: "2", idQues: "1", answer: "doing" },
    ]
  },
  {
    ques: { _id: "2", text: "ques ___ 2  efefefe ", quesAfter: "ques 111111 2  efefefe ", type: "selectAuto" },
    ans: [
      { _id: "3", idQues: "2", answer: "111111" },
    ]
  },
  {
    ques: { _id: "3", text: "ques ___ 123 333333 ___ 333", quesAfter: "ques aaa 123 333333 aaa 333", type: "selectAuto" },
    ans: [
      { _id: "7", idQues: "3", answer: "aaa" },
      { _id: "8", idQues: "3", answer: "aaa" },
    ]
  }
]

let flag1: string = ""
let flag2: number = 0

const CountdownWrapper = ({ time, reset }) => {
  const ref = useRef<any>();
  const Completionist = () => <span className="hidden">You are good to go!</span>;
  let timeLimit = 100
  let point = 1000
  let countdownApi: CountdownApi | null = null;
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
  const answerQuizs = useAppSelector(item => item.answerQuiz.value)
  const dispatch = useAppDispatch()
  const [select, setSelect] = useState<any>(null)
  const [check, setCheck] = useState(false)
  const [check2, setCheck2] = useState<any>()
  const [done, setDone] = useState<any>()
  const timeSlice = useAppSelector(item => item.time.value)

  const audioCorrect = new Audio("../public/assets/audio/Quiz-correct-sound-with-applause.mp3")
  const audioWrong = new Audio("../public/assets/audio/Fail-sound-effect-2.mp3")

  // const audioCorrect = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3")
  // const audioWrong = new Audio("../assets/audio/Fail-sound-effect-2.mp3")
  const { cancel, speak, speaking, supported, voices, pause, resume } = useSpeechSynthesis();
  const { speechValue, onHandleUpdateSpeech, transcript, onHandleUpdateTranscript } = useContext(SpeechContext)
  const [quiz2, setQuiz2] = useState<any>([])
  const [quizList, setQuizList] = useState<any>()
  const [numQuizList, setNumQuizList] = useState(0)
  // const [listListenWrite, setListListenWrite] = useState<any>()
  const [percent, setPercent] = useState<number>(0);
  let input2: any = []
  let check10: any = []
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [point, setPoint] = useState<any>(null)


  const { id, dayId }: any = useParams()
  const ref = useRef(null)
  const [result, setResult] = useState<any[]>([])
  const [onReset, setOnReset] = useState<boolean>(false)
  const { Panel } = Collapse;

  // kiểm tra đúng sai ghép câu
  // const [quizCompound, setQuizCompound] = useState<any>([])


  // console.log("speechValue quiz", speechValue);
  // console.log("transcript quiz", transcript);
  console.log("quizList", quizList);
  // console.log("select", select)
  // console.log("quizCompound", quizCompound)
  // console.log("result", result)
  // console.log("user", user)
  let checkFlag = 0
  let answerType3 = 0

  // if (quizList) {
  //   // const flag = quizCompound?.map(u => u.answer).join(' ')
  //   const checkFlag2 = quizList[quizIndex].quiz.question.toLowerCase().replace("?", "").trim() === flag.toLowerCase() ? 1 : 0
  //   checkFlag = checkFlag2
  //   // answerType3 = flag

  // }

  let arrSelect: any = []
  const onHanldeSetSelect = (data: any, check?: boolean) => {
    // console.log("dataa",data, check);

    if (data.type === "selectAuto") {
      setSelect(data)
      onCheckType5(data)
      setTimeout(() => {
        onContinute()
      }, 1000)
    } else {
      // console.log("đã vào đây ròi 1!!");
      setSelect(data)
      onCheckType6(data)
      setTimeout(() => {
        onContinute()
      }, 1000)

    }
  }

  // const onHanldeSetSelectListenWrite = (data: any) => {
  //   // console.log("đã vào đây");
  //   // console.log("data đã vào đây", data);

  //   setTimeout(() => {
  //     onContinuteListenWrite()
  //   }, 1000)
  // }


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
      isCorrect: data.isCorrect
    }])
    speak({ text: `${data.isCorrect === true ? "Correct" : "Wrong"}`, voice: voices[2] })
  }

  const onCheckType6 = (data) => {
    setCheck(true)
    increase()
    setResult([...result, {
      quiz: data.quiz,
      answerQuiz: data.answerQuiz,
      time: flag1,
      point: data.isCorrect ? Math.round(flag2) : 0,
      isCorrect: data.isCorrect
    }])
    speak({ text: `${data.isCorrect === true ? "Correct" : "Wrong"}`, voice: voices[2] })
  }

  //---Countinute---
  // Chuyển câu hỏi
  const onContinute = () => {
    setSelect(null)
    input2 = []
    check10 = []
    setCheck2(null)
    setCheck(false)
    setOnReset(!onReset)
    checkFlag = 0
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
    result.forEach((item: any, index: number) => {
      totalPoint = totalPoint + item.point
      if (item.isCorrect === true) {
        totalCorrect = totalCorrect + 1
      }
      if (totalCorrect > quizListHalf) {
        pass = 1
      }
    })
    console.log("totalCorrect", totalCorrect);
    const score = Math.round(10 / quizList.length * totalCorrect)
    setPoint(score)
    
    const { data: data2 } = await addHistory({
      user: user._id,
      learningProgress: "",
      practiceActivity: quiz2.itemPracticeActivity._id,
      score: score,
      totalPoint: totalPoint,
      totalCorrect: totalCorrect,
      result: pass,
      type: 2
    })
    for (let index = 0; index < result.length; index++) {
      const flag = { ...result[index], history: data2._id }
      const { data } = await addUserQuiz(flag)
    }
    const { data } = await detailPracticeActivity(id,user._id)
    setQuiz2(data)

    // const { data } = await detailPracticeActivity(id)
    // setQuiz2(data)

    // const test2 = await Promise.all(data?.history.map(async (item: HistoryType, index) => {
    //   const { data } = await detailHistory(item._id)

    //   return data
    // }))
    // setHistory(test2)
    // setIsModalOpen(true);
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

  //---ModalResult---
  function shuffleArray(array) {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  //---ModalResult---
  //Hiện Modal kết quả
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<any>([]);

  const showModal = async () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  //---ModelCollapse---
  const onChange = (key: string | string[]) => {
  };



  useEffect(() => {
    dispatch(getListQuizSlide())
    dispatch(getListAnswerQuizSlide())
    getQuiz()
  }, [id])

  const getQuiz = async () => {
    const { data } = await detailPracticeActivity(id, String(user._id))
    setQuiz2(data)

    const test = await Promise.all(data?.quizs.map(async (item: any, index) => {
      const { data } = await detailQuiz(item._id)
      return data
    }))

    let arr1: any = [];
    let arr2: any = [];
    test.map((item) => {
      if (item.quiz.type === "selectAuto") {
        arr1.push(item)
      } else {
        arr2.push(item)
      }
    })
    setNumQuizList(arr1.length)
    setQuizList([...arr1, ...arr2])
    const test2 = await Promise.all(data?.history.map(async (item: HistoryType, index) => {
      const { data } = await detailHistory(item._id)
      return data
    }))
    setHistory(test2)

  }

  const remake = () => {
    Modal.confirm({
      title: "Bạn có thật sự muốn làm lại ?",
      onOk: () => {
        // setConvertQuizz([])
        // setCheck(false)
        // const input = document.querySelectorAll(".inputAnswer")
        // input.forEach((e: any) => {
        //   e.checked = false
        // });
        // dispatch(logout(auth))
        // message.success("Đăng xuất thành công")
      }
    })
  }

  // console.log("quizList", quizList);
  console.log("resultresultresultresult", result);
  console.log("questionIndex", questionIndex);
  console.log("history", history);
  console.log("quizLisst", quizList);

  return (
    <>
      <div className=''>
        <div className=''>
          <div className='content__speaking'>
            <div className="flex flex-col qustion__content__speaking">
              <div className="">
                <MemoCountdown time={quizList ? quizList[questionIndex].quiz.timeLimit : 40000} reset={onReset} />
              </div>
            </div>

            {point &&
              <div className='text-center font-bold mt-5'>
                Kết quả của bạn: <span className='px-2 py-1 bg-red-500 text-white rounded ml-2'>{point} / 10</span>
              </div>
            }

            <div className="p-5 ">
              {
                quizList && numQuizList && questionIndex <= numQuizList - 1 ?
                  <QuizType5 question={quizList[questionIndex].quiz.question} data={quizList[questionIndex].answerQuiz} check={check} select={select} onHanldeSetSelect={onHanldeSetSelect} />
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

                  {/* {check === true && select?.isCorrect === true || check === true && check2 === true && select === null
                    ? <section className='w-full mx-auto md:py-[30px]'>
                      <div className="">
                        <div className="bg-[#D6EAF8] border-[#5DADE2]  px-[15px] py-[10px] rounded-md">
                          <p className="text-[#2E86C1] font-bold ">Câu trả lời chính xác</p>
                          <button onClick={onContinute} className="text-white w-full py-[10px] rounded-md bg-[#5DADE2] mb-[20px] font-bold">
                            Tiếp tục
                          </button>
                        </div>
                      </div>
                    </section>
                    : ""}

                  {check === true && select?.isCorrect === false || check === true && check2 === false && select === null
                    ? <section className='w-full mx-auto md:py-[30px]'>
                      <div className="">
                        <div className="bg-[#F9EBEA]  px-[15px] rounded-md">
                          <p className=" py-[10px] text-[#C0392B] font-bold">Đó chưa phải đáp án đúng</p>
                          <button onClick={onContinute} className="text-white w-full py-[10px] rounded-md bg-[#C0392B] mb-[20px] font-bold">
                            Tiếp tục
                          </button>
                        </div>
                      </div>
                    </section>
                    : ""} */}



                  {done === true
                    ? <section className='w-full mx-auto md:py-[30px]'>
                      <div className="">
                        <div className="bg-[#D6EAF8] border-[#5DADE2] px-[15px]  rounded-md">
                          <p className=" py-[10px] text-[#2E86C1] font-bold">Chúc Mừng Bạn đã hoàn thành !</p>
                          <button onClick={onFinish} className="text-white w-full py-[10px] rounded-md bg-[#5DADE2] mb-[20px] font-bold">
                            Xem Kết Quả
                          </button>
                        </div>
                      </div>
                    </section>
                    : ""}


                </div>

                {/* <div className='mt-8 md:basis-1/4'>
                  <div className={`answer__question`}>
                    <button
                      disabled={select === null && quizCompound === null ? true : false}
                      className={`${check === true
                        ? select?.isCorrect === true || check2 === true
                          ? "!bg-[#D6EAF8] !text-[#5DADE2] !border-[#5DADE2] "
                          : "!bg-[#C0392B] !text-white"
                        : "hover:bg-purple-800 "}  
                                                font-bold text-lg rounded-md float-right cursor-pointer transition duration-700`}
                      onClick={() => { onCheck() }}
                    >
                      Kiểm tra
                    </button>
                  </div>
                </div> */}
              </div>
            </div>

          </div>

          <Button type="primary" onClick={showModal}>
            Open Modal
          </Button>


          <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={'60%'}>
            <Collapse defaultActiveKey={history?.length} onChange={onChange}>

              {history?.map((item: any, index: number) => {
                return <Panel
                  key={index + 1}
                  showArrow={false}
                  header={
                    <div key={index + 1} className="flex flex-row justify-between gap-4">
                      <div className="">{moment(item.history.createdAt).format("H:mm:ss, Do/MM/YYYY")}</div>
                      <div className="">{item.category?.title}</div>
                      <div className="">{item.history?.totalCorrect}/{quizList.length}</div>
                      <div className="">{item.history.result === 0 ? "Fail" : "Pass"}</div>
                    </div>
                  }
                >
                  <table className='table__list__result'>
                    <thead>
                      <tr>
                        <th className='m-auto'>Câu trả lời chính xác</th>
                        <th className='m-auto'>Câu trả lời của bạn</th>
                        <th className='m-auto'>Thời gian</th>
                        <th>Điểm</th>
                        <th>Kết quả</th>
                      </tr>
                    </thead>
                    <tbody className='body__table__result '>
                      {item.userQuiz.map((item2: any, index: number) => {
                        return <tr key={index + 1} className="">
                          <td className="">{item2.answerQuiz ? item2.correctAnswer.answer : item2.quiz?.question?.toLowerCase().replace("?", "").trim()}</td>
                          <td className="">{item2.answerQuiz ? item2.answerQuiz.answer : item2.answer}</td>
                          <td className="">{item2.time}</td>
                          <td className="">{Math.round(item2.point)}</td>
                          <td>
                            {item2.answerQuiz?.isCorrect === item2.correctAnswer?.isCorrect || item2.answer === item2.quiz?.question.toLowerCase().replace("?", "").trim()
                              ? <i className="fa-solid fa-thumbs-up result__correct__icon"></i>
                              : <i className="fa-solid fa-circle-xmark result__wrong__icon"></i>}
                          </td>
                        </tr>
                      })}

                    </tbody>
                    <tfoot className='border-t'>
                      <tr className='result__medium'>
                        <td>Kết quả:</td>
                        <td> </td>
                        <td>{item.history?.totalCorrect}/{quizList.length}</td>
                        <td>{item.history.totalPoint}</td>
                        <td>{item.history.result === 0 ? "Fail" : "Pass"}</td>

                      </tr>

                    </tfoot>
                  </table>
                </Panel>
              })}

            </Collapse>
          </Modal>
        </div>

      </div>

    </>
  )
}

export default ExerciseSentences