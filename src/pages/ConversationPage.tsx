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
  const { speaking, supported, voices, speak, resume, cancel, stop, pause } = useSpeechSynthesis();

  const onSubmit2 = async (item: any) => {
    let convertValues2: any = [];
    for (let key in item) {
      const idQuestion = key.split("-")[1];
      const keyQuestion = key.split("-")[2];
      //   tách chuỗi key (inputAnswer-62ff6998b77f3ffb3d4ec7c3-1) rồi lấy phần tử thứ 2 (62ff6998b77f3ffb3d4ec7c3), và phần tử thứ 3 (index)
      convertValues2 = [...convertValues2, {
        idQuestion,
        keyQuestion,
        answerUser: item[key],
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

  const listDetailAnswer = () => {
    setCheckDetailAnswer(true)
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

  const handleOk = () => {
    setCheckDetailAnswer(false);
  };

  const handleCancel = () => {
    setCheckDetailAnswer(false);
  };
  useEffect(() => {
    if (id) {
      btListenWrite();
    }
  }, [convertValues, numTrueAnswer, id])

  const backPage = () => {
    history.back();
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
            <div>
              Câu số 1 / <span>10</span>
            </div>
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

        <div className="content__conversation">
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
              <div className='divide-y-2 divide-dotted'>
                <div className='py-4'>
                  <div className='text-base font-medium'>1. What was Dave suffering from?</div>
                  <ul className='pl-5 mb-0'>
                    <li className='flex gap-2'>
                      <input className='' type="radio" name="radio1" id="radio1" />
                      <label className='align-middle mt-[-1px]' htmlFor="radio1"> He had a headache.</label>
                    </li>
                    <li className='flex gap-2'>
                      <input className='' type="radio" name="radio1" id="radio1" />
                      <label className='align-middle mt-[-1px]' htmlFor="radio1"> He had a headache.</label>
                    </li>
                    <li className='flex gap-2'>
                      <input className='' type="radio" name="radio1" id="radio1" />
                      <label className='align-middle mt-[-1px]' htmlFor="radio1"> He had a headache.</label>
                    </li>
                    <li className='flex gap-2'>
                      <input className='' type="radio" name="radio1" id="radio1" />
                      <label className='align-middle mt-[-1px]' htmlFor="radio1"> He had a headache.</label>
                    </li>
                  </ul>
                </div>
                <div className='py-4'>
                  <div className='text-base font-medium'>1. What was Dave suffering from?</div>
                  <ul className='pl-5 mb-0'>
                    <li className='flex gap-2'>
                      <input className='' type="radio" name="radio1" id="radio1" />
                      <label className='align-middle mt-[-1px]' htmlFor="radio1"> He had a headache.</label>
                    </li>
                    <li className='flex gap-2'>
                      <input className='' type="radio" name="radio1" id="radio1" />
                      <label className='align-middle mt-[-1px]' htmlFor="radio1"> He had a headache.</label>
                    </li>
                    <li className='flex gap-2'>
                      <input className='' type="radio" name="radio1" id="radio1" />
                      <label className='align-middle mt-[-1px]' htmlFor="radio1"> He had a headache.</label>
                    </li>
                    <li className='flex gap-2'>
                      <input className='' type="radio" name="radio1" id="radio1" />
                      <label className='align-middle mt-[-1px]' htmlFor="radio1"> He had a headache.</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className='mx-4 py-8 '>
              <div className='mb-8 text-lg border-b'>
                <div><i className="fa-solid fa-pen"></i> Nghe và điền vào chỗ trống.</div>
              </div>
              <form onSubmit={handleSubmit(onSubmit2)}  >
                <div className="content">
                  {
                    listQuestionAnswer?.map((item: any, index: number) => {
                      const quesToArr = item.question.text.split("___")
                      // tách chuỗi thành 1 mảng
                      var tempQues: any = [];
                      quesToArr.forEach((item2: any, index2: number) => {
                        if (index2 < quesToArr.length - 1) {
                          tempQues.push(<span key={index2 + 1}>{item2}</span>, check == true ?
                            <input key={index2 + 1} className={`inp__text ${checkAnswerIscorrect(item.question._id, index2 + 1)}`} {...register(`inputAnswer-${item.question._id}-${index2 + 1}`, { required: "Không được bỏ trống !" })} disabled placeholder="Đáp án..." />
                            : <input key={index2 + 1} className="inp__text" {...register(`inputAnswer-${item.question._id}-${index2 + 1}`, { required: "Không được bỏ trống !" })} placeholder="Đáp án..." />)
                        } else {
                          tempQues.push(<span key={index2 + 1}>{item2}</span>)
                        }
                        // lọc mảng thêm phần tử vào mảng mới (tempQues)
                      })

                      return (

                        <p key={index + 1} className="hover:cursor-pointer flex gap-8 w-full"  >
                          {/* <div className=' whitespace-nowrap'> */}
                          <div className='flex justify-between gap-4 '>
                            <strong>{item.question.name}:</strong>
                            {/* <span onClick={() => speak({ text: speakInput(item.question, item.answer), rate: 0.4, pitch: 1, voice: voices[2] })}><i className="fa-solid fa-volume-low"></i></span> */}
                            <span onClick={() => speak({ text: speakInput(item.question, item.answer), rate: 1, pitch: 1, voice: voices[2] })}><i className="fa-solid fa-circle-play text-green-500 text-lg"></i></span>
                          </div>
                          {/* </div> */}
                          <span className=''>{quesToArr.length == 1 ? item.question.text : tempQues}</span>
                          {/* {item.question.text && <div className="text-sm text-danger" style={{ color: "red" }}>{errors[`inputAnswer-${item.question._id}-${index + 1}`]?.message}</div>} */}
                        </p>
                      )
                    })
                  }

                </div>



              </form>
            </div>

            <div className="btn__Check__answer" >
              <button >
                Kiểm tra
              </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ConversationPage