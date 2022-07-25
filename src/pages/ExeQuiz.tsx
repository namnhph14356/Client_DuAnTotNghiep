/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit';


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
            <div>
                <section className="w-10/12 mx-auto">
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
                </section>

                <section className="w-8/12 mx-auto">
                    <div className="md:mt-[10px]">
                        <h1 className="font-bold text-[20px]">Nghe và chọn đáp án đúng</h1>
                        <div className="flex relative">
                            <div className="w-[160px] md:w-[140px] ">
                                <img src="../image/image 22.png" />
                            </div>
                            <div className="absolute md:left-[150px] left-[120px] w-[50px] md:w-[100px] btn__radio__quiz">
                                <button onClick={() => speak({ text: value[0], voice: voices[0] })}>
                                    <img src="../image/Group 103.png" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="md:w-5/12 w-9/12 mx-auto md:py-[10px] ">
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



                    </div>
                    <div>
                        <button className={`${check === true ? select === quizs[0].correctAnswer ? "bg-[#D6EAF8] text-[#5DADE2] border-[#5DADE2] " : "bg-[#C0392B] text-white" : "hover:bg-gray-100 "}  border-2 border-[#CCCCCC] px-[30px] py-[5px] font-bold text-lg rounded-md float-right cursor-pointer transition duration-700`} onClick={() => {
                            setCheck(true)
                            select === quizs[0].correctAnswer ? audioCorrect.play() : audioWrong.play()
                        }}>
                            Kiểm tra
                        </button>
                    </div>
                </section>
                {check === true && select === quizs[0].correctAnswer
                    ? <section className='mt-[30px]'>
                        <div className="md:w-5/12 w-9/12 mx-auto md:py-[30px]">
                            <div className="bg-[#D6EAF8] border-[#5DADE2]  px-[15px] py-[10px] rounded-md">
                                <p className="text-[#2E86C1] font-bold py-[10px]">Câu trả lời chính xác</p>
                                <button className="text-white w-full py-[10px] rounded-md bg-[#5DADE2] mb-[20px] font-bold">Tiếp tục</button>
                            </div>
                        </div>
                    </section>
                    : ""}
                {check === true && select !== quizs[0].correctAnswer
                    ? <section className='mt-[30px]'>
                        <div className="md:w-5/12 w-9/12 mx-auto md:py-[30px]">
                            <div className="bg-[#F9EBEA]  px-[15px] py-[10px] rounded-md">
                                <p className=" py-[10px] text-[#C0392B] font-bold">Đó chưa phải đáp án đúng</p>
                                <button className="text-white w-full py-[10px] rounded-md bg-[#C0392B] mb-[20px] font-bold">Tiếp tục</button>
                            </div>
                        </div>
                    </section>
                    : ""}



                {/* <section className="md:w-7/12 w-9/12 mx-auto py-[107px]">
                    <div className="items-center">
                        <div className="my-[58px]">
                            <div className="py-[20px] border-2 border-[#CCCCCC] bg-[#76D7C4] text-center rounded-md shadow-xl relative cursor-pointer">
                                <p className="font-bold text-xl">Dog</p>
                                <div className="px-[20px] py-[5px] border-2 bg-[#fff] border-[#CCCCCC] text-center rounded-2xl absolute bottom-[15px] left-[15px]">
                                    <span className="font-bold text-xl">1</span>
                                </div>
                            </div>
                        </div>
                        <div className="my-[58px]">
                            <div className="py-[20px] border-2 border-[#CCCCCC] text-center rounded-md shadow-xl relative cursor-pointer">
                                <p className="font-bold text-xl">Cat</p>
                                <div className="px-[20px] py-[5px] border-2 border-[#CCCCCC] text-center rounded-2xl absolute bottom-[15px] left-[15px]">
                                    <span className="font-bold text-xl">2</span>
                                </div>
                            </div>
                        </div>
                        <div className="my-[58px]">
                            <div className="py-[20px] border-2 border-[#CCCCCC] text-center rounded-md shadow-xl relative cursor-pointer">
                                <p className="font-bold text-xl">Bird</p>
                                <div className="px-[20px] py-[5px] border-2 border-[#CCCCCC] text-center rounded-2xl absolute bottom-[15px] left-[15px]">
                                    <span className="font-bold text-xl">3</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="border-2 border-[#CCCCCC] px-[30px] py-[15px] font-bold text-lg rounded-md float-right cursor-pointer bg-[#138D75]">Kiểm
                            tra</button>
                    </div>
                </section>
                <section>
                    <div className="md:w-7/12 w-9/12 mx-auto">
                        <div className="bg-[#76D7C4] px-[15px] py-[10px] rounded-md">
                            <p className="text-white font-bold py-[10px]">Câu trả lời chính xác</p>
                            <button className="text-white w-full py-[10px] rounded-md bg-[#138D75] mb-[20px] font-bold">Tiếp tục</button>
                        </div>
                    </div>
                </section>

                <section className="md:w-7/12 w-9/12 mx-auto py-[107px]">
                    <div className="items-center">
                        <div className="my-[58px]">
                            <div className="py-[20px] border-2 border-[#CCCCCC] text-center rounded-md shadow-xl relative cursor-pointer">
                                <p className="font-bold text-xl">Dog</p>
                                <div className="px-[20px] py-[5px] border-2 bg-[#fff] border-[#CCCCCC] text-center rounded-2xl absolute bottom-[15px] left-[15px]">
                                    <span className="font-bold text-xl">1</span>
                                </div>
                            </div>
                        </div>
                        <div className="my-[58px]">
                            <div className="py-[20px] border-2 border-[#CCCCCC] bg-[#FFDFE0] text-center rounded-md shadow-xl relative cursor-pointer">
                                <p className="font-bold text-xl">Cat</p>
                                <div className="px-[20px] py-[5px] bg-[#fff] border-2 border-[#CCCCCC] text-center rounded-2xl absolute bottom-[15px] left-[15px]">
                                    <span className="font-bold text-xl">2</span>
                                </div>
                            </div>
                        </div>
                        <div className="my-[58px]">
                            <div className="py-[20px] border-2 border-[#CCCCCC] text-center rounded-md shadow-xl relative cursor-pointer">
                                <p className="font-bold text-xl">Bird</p>
                                <div className="px-[20px] py-[5px] border-2 border-[#CCCCCC] text-center rounded-2xl absolute bottom-[15px] left-[15px]">
                                    <span className="font-bold text-xl">3</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="border-2 border-[#CCCCCC] px-[30px] py-[15px] font-bold text-lg rounded-md float-right cursor-pointer bg-[#C0392B]">Kiểm
                            tra</button>
                    </div>
                </section>
                <section>
                    <div className="md:w-7/12 w-9/12 mx-auto">
                        <div className="bg-[#FFDFE0] px-[15px] py-[10px] rounded-md">
                            <p className=" py-[10px] font-bold">Đó chưa phải đáp án đúng</p>
                            <button className="text-white w-full py-[10px] rounded-md bg-[#C0392B] mb-[20px] font-bold">Tiếp tục</button>
                        </div>
                    </div>
                </section> */}


                <section className="w-10/12 mx-auto">
                    <div className="mt-[200px]">
                        <h1 className="font-bold text-[32px]">Đâu là Cơm ?</h1>
                        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-12 gap-4 text-center justify-items-between py-[20px]">
                            {questions2?.map((item, index) => {
                                return <div key={index + 1} className={`${select2 == item.id ? "border-2 border-[#5DADE2] bg-[#D6EAF8] text-[#2E86C1] " : ""} ${check2 === true ? item.id == select2 ? select2 === quizs[1].correctAnswer ? "bg-[#D6EAF8] " : "bg-[#F9EBEA] border-[#C0392B] text-[#C0392B]" : "" : ""}  shadow-lg  mx-auto py-[20px] cursor-pointer rounded-xl `}
                                    onClick={() => {
                                        setSelect2(item.id)
                                        setCheck2(false)
                                        console.log(select2);
                                    }}
                                >
                                    <div className="py-[40px]">
                                        <img src={item.image} />
                                    </div>
                                    <div>
                                        <span className="font-bold text-xl">{index + 1}. {item.answer}</span>
                                    </div>
                                </div>
                            })}

                        </div>
                        <div className="my-[50px]">
                            <button className={`${check2 === true ? select2 === quizs[1].correctAnswer ? "bg-[#D6EAF8]  text-[#2E86C1] border-[#2E86C1] " : "bg-[#C0392B] text-white border-[#C0392B]" : " "} border-2 border-[#CCCCCC] px-[30px] py-[5px] font-bold text-lg rounded-md float-right shadow-xl  transition duration-500`} onClick={() => {
                                setCheck2(true)
                                select2 === quizs[1].correctAnswer ? audioCorrect.play() : audioWrong.play()
                            }}>
                                Kiểm tra
                            </button>
                        </div>
                    </div>
                </section>

                {check2 === true && select2 === quizs[1].correctAnswer
                    ? <section className='mt-[30px]'>
                        <div className="md:w-5/12 w-9/12 mx-auto md:py-[30px]">
                            <div className="bg-[#D6EAF8] px-[15px] py-[10px] rounded-md">
                                <p className="text-[#2E86C1] font-bold py-[10px]">Câu trả lời chính xác</p>
                                <button className="text-white w-full py-[10px] rounded-md bg-[#2E86C1] mb-[20px] font-bold">Tiếp tục</button>
                            </div>
                        </div>
                    </section>
                    : ""}
                {check2 === true && select2 !== quizs[1].correctAnswer
                    ? <section className='mt-[30px]'>
                        <div className="md:w-5/12 w-9/12 mx-auto md:py-[30px]">
                            <div className="bg-[#F9EBEA]   px-[15px] py-[10px] rounded-md">
                                <p className=" py-[10px] text-[#C0392B] font-bold">Đó chưa phải đáp án đúng</p>
                                <button className="text-white w-full py-[10px] rounded-md bg-[#C0392B]  mb-[20px] font-bold">Tiếp tục</button>
                            </div>
                        </div>
                    </section>
                    : ""}


                <section className="w-10/12 mx-auto">
                    <div className="mt-[334px]">
                        <h1 className="font-bold text-[32px]">Điền từ còn thiếu</h1>
                        <div className="md:grid grid-cols-3 gap-12">
                            <div className="flex">
                                <div>
                                    <img src="../image/image 35.png" />
                                </div>
                                <div className='btn__radio__quiz'>

                                    <button onClick={() => speak({ text: value[1], voice: voices[1] })}>
                                        <img src="../image/Group 103.png" className="w-[136px]" />
                                    </button>
                                </div>
                            </div>
                            <div className="col-span-2 mt-[120px]">
                                <div className="md:py-[20px] py-[10px] border-2 border-[#CCCCCC] text-center rounded-md shadow-xl relative cursor-pointer">
                                    <p className="font-bold text-xl">{quizs[2].question} <span className="font-bold text-xl  "><input className='border-b-2 border-black focus:outline-none focus:border-[#130ff8]  ' type="text" name="value" onChange={(e) => { onChangeInput(e) }} /></span> ? </p>
                                </div>
                            </div>
                        </div>
                        <div className="my-[50px]">
                            <button className={`${check3 === true ? input === questions3.filter(item => item.id === quizs[2].correctAnswer)[0].answer.toLowerCase() ? "bg-[#D6EAF8]  text-[#2E86C1] border-[#2E86C1]" : "bg-[#C0392B] text-white border-[#C0392B]" : " hover:bg-gray-100"} border-2 border-[#CCCCCC] px-[30px] py-[5px] font-bold text-lg rounded-md float-right shadow-xl transition duration-700`} onClick={() => {
                                setCheck3(true)
                                input === questions3.filter(item => item.id === quizs[2].correctAnswer)[0].answer.toLowerCase() ? audioCorrect.play() : audioWrong.play()
                            }} >
                                Kiểm tra
                            </button>
                        </div>
                    </div>
                </section>

                {check3 === true && input === questions3.filter(item => item.id === quizs[2].correctAnswer)[0].answer.toLowerCase()
                    ? <section className='mt-[30px]'>
                        <div className="md:w-5/12 w-9/12 mx-auto md:py-[30px]">
                            <div className="bg-[#D6EAF8] px-[15px] py-[10px] rounded-md">
                                <p className="text-[#2E86C1] font-bold py-[10px]">Câu trả lời chính xác</p>
                                <button className="text-white w-full py-[10px] rounded-md bg-[#2E86C1] mb-[20px] font-bold">Tiếp tục</button>
                            </div>
                        </div>
                    </section>
                    : ""}
                {check3 === true && input !== questions3.filter(item => item.id === quizs[2].correctAnswer)[0].answer.toLowerCase()
                    ? <section className='mt-[30px]'>
                        <div className="md:w-5/12 w-9/12 mx-auto md:py-[30px]">
                            <div className="bg-[#F9EBEA] px-[15px] py-[10px] rounded-md">
                                <p className=" py-[10px] text-[#C0392B]  font-bold">Đó chưa phải đáp án đúng</p>
                                <button className="text-white w-full py-[10px] rounded-md bg-[#C0392B] mb-[20px] font-bold">Tiếp tục</button>
                            </div>
                        </div>
                    </section>
                    : ""}

            </div>

        </div>
    )
}

export default ExeQuiz

function onChangeInput(input: string) {
    throw new Error('Function not implemented.');
}
