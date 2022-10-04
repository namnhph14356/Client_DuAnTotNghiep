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

  return (
    <div className='pb-8 rounded-xl '>
      <div className="w-full bg-green-500 px-4 py-2">
        <div className='flex gap-4'>
          <div className='my-auto'>
            <i className="fa-solid fa-angle-left text-5xl text-white font-bold cursor-pointer"></i>
          </div>
          <div className='my-auto'>
            <div className='text-xl uppercase text-white'>Luyện nghe hội thoại</div>
            <div className='text-orange-600'>00 Điểm</div>
          </div>
        </div>
      </div>
      <nav className='text-center '>
        <ul className='p-0 mb-0 divide-x-1  space-x-12 shadow-md'>
          <li className='text-center py-2 px-3 inline-block border-transparent border-b-2  text-gray-500 hover:border-gray-300 hover:text-black cursor-pointer'>
            <div><i className="fa-regular fa-pen-to-square  text-lg font-semibold"></i></div>
            <div className='font-semibold '>Bài tập</div>
          </li>
          <li className='text-center py-2 px-3 inline-block border-transparent border-b-2  text-gray-500 hover:border-gray-300 hover:text-black cursor-pointer'>
            <div><i className="fa-regular fa-comment-dots text-lg font-semibold"></i></div>
            <div className='font-semibold '>Nghe và đọc</div>
          </li>
          <li className='text-center py-2 px-3 inline-block border-transparent border-b-2  text-gray-500 hover:border-gray-300 hover:text-black cursor-pointer'>
            <div><i className="fa-sharp fa-solid fa-pencil  text-lg font-semibold"></i></div>
            <div className='font-semibold '>Ghi chú</div>
          </li>
          <li className='text-center py-2 px-3 inline-block border-transparent border-b-2  text-gray-500 hover:border-gray-300 hover:text-black cursor-pointer'>
            <div><i className="fa-solid fa-comment text-lg font-semibold"></i></div>
            <div className='font-semibold '>Hỏi đáp</div>
          </li>
        </ul>
      </nav>

      <div className='main__topic main__write__listen border py-8 px-4 '>
        <div className='px-4 pb-8'>
          <audio
            className='w-full rounded-none'
            controls
            src={listenWrite?.audio}>
            Your browser does not support the
            <code>audio</code> element.
          </audio>
        </div>
        <div className='mx-4 my-8 p-8 rounded-xl border shadow-md'>
          <div className=' text-lg'>
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

        <div className='mx-4 my-8 p-8 rounded-xl border shadow-md'>
          <div className='mb-8 text-lg'>
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
     
      <div>
        {/* check result */}
        {
          check == true ?
            <div className="answer__result">
              <p>
                <i className="fa-solid fa-medal"></i>
                Bạn đã trả lời đúng : {numTrueAnswer}/{convertValues.length}
              </p>
              <button className='btn__detail__result' onClick={() => listDetailAnswer()}>
                Xem chi tiết
              </button>
            </div>
            : ""
        }
        {/* listed result */}

        {checkDetailAnswer == true ?

          <Modal title="Kết quả bài kiểm tra" visible={checkDetailAnswer} onOk={handleOk} onCancel={handleCancel} width={'60%'} >
            <Collapse defaultActiveKey={['1']} style={{ width: "100%", borderBottom: "1px solid #d9d9d9" }} >
              <div>
                <div className="conversation__box">
                  <table className='table__list__result'>
                    <thead>
                      <tr>
                        <th className='m-auto'>
                          .......
                        </th>
                        <th className='m-auto'>
                          Câu trả lời của bạn
                        </th>
                        <th className='m-auto'>
                          Câu trả lời chính xác
                        </th>
                        <th>
                        </th>
                      </tr>
                    </thead>
                    <tbody className='body__table__result '>

                      {convertValues?.map((item, index) => {
                        return (
                          <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td className={checkAnswerIscorrect(item.idQuestion, item.keyQuestion)}>{item.answerUser}</td>
                            <td className='correct__text__writer'>{item.answerCorrect} </td>
                            <td>{item.isCorrect == true
                              ? <i className="fa-solid fa-thumbs-up result__correct__icon"></i>
                              : <i className="fa-solid fa-circle-xmark result__wrong__icon"></i>}</td>
                          </tr>
                        )
                      })
                      }

                    </tbody>
                    <tfoot className='border-t'>
                      <tr className='result__medium'>
                        <td>Kết quả:</td>
                        <td> </td>
                        <td><span className='font-bold'>{numTrueAnswer}/{convertValues.length}</span></td>
                        <td>Chưa đạt yêu cầu</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </Collapse>
          </Modal>

          : ""}
      </div>
    </div>
  )
}

export default ExeWriteAndListen
