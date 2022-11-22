import React from 'react'
// import HeaderDetail from '../components/HeaderDetail'
import NavDeatil from '../components/NavDeatil'
import './../css/exercise.css'

const ExercisePage = () => {
    return (
        <div className='exercise__page'>
            <div className="main__exercise">
                {/* <HeaderDetail /> */}
                <div className="nav__speaking">
                    <div className="count__question">
                        {/* <p>
                            câu số 1 / <span>10</span>
                        </p> */}
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
                <div className="content__exercirse">
                    <fieldset className="space-y-5">
                        <legend className="text-base font-medium mt-3">01. Trong những từ sau đây, từ nào là danh từ: girl, beautiful, go, slowly</legend>
                        <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                                <input
                                    id="comments"
                                    aria-describedby="comments-description"
                                    name="comments"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="comments" className="font-medium text-gray-700">
                                    Comments
                                </label>

                            </div>
                        </div>
                        <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                                <input
                                    id="candidates"
                                    aria-describedby="candidates-description"
                                    name="candidates"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="candidates" className="font-medium text-gray-700">
                                    Candidates
                                </label>

                            </div>
                        </div>
                        <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                                <input
                                    id="offers"
                                    aria-describedby="offers-description"
                                    name="offers"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="offers" className="font-medium text-gray-700">
                                    Offers
                                </label>

                            </div>
                        </div>
                        <div className="review__exercirse">
                            <ul>
                                <li>Nghĩa tiếng việt</li>
                                <li>Giợi ý cách làm</li>
                                <li>Giải thích đáp án</li>
                                <li>Nghĩa từ loại từ</li>

                            </ul>
                        </div>
                    </fieldset>
                    <fieldset className="space-y-5">
                        <legend className="text-base font-medium mt-3">02. Trong những từ sau đây, từ nào là danh từ: girl, beautiful, go, slowly</legend>
                        <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                                <input
                                    id="comments"
                                    aria-describedby="comments-description"
                                    name="comments"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="comments" className="font-medium text-gray-700">
                                    Comments
                                </label>

                            </div>
                        </div>
                        <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                                <input
                                    id="candidates"
                                    aria-describedby="candidates-description"
                                    name="candidates"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="candidates" className="font-medium text-gray-700">
                                    Candidates
                                </label>

                            </div>
                        </div>
                        <div className="relative flex items-start">
                            <div className="flex h-5 items-center">
                                <input
                                    id="offers"
                                    aria-describedby="offers-description"
                                    name="offers"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="offers" className="font-medium text-gray-700">
                                    Offers
                                </label>

                            </div>
                        </div>
                        <div className="review__exercirse">
                            <ul>
                                <li>Nghĩa tiếng việt</li>
                                <li>Giợi ý cách làm</li>
                                <li>Giải thích đáp án</li>
                                <li>Nghĩa từ loại từ</li>

                            </ul>
                        </div>
                    </fieldset>

                    <div className="btn__execrcirse">
                        <button className='btn__submit__exe'>
                            Nộp bài
                        </button>
                        <button className='btn__reset__exe'>
                            Làm lại
                        </button>
                    </div>

                </div>
            </div>
            <NavDeatil />
        </div>
    )
}

export default ExercisePage