import React, { useContext, useEffect } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit';
import { SpeechContext } from '../../context/GoogleSpeechContext';

type QuizType1Props = {
    data: any,
    check: boolean,
    select: any,
    onHanldeSetSelect: (select: any, check: boolean) => void
}

const QuizType1 = ({ data, check, select, onHanldeSetSelect }: QuizType1Props) => {
    const { cancel, speak, speaking, supported, voices, pause, resume } = useSpeechSynthesis();
    const { speechValue, onHandleUpdateSpeech, transcript, onHandleUpdateTranscript } = useContext(SpeechContext)
    const onHandleSpeakSelect = ()=>{
        if (data.answer.replace(',', '').toLowerCase().trim() === transcript.toLowerCase().trim()) {
            onHanldeSetSelect({ id: data._id, isCorrect: data.isCorrect },check)
        }
    }
    useEffect(()=>{
        onHandleSpeakSelect()
    },[transcript,speechValue])

    return (
        <div className={`relative flex items-start py-4 
        ${data._id == select?.id
                ? " border-[#5DADE2] bg-[#D6EAF8] text-[#2E86C1]"
                : "border-[#CCCCCC]"} 
                ${check === true
                ? data._id == select?.id
                    ? select?.isCorrect === 1
                        ? "bg-[#D6EAF8] border-[#5DADE2] "
                        : "bg-[#F9EBEA] !border-[#C0392B] !text-[#C0392B]"
                    : ""
                : ""}
        `}
            onClick={() => {
                if (check !== true) {
                    onHanldeSetSelect({ id: data._id, isCorrect: data.isCorrect }, check)
                }
            }}
        >
            <div className="ml-3 flex h-5 items-center"

            >
                <input type="radio" checked={select?.id === data._id}
                    className={`${check === true
                        ? data._id == select?.id
                            ? data?.isCorrect === 1
                                ? "accent-[#5DADE2] "
                                : "accent-[#C0392B]"
                            : ""
                        : ""}`}
                />

            </div>
            <div className="ml-3 flex h-5 items-center"
                onClick={() => speak({ text: data.answer, voice: voices[2] })}
            >
                <i className="fa-solid fa-volume-high mr-3"></i>

            </div>
            <div className="min-w-0 flex-1 text-sm">
                <label htmlFor="comments" className="font-medium text-gray-700">
                    {data.answer}
                </label>
            </div>

        </div>
    )
}

export default QuizType1