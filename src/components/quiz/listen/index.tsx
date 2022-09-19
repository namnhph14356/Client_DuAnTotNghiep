import React from 'react'

type Props = {}

const QuizListen = (props: Props) => {
    return (
        <div>
            {/* <section className="w-8/12 mx-auto">
                <div className="md:mt-[10px]">
                    <h1 className="font-bold text-[20px]">Nghe và chọn đáp án đúng</h1>
                    <div className="relative flex">
                        <div className="w-[160px] md:w-[140px] ">
                            <img src="../../../image/image 22.png" />
                        </div>
                        <div className="absolute md:left-[150px] left-[120px] w-[50px] md:w-[100px] btn__radio__quiz">
                            <button onClick={() => speak({ text: value[0], voice: voices[0] })}>
                                <img src="../../../image/Group 103.png" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="md:w-5/12 w-9/12 mx-auto md:py-[10px] ">
                <div className="items-center">
                    {quizs2.quizs?.map((item: any, index) => {
                        return <div key={index + 1} className="choose__answer__quiz" onClick={() => {
                            // setSelect(item.id)
                            // setCheck(false)
                            // console.log(select);
                        }}>

                            <div className={`py-[10px] border-2 ${item.id == select ? " bg-[#D6EAF8] text-[#5DADE2] border-[#5DADE2]" : "border-[#CCCCCC]"} ${check === true ? item.id == select ? select === quizs[0].correctAnswer ? "bg-[#D6EAF8] border-[#5DADE2] " : "bg-[#F9EBEA] border-[#C0392B] text-[#C0392B]" : "" : ""} text-center rounded-md shadow-xl relative cursor-pointer `}>
                                <p className="my-auto text-xl font-bold">{item.answer}</p>
                                <div className="px-[10px] py-[2px] border-2 border-[#CCCCCC] text-center rounded-2xl absolute bottom-[5px] left-[15px]">
                                    <span className="text-xl font-bold">{index + 1}</span>
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
                : ""} */}
        </div>
    )
}

export default QuizListen