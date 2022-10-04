import React, { useEffect, useState } from "react";
import HeaderDetail from "../components/HeaderDetail";
import "../css/speaking.css";


const SpeakingPage = () => {

  return (
    <div className="speaking__page">
      <div className="main__speaking">
        <HeaderDetail/>
        <div className="nav__speaking">
          <div className="count__question">
            <p>
              câu số 1 / <span>10</span>
            </p>
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
              <img src="https://file.removal.ai/preview/tmp-633bd94aedabd.png" alt="" />
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
              xem kết quả
            </button>
          </div>
        </div>
      </div>
      <div className="chosse__learning">
        <h3 className="title__chosse__learning">
          Bạn muốn đến phần:
        </h3>
        <div className="nav__chosse__learning">
          <ul>
            <li>Luyện nghe nói phản xa</li>
            <li>Luyện từ vựng</li>
            <li>Luyện hội thoại</li>
            <li>Luyện ngữ pháp</li>
            <li>Luyện ngữ pháp</li>
            <li>Luyện ngữ pháp</li>
            <li>Luyện ngữ pháp</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SpeakingPage;
