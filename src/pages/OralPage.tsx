import React from 'react'
import '../css/oral.css'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import NavOral from '../components/NavOral'
import HeaderOral from '../HeaderOral'
const month = [
    { id: 1, name: 'thi cau ngay' },
    { id: 2, name: 'thi cau tuan' },
    { id: 3, name: 'thi cau thang' },
    { id: 3, name: 'thi cau quy' },
]
const day = [
    { id: 1, name: 'ngay 1' },
    { id: 2, name: 'ngay 2' },
    { id: 3, name: 'ngay 3' },
    { id: 3, name: 'ngay 4' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const OralPage = () => {
    const [selectMontht, setSelectedMonth] = useState(month[3])
    const [selectedDay, setSelectedDay] = useState(day[3])
    return (

        <div className='oralPage'>

            <div className="main__oral__page">
              
                <HeaderOral/>

                <div className="exam__content__wrap__oral">
                    <div className="exam__container__oral">
                        <table className='table__exam__oral'>
                            <thead  >
                                <tr className='row__table__exem__oral' >
                                    <th>
                                        Đề <i className="fa-solid fa-volume-high"></i>
                                    </th>
                                    <td>
                                        <div className='title__exam__oral__table'>
                                            <p>
                                                I love reading books and I have read all the must-reads.
                                            </p>
                                        </div>
                                        <div className='result__exam__oral'>
                                            <p>
                                                Tôi thích đọc sách và đã đọc tất cả những cuốn sách nên đọc rồi.
                                            </p>
                                        </div>

                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='row__body__table__oral'>
                                    <th>
                                        Thu âm <i className="fa-solid fa-microphone"></i>
                                    </th>
                                    <td>
                                        I love reading books and I have read all the must-reads.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="btn__control__exam">
                            <div>
                                <button className='btn__next__control'>
                                    câu tiếp theo
                                </button>
                            </div>
                            <div>
                                <p>
                                   câu số 1 / <span>
                                        2
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
                        <li>
                            <div className="question__list__result">

                                <p>
                                    <i className="fa-solid fa-volume-high"></i>  I love reading books and I have read all the must-reads.
                                </p>

                            </div>
                            <div className='transe__answered__list'>
                                <p>
                                    Tôi thích đọc sách và đã đọc tất cả những cuốn sách nên đọc rồi.
                                </p>
                            </div>
                            <div className='result__list__user'>
                                <p>
                                    <span>
                                        I love reading books and I have read all the must-reads.</span>                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="question__list__result">

                                <p>
                                    <i className="fa-solid fa-volume-high"></i>  I love reading books and I have read all the must-reads.
                                </p>

                            </div>
                            <div className='transe__answered__list'>
                                <p>
                                    Tôi thích đọc sách và đã đọc tất cả những cuốn sách nên đọc rồi.
                                </p>
                            </div>
                            <div className='result__list__user'>
                                <p>
                                    <span>
                                        I love reading books and I have read all the must-reads.</span>                                </p>
                            </div>
                        </li>
                    </ol>
                </div>

            </div>
            <NavOral/>
        </div>
    )
}

export default OralPage