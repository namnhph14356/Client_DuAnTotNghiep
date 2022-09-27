/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */

import AdverDeatil from '../components/AdverDeatil'
import NavDeatil from '../components/NavDeatil'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getListenWriteById, getListenWriteByIdCategory } from '../features/Slide/listenWrite/ListenWriteSlice';
import { addUserListenAndWrite } from '../features/Slide/userListenWrite/UserListenWriteSlice';
import './../css/writeAndListen.css'
import { useSpeechSynthesis } from 'react-speech-kit';
import { speakInput } from '../midlerware/LearningListenWrite';
import { getListQuestionListenWriteById } from '../api/questionListenWrite';
import { listAnswerListenWriteById } from '../api/answerListenWrite';
import { ListenWriteType, QuestionAnswerListenWriteType } from '../types/listenWrite';

const ExeWriteAndListen = () => {
    const listenWrite = useSelector((item:any) => item.listenWrite.value);
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
                        if (element.answer && element.answer.idQuestion == convertValues2[key].idQuestion && (Number(convertValues2[key].keyQuestion) - 1) == index  ) {
                                if (String(element.answer.answer[index]).toLowerCase() == convertValues2[key].answerUser.toLowerCase()) {
                                    convertValues2[key].isCorrect = true;
                                    convertValues2[key].answerCorrect = convertValues2[key].answerUser
                                    numAnswer += 1
                                } else  {
                                    convertValues2[key].answerCorrect =  element.answer.answer[index] 
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
            console.log(arr);
            
        }
    }

    useEffect(() => {
        if (id) {
            btListenWrite();
        }
    }, [convertValues, numTrueAnswer, id])

    return (
        <div>
            <div className='box__deatil__learning__main'>
                <NavDeatil />
                <div className=' col-span-7 pb-8 rounded-xl'>
                    <div className='main__topic main__write__listen'>
                        <div className="header__write__listen ">
                            <div className="title__header__write__listen">
                                <p className='font-semibold text-black text-xl uppercase'>
                                    {listenWrite?.category?.title}
                                </p>
                            </div>
                            <div className="close__header">
                                <button>
                                    <i className="fa-solid fa-xmark text-black"></i>
                                </button>
                            </div>
                        </div>
                        <div className='info__write__listen px-8'>
                            <p><i className="fa-solid fa-pen"></i> Nghe và điền vào chỗ trống.</p>
                        </div>
                        <div className="audio__listen px-8">
                            <audio
                                controls
                                src={listenWrite?.audio}>
                                Your browser does not support the
                                <code>audio</code> element.
                            </audio>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit2)}  >
                            <div className="conversation__box">
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

                                            <p key={index + 1} className="hover:cursor-pointer"  >
                                                <strong>{item.question.name}:</strong>
                                                {/* <button type="button" onClick={cancel}> Pause</button> */}
                                                <span onClick={() => speak({ text: speakInput(item.question, item.answer), rate: 0.3, pitch: 0.5, voices: 'en-US' })}><i className="fa-solid fa-volume-low"></i></span>
                                                <span onClick={() => speak({ text: speakInput(item.question, item.answer), rate: 1, pitch: 0.5, voices: 'en-US' })}><i className="fa-solid fa-volume-high"></i></span>
                                                <span>{quesToArr.length == 1 ? item.question.text : tempQues}</span>
                                                {/* {item.question.text && <div className="text-sm text-danger" style={{ color: "red" }}>{errors[`inputAnswer-${item.question._id}-${index + 1}`]?.message}</div>} */}
                                            </p>
                                        )
                                    })
                                }

                            </div>

                            <div className="btn__Check__answer" >
                                <button >
                                    Kiểm tra
                                </button>
                            </div>

                        </form>

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
                            <div className='border rounded-xl my-8 pb-8'>
                                <div className="conversation__box">
                                    <table className='table__list__result'>
                                        <thead>
                                            <tr>
                                                <th>
                                                    .......
                                                </th>
                                                <th>
                                                    Câu trả lời của bạn
                                                </th>
                                                <th>
                                                    Câu trả lời chính xác
                                                </th>
                                                <th>

                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className='body__table__result'>

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
                                        <tr className='result__medium'>
                                            <td>Kết quả:</td>
                                            <td> </td>
                                            <td><span className='font-bold'>{numTrueAnswer}/{convertValues.length}</span></td>
                                            <td>Chưa đạt yêu cầu</td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="back__wep__close">
                                    <button>
                                        Trở lại
                                    </button>
                                </div>
                            </div>

                            : ""}
                    </div>
                </div>
                <AdverDeatil />
            </div>

        </div >
    )
}

export default ExeWriteAndListen
