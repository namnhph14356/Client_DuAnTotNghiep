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
import QuizType2 from './QuizType2';
import QuizType1 from './QuizType1';
import { detailDay } from '../../api/day';
import { detailPracticeActivity } from '../../api/practiceActivity';
import QuizType3 from './QuizType3';
import QuizType5 from './QuizType5';
import { SpeechContext } from '../../context/GoogleSpeechContext';
import GoogleSpeechSpeaker from '../GoogleSpeech/GoogleSpeechSpeaker';



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

const QuizTypeSelect = () => {

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
    const [percent, setPercent] = useState<number>(0);
    let input2: any = []
    let check10: any = []
    const [quizIndex, setQuizIndex] = useState<number>(0)
    const { id, dayId }: any = useParams()
    const ref = useRef(null)
    const [result, setResult] = useState<any[]>([])
    const [onReset, setOnReset] = useState<boolean>(false)
    const { Panel } = Collapse;

    // kiểm tra đúng sai ghép câu
    const [quizCompound, setQuizCompound] = useState<any>([])


    console.log("speechValue quiz", speechValue);
    console.log("transcript quiz", transcript);
    // console.log("quizList", quizList);
    console.log("select", select)
    console.log("quizCompound", quizCompound)
    console.log("result", result)
    let checkFlag = 0
    let answerType3 = 0
    if (quizList) {
        const flag = quizCompound?.map(u => u.answer).join(' ')
        const checkFlag2 = quizList[quizIndex].quiz.question.toLowerCase().replace("?", "").trim() === flag.toLowerCase() ? 1 : 0
        checkFlag = checkFlag2
        answerType3 = flag

    }
    let arrSelect: any = []
    const onHanldeSetSelect = (data: any, check: boolean) => {
        console.log("data", data)
        if (Array.isArray(data)) {
            setQuizCompound(data)
            console.log("data true", data)
            console.log("quizCompound true", quizCompound)
        } else if(!Array.isArray(data) && data.type === 3){
            
            arrSelect = [...arrSelect,data]
            setQuizCompound(arrSelect)
            console.log("data false", data)
            console.log("arrSelect", arrSelect)
            console.log("quizCompound false", quizCompound)
        } else if (data.type === 5) {
            setSelect(data)
            onCheckType5(data)
            setTimeout(() => {
                onContinute()
            }, 1000)
        } else {
            setSelect(data)
        }
    }


    //---Check---
    // check Đáp án
    const onCheck = () => {
        setCheck(true)
        increase()

        if (checkFlag === 1) {
            setSelect({ isCorrect: 1, type: 3 })
        }
        if (checkFlag === 0 && quizCompound.length !== 0) {
            setSelect({ isCorrect: 0, type: 3 })
        }

        if (select !== null && select.type === undefined) {
            setResult([...result, {
                quiz: quizList[quizIndex].quiz._id,
                answerQuiz: select.id,
                time: flag1,
                point: select.isCorrect ? Math.round(flag2) : 0,
                isCorrect: select.isCorrect
            }])
        } else {
            setResult([...result, {
                quiz: quizList[quizIndex].quiz._id,
                time: flag1,
                point: checkFlag === 1 ? Math.round(flag2) : 0,
                isCorrect: checkFlag,
                answer: answerType3
            }])
        }

        speak({ text: `${select?.isCorrect === 1 || checkFlag === 1 ? "Correct" : "Wrong"}`, voice: voices[2] })
        // select?.isCorrect === 1 ? audioCorrect.play() : audioWrong.play()
    }

    //---Check---
    // check Đáp án
    const onCheckType5 = (data) => {
        setCheck(true)
        increase()
        setResult([...result, {
            quiz: quizList[quizIndex].quiz._id,
            answerQuiz: data.id,
            time: flag1,
            point: data.isCorrect ? Math.round(flag2) : 0,
            isCorrect: data.isCorrect
        }])
        speak({ text: `${data.isCorrect === 1 ? "Correct" : "Wrong"}`, voice: voices[2] })
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
        setQuizCompound([])
        checkFlag = 0
        answerType3 = 0
        if (quizIndex >= quizList.length - 1) {
            setDone(true)
        } else {
            setQuizIndex(quizIndex + 1)
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
            if (item.isCorrect === 1) {
                totalCorrect = totalCorrect + 1
            }
            if (totalCorrect > quizListHalf) {
                pass = 1
            }
        })

        const { data: data2 } = await addHistory({
            user: "62c853c16948a16fbde3b43e",
            learningProgress: "",
            practiceActivity: quiz2.itemPracticeActivity._id,
            totalPoint: totalPoint,
            totalCorrect: totalCorrect,
            result: pass,
            type: 2
        })
        for (let index = 0; index < result.length; index++) {
            const flag = { ...result[index], history: data2._id }
            const { data } = await addUserQuiz(flag)
        }
        const { data } = await detailPracticeActivity(id)
        setQuiz2(data)

        const test2 = await Promise.all(data?.history.map(async (item: HistoryType, index) => {
            const { data } = await detailHistory(item._id)

            return data
        }))
        setHistory(test2)
        setIsModalOpen(true);
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
        const getQuiz = async () => {
            const { data } = await detailPracticeActivity(id)
            setQuiz2(data)
            const test = await Promise.all(data?.quizs.map(async (item: any, index) => {
                const { data } = await detailQuiz(item._id)
                return data
            }))
            setQuizList(shuffleArray(test))
            const test2 = await Promise.all(data?.history.map(async (item: HistoryType, index) => {
                const { data } = await detailHistory(item._id)
                return data
            }))
            setHistory(test2)
        }
        getQuiz()
    }, [id])


    return (
        <>
            <div className=''>
                <div className=''>
                    <div className='content__speaking'>
                        <div className="flex flex-col qustion__content__speaking">

                            <div className="">
                                {/* <Progress
                                    strokeColor={{
                                        from: '#108ee9',
                                        to: '#87d068',
                                    }}
                                    percent={percent}
                                    status="active"
                                    className="!mt-[3px] !h-4 !text-white "
                                    showInfo={false}
                                /> */}

                                <MemoCountdown time={quizList ? quizList[quizIndex].quiz.timeLimit : 40000} reset={onReset} />

                            </div>

                            <div className="flex justify-between items-center ">
                                <div className="flex items-center gap-2">
                                    <h3 className="m-0">
                                        {quizList
                                            ? quizList[quizIndex]?.quiz?.type !== 3
                                                ? quizList[quizIndex]?.quiz?.question + "?"
                                                : ""
                                            : ""
                                        }

                                    </h3>
                                    <button className='' onClick={() => speak({ text: quizList[quizIndex]?.quiz?.question, voice: voices[2] })}>
                                        <span><i className="fa-solid fa-volume-high"></i></span>
                                    </button>
                                </div>
                                <button className=''  >
                                    <GoogleSpeechSpeaker />
                                </button>
                            </div>
                        </div>

                        <div className="p-5 mt-5">
                            {quizList ?
                                quizList[quizIndex]?.quiz?.type === 1
                                    ? <div className="main__content__spaeking">
                                        <div className="img__question">
                                            <img src="https://i.pinimg.com/564x/23/6e/ad/236eadcccca3d08761bdf336d328ec43.jpg" alt="" />
                                        </div>
                                        <div className="choose__question">
                                            <fieldset className="border-t border-b border-gray-200">
                                                <legend className="sr-only">Notifications</legend>
                                                <div className="divide-y divide-gray-200">

                                                    {quizList[quizIndex]?.answerQuiz?.map((item2: any, index) => {
                                                        return <QuizType1 key={index + 1} data={item2} check={check} select={select} onHanldeSetSelect={onHanldeSetSelect} />
                                                    })}

                                                </div>
                                            </fieldset>
                                        </div>

                                    </div>

                                    : quizList[quizIndex]?.quiz?.type === 2
                                        ? <div className="box__question__quiz__item ">
                                            {quizList[quizIndex].answerQuiz.map((item, index) => {
                                                return <QuizType2 key={index + 1} data={item} check={check} select={select} onHanldeSetSelect={onHanldeSetSelect} />
                                            })}
                                        </div>

                                        : quizList[quizIndex]?.quiz?.type === 3
                                            ? <QuizType3 data={quizList[quizIndex].answerQuiz} check={check} quizCompound={quizCompound} select={select} onHanldeSetSelect={onHanldeSetSelect} />
                                            : quizList[quizIndex]?.quiz?.type === 5
                                                ? <QuizType5 data={quizList[quizIndex].answerQuiz} check={check} select={select} onHanldeSetSelect={onHanldeSetSelect} />
                                                : ""
                                : ""
                            }

                            <div className='flex flex-row gap-4'>
                                <div className='md:basis-3/4 '>

                                    {check === true && select?.isCorrect === 1 || check === true && check2 === true && select === null
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



                                    {check === true && select?.isCorrect === 0 || check === true && check2 === false && select === null
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
                                        : ""}

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

                                <div className='mt-8 md:basis-1/4'>
                                    <div className={`answer__question`}>
                                        <button
                                            disabled={select === null && quizCompound === null ? true : false}
                                            className={`${check === true
                                                ? select?.isCorrect === 1 || check2 === true
                                                    ? "!bg-[#D6EAF8] !text-[#5DADE2] !border-[#5DADE2] "
                                                    : "!bg-[#C0392B] !text-white"
                                                : "hover:bg-purple-800 "}  
                                                font-bold text-lg rounded-md float-right cursor-pointer transition duration-700`}
                                            onClick={() => { onCheck() }}
                                        >
                                            Kiểm tra
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Menu />

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

export default QuizTypeSelect