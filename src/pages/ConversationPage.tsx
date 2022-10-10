import React from 'react'
import HeaderDetail from '../components/HeaderDetail'
import NavDeatil from '../components/NavDeatil'
import './../css/conversation.css'

const value = [
    { id: 1, name: 'Annette Black' },
    { id: 2, name: 'Cody Fisher' },
    { id: 3, name: 'Courtney Henry' },
    { id: 4, name: 'Kathryn Murphy' },
    { id: 5, name: 'Theresa Webb' },
]
const people = [
    { name: 'lalisa', title: 'hello my bae', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
]
const ConversationPage = () => {
    return (
        <div className='conversation__page'>
            <div className="main__conversation">
                <HeaderDetail />
                <div className="nav__speaking">
                    <div className="count__question">
                        <p>
                            câu số 1 / <span>10</span>
                        </p>
                    </div>
                    <div>
                        <button className="btn__start__speaking">
                            <i className="fa-solid fa-book mr-2"></i> Khởi động
                        </button>
                        <button className="btn__comment__speaking">
                            <i className="fa-solid fa-comment mr-2"></i>Nghe và đọc
                        </button>
                        <button className="btn__comment__speaking">
                            <i className="fa-solid fa-notes-medical"></i> Ghi chú
                        </button>
                        <button className="btn__comment__speaking">
                            <i className="fa-solid fa-comments mr-2"></i> Hỏi và đáp
                        </button>
                    </div>
                </div>
                <div className="content__conversation">
                    <div className="question__audio">
                        <figure >
                            <audio style={{ width: '100%' }}
                                controls
                                src="/media/cc0-audio/t-rex-roar.mp3">
                            </audio>
                        </figure>
                    </div>

                    <div className="chosse__question__conversation">
                        <div className="listien__chosse__question">
                            <h3 className='title__listien__chosse'>
                                Nghe và trả lời
                            </h3>
                            <fieldset>
                                <legend className="text-lg font-medium text-gray-900"><span>1</span>. What are you doing here ?</legend>
                                <div className="mt-4 divide-y divide-gray-200 w-11/12 m-auto border-b border-gray-200">
                                    {value.map((person, personIdx) => (
                                        <div key={personIdx} className="relative flex items-start py-4">
                                            <div className="min-w-0 flex-1 text-sm">
                                                <label htmlFor={`person-${person.id}`} className="select-none font-medium text-gray-700">
                                                    {person.name}
                                                </label>
                                            </div>
                                            <div className="ml-3 flex h-5 items-center">
                                                <input
                                                    id={`person-${person.id}`}
                                                    name={`person-${person.id}`}
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                        </div>
                        <div className="check__input__listien">
                            <h3 className="title__check__input">
                                Nghe và điền vào ô trống
                            </h3>
                            <div className="table__conversation__check">
                                <table className="min-w-full divide-y divide-gray-300">

                                    <tbody className="divide-y divide-gray-200 bg-white">

                                        <tr  className='item__question__inpt_check'>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                Lalisa :  <i className="fa-solid fa-circle-play"></i><span>what it's <input type="check" /> ? </span>
                                            </td>

                                        </tr>
                                        <tr  className='item__question__inpt_check user__affter'>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                Rose :  <i className="fa-solid fa-circle-play"></i><span>what it's <input type="check" /> ? </span>
                                            </td>

                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="btn__check__result">
                        <button className='btn__submit__check'>
                            Nộp bài
                        </button>
                        <button className='btn__reset__submit'>
                            Làm lại
                        </button>
                    </div>
                </div>
            </div>
            <NavDeatil />
        </div>
    )
}

export default ConversationPage