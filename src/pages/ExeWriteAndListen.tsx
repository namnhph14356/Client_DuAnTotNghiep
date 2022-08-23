/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */

import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getListenWriteById, getListenWriteByIdCategory } from '../features/Slide/listenWrite/ListenWriteSlice';
import { addUserListenAndWrite } from '../features/Slide/userListenWrite/UserListenWriteSlice';
import './../css/writeAndListen.css'

const ExeWriteAndListen = () => {
    const listenWrite = useSelector((item: any) => item.listenWrite.value);
    const userListenWrite = useSelector((item: any) => item.userListenWrite.value);
    const { register, handleSubmit, formState } = useForm();
    const [question, setQuestion] = useState([]);
    const dispatch = useDispatch();
    // console.log(listenWrite.content);
    const { id } = useParams();
    // console.log(id);
    const { errors }: any = formState;
    const [check, setCheck] = useState(false)
    const [checkDetailAnswer, setCheckDetailAnswer] = useState(false)
    const [numTrueAnswer, setNumTrueAnswer] = useState(0)
    const [convertValues, setConvertValues] = useState<any>([])
    // console.log(check);

    useEffect(() => {
        if (id) {
            const btListenWrite = async () => {
                const { payload } = await dispatch(getListenWriteByIdCategory(id))
                // console.log(payload.content);

                // convertValues.map( async(item) => {
                await dispatch(addUserListenAndWrite({
                    listAnswer: [
                        ...convertValues

                    ],
                    numTrueAnswer: numTrueAnswer,
                    idListenWrite: id,
                }))
                // })
            }
            btListenWrite();

        }



    }, [convertValues, numTrueAnswer])



    const onSubmit2 = async (item: any, index: any) => {
        console.log("dap an: ", item);
        // console.log("true answer", listenWrite.content);
        console.log(index);


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

        console.log(convertValues2);
        let numAnswer = 0;
        await listenWrite.content.forEach((element, index) => {

            for (let j = 0; j < convertValues2.length; j++) {

                if (element.answer != [] && convertValues2[j].idQuestion == element._id) {

                    for (let key in element.answer) {
                        console.log(key);

                        if (String(element.answer[key]).toLowerCase() == convertValues2[j].answerUser.toLowerCase()) {
                            console.log(convertValues2[j].idQuestion, "Chính xác");

                            convertValues2[j].isCorrect = true;
                            convertValues2[j].answerCorrect = convertValues2[j].answerUser

                            numAnswer += 1
                        } else {
                            console.log(convertValues2[j].answer, "sai rồi", "ddungs la: ", element.answer[key]);
                            convertValues2[j].answerCorrect = element.answer[j] || element.answer[key]

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
        console.log(key);

        convertValues.forEach(e => {

            if (e.idQuestion == id && key == e.keyQuestion) {

                if (e.isCorrect == true) {
                    console.log("ddax ddungs key", key, id);
                    // console.log(id);
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
    console.log(convertValues);

    return (
        <div className='main__write__listen'>
            <div className="header__write__listen">
                <div className="title__header__write__listen">
                    <h2>

                        {listenWrite?.category?.title}
                    </h2>
                </div>
                <div className="close__header">
                    <button>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

            </div>
            <div className='info__write__listen'>
                <p><i className="fa-solid fa-pen"></i> Nghe và điền vào chỗ trống.</p>
            </div>

            <div className="audio__listen">
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

                        listenWrite?.content?.map((item: any, index: number) => {

                            const quesToArr = item.text.split("___")
                            // tách chuỗi thành 1 mảng
                            // console.log(quesToArr);
                            // console.log(convertValues);

                            var tempQues: any = [];
                            // console.log(quesToArr.length -1);

                            quesToArr.forEach((item2: any, index2: number) => {

                                if (index2 < quesToArr.length - 1) {
                                    tempQues.push(<span key={index2 + 1}>{item2}</span>, check == true ?
                                        <input key={index2 + 1} className={`inp__text ${checkAnswerIscorrect(item._id, index2 + 1)}`} {...register(`inputAnswer-${item._id}-${index2 + 1}`, { required: "Không được bỏ trống !" })} disabled placeholder="Đáp án..." />
                                        : <input key={index2 + 1} className="inp__text" {...register(`inputAnswer-${item._id}-${index2 + 1}`, { required: "Không được bỏ trống !" })} placeholder="Đáp án..." />)
                                } else {
                                    tempQues.push(<span key={index2 + 1}>{item2}</span>)
                                }
                                // lọc mảng thêm phần tử vào mảng mới (tempQues)

                            })

                            // console.log(quesToArr.length);
                            console.log(tempQues);
                            return (
                                <p key={index + 1}>

                                    <strong>{item.name}:</strong>
                                    <span>{quesToArr.length == 1 ? item.text : tempQues}</span>
                                    {/* {item.text && <div className="text-sm text-danger" style={{ color: "red" }}>{errors[`inputAnswer-${item._id}-${index2 + 1}`]?.message}</div>} */}

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
                <div>
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
    )
}

export default ExeWriteAndListen