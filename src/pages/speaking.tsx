/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import { detailLearningProgressByUser } from "../api/learningProgress";
import { RootState } from "../app/store";
import "../css/speaking.css";
import { UserType } from "../types/user";
import { LearningProgressType } from "../types/learningProgress";

const SpeakingPage = () => {
  const user = useSelector(((item: RootState) => item.auth.value)) as UserType
  const [learningProgress, setLearningProgress] = useState<any>()
  console.log("learningProgress", learningProgress)
  const { dayId, id }: any = useParams()
  const [color, setColor] = useState('');
  const path = useLocation();

  const checkRoute = () => {
    switch (path.pathname) {
      case `/learning/${dayId}/detailLearning/${id}/listenSpeak/quiz`:
        setColor('quiz')
        break;
      case `/learning/${dayId}/detailLearning/${id}/listenSpeak/questionAndAnswer`:
        setColor('questionAndAnswer')
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const getPracticeActivity = async () => {
      const { data } = await detailLearningProgressByUser(dayId, user._id)
      setLearningProgress(data)
    }
    getPracticeActivity()
    checkRoute()
  }, [path.pathname])

  return (
    <div className="speaking__page">
      <div className="main__speaking">
        <div className="w-full bg-indigo-600 px-4 py-2">
          <div className='flex gap-4'>
            <NavLink to={`/learning/${dayId}/detailLearning`} className='my-auto'>
              <i className="fa-solid fa-angle-left text-5xl text-white font-bold cursor-pointer"></i>
            </NavLink>
            <div className='my-auto'>
              <div className='text-xl uppercase text-white'>Luyện nghe nói phản xạ</div>
              {learningProgress
                ? <div className='text-white'>
                  {learningProgress.listeningSpeakingScore >= 10
                    ? learningProgress.listeningSpeakingScore
                    : `0${learningProgress?.listeningSpeakingScore} `
                  } Điểm
                </div>
                : ""}
            </div>
          </div>
        </div>
        <div className="nav__speaking">
          <div className="count__question">
            {/* <div>
              Câu số 1 / <span>10</span>
            </div> */}
          </div>
          <div>

            <NavLink to={`/learning/${dayId}/detailLearning/${id}/listenSpeak/quiz`} className="text-black hover:text-black">
              <button className={`${color === 'quiz' ? 'bg-blue-600 text-gray-100 ' : 'bg-slate-200 hover:bg-slate-300 '}  btn__comment__speaking`}>
                <i className="fa-solid fa-book"></i> Khởi động
              </button>

            </NavLink>
            <NavLink to={`/learning/${dayId}/detailLearning/${id}/listenSpeak/questionAndAnswer`} className="text-black hover:text-black" >
              <button className={`${color === 'questionAndAnswer' ? 'bg-blue-600 text-gray-100 ' : 'bg-slate-200 hover:bg-slate-300 '}  btn__comment__speaking`}>
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
