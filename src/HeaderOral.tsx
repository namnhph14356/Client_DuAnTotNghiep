import React, { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { DayType } from './types/day'
import { Link, NavLink, useParams } from 'react-router-dom'
import { getListDaySlice } from './features/Slide/day/DaySlice'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const HeaderOral = () => {
    const [filterArr, setFilterArr] = useState([
        {
            id: 1,
            title: "Thi câu ngày",
            value: 1
        },
        {
            id: 2,
            title: "Thi câu tuần",
            value: 7
        },
        {
            id: 3,
            title: "Thi câu tháng",
            value: 30
        },
        {
            id: 4,
            title: "Thi câu quý",
            value: 90
        }
    ])
    const days = useAppSelector<DayType[]>(item => item.day.value)
    const dispatch = useAppDispatch()
    const { dayId, id } = useParams();
    const [filterSelect, setFilterSelect] = useState<any>()
    const [daySelect, setDaySelect] = useState<DayType>()
    const [day, setDay] = useState<DayType>()

    const filter = filterSelect 
    ? days.filter((item: DayType) => item.order % filterSelect?.value === 0)
    :  days

    useEffect(() => {
        dispatch(getListDaySlice())
        const day: any = days.find((item: DayType) => item._id === dayId)
        setDaySelect(day)
        setFilterSelect(filterArr[0])
        setDay(day)
    }, [dayId])

    return (
        <div>
            <div className="header__oral__page">
                <p>Thi Oral ngày <span>{day?.order}</span></p>

            </div>
            <div className="select__menu__oral">

                <div className='select__menu__month'>
                    <Listbox value={filterSelect} onChange={setFilterSelect}>
                        {({ open }) => (
                            <>
                                <div className="relative mt-1">
                                    <Listbox.Button className="relative w-full cursor-default  border border-gray-300 bg-white py-1 pl-5 pr-12 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                        <span className="block truncate">{filterSelect?.title}</span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {filterArr.map((item) => (
                                                <Listbox.Option
                                                    key={item.id}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                        )
                                                    }
                                                    value={item}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                {item.title}
                                                            </span>

                                                            {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                    )}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                </div>

                <div className='select__menu__day'>
                    <Listbox value={daySelect} onChange={setDaySelect}>
                        {({ open }) => (
                            <>
                                <div className="relative mt-1">
                                    <Listbox.Button className="relative w-full cursor-default  border border-gray-300 bg-white py-1 pl-5 pr-12 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                        <span className="block ">{daySelect?.title}</span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {filter.map((item) => (
                                                <Listbox.Option
                                                    key={item._id}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                        )
                                                    }
                                                    value={item}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                {item.title}
                                                            </span>

                                                            {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                    )}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                </div>

                <div className="btn__select__menu">
                    <Link to={`/learning/oral/${daySelect?._id}`}  >
                        <button >
                            Chọn
                        </button>
                    </Link>
                </div>
            </div>
            <div className="btn__wrap__oral">
                <div className="color__left">

                </div>
                <div className="btn__right">
                    <Link to={`/learning/oral/${daySelect?._id}`}>
                        <button className='btn__wrap__right__oral text-black'>
                            <i className="fa-solid fa-book mr-2"></i>Ôn thi
                        </button>
                    </Link>
                    <Link to={`/learning/oral/${daySelect?._id}/exam`}>
                        <button className=' text-black'>
                            <i className="fa-solid fa-microphone mr-2"></i>Thi Oral phản xạ 7 giây
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default HeaderOral
