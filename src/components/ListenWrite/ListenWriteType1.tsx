/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Database } from 'heroicons-react';
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSpeechSynthesis } from 'react-speech-kit';
import reactStringReplace from 'react-string-replace';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import '../../css/writeAndListen.css'

type QuizType5Props = {
  question: any,
  answerList: any,
  check: boolean,
  select: any,
  questionIndex?: boolean
  onHanldeSetSelect: (select: any, check?: boolean) => void
}

const ListenWriteType1 = ({ question, answerList, check, select, questionIndex, onHanldeSetSelect }: QuizType5Props) => {

  const transcript = useAppSelector(item => item.googleSpeech.transcript)
  const dispatch = useAppDispatch()
  const [show, setShow] = useState<boolean>(false)
  const { cancel, speak, speaking, supported, voices, pause, resume } = useSpeechSynthesis();
  // const { speechValue, onHandleUpdateSpeech, transcript, onHandleUpdateTranscript } = useContext(SpeechContext)

  const [convertValues, setConvertValues] = useState<any>([])
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (value: any) => {

    let convertValue: any = [];
    for (let key in value) {
      const keyQuestion = key.split("-")[1];
      const idQuestion = key.split("-")[2];
      convertValue = [...convertValue, {
        keyQuestion,
        idQuestion,
        answerUser: value[key],
        answerCorrect: "",
        isCorrect: false
      },]
    }

    answerList.sort((a, b) => a.order - b.order).map((item: any, key: number) => {
      if (item.answer.toLowerCase() === convertValue[key].answerUser.toLowerCase() && item.quiz._id === convertValue[key].idQuestion) {
        convertValue[key].isCorrect = true;
        convertValue[key].answerCorrect = convertValue[key].answerUser
      } else {
        convertValue[key].isCorrect = false;
        convertValue[key].answerCorrect = item.answer
      }
    })

    setConvertValues(convertValue)

    let str = question.question.split(" ");
      convertValue.map((item) => {
        for (let i = 0; i < str.length; i++) {
            if (str[i] === "......................") {
              str[i] = item.answerUser
              return
            }          
        }
      })
    const findIndex = convertValue.findIndex((item) => item.isCorrect === false)

    if (findIndex !== -1) {
      return onHanldeSetSelect({
        quiz: question._id,
        isCorrect: false,
        answer: str.join(' ')
      })
    }
    onHanldeSetSelect({
      quiz: question._id,
      isCorrect: true,
      answer: str.join(' ')
    })

  }

  const checkAnswerIscorrect = (id: any, key: any) => {
    let className = "";
    convertValues.forEach(e => {
      if (key == Number(e.keyQuestion)) {
        if (e.isCorrect === true) {
          className = "text__result__correct"
        } else {
          className = "red text__result__wrong"
        }
      }
    });
    return className
  }

  const replaceString = (e: any, b) => {
    const quesToArr = e.question.split("......................")
    var tempQues: any = [];
    quesToArr.forEach((item2: any, index2: number) => {

      if (index2 < quesToArr.length - 1) {
        tempQues.push(<span key={index2 + 1}>{item2}</span>,
          <input key={index2 + 1}  {...register(`text-${index2 + 1}-${e._id}`)} disabled={questionIndex} className={` ${checkAnswerIscorrect(e._id, index2 + 1)} border-b border-dashed font-bold text-center border-black outline-none focus:border-[#130ff8]`} />)
      } else {
        tempQues.push(<span key={index2 + 1}>{item2}</span>)
      }
    })

    return (
      <div key={e._id} className="hover:cursor-pointer grid grid-cols-12 gap-8 w-full py-4 my-4 even:bg-slate-100"  >
        <span className='col-span-10 my-auto'>{quesToArr.length == 1 ? e.text : tempQues}</span>
      </div>
    )
  }

  useEffect(() => {
    setConvertValues([])
    reset()
  }, [question])

  return (
    <div className="block">
      <div className=" flex  items-center justify-start mb-8 font-bold gap-4">
        <div>Click để nghe: </div>
        <button className='text-xl' onClick={() => speak({ text: question.questionAfter, voice: voices[2] })}>
          <span><i className="fa-solid fa-volume-high outline-none"></i></span>
        </button>
      </div>

      <div className="">
        <fieldset className="border-t border-b border-gray-200">
          <legend className="sr-only">Notifications</legend>
          <div >
            <form onSubmit={handleSubmit(onSubmit)}>
              {
                replaceString(question, answerList)
              }
              <div>
                <button type='submit' className='py-1 px-3 bg-blue-600 hidden'>Kiểm tra</button>
              </div>
            </form>
          </div>
        </fieldset>
      </div>
    </div>
  )
}

export default ListenWriteType1