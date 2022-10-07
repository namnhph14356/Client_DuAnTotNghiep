/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-globals */
import './../css/conversation.css'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */

import NavDeatil from '../components/NavDeatil'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import { getListenWriteById, getListenWriteByIdCategory } from '../features/Slide/listenWrite/ListenWriteSlice';
import { addUserListenAndWrite } from '../features/Slide/userListenWrite/UserListenWriteSlice';
import './../css/writeAndListen.css'
import { useSpeechSynthesis } from 'react-speech-kit';
import { speakInput } from '../midlerware/LearningListenWrite';
import { getListQuestionListenWriteById } from '../api/questionListenWrite';
import { listAnswerListenWriteById } from '../api/answerListenWrite';
import { ListenWriteType, QuestionAnswerListenWriteType } from '../types/listenWrite';
import { Collapse, Modal } from 'antd';

const value = [
  { id: 1, name: 'Annette Black' },
  { id: 2, name: 'Cody Fisher' },
  { id: 3, name: 'Courtney Henry' },
  { id: 4, name: 'Kathryn Murphy' },
  { id: 5, name: 'Theresa Webb' },
]
const questionQuiz = [
  { id: 1, name: 'Where are you going ?' },
  { id: 2, name: 'How are you ?' },
]
const answerQuiz = [
  { id: "1", name: 'aaaaaaaaaaaaaa', idQuestion: "1", isCorrect: false },
  { id: "2", name: 'bbbbbbbbbbbbbb', idQuestion: "1", isCorrect: false },
  { id: "3", name: 'cccccccccccccc', idQuestion: "1", isCorrect: false },
  { id: "4", name: 'ddddddddddddddd', idQuestion: "1", isCorrect: true },

  { id: "5", name: '666666666', idQuestion: "2", isCorrect: false },
  { id: "6", name: '888888888888', idQuestion: "2", isCorrect: true },
  { id: "7", name: 'vvvvvvvvvvvvvvv', idQuestion: "2", isCorrect: false },
  { id: "8", name: 'hhhhhhhh', idQuestion: "2", isCorrect: false },
]

const people = [
  { name: 'lalisa', title: 'hello my bae', email: 'lindsay.walton@example.com', role: 'Member' },
  // More people...
]
const ConversationPage = () => {
  const listenWrite = useSelector((item: any) => item.listenWrite.value);
  const userListenWrite = useSelector((item: any) => item.userListenWrite.value);
  const [listQuestionAnswer, setListQuestionAnswer] = useState<QuestionAnswerListenWriteType[]>([]);
  const { register, handleSubmit, formState } = useForm();
  const [question, setQuestion] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [check, setCheck] = useState(false)
  const [checkDetailAnswer, setCheckDetailAnswer] = useState(false)
  const [numTrueAnswer, setNumTrueAnswer] = useState(0)
  const [convertValues, setConvertValues] = useState<any>([])
  const [convertQuizz, setConvertQuizz] = useState<any>([])
  const { speaking, supported, voices, speak, resume, cancel, stop, pause } = useSpeechSynthesis();

  const onSubmit2 = async (item: any) => {
    console.log(item);

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

  const backPage = () => {
    history.back();
  }

  const changeValueQuiz = (e: any, answer: any) => {
    const exist = convertQuizz.find((item) => item.idQuestion == answer.idQuestion)
    if (exist) {
      return
    }
    setConvertQuizz([...convertQuizz, answer])
  }

  return (
    <div className='conversation__page'>
      <div className="main__conversation">
        <div className="w-full bg-indigo-600 px-4 py-2">
          <div className='flex gap-4'>
            <div className='my-auto' onClick={backPage}>
              <i className="fa-solid fa-angle-left text-5xl text-white font-bold cursor-pointer"></i>
            </div>
            <div className='my-auto'>
              <div className='text-xl uppercase text-white'>Luyện nghe hội thoại</div>
              <div className='text-white'>00 Điểm</div>
            </div>
          </div>
        </div>
        <div className="nav__speaking">
          <div className="count__question">
          </div>
          <div>
            <button className="btn__start__speaking">
              <i className="fa-solid fa-book mr-2"></i> Khởi động
            </button>
            <button className="btn__comment__speaking">
              <i className="fa-solid fa-comment mr-2"></i>Nghe và đọc
            </button>
            <button className="btn__comment__speaking">
              <i className="fa-solid fa-notes-medical"></i> Ghi chú
            </button>
            <button className="btn__comment__speaking">
              <i className="fa-solid fa-comments mr-2"></i> Hỏi và đáp
            </button>
          </div>
        </div>

        <form className="content__conversation" onSubmit={handleSubmit(onSubmit2)} >
          <div className='mx-4 '>
            <audio
              className='w-full rounded-none'
              controls
              src={listenWrite?.audio}>
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </div>

          <div className='mx-4 my-8 '>
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
                              <div className='even:bg-slate-100 '>
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
          </div>

          <div className='mx-4 py-8 '>
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
                          <span onClick={() => speak({ text: speakInput(item.question, item.answer), rate: 1, pitch: 1, voice: voices[2] })}><i className="fa-solid fa-circle-play text-green-500 text-lg"></i></span>
                        </div>
                        <span className='col-span-10 my-auto'>{quesToArr.length == 1 ? item.question.text : tempQues}</span>
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
    </div>
  )
}

export default ConversationPage