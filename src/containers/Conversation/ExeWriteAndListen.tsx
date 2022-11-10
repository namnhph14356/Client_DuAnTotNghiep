/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-globals */
import '../../css/conversation.css'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import { getListenWriteById, getListenWriteByIdCategory } from '../../features/Slide/listenWrite/ListenWriteSlice';
import { addUserListenAndWrite } from '../../features/Slide/userListenWrite/UserListenWriteSlice';
import '../../css/writeAndListen.css'
import { useSpeechSynthesis } from 'react-speech-kit';
import { speakInput } from '../../midlerware/LearningListenWrite';
import { getListQuestionListenWriteById } from '../../api/questionListenWrite';
import { listAnswerListenWriteById } from '../../api/answerListenWrite';
import { ListenWriteType, QuestionAnswerListenWriteType } from '../../types/listenWrite';
import { Collapse, Modal } from 'antd';
import Loading from '../../components/Loading';
import { async } from '@firebase/util';

const value = [
  { id: 1, name: 'Annette Black' },
  { id: 2, name: 'Cody Fisher' },
  { id: 3, name: 'Courtney Henry' },
  { id: 4, name: 'Kathryn Murphy' },
  { id: 5, name: 'Theresa Webb' },
]
const questionQuiz = [
  { id: 1, name: 'What was Dave suffering from ?' },
  { id: 2, name: 'What does Eric advise Dave to do ?' },
]
const answerQuiz = [
  { id: "1", name: 'He had a headache.', idQuestion: "1", isCorrect: false },
  { id: "2", name: 'He was ill.', idQuestion: "1", isCorrect: false },
  { id: "3", name: 'He stayed up late.', idQuestion: "1", isCorrect: false },
  { id: "4", name: 'He didn’t sleep a wink in 3 days.', idQuestion: "1", isCorrect: true },

  { id: "5", name: 'See a doctor', idQuestion: "2", isCorrect: false },
  { id: "6", name: 'Go to sleep in 3 days', idQuestion: "2", isCorrect: true },
  { id: "7", name: 'See a friend', idQuestion: "2", isCorrect: false },
  { id: "8", name: 'Go to the beauty salon', idQuestion: "2", isCorrect: false },
]

const people = [
  { name: 'lalisa', title: 'hello my bae', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]
const ExeWriteAndListen = () => {
  const listenWrite = useSelector((item: any) => item.listenWrite.value);
  const userListenWrite = useSelector((item: any) => item.userListenWrite.value);
  const [listQuestionAnswer, setListQuestionAnswer] = useState<QuestionAnswerListenWriteType[]>([]);
  const { register, handleSubmit, formState } = useForm();
  const [question, setQuestion] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [check, setCheck] = useState(false)
  const [checkDetailAnswer, setCheckDetailAnswer] = useState(false)
  const [checkPause, setCheckPause] = useState(false)
  const [numTrueAnswer, setNumTrueAnswer] = useState(0)
  const [convertValues, setConvertValues] = useState<any>([])
  const [convertQuizz, setConvertQuizz] = useState<any>([])
  const [checkAudio, setCheckAudio] = useState<any>()
  const [checkStartAudio, setCheckStartAudio] = useState(false)
  const { speaking, supported, voices, speak, resume, cancel, stop, pause } = useSpeechSynthesis();

  const [listText, setListText] = useState<any>([])

  const onSubmit2 = async (item: any) => {

    let num: number = 0;
    for (const key in item.ans) {
      if (item.ans[key] != "") {
        num++
      }
    }

    let countAnswer: number = questionQuiz.length;
    listQuestionAnswer.map((e) => {
      if (e.answer) {
        countAnswer += e.answer.answer.length
      }
    })

    let countAnswerUser = num + convertQuizz.length
    if (countAnswerUser < countAnswer) {
      return Modal.warning({
        title: "Chú ý",
        content: <div className=' text-sm'>
          <p>Bạn phải hoàn thành tất cả các câu trước khi [Nộp bài] !</p>
          <div className='font-bold'>Số câu chưa hoàn thành: {countAnswer - countAnswerUser}</div>
        </div>,
        width: "30%",
        onOk: () => {
        }
      })
    }

    // check answer listenWrite
    let convertValues2: any = [];
    for (let key in item.ans) {
      const idQuestion = key.split("-")[1];
      const keyQuestion = key.split("-")[2];
      //   tách chuỗi key (inputAnswer-62ff6998b77f3ffb3d4ec7c3-1) rồi lấy phần tử thứ 2 (62ff6998b77f3ffb3d4ec7c3), và phần tử thứ 3 (index)
      convertValues2 = [...convertValues2, {
        idQuestion,
        keyQuestion,
        answerUser: item.ans[key],
        answerCorrect: "",
        isCorrect: false
      },]
      //   push vào mảng convertValues với id và answer
    }

    let numAnswer = 0;
    await listQuestionAnswer.forEach((element, index) => {
      if (element.answer) {
        for (let index = 0; index < element.answer?.answer.length; index++) {
          for (const key in convertValues2) {
            if (element.answer && element.answer.idQuestion == convertValues2[key].idQuestion && (Number(convertValues2[key].keyQuestion) - 1) == index) {
              if (String(element.answer.answer[index]).toLowerCase() == convertValues2[key].answerUser.toLowerCase()) {
                convertValues2[key].isCorrect = true;
                convertValues2[key].answerCorrect = convertValues2[key].answerUser
                numAnswer += 1
              } else {
                convertValues2[key].answerCorrect = element.answer.answer[index]
              }
            }
          }
        }
      }
    });
    setNumTrueAnswer(numAnswer)
    setConvertValues(convertValues2)
    setCheck(true)
  }

  const checkAnswerIscorrect = (id: any, key: any) => {
    let className = "";
    convertValues.forEach(e => {
      if (e.idQuestion == id && key == e.keyQuestion) {
        if (e.isCorrect == true) {
          className = "text__result__correct"
        } else {
          className = "red text__result__wrong"
        }
      }
    });
    return className
  }

  const btListenWrite = async () => {
    const { payload } = await dispatch(getListenWriteByIdCategory(id))
    const avx = JSON.parse(payload.test);
    setListText(avx)

    if (payload) {
      const { data: question } = await getListQuestionListenWriteById(String(payload._id))
      let arr: any = [];
      for (let i = 0; i < question.length; i++) {
        const { data: answer } = await listAnswerListenWriteById(question[i]._id)
        arr.push({ question: question[i], answer: answer })
      }
      setListQuestionAnswer(arr)
    }
  }

  useEffect(() => {
    if (id) {
      btListenWrite();
    }
  }, [convertValues, convertQuizz, numTrueAnswer, id])

  const changeValueQuiz = (e: any, answer: any) => {
    const exist = convertQuizz.find((item) => item.idQuestion == answer.idQuestion)
    if (exist) {
      return
    }
    setConvertQuizz([...convertQuizz, answer])
  }

  const onStartAudio = async (value: any, index: number) => {
    const audio: any = document.getElementById("audio1");
    const firstItem = value?.alternatives[0].words[0]
    audio.startTime = firstItem.startTime.seconds
    audio.endTime = value.resultEndTime.seconds
    audio.currentTime = firstItem.startTime.seconds

    setCheckPause(true)
    checkColorSpeech(value, index)
    await audio.play()

    setCheckAudio({ start: firstItem.startTime.seconds, end: value.resultEndTime.seconds })
  }

  const onTimeUpdate = async () => {
    const audio: any = document.getElementById("audio1");
    let speech: any = document.querySelectorAll("#speech");
    let iconAudio: any = document.querySelectorAll("#iconAudio");

    if (Math.floor(audio.currentTime) === Number(audio.endTime)) {
      speech.forEach((element, i) => {
        speech[i].style.color = "black";
        iconAudio[i].style.display = "block"
      });
      setCheckPause(false)
      await audio.pause()
    }
  }

  const onPause = async () => {
    const audio: any = document.getElementById("audio1");
    let speech: any = document.querySelectorAll("#speech");
    let iconAudio: any = document.querySelectorAll("#iconAudio");
    speech.forEach((element, i) => {
      speech[i].style.color = "black";
      iconAudio[i].style.display = "block"
    });
    setCheckPause(false)
    await audio.pause()
  }

  const convertText = (text: String) => {
    if (text.charAt(0) === " ") {
      return text.charAt(1).toUpperCase() + text.slice(2).toLowerCase();
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  const checkColorSpeech = (text: any, index: number) => {
    let speech: any = document.querySelectorAll("#speech");
    let iconAudio: any = document.querySelectorAll("#iconAudio");

    // if (convertText(text.alternatives[0].transcript).toLowerCase() === speech[index]?.innerHTML.toLowerCase()) {

    //   const abc = speech[index].innerHTML.split(" ")

    //   // text.alternatives[0].words.map((item: any) => {
    //   //   const start = item.startTime.seconds
    //   //   const end = item.endTime.seconds
    //   //   const second = (Number(end) - Number(start)) * 1000

    //   //   setTimeout(() => {
    //   //     speech[index].style.color = "black";
    //   //   }, second)
    //   // })
    // }

    if (convertText(text.alternatives[0].transcript).toLowerCase() === speech[index]?.innerHTML.toLowerCase()) {
      speech[index].style.color = "orange";
      iconAudio.forEach((element, i) => {
        if (i !== index) {
          iconAudio[i].style.display = "none"
        }
      });
    }
  }

  return (
    <div className='conversation__page'>
      {listQuestionAnswer.length > 0 ?
        <div className="main__conversation">
          <form className="content__conversation" onSubmit={handleSubmit(onSubmit2)} >
            <div className='mx-4 '>
              <audio
                id='audio1'
                className='w-full rounded-none'
                controls={true}
                onTimeUpdate={onTimeUpdate}
                src={`${listenWrite?.audio}`}>
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            </div>

            {/* <div className='mx-4 my-8 '>
              <div className=' text-lg border-b'>
                <div><i className="fa-solid fa-pen"></i> Nghe và trả lời câu hỏi.</div>
              </div>
              <div>
                {questionQuiz.map((item, index) => {
                  return (
                    <div className='py-4' key={item.id}>
                      <div className='text-base flex font-medium space-x-4 mx-auto'>
                        <div >{index + 1}. {item.name}</div>
                        <span >{convertQuizz.length > 0 && check == true ?
                          convertQuizz[index].isCorrect == true ?
                            <i className="fa-solid fa-check text-green-500 text-xl rounded font-bold"></i>
                            :
                            <i className="fa-solid fa-xmark text-red-500  text-xl my-auto "></i>
                          : ""
                        }
                        </span>
                      </div>
                      <ul className='mb-0 '>
                        {
                          answerQuiz.map((e, index) => {
                            const answer: any = []
                            if (check == true) {
                              const find = convertQuizz.filter((ans) => ans.id == e.id)
                              answer.push(...find)
                            }
                            if (Number(e.idQuestion) == item.id) {
                              return (
                                // even:bg-slate-100
                                <div className='even:bg-slate-100 ' key={e.id}>
                                  <li key={e.id} className={` ${answer.length > 0 && answer[0].idQuestion == e.idQuestion ? answer[0].id == e.id && e.isCorrect == false ? "bg-[#FBE1DB]" : "" : ""} ${check == true && e.isCorrect == true ? "bg-[#CCF0A5]" : ""}    hover:cursor-pointer py-2 px-4  font-sans flex gap-2  `} >
                                    <input type="radio" id={e.name} name={String(item.id)} onChange={(em) => changeValueQuiz(em, e)} value={e.name} />
                                    <label className='align-middle mt-[-2px]' htmlFor={e.name}>{e.name}</label>
                                  </li>
                                </div>
                              )
                            }
                          })
                        }
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div> */}

            {/* <div className='mx-4 py-8 '>
              <div className='mb-8 text-lg border-b'>
                <div><i className="fa-solid fa-pen"></i> Nghe và điền vào chỗ trống.</div>
              </div>
              <div  >
                <div className="content">
                  {
                    listQuestionAnswer?.map((item: any, index: number) => {

                      const quesToArr = item.question.text.split("___")
                      // tách chuỗi thành 1 mảng
                      var tempQues: any = [];
                      quesToArr.forEach((item2: any, index2: number) => {
                        if (index2 < quesToArr.length - 1) {
                          tempQues.push(<span key={index2 + 1}>{item2}</span>, check == true ?
                            <input key={index2 + 1} className={`inp__text ${checkAnswerIscorrect(item.question._id, index2 + 1)}`} {...register(`ans.inputAnswer-${item.question._id}-${index2 + 1}`)} disabled />
                            : <input key={index2 + 1} className="inp__text" {...register(`ans.inputAnswer-${item.question._id}-${index2 + 1}`)} />)
                        } else {
                          tempQues.push(<span key={index2 + 1}>{item2}</span>)
                        }
                        // lọc mảng thêm phần tử vào mảng mới (tempQues)
                      })

                      return (
                        <div key={index + 1} className="hover:cursor-pointer grid grid-cols-12 gap-8 w-full px-4 even:bg-slate-100"  >
                          <div className='col-span-2 flex justify-between gap-4 py-2 '>
                            <strong className='my-auto'>{item.question.name}: </strong>
                            <span onClick={() => speak({ text: speakInput(item.question, item.answer), rate: 1, pitch: 1, voice: item.question.name == "Cap" ? voices[0] : voices[1] })}><i className="fa-solid fa-circle-play text-green-500 text-lg"></i></span>
                          </div>
                          <span className='col-span-10 my-auto'>{quesToArr.length == 1 ? item.question.text : tempQues}</span>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div> */}

            <div className='mx-4 py-8 '>
              <div className='mb-8 text-lg border-b'>
                <div><i className="fa-solid fa-pen"></i> Nghe và điền vào chỗ trống.</div>
              </div>
              <div>
                <div className="content">
                  {
                    listText?.response?.results.map((item: any, index: number) => {
                      return (
                        <div key={index + 1} className="hover:cursor-pointer grid grid-cols-12 gap-8 w-full px-4 py-1 even:bg-slate-100"  >
                          <div className='col-span-2 flex justify-between gap-4 py-2 '>
                            <strong className='my-auto'>Long: </strong>
                            {/* <span onClick={() => speak({ text: item.alternatives[0].transcript, rate: 1, pitch: 1, voice: voices[1] })}><i className="fa-solid fa-circle-play text-green-500 text-lg"></i></span> */}
                            {
                              checkPause ?
                                <span id='iconAudio' key={index + 1} onClick={onPause}><i className="fa-sharp fa-solid fa-circle-pause text-green-500 text-lg"></i></span>
                                :
                                <span id='iconAudio' key={index + 1} onClick={() => onStartAudio(item, index)}><i className="fa-solid fa-circle-play text-green-500 text-lg"></i></span>
                            }
                          </div>
                          <span id='speech' key={index + 1} className='col-span-10 my-auto normal-case'>{convertText(item.alternatives[0].transcript)}</span>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <div className="btn__Check__answer" >
              <button>Làm lại </button>
              <button>Nộp bài</button>
            </div>
          </form>
        </div>
        :
        <Loading />

      }
    </div>
  )
}

export default ExeWriteAndListen