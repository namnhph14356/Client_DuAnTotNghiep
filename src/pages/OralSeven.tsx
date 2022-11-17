import React, { useContext, useEffect } from 'react'
import '../css/oral.css'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import NavOral from '../components/NavOral'
import HeaderOral from '../HeaderOral'
import { Link, useParams } from 'react-router-dom'
import { SentenceType } from '../types/sentence'
import { useSpeechSynthesis } from 'react-speech-kit';
import { useAppDispatch, useAppSelector } from '../app/hooks'
import GoogleSpeechOral from '../components/GoogleSpeech/GoogleSpeechOral'
import { changeArrReset, changeSpeechFinish, changeSpeechValue, resetSpeechValue } from '../features/Slide/googleSpeech/GoogleSpeechSlice'

import { XOutline, CheckOutline } from "heroicons-react"
import { detailDay } from '../api/day'
import { DayType } from '../types/day'
import GoogleSpeechExam from '../components/GoogleSpeech/GoogleSpeechExam'
import { shuffleArray } from '../utils/shuffleArray'
import { detailLearningProgressByUser } from '../api/learningProgress'
import { UserType } from '../types/user'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { addLearningProgressSlice, editLearningProgressSlice } from '../features/Slide/learningProgress/LearningProgress'
import Countdown from 'react-countdown';
import { listSentencesByIdDay } from '../api/sentences'


const OralSeven = () => {

  const user = useSelector(((item: RootState) => item.auth.value)) as UserType
  const transcript = useAppSelector(item => item.googleSpeech.transcript)
  const isFinish = useAppSelector(item => item.googleSpeech.isFinish)
  const arrReset = useAppSelector(item => item.googleSpeech.arrReset)
  const dispatch = useAppDispatch()
  const { cancel, speak, speaking, supported, voices, pause, resume } = useSpeechSynthesis();
  const { dayId, id }: any = useParams();
  const [day, setDay] = useState<DayType>()
  const [score, setScore] = useState<number>(0)
  const [sentencesIndex, setSentencesIndex] = useState<number>(0)
  const [totalCorrect, setTotalCorrect] = useState<number>(0)
  const [showResult, setShowResult] = useState<boolean>(false)
  const [showStart, setShowStart] = useState<boolean>(true)
  const [resetSpeaker, setResetSpeaker] = useState<boolean>(true)
  const [history, setHistory] = useState<any>([])
  const [dataSentences, setDataSentSentences] = useState<SentenceType[]>([])
  const [dataSentencesHistory, setDataSentencesHistory] = useState<SentenceType[]>([])
  const [sentencesSplit, setSentencesSplit] = useState<string[]>([])
  const transcriptSplit = transcript.split(" ")

  const onHanldeResetSpeaker = (value: boolean) => {
    setResetSpeaker(value)
  }

  const onContinute2 = () => {

    if (transcript.toLowerCase().trim().replace(".", "") === dataSentences[sentencesIndex]?.words.toLowerCase().trim().replace(".", "")) {
      setScore(score + 10 / dataSentences.length)
      setTotalCorrect(totalCorrect + 1)
    }

    dispatch(changeArrReset(arrReset.map((item: any, index: number) => item.id === sentencesIndex ? { ...item, status: true } : item)))
    setDataSentencesHistory([...dataSentencesHistory, dataSentences[sentencesIndex]])

    const exitsHistory = history.find(item => item.id === sentencesIndex)
    if (exitsHistory) {
      setHistory(history.map((item: any) => item.id === sentencesIndex ? { ...item, value: transcript } : item))
    } else {
      setHistory([...history, { id: sentencesIndex, value: transcript }])
    }
    if (sentencesIndex >= dataSentences.length - 1) {
      onHandleFinish()
      setShowResult(true)
    } else {
      setSentencesIndex(sentencesIndex + 1)
      setSentencesSplit(dataSentences[sentencesIndex + 1].words.split(" "))
      setResetSpeaker(true)

    }
    dispatch(changeSpeechValue(""))
    dispatch(changeSpeechFinish(false))
  }

  const onHandleFinish = async () => {
    const { data: learningProgress } = await detailLearningProgressByUser(dayId, user._id)
    if (learningProgress.length === 0) {
      dispatch(addLearningProgressSlice({ day: dayId, user: user._id }))
    } else {
      dispatch(editLearningProgressSlice({ ...learningProgress, oralScore: Math.round(score) }))
    }
  }


  if (isFinish === true) {
    console.log("onContinute2")
    onContinute2()
  }

  const refreshPage = () => {
    window.location.reload();
  }

  const renderer = ({ hours, minutes, seconds, completed }) => {
    return <span>{seconds}</span>;
  };

  useEffect(() => {
    const getSentences = async () => {
      dispatch(resetSpeechValue(""))
      dispatch(changeSpeechFinish(false))
      const { data } = await listSentencesByIdDay(String(dayId))
      const { data: dataDay } = await detailDay(String(dayId))
      setDataSentSentences(shuffleArray(data))
      setDay(dataDay)
      setSentencesSplit(data[sentencesIndex].words.split(" "))
      setShowStart(true)
      dispatch(changeArrReset(data.map((item: SentenceType, index: number) => {
        return { id: index, status: false }
      })))
    }
    getSentences()
  }, [dayId])

  return (
    <div>
      {showStart
        ? <div className={`my-6 ${showStart ? "flex" : "hidden"} flex-col justify-center items-center gap-2`}>
          <span className='text-lg'> Số lượng {dataSentences?.length} câu</span>
          <button className="px-4 py-1 bg-indigo-500 text-white rounded-sm hover:bg-indigo-600" onClick={() => { setShowStart(false) }} >
            Bắt Đầu
          </button>
        </div>
        : ""}

      <div className={`${showStart || showResult ? "!hidden" : ""} exam__content__wrap__oral`}>
        <div className="exam__container__oral">
          <table className='table__exam__oral'>
            <thead  >
              <tr className='row__table__exem__oral' >
                <th>
                  Đề
                </th>
                <td>
                  <div className='title__exam__oral__table'>
                    <p>
                      {dataSentences.length !== 0 ? dataSentences[sentencesIndex]?.meaning : ""}
                    </p>
                  </div>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr className='row__body__table__oral'>
                <th className="w-24  border border-gray-200 ">
                  Thu âm
                  {showStart
                    ? ""
                    : <GoogleSpeechExam resetSpeaker={resetSpeaker} onHanldeResetSpeaker={onHanldeResetSpeaker} />
                  }

                </th>
                <td className={`${transcript !== "" && isFinish ? "flex" : "hidden"} m-0 pr-6 justify-between items-center`}>
                  <div className={`flex  gap-1`}>
                    <div className="flex gap-1">
                      {transcriptSplit.map((item: string, index: number) => {
                        if (item.toLowerCase().trim() === sentencesSplit[index]?.toLowerCase().trim()) {
                          return <span className="text-green-500">
                            {sentencesSplit[index]}
                          </span>
                        } else {
                          return <span className="text-red-500">
                            {item}
                          </span>
                        }
                      })}
                    </div>
                  </div>
                  <div className="">
                    {transcript !== ""
                      ? transcript.toLowerCase().trim().replace(".", "") === dataSentences[sentencesIndex]?.words.toLowerCase().trim().replace(".", "")
                        ? <CheckOutline className='text-green-500' />
                        : <XOutline className='text-red-500' />
                      : ""
                    }
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="btn__control__exam">
            <div>
              <p>
                Câu số {sentencesIndex + 1}/ <span>
                  {dataSentences?.length}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {showResult
        ? <div className="py-4 px-6">
          <div className="flex gap-4">
            <h2 className={`${score <= 9 ? "text-red-500" : "text-green-500"} text-6xl `}>
              {totalCorrect}/{dataSentences?.length}

            </h2>
            <div className="flex flex-col gap-1">
              <span className={`${score <= 9 ? "text-red-500" : "text-green-500"} text-2xl `}>{Math.round(score)} Điểm</span>
              <span className={`${score <= 9 ? "text-red-500" : "text-green-500"} text-3xl `} >{score <= 9 ? "Chưa Đạt" : "Đạt"}</span>
            </div>
          </div>

          <button onClick={() => { refreshPage() }} className={`px-4 py-1 bg-indigo-500 text-white hover:bg-indigo-600 `} >
            Làm lại
          </button>

        </div>
        : showStart === false
          ? ""
          : ""}


      <div className="list__answered">
        <ol className='list__answered__result'>
          {dataSentencesHistory?.map((item: SentenceType, index: number) => {
            const flag2 = item?.words.split(" ")
            return <li>
              <div className="question__list__result">
                <p>
                  <i className="fa-solid fa-volume-high"></i>  {item.words}
                </p>
              </div>
              <div className='transe__answered__list'>
                <p>
                  {item.meaning}
                </p>
              </div>
              <div className="transe__answered__list flex justify-between">
                <div className=' result__list__user flex gap-1'>
                  {history.length !== 0 && history[index] !== undefined
                    ? history[index]?.value?.split(" ").map((item2: string, index: number) => {
                      if (item2.toLowerCase().trim().replace(".", "") === flag2[index]?.toLowerCase().trim().replace(".", "")) {
                        return <span className="text-green-500">
                          {flag2[index]}
                        </span>
                      } else {
                        return <span className="text-red-500">
                          {item2}
                        </span>
                      }
                    })
                    : ""}
                </div>
                <div className="">
                  {history.length !== 0 && history[index] !== undefined
                    ? history[index]?.value?.replace(".", "").toLowerCase().trim() === item.words.replace(".", "").toLowerCase().trim()
                      ? <CheckOutline className='text-green-500' />
                      : <XOutline className='text-red-500' />
                    : ""
                  }
                </div>
              </div>
            </li>
          })}
        </ol>
      </div>

    </div>
  )
}

export default OralSeven
