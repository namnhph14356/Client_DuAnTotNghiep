/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';
import AdverDeatil from '../Component/AdverDeatil';
import Footer from '../Component/Footer';
import HeaderComponent from '../Component/HeaderHome';
import NavDeatil from '../Component/NavDeatil';


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
            <div className='box__deatil__learning__main'>
                <NavDeatil />


                <div className='main__topic col-span-7'>
                    <div className='item__quiz__topic'>
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


                                    <div className="box__result__check__quiz">
                                        <p className=" ">Câu trả lời chính xác</p>
                                        <button className="">Tiếp tục</button>
                                    </div>


                                </div>

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









                        <div className="box__list__detail">
                            <ul>
                                <li>
                                    <NavLink style={{ color: '#fff' }} to={'/detailLearning/speak'}> Khởi động
                                        <i className="fa-solid fa-angle-right"></i></NavLink>
                                </li>
                                <li>

                                    <NavLink style={{ color: '#fff' }} to={'/detailLearning/quiz'}> Hỏi và đáp
                                        <i className="fa-solid fa-angle-right"></i></NavLink>
                                </li>
                                <li>

                                    <NavLink style={{ color: '#fff' }} to={'/detailLearning/writeAndListen'}>  Nghe và trả lời
                                        <i className="fa-solid fa-angle-right"></i></NavLink>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className='item__quiz__topic'>
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



                        <div className="box__question__quiz">
                            <div className="box__header__topic">
                                <button className='btn__volume__vocabulary'>
                                    <i className="fa-solid fa-volume-high"></i>
                                </button>
                                <h3 className="vocabulary__speaking">
                                    Đâu là cơm
                                </h3>

                            </div>

                        </div>

                        <div className="items-center">

                            <div className="box__question__quiz__item">

                                <div className="list__question__item">
                                    <div className="img__result__question__item">
                                        <img src="https://i.pinimg.com/564x/32/91/c0/3291c03f733a0a56430609f60081d441.jpg" alt="" />
                                    </div>
                                    <div className="title__result__question__item">
                                        <h3>
                                            1.Water
                                        </h3>
                                    </div>
                                </div>
                                
                                <div className="list__question__item">
                                    <div className="img__result__question__item">
                                        <img src="https://i.pinimg.com/564x/fe/a3/a2/fea3a2d452e2f67d32b0fbaf01e37f73.jpg" alt="" />
                                    </div>
                                    <div className="title__result__question__item">
                                        <h3>
                                            1.Water
                                        </h3>
                                    </div>
                                </div>
                                <div className="list__question__item">
                                    <div className="img__result__question__item">
                                        <img src="https://i.pinimg.com/564x/ec/1f/b8/ec1fb8ec7df0e80be0b0c347a1a7fd35.jpg" alt="" />
                                    </div>
                                    <div className="title__result__question__item">
                                        <h3>
                                            1.Water
                                        </h3>
                                    </div>
                                </div>
                                <div className="list__question__item">
                                    <div className="img__result__question__item">
                                        <img src="https://i.pinimg.com/564x/7d/b2/5d/7db25d593c9d2a0707c3f0363428a66b.jpg" alt="" />
                                    </div>
                                    <div className="title__result__question__item">
                                        <h3>
                                            1.Water
                                        </h3>
                                    </div>
                                </div>
                            </div>


                            <div className='flex'>
                                <div>


                                    <div className="box__result__check__quiz">
                                        <p className=" ">Câu trả lời chính xác</p>
                                        <button className="">Tiếp tục</button>
                                    </div>


                                </div>

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



                            </div>




                        </div>









                        <div className="box__list__detail">
                            <ul>
                                <li>
                                    <NavLink style={{ color: '#fff' }} to={'/detailLearning/speak'}> Khởi động
                                        <i className="fa-solid fa-angle-right"></i></NavLink>
                                </li>
                                <li>

                                    <NavLink style={{ color: '#fff' }} to={'/detailLearning/quiz'}> Hỏi và đáp
                                        <i className="fa-solid fa-angle-right"></i></NavLink>
                                </li>
                                <li>

                                    <NavLink style={{ color: '#fff' }} to={'/detailLearning/writeAndListen'}>  Nghe và trả lời
                                        <i className="fa-solid fa-angle-right"></i></NavLink>
                                </li>
                            </ul>
                        </div>

                    </div>

                    <div className='item__quiz__topic'>
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



                        <div className="box__question__quiz">
                            <div className="box__header__topic">
                                <button className='btn__volume__vocabulary'>
                                    <i className="fa-solid fa-volume-high"></i>
                                </button>
                                <h3 className="vocabulary__speaking">
                                    what are you doing here ?
                                </h3>

                            </div>

                        </div>

                        <div className="items-center">

                            <div className="box__item__chosse__question">
                                <div className="shelf__result__question__item">
                                </div>
                                <div className="btn__choose__result">
                                    <div className="item__btn__choose">
                                        <button>
                                            làm gì
                                        </button>
                                    </div>
                                    <div className="item__btn__choose">
                                        <button>
                                            bạn
                                        </button>
                                    </div>
                                    <div className="item__btn__choose">
                                        <button>
                                            ở đây
                                        </button>
                                    </div>
                                    <div className="item__btn__choose">
                                        <button>
                                            đang
                                        </button>
                                    </div>


                                </div>

                            </div>

                            <div className='flex'>
                                <div>


                                    <div className="box__result__check__quiz">
                                        <p className=" ">Câu trả lời chính xác</p>
                                        <button className="">Tiếp tục</button>
                                    </div>


                                </div>

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



                            </div>




                        </div>









                        <div className="box__list__detail">
                            <ul>
                                <li>
                                    <NavLink style={{ color: '#fff' }} to={'/detailLearning/speak'}> Khởi động
                                        <i className="fa-solid fa-angle-right"></i></NavLink>
                                </li>
                                <li>

                                    <NavLink style={{ color: '#fff' }} to={'/detailLearning/quiz'}> Hỏi và đáp
                                        <i className="fa-solid fa-angle-right"></i></NavLink>
                                </li>
                                <li>

                                    <NavLink style={{ color: '#fff' }} to={'/detailLearning/writeAndListen'}>  Nghe và trả lời
                                        <i className="fa-solid fa-angle-right"></i></NavLink>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                <AdverDeatil />
            </div>




        </div>
    )
}

export default ExeQuiz


