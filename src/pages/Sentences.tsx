/* eslint-disable no-restricted-globals */
import { hover } from '@testing-library/user-event/dist/types/convenience'
import React, { useEffect, useState } from 'react'
import { Navigate, NavLink, Outlet, useLocation, useParams, useRoutes } from 'react-router-dom'
import '../css/grammar.css'
import '../css/sentence.css'

const Sentences = () => {
  const { dayId, id } = useParams();
  const [color, setColor] = useState('');
  const path = useLocation();

  const checkRoute = () => {
    switch (path.pathname) {
      case `/learning/${dayId}/detailLearning/${id}/sentences/lesson`:
        setColor('lesson')
        break;
      case `/learning/${dayId}/detailLearning/${id}/sentences/exercise`:
        setColor('exercise')
        break;
      case `/learning/${dayId}/detailLearning/${id}/sentences/exam`:
        setColor('exam')
        break;
      case `/learning/${dayId}/detailLearning/${id}/sentences/note`:
        setColor('note')
        break;
      case `/learning/${dayId}/detailLearning/${id}/sentences/questionAndAnswer`:
        setColor('questionAndAnswer')
        break;
      default:
        break;
    }
  }
  
  useEffect(() => {
    checkRoute()
  }, [path.pathname])

  return (
    <div className="grammar__page">
      <div className="main__grammar__page">
        <div className="w-full bg-indigo-600 px-4 py-2">
          <div className='flex gap-4'>
            <NavLink to={`/learning/${dayId}/detailLearning`} className='my-auto'>
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
          </div>
          <div>

            <NavLink to={`/learning/${dayId}/detailLearning/${id}/sentences/lesson`} className="text-black hover:text-black">
              <button className={`${color === 'lesson' ? 'bg-blue-600 text-gray-100 ' : 'bg-slate-200 hover:bg-slate-300 '}  btn__comment__speaking`}>
                <i className="fa-solid fa-book"></i> Bài học
              </button>
            </NavLink>

            <NavLink to={`/learning/${dayId}/detailLearning/${id}/sentences/exercise`} className="text-black hover:text-black" >
              <button className={`${color === 'exercise' ? 'bg-blue-600 text-gray-100 ' : 'bg-slate-200 hover:bg-slate-300 '}  btn__comment__speaking`}>
                <i className="fa-solid fa-pen-to-square mr-1"></i>Bài tập
              </button>
            </NavLink>

            <NavLink to={`/learning/${dayId}/detailLearning/${id}/sentences/exam`} className="text-black hover:text-black" >
              <button className={`${color === 'exam' ? 'bg-blue-600 text-gray-100 ' : 'bg-slate-200 hover:bg-slate-300 '}  btn__comment__speaking`}>
                <i className="fa-solid fa-pen-to-square mr-1"></i>Thi Oral
              </button>
            </NavLink>

            <NavLink to={`/learning/${dayId}/detailLearning/${id}/sentences/note`} className="text-black hover:text-black" >
              <button className={`${color === 'note' ? 'bg-blue-600 text-gray-100 ' : 'bg-slate-200 hover:bg-slate-300 '}  btn__comment__speaking`}>
                <i className="fa-solid fa-notes-medical"></i> Ghi chú
              </button>
            </NavLink>
            <NavLink to={`/learning/${dayId}/detailLearning/${id}/sentences/questionAndAnswer`} className="text-black hover:text-black" >
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

export default Sentences