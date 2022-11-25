import React, { useContext, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useSpeechSynthesis } from 'react-speech-kit';

type QuizType2Props = {
  data: any,
  check: boolean,
  select: any,
  onHanldeSetSelect: (select: any, check: boolean) => void
}

const QuizType2 = ({ data, check, select, onHanldeSetSelect }: QuizType2Props) => {

  const { cancel, speak, speaking, supported, voices, pause, resume } = useSpeechSynthesis();
  const transcript = useAppSelector(item => item.googleSpeech.transcript)
  const dispatch = useAppDispatch()
  const onHandleSpeakSelect = () => {
    if (data.answer.replace(',', '').replace('.', '').toLowerCase().trim() === transcript.toLowerCase().trim()) {
      onHanldeSetSelect({ id: data._id, isCorrect: data.isCorrect }, check)
    }
  }
  useEffect(() => {
    onHandleSpeakSelect()
  }, [transcript])

  return (
    <div onClick={() => speak({ text: data.answer, voice: voices[1] })}>
      <div className={`border-2 list__question__item ${data._id == select?.id
        ? " border-[#5DADE2] bg-[#D6EAF8] text-[#2E86C1]"
        : "border-[#CCCCCC]"} 
                                                    ${check === true
          ? data._id == select?.id
            ? select?.isCorrect === true
              ? "bg-[#D6EAF8] border-[#5DADE2] "
              : "bg-[#F9EBEA] !border-[#C0392B] !text-[#C0392B]"
            : ""
          : ""} shadow-lg  mx-auto py-[20px] cursor-pointer rounded-xl w-full flex flex-col `
      }
        onClick={() => {
          if (check !== true) {
            onHanldeSetSelect({ id: data._id, isCorrect: data.isCorrect }, check)
          }
        }}
      >
        <div className="self-center img__result__question__item">
          <img src={`${data.image}`} />
        </div>
        <div className="self-center block w-full text-center title__result__question__item">
          <span className="block text-base font-bold">{data.answer}</span>
        </div>
      </div>
    </div>

  )
}

export default QuizType2