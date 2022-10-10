/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-globals */
import './../css/conversation.css'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

const ConversationPage = () => {

  return (
    <div className='conversation__page'>
      <div className="main__conversation">
        <div className="w-full bg-indigo-600 px-4 py-2">
          <div className='flex gap-4'>
            <NavLink to={'/learning/detailLearning'} className='my-auto'>
              <i className="fa-solid fa-angle-left text-5xl text-white font-bold cursor-pointer"></i>
            </NavLink>
            <div className='my-auto'>
              <div className='text-xl uppercase text-white'>Luyện hội thoại</div>
              <div className='text-white'>00 Điểm</div>
            </div>
          </div>
        </div>

        <div className="nav__speaking">
          <div className="count__question">
          </div>
          <div>
            <NavLink to={'/learning/detailLearning/:id/conversation/listenWrite'} className="text-black" >
              <button className="btn__comment__speaking ">
                <i className="fa-solid fa-book mr-2"></i> Bài tập
              </button>
            </NavLink>
            <NavLink to={'/learning/detailLearning/:id/conversation/listenRead'} className="text-black" >
              <button className="btn__comment__speaking ">
                <i className="fa-solid fa-comment mr-2"></i>Nghe và đọc
              </button>
            </NavLink>
            <NavLink to={'/learning/detailLearning/:id/conversation/note'} className="text-black" >
              <button className="btn__comment__speaking ">
                <i className="fa-solid fa-notes-medical"></i> Ghi chú
              </button>
            </NavLink>
            <NavLink to={'/learning/detailLearning/:id/conversation/questionAndAnswer'} className="text-black" >
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

export default ConversationPage