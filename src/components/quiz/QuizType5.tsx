import React, { useContext, useEffect, useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit';
import { SpeechContext } from '../../context/GoogleSpeechContext';

type QuizType5Props = {
    question: string,
    data: any,
    check: boolean,
    select: any,
    onHanldeSetSelect: (select: any, check: boolean) => void
}

const QuizType5 = ({question, data, check, select, onHanldeSetSelect }: QuizType5Props) => {
    const [show,setShow]= useState<boolean>(false)
    const { cancel, speak, speaking, supported, voices, pause, resume } = useSpeechSynthesis();
    const { speechValue, onHandleUpdateSpeech, transcript, onHandleUpdateTranscript } = useContext(SpeechContext)
    const onHandleSpeakSelect = () => {

        if (data?.answer?.toLowerCase() === transcript.toLowerCase()) {
            onHanldeSetSelect({ id: data._id, isCorrect: data.isCorrect, type: 5 }, check)

        }
    }
    useEffect(() => {
        onHandleSpeakSelect()
    }, [transcript])

    return (
        <div className="main__content__spaeking">
            {/* <div className="img__question">
                

                <img src="https://i.pinimg.com/564x/23/6e/ad/236eadcccca3d08761bdf336d328ec43.jpg" alt="" />
            </div> */}

            <div className="col-span-5 flex flex-col items-center justify-center gap-2">
                <button className="group " onClick={()=>{setShow(!show)}} >
                    <h3 className={`${show? "text-base":"text-2xl"} m-0 group-hover:text-indigo-600`}>Click để {show? "ẩn": "hiện"} câu</h3>
                </button>

                <span className={`text-center text-2xl font-medium m-0 ${show? "": "hidden"}`}>{question}</span>

                <button className='text-xl' onClick={() => speak({ text: question, voice: voices[2] })}>
                    <span><i className="fa-solid fa-volume-high"></i></span>
                  </button>
            </div>



            <div className="col-span-7">
                <fieldset className="border-t border-b border-gray-200">
                    <legend className="sr-only">Notifications</legend>
                    <div className="divide-y divide-gray-200">

                        {data.map((item2: any, index) => {
                            return <div key={index + 1} className={`relative flex items-start py-4 
                            ${item2._id == select?.id
                                    ? " border-[#5DADE2] bg-[#D6EAF8] text-[#2E86C1]"
                                    : "border-[#CCCCCC]"} 
                                    ${check === true
                                    ? item2._id == select?.id
                                        ? select?.isCorrect === true
                                            ? "bg-[#D6EAF8] border-[#5DADE2] "
                                            : "bg-[#F9EBEA] !border-[#C0392B] !text-[#C0392B]"
                                        : ""
                                    : ""}
                            `}
                                onClick={() => {
                                    if (check !== true) {
                                        onHanldeSetSelect({ id: item2._id, isCorrect: item2.isCorrect, type: 5 }, check)
                                    }
                                }}
                            >
                                <div className="flex items-center h-5 ml-3">
                                    <input type="radio" checked={select?.id === item2._id}
                                        className={`${check === true
                                            ? item2._id == select?.id
                                                ? item2?.isCorrect === true
                                                    ? "accent-[#5DADE2] "
                                                    : "accent-[#C0392B]"
                                                : ""
                                            : ""}`}
                                    />

                                </div>
                                <div className="flex items-center h-5 ml-3"
                                    onClick={() => speak({ text: item2.answer, voice: voices[2] })}
                                >
                                    <i className="mr-3 fa-solid fa-volume-high"></i>

                                </div>
                                <div className="flex-1 min-w-0 text-sm">
                                    <label htmlFor="comments" className="font-medium text-gray-700">
                                        {item2.answer}
                                    </label>
                                </div>

                            </div>
                        })}

                    </div>
                </fieldset>
            </div>

        </div>

    )
}

export default QuizType5