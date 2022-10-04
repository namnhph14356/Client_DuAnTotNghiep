/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import "../css/speaking.css";


const SpeakingPage = () => {

  const backPage = () => {
    history.back();
  }
  
  return (
    <div className="speaking__page">
      <div className="main__speaking">
        <div className="w-full bg-indigo-600 px-4 py-2">
          <div className='flex gap-4'>
            <div className='my-auto' onClick={backPage}>
              <i className="fa-solid fa-angle-left text-5xl text-white font-bold cursor-pointer"></i>
            </div>
            <div className='my-auto'>
              <div className='text-xl uppercase text-white'>Luyện nghe hội thoại</div>
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
            <button className="btn__start__speaking">
              <i className="fa-solid fa-book"></i> Khởi động
            </button>
            <button className="btn__comment__speaking">
              <i className="fa-solid fa-comments"></i> Hỏi và đáp
            </button>
          </div>
        </div>

        <div className="content__speaking">
          <div className="qustion__content__speaking">
            <h3>
              Are you thirsty?
              <span>
                <i className="fa-solid fa-volume-high"></i>
              </span>
            </h3>
          </div>
          <div className="main__content__spaeking">
            <div className="img__question">
              <img src="https://i.pinimg.com/564x/23/6e/ad/236eadcccca3d08761bdf336d328ec43.jpg" alt="" />
            </div>
            <div className="choose__question">
              <fieldset className="border-t border-b border-gray-200">
                <legend className="sr-only">Notifications</legend>
                <div className="divide-y divide-gray-200">
                  <div className="relative flex items-start py-4">
                    <div className="min-w-0 flex-1 text-sm">
                      <label htmlFor="comments" className="font-medium text-gray-700">
                        The weather is very nice tonight.
                      </label>
                    </div>
                    <div className="ml-3 flex h-5 items-center">
                      <i className="fa-solid fa-volume-high mr-3"></i>
                      <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="relative flex items-start py-4">
                    <div className="min-w-0 flex-1 text-sm">
                      <label htmlFor="candidates" className="font-medium text-gray-700">
                        I'm planning to have a vacation next week.
                      </label>

                    </div>
                    <div className="ml-3 flex h-5 items-center">
                      <i className="fa-solid fa-volume-high mr-3"></i>
                      <input
                        id="candidates"
                        aria-describedby="candidates-description"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="relative flex items-start py-4">
                    <div className="min-w-0 flex-1 text-sm">
                      <label htmlFor="offers" className="font-medium text-gray-700">
                        Not really. Why?
                      </label>

                    </div>
                    <div className="ml-3 flex h-5 items-center">
                      <i className="fa-solid fa-volume-high mr-3"></i>
                      <input
                        id="offers"
                        aria-describedby="offers-description"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="relative flex items-start py-4">
                    <div className="min-w-0 flex-1 text-sm">
                      <label htmlFor="offers" className="font-medium text-gray-700">
                        Not really. Why?
                      </label>

                    </div>
                    <div className="ml-3 flex h-5 items-center">
                      <i className="fa-solid fa-volume-high mr-3"></i>
                      <input
                        id="offers"
                        aria-describedby="offers-description"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>

          </div>
          <div className="answer__question">
            <button >
              Xem kết quả
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakingPage;
