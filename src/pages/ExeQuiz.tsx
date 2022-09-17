/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit';
import { Progress, Button, Modal, Collapse } from 'antd';
import Countdown from 'react-countdown';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getListQuizSlide } from '../features/Slide/quiz/QuizSlide';
import { getListAnswerQuizSlide } from '../features/Slide/answerQuiz/AnswerQuizSlide';
import { detailCategory } from '../api/category';
import { useParams } from 'react-router-dom';
import { detailQuiz } from '../api/quiz';
// import audio1  from '../../public/assets/audio/Quiz-correct-sound-with-applause.mp3'
import reactStringReplace from 'react-string-replace'
import { motion, AnimatePresence } from "framer-motion"
import { DebounceInput } from 'react-debounce-input';
import moment from 'moment';
import { addUserQuiz } from '../api/userQuiz';
import { detailHistory } from '../api/history';
import { HistoryType } from '../types/history';

const ExeQuiz = () => {
    const answerQuizs = useAppSelector(item => item.answerQuiz.value)
    const dispatch = useAppDispatch()
    const [select, setSelect] = useState<any>(null)
    const [check, setCheck] = useState(false)
    const [check2, setCheck2] = useState<any>()
    const [done, setDone] = useState<any>()
    // let check2: any = null



    const audioCorrect = new Audio("../public/assets/audio/Quiz-correct-sound-with-applause.mp3")
    const audioWrong = new Audio("../public/assets/audio/Fail-sound-effect-2.mp3")

    // const audioCorrect = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3")
    // const audioWrong = new Audio("../assets/audio/Fail-sound-effect-2.mp3")
    const { cancel, speak, speaking, supported, voices, pause, resume } = useSpeechSynthesis();

    const [quizs2, setQuiz2] = useState<any>([])
    const [quizList, setQuizList] = useState<any>()
    const [percent, setPercent] = useState<number>(0);
    let input2: any = []
    let check10: any = []
    const [quizIndex, setQuizIndex] = useState<number>(0)
    const { id }: any = useParams()
    const ref = useRef(null)

    const [listenQuiz, setListenQuiz] = useState<any>([])
    const [selectQuiz, setSelectQuiz] = useState<any>([])
    const [writeQuiz, setWriteQuiz] = useState<any>([])
    // console.log("listenQuiz", listenQuiz);
    // console.log("selectQuiz", selectQuiz);
    // console.log("writeQuiz", writeQuiz);


    const [result, setResult] = useState<any[]>([])
    const [finishTime, setFinishTime] = useState<any>()
    const [finishPoint, setFinishPoint] = useState<any>()

    console.log("result 1", result);

    const Completionist = () => <span>You are good to go!</span>;
    let timeLimit = 100
    let point = 1000

    const { Panel } = Collapse;


    //---Countinute---
    // Chuyển câu hỏi
    const onContinute = () => {



        setSelect(null)
        input2 = []
        check10 = []

        // ref.current.value = ""
        setCheck2(null)
        // check2 = null
        setCheck(false)



        if (quizIndex >= quizList.length - 1) {
            // setQuizIndex(0)
            // setPercent(0)
            setDone(true)


        } else {
            setQuizIndex(quizIndex + 1)
        }

        // console.log("quizIndex", quizIndex);
    }

    //---Finish---
    // Kết thúc làm bài và đẩy đáp án đã chọn lên server
    const onFinish = async () => {
        for (let index = 0; index < result.length; index++) {
            const flag = { ...result[index], history: "63247e3ec75322f79a6dc1d3" }
            console.log("flag", flag);

            const { data } = await addUserQuiz(flag)


        }
        setIsModalOpen(true);



    }



    const [checkInputLength, setCheckInputLength] = useState<any>([])

    //---ChangeInput---
    // Gán kết quả khi thay đổi giá trị trong input
    const onChangeInput = (e, index) => {
        const val = e.target.value.toLowerCase()
        // console.log("val", val);

        const existingItem = input2.find((item: any) => item.key === index);
        if (!existingItem) {
            input2 = [...input2, { key: index, value: val }]
            check10 = [...check10, { key: index, check: false }]
        } else {
            input2 = input2.map((item: any) => item.key === index ? { key: index, value: val } : item)
        }
        checkInput(index)
        // console.log("input2", input2);
        setCheckInputLength(input2)
    }

    //---CheckInputResult---
    // Kiểm tra kết quả input 
    const checkInput = (flag) => {
        input2.map((item2: any) => {
            quizList[quizIndex]?.answerQuiz.map((item: any, index) => {
                if (index === flag) {
                    if (item.answer.toLowerCase() === item2.value) {
                        check10 = check10.map((item: any) => item.key === flag ? { key: flag, check: true } : item)
                    } else {
                        check10 = check10.map((item: any) => item.key === flag ? { key: flag, check: false } : item)
                    }
                }
            })
        })
        // console.log("check10", check10);
        // console.log("input2.length", input2.length);
        // console.log("quizList[quizIndex].answerQuiz.length", quizList[quizIndex].answerQuiz.length);
        if (input2.length === quizList[quizIndex].answerQuiz.length) {
            let test = check10.every(item => item.check === true)
            // console.log("test", test);
            // console.log("select 0", select);
            // console.log("check2 0", check2);
            if (test === true) {
                setCheck2(true)
                // check2 = true
                // console.log("check2 1", check2);

            } else {
                setCheck2(false)
                // check2 = false
                // console.log("check2 2", check2);

            }


        } else {
            setCheck2(false)
            // check2 = false
            // console.log("check2 2", check2);
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

    //---ReplaceStringInput quiz listen and write ---
    //thay các chuỗi string trong câu hỏi thành input
    const replaceString = (e, b) => {
        let str = e
        b.map((item: any, index) => {
            str = reactStringReplace(str, item.answer, (match, i) => {
                return <input key={index} id={`input${index + 1}`} className={`${item.answer.length <= 5 ? "w-24" : "w-48 "}  border-b-2 border-black focus:outline-none focus:border-[#130ff8]`} type="text" name={`input${index + 1}`}
                    onChange={(e) => {
                        setTimeout(() => {
                            onChangeInput(e, index)
                        }, 300)
                    }}
                />
            });
        })

        return str

    }

    //---TimeLimitCountdown---
    //Đếm ngược thời gian làm 
    let timeCurrent = ""

    const renderer = ({ total, hours, minutes, seconds, milliseconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {

            let tempTime = moment.duration(120000);
            // console.log("minutes", tempTime.minutes());
            // console.log("seconds", tempTime.seconds());
            const total = (1 / (tempTime.minutes() * 60) + tempTime.seconds()) * 100
            const total2 = (1 / (tempTime.minutes() * 60) + tempTime.seconds()) * 1000
            timeLimit = timeLimit - total
            point = point - total2
            if (timeLimit === 0) {
                timeLimit = 100;
            }
            // console.log(`${minutes}:${seconds}`);
            // console.log("total", total);
            // console.log("total2", total2);
            // console.log("timeLimit", timeLimit);
            // console.log("point", point);

            timeCurrent = `${minutes}:${seconds}`

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

    //---ModalResult---
    //Hiện Modal kết quả
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [history, setHistory] = useState<any>([]);
    console.log("history", history);


    const showModal = async () => {
        setIsModalOpen(true);
        // const {data} = await detailHistory()

    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    //---ModelCollapse---
    const onChange = (key: string | string[]) => {
        console.log("ModelCollapse", key);
    };



    useEffect(() => {
        dispatch(getListQuizSlide())
        dispatch(getListAnswerQuizSlide())
        const getQuiz = async () => {
            const { data } = await detailCategory(id)
            console.log(data);
            setQuiz2(data)
            const test = await Promise.all(data?.quizs.map(async (item: any, index) => {
                const { data } = await detailQuiz(item._id)
                // console.log("data", data);
                return data
            }))
            setQuizList(shuffleArray(test))
            const test2 = await Promise.all(data?.history.map(async (item: HistoryType, index) => {
                const { data } = await detailHistory(item._id)
                // console.log("data", data);
                return data
            }))
            setHistory(test2)

            // const flag = test.filter((item: any) => item.quiz.type === 1)
            // const flag2 = test.filter((item: any) => item.quiz.type === 2)
            // const flag3 = test.filter((item: any) => item.quiz.type === 3)
            // setListenQuiz(flag)
            // setSelectQuiz(flag2)
            // setWriteQuiz(flag3)
        }
        getQuiz()
    }, [id])

    return (
        <div>

            <div>
                <section className="w-10/12 mx-auto">
                    <div className="md:mt-[10px] mt-[10px] flex gap-4">
                        <div>
                            <a className='return__learning'>
                                <i className="fa-solid fa-xmark"></i>
                            </a>
                        </div>

                        <Progress
                            strokeColor={{
                                from: '#108ee9',
                                to: '#87d068',
                            }}
                            percent={percent}
                            status="active"
                            className="!mt-[3px] !h-4 !text-white "
                            showInfo={false}
                        />




                    </div>
                    <Countdown
                        date={Date.now() + 120000}

                        renderer={renderer}
                    />



                </section>

                <div className="">
                    {quizList ?
                        quizList[quizIndex]?.quiz?.type === 1 ?
                            <>
                                <motion.section
                                    className="w-8/12 mx-auto"

                                >
                                    <div className="md:mt-[10px]">
                                        <h1 className="font-bold text-[20px]">Nghe và chọn đáp án đúng</h1>
                                        <div className="relative flex">
                                            <div className="w-[160px] md:w-[140px] ">
                                                <img src={quizList[quizIndex]?.quiz?.image} />
                                            </div>
                                            <div className="absolute md:left-[150px] left-[120px] w-[50px] md:w-[100px] btn__radio__quiz">
                                                <button onClick={() => speak({ text: quizList[quizIndex]?.quiz?.question, voice: voices[0] })}>
                                                    <img src="../../../../assets/image/Group 103.png" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.section>

                                <section className="md:w-5/12 w-9/12 mx-auto md:py-[10px] ">
                                    <div className="items-center">
                                        {quizList[quizIndex]?.answerQuiz?.map((item2: any, index) => {
                                            return <div key={index + 1} className="choose__answer__quiz" onClick={() => {
                                                if (check !== true) {
                                                    setSelect({ id: item2._id, isCorrect: item2.isCorrect })
                                                    // setCheck2(select?.isCorrect === 1 ? true : false)
                                                    setCheck(false)
                                                }
                                                console.log("select", select);
                                                console.log("check2", check2);
                                            }}>
                                                <div className={`py-[10px] border-2 ${item2._id == select?.id
                                                    ? " bg-[#D6EAF8] text-[#5DADE2] border-[#5DADE2]"
                                                    : "border-[#CCCCCC]"} 
                                                    ${check === true
                                                        ? item2._id == select?.id
                                                            ? select?.isCorrect === 1
                                                                ? "bg-[#D6EAF8] border-[#5DADE2] "
                                                                : "bg-[#F9EBEA] !border-[#C0392B] !text-[#C0392B]"
                                                            : ""
                                                        : ""} text-center rounded-md shadow-xl relative cursor-pointer `
                                                }>

                                                    <p className="my-auto text-xl font-bold">{item2.answer}</p>
                                                    <div className="px-[10px] py-[2px] border-2 border-[#CCCCCC] text-center rounded-2xl absolute bottom-[5px] left-[15px]">
                                                        <span className="text-xl font-bold">{index + 1}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        })}





                                    </div>

                                </section>
                            </>
                            : quizList[quizIndex]?.quiz?.type === 2 ?
                                <section className="w-10/12 mx-auto">
                                    <div className="">
                                        <h1 className="font-bold text-[32px]">{quizList[quizIndex].quiz.question} ?</h1>
                                        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-12 gap-4 text-center justify-items-between py-[20px]">
                                            {quizList[quizIndex].answerQuiz.map((item, index) => {
                                                return <div key={index + 1}
                                                    className={`border-2 ${item._id == select?.id
                                                        ? " border-[#5DADE2] bg-[#D6EAF8] text-[#2E86C1]"
                                                        : "border-[#CCCCCC]"} 
                                                        ${check === true
                                                            ? item._id == select?.id
                                                                ? select?.isCorrect === 1
                                                                    ? "bg-[#D6EAF8] border-[#5DADE2] "
                                                                    : "bg-[#F9EBEA] !border-[#C0392B] !text-[#C0392B]"
                                                                : ""
                                                            : ""} shadow-lg  mx-auto py-[20px] cursor-pointer rounded-xl `
                                                    }
                                                    onClick={() => {
                                                        if (check !== true) {
                                                            setSelect({ id: item._id, isCorrect: item.isCorrect })
                                                            // setCheck2(select?.isCorrect === 1 ? true : false)
                                                            setCheck(false)
                                                        }
                                                        console.log("select", select);
                                                        console.log("check2", check2);
                                                    }}
                                                >
                                                    <div className="py-[40px]">
                                                        <img src={`../../../../assets/image/water.png`} />
                                                    </div>
                                                    <div>
                                                        <span className="text-xl font-bold">{index + 1}. {item.answer}</span>
                                                    </div>
                                                </div>
                                            })}

                                        </div>

                                    </div>
                                </section>
                                : quizList[quizIndex]?.quiz?.type === 3 ?
                                    <section className="w-10/12 mx-auto">
                                        <div className="">
                                            <h1 className="font-bold text-[32px]">Điền từ còn thiếu</h1>
                                            <div className="grid-cols-3 gap-12 md:grid">
                                                <div className="flex">
                                                    <div>
                                                        {/* <img src="../../../../assets/image/image 35.png" /> */}
                                                        <img src={quizList[quizIndex]?.quiz?.image} />
                                                    </div>
                                                    <div className='btn__radio__quiz'>

                                                        <button onClick={() => speak({ text: quizList[quizIndex]?.quiz?.question, voice: voices[1] })}>
                                                            <img src="../../../../assets/image/Group 103.png" className="w-[136px]" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="col-span-2 mt-[120px]">
                                                    <div className="md:py-[20px] py-[10px] border-2 border-[#CCCCCC] text-center rounded-md shadow-xl relative cursor-pointer">
                                                        <p className="text-xl font-bold">
                                                            {quizList[quizIndex]?.quiz?.question}

                                                            {replaceString(quizList[quizIndex]?.quiz?.question, quizList[quizIndex]?.answerQuiz)}


                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </section>

                                    : ""


                        : ""}



                    <div className="md:w-5/12 w-9/12 mx-auto md:py-[30px]" >
                        <button
                            // disabled={select === null && input2.length === 0 ? true : false}
                            className={`${check === true
                                ? select?.isCorrect === 1 || check2 === true
                                    ? "bg-[#D6EAF8] text-[#5DADE2] border-[#5DADE2] "
                                    : "bg-[#C0392B] text-white"
                                : "hover:bg-gray-100 "}  
                                border-2 border-[#CCCCCC] px-[30px] py-[5px] font-bold text-lg rounded-md float-right cursor-pointer transition duration-700`} onClick={() => {
                                setCheck(true)
                                increase()


                                // console.log("finishTime", finishTime);
                                // console.log("finishPoint", finishPoint);
                                console.log("timeCurrent", timeCurrent);
                                console.log("point", point);
                                console.log("select 2", select);
                                console.log("input2", input2);

                                console.log("result 2", result);

                                console.log("quizList[quizIndex]", quizList[quizIndex]);

                                if (select !== null) {
                                    setResult([...result, {
                                        quiz: quizList[quizIndex].quiz._id,
                                        answerQuiz: select.id,
                                        time: timeCurrent,
                                        point: Math.round(point)
                                    }])
                                } else {
                                    setResult([...result, {
                                        quiz: quizList[quizIndex].quiz._id,
                                        answerQuiz: "62d413d7d0d91b0f41800bde",
                                        time: timeCurrent,
                                        point: Math.round(point)
                                    }])
                                }


                                if (checkInputLength?.length === 0) {
                                    setCheck2(false)
                                    // check2 = false
                                    // console.log("setCheck2(false)", check2);

                                }


                                // console.log("setCheck2(false) check2", check2);
                                // console.log("setCheck2(false) check", check);
                                // select.isCorrect === 1 ? audioCorrect.play() : audioWrong.play()
                                // audioCorrect.play()
                                check2 === true ? audioCorrect.play() : audioWrong.play()
                            }}>
                            Kiểm tra

                        </button>
                    </div>



                    {check === true && select?.isCorrect === 1 || check === true && check2 === true && select === null
                        ? <section className='mt-[30px]'>
                            <div className="md:w-5/12 w-9/12 mx-auto md:py-[30px]">
                                <div className="bg-[#D6EAF8] border-[#5DADE2]  px-[15px] py-[10px] rounded-md">
                                    <p className="text-[#2E86C1] font-bold py-[10px]">Câu trả lời chính xác</p>
                                    <button onClick={onContinute} className="text-white w-full py-[10px] rounded-md bg-[#5DADE2] mb-[20px] font-bold">
                                        Tiếp tục
                                    </button>
                                </div>
                            </div>
                        </section>
                        : ""}


                    {check === true && select?.isCorrect === 0 || check === true && check2 === false && select === null
                        ? <section className='mt-[30px]'>
                            <div className="md:w-5/12 w-9/12 mx-auto md:py-[30px]">
                                <div className="bg-[#F9EBEA]  px-[15px] py-[10px] rounded-md">
                                    <p className=" py-[10px] text-[#C0392B] font-bold">Đó chưa phải đáp án đúng</p>
                                    <button onClick={onContinute} className="text-white w-full py-[10px] rounded-md bg-[#C0392B] mb-[20px] font-bold">
                                        Tiếp tục
                                    </button>
                                </div>
                            </div>
                        </section>
                        : ""}

                    {done === true
                        ? <section className='mt-[30px]'>
                            <div className="md:w-5/12 w-9/12 mx-auto md:py-[30px]">
                                <div className="bg-[#F9EBEA]  px-[15px] py-[10px] rounded-md">
                                    <p className=" py-[10px] text-[#C0392B] font-bold">Chúc Mừng Bạn đã hoàn thành !</p>
                                    <button onClick={onFinish} className="text-white w-full py-[10px] rounded-md bg-[#C0392B] mb-[20px] font-bold">
                                        Xem Kết Quả
                                    </button>
                                </div>
                            </div>
                        </section>
                        : ""}
                </div>

                <Button type="primary" onClick={showModal}>
                    Open Modal
                </Button>

                <Modal title="Basic Modal" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Collapse defaultActiveKey={['1']} onChange={onChange}>

                        {history?.map((item: any, index: number) => {
                            return <Panel
                                showArrow={false}
                                header={
                                    <div key={index + 1} className="flex flex-row gap-4">
                                        <div className="">{moment(item.createdAt).format("h:mm:ss a, MMM Do YYYY")}</div>
                                        <div className="">{item.category?.title}</div>
                                        <div className="">00</div>
                                        <div className="">Pass</div>
                                    </div>
                                }
                                key={index+1}
                            >
                                {item.userQuiz.map((item2: any, index: number) => {
                                    return <div key={index + 1} className="flex flex-row gap-4">
                                        <div className="">test</div>
                                        <div className="">{item2.answerQuiz.answer }</div>
                                        <div className="">{item2.time }</div>
                                        <div className="">{Math.round(item2.point) }</div>
                                    </div>
                                })}
                            </Panel>
                        })}

                    </Collapse>
                </Modal>


            </div>

        </div>
    )
}

export default ExeQuiz


