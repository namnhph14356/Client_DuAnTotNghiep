/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-globals */
import './../css/conversation.css'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { UserType } from "../types/user";
import { LearningProgressType } from "../types/learningProgress";
import { useSelector } from "react-redux";
import { detailLearningProgressByUser } from "../api/learningProgress";
import { RootState } from "../app/store";

const ConversationPage = () => {
  const user = useSelector(((item: RootState) => item.auth.value)) as UserType
  const [learningProgress, setLearningProgress] = useState<any>()
  const { dayId, id }: any = useParams()
  const [color, setColor] = useState('');
  const path = useLocation();

  const checkRoute = () => {
    switch (path.pathname) {
      case `/learning/${dayId}/detailLearning/${id}/conversation/listenWrite`:
        setColor('listenWrite')
        break;
      case `/learning/${dayId}/detailLearning/${id}/conversation/listenRead`:
        setColor('listenRead')
        break;
      case `/learning/${dayId}/detailLearning/${id}/conversation/note`:
        setColor('note')
        break;
      case `/learning/${dayId}/detailLearning/${id}/conversation/questionAndAnswer`:
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
    <div className='conversation__page'>
      <div className="main__conversation">
        <div className="w-full bg-indigo-600 px-4 py-2">
          <div className='flex gap-4'>
            <NavLink to={`/learning/${dayId}/detailLearning`} className='my-auto'>
              <i className="fa-solid fa-angle-left text-5xl text-white font-bold cursor-pointer"></i>
            </NavLink>
            <div className='my-auto'>
              <div className='text-xl uppercase text-white'>Luyện hội thoại</div>
              {learningProgress
                ? <div className='text-white'>
                  {learningProgress.conversationScore >= 10
                    ? learningProgress.conversationScore
                    : `0${learningProgress?.conversationScore} `
                  } Điểm
                </div>
                : ""}
            </div>
          </div>
        </div>

        <div className="nav__speaking">
          <div className="count__question">
          </div>
          <div>
            <NavLink to={`/learning/${dayId}/detailLearning/${id}/conversation/listenWrite`} className="text-black hover:text-black" >
              <button className={`${color === 'listenWrite' ? 'bg-blue-600 text-gray-100 ' : 'bg-slate-200 hover:bg-slate-300 '}  btn__comment__speaking`}>
                <i className="fa-solid fa-book mr-2"></i> Bài tập
              </button>
            </NavLink>
            <NavLink to={`/learning/${dayId}/detailLearning/${id}/conversation/listenRead`} className="text-black hover:text-black" >
              <button className={`${color === 'listenRead' ? 'bg-blue-600 text-gray-100 ' : 'bg-slate-200 hover:bg-slate-300 '}  btn__comment__speaking`}>
                <i className="fa-solid fa-comment mr-2"></i>Nghe và đọc
              </button>
            </NavLink>
            <NavLink to={`/learning/${dayId}/detailLearning/${id}/conversation/note`} className="text-black hover:text-black" >
              <button className={`${color === 'note' ? 'bg-blue-600 text-gray-100 ' : 'bg-slate-200 hover:bg-slate-300 '}  btn__comment__speaking`}>
                <i className="fa-solid fa-notes-medical"></i> Ghi chú
              </button>
            </NavLink>
            <NavLink to={`/learning/${dayId}/detailLearning/${id}/conversation/questionAndAnswer`} className="text-black" >
              <button className={`${color === 'questionAndAnswer' ? 'bg-blue-600 text-gray-100 ' : 'bg-slate-200 hover:bg-slate-300 '}  btn__comment__speaking`}>
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