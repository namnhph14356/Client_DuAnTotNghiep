/* eslint-disable no-restricted-globals */
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import '../css/grammar.css'

const Sentences = () => {

  return (
    <div className="grammar__page">
      <div className="main__grammar__page">
        <div className="w-full bg-indigo-600 px-4 py-2">
          <div className='flex gap-4'>
            <NavLink to={'/learning/detailLearning'} className='my-auto'>
              <i className="fa-solid fa-angle-left text-5xl text-white font-bold cursor-pointer"></i>
            </NavLink>
            <div className='my-auto'>
              <div className='text-xl uppercase text-white'>Luyện cấu trúc & câu</div>
              <div className='text-white'>00 Điểm</div>
            </div>
          </div>
        </div>
        <div className="nav__speaking">
          <div className="count__question">
            <div>
              Câu số 1 / <span>10</span>
            </div>
          </div>
          <div>

            <NavLink to={'/learning/detailLearning/:id/sentences/lesson'} className="text-black" >
              <button className="btn__comment__speaking ">
                <i className="fa-solid fa-book"></i> Bài học
              </button>
            </NavLink>

            <NavLink to={'/learning/detailLearning/:id/sentences/exercise'} className="text-black" >
              <button className="btn__comment__speaking ">
                <i className="fa-solid fa-pen-to-square mr-1"></i>Bài tập
              </button>
            </NavLink>

            <NavLink to={'/learning/detailLearning/:id/sentences/exam'} className="text-black" >
              <button className="btn__comment__speaking ">
                <i className="fa-solid fa-pen-to-square mr-1"></i>Thi Oral
              </button>
            </NavLink>

            <NavLink to={'/learning/detailLearning/:id/sentences/note'} className="text-black" >
              <button className="btn__comment__speaking ">
                <i className="fa-solid fa-notes-medical"></i> Ghi chú
              </button>
            </NavLink>
            <NavLink to={'/learning/detailLearning/:id/sentences/questionAndAnswer'} className="text-black" >
              <button className="btn__comment__speaking ">
                <i className="fa-solid fa-comments mr-2"></i> Hỏi và đáp
              </button>
            </NavLink>

          </div>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Sentences