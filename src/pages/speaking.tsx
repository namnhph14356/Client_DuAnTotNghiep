/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../css/speaking.css";


const SpeakingPage = () => {

  return (
    <div className="speaking__page">
      <div className="main__speaking">
        <div className="w-full bg-indigo-600 px-4 py-2">
          <div className='flex gap-4'>
            <NavLink to={'/learning/detailLearning'} className='my-auto'>
              <i className="fa-solid fa-angle-left text-5xl text-white font-bold cursor-pointer"></i>
            </NavLink>
            <div className='my-auto'>
              <div className='text-xl uppercase text-white'>Luyện nghe nói phản xạ</div>
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

          <NavLink to={'/learning/detailLearning/:id/speak/startUp'} className="text-black" >
              <button className="btn__comment__speaking ">
              <i className="fa-solid fa-book"></i> Khởi động
              </button>
            </NavLink>
            <NavLink to={'/learning/detailLearning/:id/speak/questionAndAnswer'} className="text-black" >
              <button className="btn__comment__speaking ">
              <i className="fa-solid fa-comments"></i> Hỏi và đáp
              </button>
            </NavLink>

          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default SpeakingPage;
