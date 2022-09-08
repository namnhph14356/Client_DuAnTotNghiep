/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit';
import Footer from '../Component/Footer';
import HeaderComponent from '../Component/HeaderHome';


const ExeQuiz = () => {

    const [value, setValue] = useState(['Dog', "You"]);
    const [select, setSelect] = useState<number>()
    const [select2, setSelect2] = useState<number>()
    const [select3, setSelect3] = useState<number>()
    const [check, setCheck] = useState(false)
    const [check2, setCheck2] = useState(false)
    const [check3, setCheck3] = useState(false)
    const [input, setInput] = useState("")
    const audioCorrect = new Audio("../audio/Quiz-correct-sound-with-applause.mp3")
    const audioWrong = new Audio("../audio/Fail-sound-effect-2.mp3")
    const { cancel, speak, speaking, supported, voices, pause, resume } = useSpeechSynthesis();

    const quizs = [
        {
            id: 1,
            question: "Dog",
            correctAnswer: 2
        },
        {
            id: 2,
            question: "Rice",
            correctAnswer: 2
        },
        {
            id: 3,
            question: "How Are",
            correctAnswer: 2
        },
    ]
    const questions = [
        { id: 1, answer: "Cat" },
        { id: 2, answer: "Dog" },
        { id: 3, answer: "Cow" }
    ]
    const questions2 = [
        { id: 1, answer: "Water", image: "../image/water.png" },
        { id: 2, answer: "Rice", image: "../image/image 11 (2).png" },
        { id: 3, answer: "Chopstick", image: "../image/image 11 (2).png" },
        { id: 4, answer: "Milk", image: "../image/image 11 (1).png" }
    ]
    const questions3 = [
        { id: 1, answer: "He" },
        { id: 2, answer: "You" },
        { id: 3, answer: "She" }
    ]
    const test = questions3.filter(item => item.id === quizs[2].correctAnswer)
    console.log("test", test[0].answer);


    function onChangeInput(e) {
        const val = e.target.value.toLowerCase()

        setInput(val)
        setCheck3(false)
        console.log(input);

    }

    return (

        <div>
            <HeaderComponent />
            <div className='main__quiz__topic'>
                <div className="desc__title__cocabulary">
                    <h2>
                        Câu hỏi thông dụng <span>


                            /   tên Chủ đề 1
                        </span>
                    </h2>

                    <div className='count__question__vocabulary'>
                        <h4 >
                            câu số <span>2</span> / <span>4</span>
                        </h4>
                    </div>
                </div>
                {/* <section className="w-10/12 mx-auto">
                    <div className="md:mt-[10px] mt-[10px] flex">
                        <div>
                            <a className='return__learning'>
                                <i className="fa-solid fa-xmark"></i>
                            </a>
                        </div>
                        <div className='point__quiz'>
                        <span></span>
                        </div>
                    </div>
                </section> */}

                <section className="">
                    <div className="box__question__quiz">
                        <div className="box__header__topic">
                            <button className='btn__volume__vocabulary'>
                                <i className="fa-solid fa-volume-high"></i>
                            </button>
                            <h3 className="vocabulary__speaking">
                                Can i have you?
                            </h3>

                        </div>

                    </div>

                    <div className="items-center">
                        {questions?.map((item, index) => {
                            return <div key={index + 1} className="choose__answer__quiz" onClick={() => {

                                setSelect(item.id)
                                setCheck(false)


                                console.log(select);
                            }} >
                                {/* <div className={item.id == select ? "py-[10px] border-2 border-[#130ff8] text-center rounded-md shadow-xl relative cursor-pointer hover:bg-gray-100 transition duration-700" : "py-[10px] border-2 border-[#CCCCCC] text-center rounded-md shadow-xl relative cursor-pointer hover:bg-gray-100 transition duration-700"}>
                                    <p className="font-bold text-xl my-auto">{item.answer}</p>
                                    <div className="px-[10px] py-[2px] border-2 border-[#CCCCCC] text-center rounded-2xl absolute bottom-[5px] left-[15px]">
                                        <span className="font-bold text-xl">{index + 1}{item.id}</span>
                                    </div>
                                </div> */}
                                <div className={`py-[10px] border-2 ${item.id == select ? " bg-[#D6EAF8] text-[#5DADE2] border-[#5DADE2]" : "border-[#CCCCCC]"} ${check === true ? item.id == select ? select === quizs[0].correctAnswer ? "bg-[#D6EAF8] border-[#5DADE2] " : "bg-[#F9EBEA] border-[#C0392B] text-[#C0392B]" : "" : ""} text-center rounded-md shadow-xl relative cursor-pointer `}>
                                    <p className="font-bold text-xl my-auto">{item.answer}</p>
                                    <div className="px-[10px] py-[2px] border-2 border-[#CCCCCC] text-center rounded-2xl absolute bottom-[5px] left-[15px]">
                                        <span className="font-bold text-xl">{index + 1}</span>
                                    </div>
                                </div>
                            </div>
                        })}
                        <div className='flex'>
                            <div>
                                {/* <button className='btn__next__question'>
                                Tiếp tục
                            </button> */}
                                <button className={`${check === true ? select === quizs[0].correctAnswer ? "bg-[#D6EAF8] text-[#5DADE2] border-[#5DADE2] " : "bg-[#C0392B] text-white" : "hover:bg-gray-100 "}  border-2 border-[#CCCCCC] px-[30px] py-[5px] font-bold text-lg rounded-md float-right cursor-pointer transition duration-700`} onClick={() => {
                                    setCheck(true)
                                    select === quizs[0].correctAnswer ? audioCorrect.play() : audioWrong.play()
                                }}>
                                    Kiểm tra
                                </button>
                            </div>

                            <div>


                                <div className="box__result__check__quiz">
                                    <p className=" ">Câu trả lời chính xác</p>
                                    <button className="">Tiếp tục</button>
                                </div>


                            </div>
                        </div>


                        {/* {check === true && select === quizs[0].correctAnswer
                            ? <section className=''>
                                <div className="md:w-10/12 w-9/12 mx-auto md:py-[30px]">
                                    <div className="bg-[#D6EAF8] border-[#5DADE2]  px-[15px] py-[10px] rounded-md">
                                        <p className="text-[#2E86C1] font-bold py-[10px]">Câu trả lời chính xác</p>
                                        <button className="text-white w-full py-[10px] rounded-md bg-[#5DADE2] mb-[20px] font-bold">Tiếp tục</button>
                                    </div>
                                </div>
                            </section>
                            : ""}
                        {check === true && select !== quizs[0].correctAnswer
                            ? <section className=''>
                                <div className="md:w-10/12 w-9/12 mx-auto md:py-[30px]">
                                    <div className="bg-[#F9EBEA]  px-[15px] py-[10px] rounded-md">
                                        <p className=" py-[10px] text-[#C0392B] font-bold">Đó chưa phải đáp án đúng</p>
                                        <button className="text-white w-full py-[10px] rounded-md bg-[#C0392B] mb-[20px] font-bold">Tiếp tục</button>
                                    </div>
                                </div>
                            </section>
                            : ""} */}

                    </div>



                </section>







            </div>


        </div>
    )
}

export default ExeQuiz

function onChangeInput(input: string) {
    throw new Error('Function not implemented.');
}
