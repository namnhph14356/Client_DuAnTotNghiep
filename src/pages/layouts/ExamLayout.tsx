import React, { useContext, useEffect } from 'react'
import '../../css/oral.css'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import NavOral from '../../components/NavOral'
import HeaderOral from '../../HeaderOral'
import { Outlet, useParams } from 'react-router-dom'
import { listSentencesByIdActivity, listSentencesByIdDay } from '../../api/sentence'
import { SentenceType } from '../../types/sentence'
import { useSpeechSynthesis } from 'react-speech-kit';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import GoogleSpeechOral from '../../components/GoogleSpeech/GoogleSpeechOral'
import { changeSpeechValue, resetSpeechValue } from '../../features/Slide/googleSpeech/GoogleSpeechSlice'

import { XOutline, CheckOutline } from "heroicons-react"
import { detailDay } from '../../api/day'
import { DayType } from '../../types/day'
import { getListDaySlice } from '../../features/Slide/day/DaySlice'


const ExamLayout = () => {

    
    // const days = useAppSelector<DayType[]>(item => item.day.value)
    // const dispatch = useAppDispatch()
    // const { dayId, id } = useParams();
    // const [daySelect, setDaySelect] = useState<DayType | null>()



    // useEffect(() => {
    //     dispatch(getListDaySlice())
    // }, [dayId])

    return (
        <div className='oralPage'>
            <div className="main__oral__page">
                <HeaderOral />

                <Outlet />

            </div>
            <NavOral />
        </div>
    )
}

export default ExamLayout