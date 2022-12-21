import { useEffect } from 'react'
import '../css/oral.css'
import {  useState } from 'react'
import { useParams } from 'react-router-dom'
import { SentenceType } from '../types/sentence'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import GoogleSpeechOral from '../components/GoogleSpeech/GoogleSpeechOral'
import { changeSpeechValue, resetSpeechValue } from '../features/Slide/googleSpeech/GoogleSpeechSlice'
import { XOutline, CheckOutline } from "heroicons-react"
import { detailDay } from '../api/day'
import { DayType } from '../types/day'
import { listSentencesByIdDay } from '../api/sentences'
import { audioSpeak } from '../utils/audio'

const OralPage = () => {

    const transcript = useAppSelector(item => item.googleSpeech.transcript)
    const dispatch = useAppDispatch()
    const { dayId, id } = useParams();
    const [day, setDay] = useState<DayType>()
    const [sentencesIndex, setSentencesIndex] = useState<number>(0)
    const [history, setHistory] = useState<any>([])
    const [dataSentences, setDataSentSentences] = useState<SentenceType[]>([])
    const [sentencesSplit, setSentencesSplit] = useState<string[]>([])
    const transcriptSplit = transcript.split(" ")

    const onContinute = () => {
        const exitsHistory = history.find(item => item.id === sentencesIndex)
        if (exitsHistory) {
            setHistory(history.map((item: any) => item.id === sentencesIndex ? { ...item, value: transcript } : item))
        } else {
            setHistory([...history, { id: sentencesIndex, value: transcript }])
        }
        if (sentencesIndex >= dataSentences.length - 1) {
            setSentencesIndex(0)
            setSentencesSplit(dataSentences[0].words.split(" "))
        } else {
            setSentencesIndex(sentencesIndex + 1)
            setSentencesSplit(dataSentences[sentencesIndex + 1].words.split(" "))
        }
        dispatch(changeSpeechValue(""))
    }

    useEffect(() => {
        setHistory([])
        const getSentences = async () => {
            dispatch(resetSpeechValue(""))
            const { data } = await listSentencesByIdDay(String(dayId))
            const { data: dataDay } = await detailDay(String(dayId))
            setDataSentSentences(data)
            setDay(dataDay)
            setSentencesSplit(data[sentencesIndex].words.split(" "))
           
        }
        getSentences()
    }, [dayId])

    return (
        <div className=''>
            <div className="exam__content__wrap__oral">
                <div className="exam__container__oral">
                    <table className='table__exam__oral'>
                        <thead  >
                            <tr className='row__table__exem__oral' >
                                <th className='w-24'>
                                    <div className="flex flex-col  justify-center items-center">
                                        <span>Đề</span> 
                                        <button onClick={() => audioSpeak(dataSentences && dataSentences[sentencesIndex]?.words,true)}>
                                            <i className="fa-solid fa-volume-high"></i>
                                        </button>
                                    </div>
                                </th>
                                <td>
                                    <div className='title__exam__oral__table'>
                                        <div className="flex gap-1">
                                            {dataSentences.length !== 0
                                                ? dataSentences[sentencesIndex]?.words.split(" ")?.map((item: string, index: number) => {
                                                    return <button className='' onClick={() =>  audioSpeak(item,true)}>
                                                        <span className='text-xl font-semibold hover:text-[#8EC300]'>{item}</span>
                                                    </button>
                                                })
                                                : ""}
                                        </div>

                                    </div>
                                    <div className='result__exam__oral'>
                                        <p>
                                            {dataSentences.length !== 0 ? dataSentences[sentencesIndex]?.meaning : ""}
                                        </p>
                                    </div>

                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='row__body__table__oral '>
                                <th className='w-24 border border-gray-200 '>
                                    Thu âm
                                    <div className='my-4'><GoogleSpeechOral /></div>
                                </th>
                                <td className={`${transcript !== "" ? "flex" : "hidden"} m-0 pr-6 justify-between items-center`}>
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
                                        {/* <div className="flex gap-1">
                                                {transcriptSplit.length < sentencesSplit.length ? sentencesSplit.map((item: string, index: number) => {
                                                    if (index >= transcriptSplit.length) {
                                                        return <span className="text-gray-400">
                                                            {item}
                                                        </span>
                                                    }
                                                }) : ""}
                                            </div> */}
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
                            <button className='btn__next__control' onClick={onContinute} >
                                Câu tiếp theo
                            </button>
                        </div>
                        <div>
                            <p>
                                Câu số {sentencesIndex + 1} / <span>
                                    {dataSentences?.length}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="list__answered">
                <div className='title__list__answered'>
                    <p>
                        Danh sách ôn tập
                    </p>
                </div>
                <ol className='list__answered__result'>
                    {dataSentences.map((item: SentenceType, index: number) => {
                        const flag2 = item?.words.split(" ")
                        return <li>
                            <div className="question__list__result">
                                <p>
                                    <i className="fa-solid fa-volume-high" onClick={() =>  audioSpeak(item.words,true)}></i>  {item.words}
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
                                            if (item2.toLowerCase().trim().replace(".", "") === flag2[index].toLowerCase().trim().replace(".", "")) {
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

export default OralPage