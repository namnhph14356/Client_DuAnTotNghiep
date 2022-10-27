import React from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
const month = [
    { id: 1, name: 'thi câu ngày' },
    { id: 2, name: 'thi câu tuần' },
    { id: 3, name: 'thi câu tháng' },
    { id: 4, name: 'thi câu quý' },
]
const day = [
    { id: 1, name: 'ngày 1' },
    { id: 2, name: 'ngày 2' },
    { id: 3, name: 'ngày 3' },
    { id: 4, name: 'ngày 4' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const HeaderOral = () => {
    const [selectMontht, setSelectedMonth] = useState(month[3])
    const [selectedDay, setSelectedDay] = useState(day[3])
    return (
        <div>
            <div className="header__oral__page">
                <p> thi oral ngày <span>5</span></p>

            </div>
            <div className="select__menu__oral">

                <div className='select__menu__month'>
                    <Listbox value={selectMontht} onChange={setSelectedMonth}>
                        {({ open }) => (
                            <>
                                <div className="relative mt-1">
                                    <Listbox.Button className="relative w-full cursor-default  border border-gray-300 bg-white py-1 pl-5 pr-12 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                        <span className="block truncate">{selectMontht.name}</span>
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
                                            {month.map((item) => (
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
                                                                {item.name}
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
                    <Listbox value={selectedDay} onChange={setSelectedDay}>
                        {({ open }) => (
                            <>
                                <div className="relative mt-1">
                                    <Listbox.Button className="relative w-full cursor-default  border border-gray-300 bg-white py-1 pl-5 pr-12 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                        <span className="block truncate">{selectedDay.name}</span>
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
                                            {day.map((item) => (
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
                                                                {item.name}
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
                    <button>
                        chọn
                    </button>
                </div>
            </div>
            <div className="btn__wrap__oral">
                <div className="color__left">

                </div>
                <div className="btn__right">
                    <button className='btn__wrap__right__oral'>
                        <i className="fa-solid fa-book"></i> ôn thi
                    </button>
                    <button>
                        <i className="fa-solid fa-microphone"></i>  thi oral phản xạ 7 giây
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeaderOral
