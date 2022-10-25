import React, { useContext, useEffect, useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit';
import { SpeechContext } from '../../context/GoogleSpeechContext';

type QuizType3Props = {
  data: any,
  check: boolean,
  select: any,
  quizCompound: any,
  onHanldeSetSelect: (select: any, check: boolean) => void
}

const QuizType3 = ({ data, check, select, quizCompound, onHanldeSetSelect }: QuizType3Props) => {
  const { cancel, speak, speaking, supported, voices, pause, resume } = useSpeechSynthesis();
  const { speechValue, onHandleUpdateSpeech, transcript, onHandleUpdateTranscript } = useContext(SpeechContext)
  const onHandleSpeakSelect = () => {
    for (let i = 0, a = transcript.split(' '); i < a.length; i++) {
      data.forEach((item: any) => {
        if (a[i].replace(',', '').toLowerCase().trim() === item.answer.toLowerCase().trim()) {
          onHanldeSetSelect({ id: item._id, isCorrect: item.isCorrect, answer: item.answer, type: 3 }, check)
        }
      })
    }
  }
  useEffect(() => {
    onHandleSpeakSelect()
  }, [transcript, speechValue])

  return (
    <div className="box__item__chosse__question">
      <div className="btn__choose__result !justify-start mb-4">
        {quizCompound?.map((item, index) => {
          return <div key={index + 1}
            className={`border-2 border-[#CCCCCC] item__btn__choose `}
            onClick={() => {
              onHanldeSetSelect(quizCompound.filter((item2, index) => item2.id !== item.id), check)

            }}
          >
            <button>
              {item.answer}
            </button>
          </div>
        })}
      </div>


      <div className="btn__choose__result">
        {data.map((item, index) => {
          const existAnswer = quizCompound.find(item2 => item2.id === item._id)
          if (existAnswer) {
            return <div key={index + 1}
              className={`border-2 bg-[#CCCCCC] item__btn__choose `
              }

            >
              <button className="bg-[#CCCCCC] text-[#CCCCCC]">
                {item.answer}
              </button>
            </div>
          }
          return <div key={index + 1}
            className={`border-2 ${item._id == select?.id
              ? " border-[#5DADE2] bg-[#D6EAF8] text-[#2E86C1]"
              : "border-[#CCCCCC]"} 
                      ${check === true
                ? item._id == select?.id
                  ? select?.isCorrect === true
                    ? "bg-[#D6EAF8] border-[#5DADE2] "
                    : "bg-[#F9EBEA] !border-[#C0392B] !text-[#C0392B]"
                  : ""
                : ""} item__btn__choose `
            }
            onClick={() => {
              if (check !== true) {

                onHanldeSetSelect([...quizCompound, { id: item._id, isCorrect: item.isCorrect, answer: item.answer, type: 3 }], check)
              }
            }}
          >
            <button>
              {item.answer}
            </button>
          </div>
        })}
      </div>
    </div>
  )
}

export default QuizType3