/* eslint-disable no-lone-blocks */
import { Collapse, Modal } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams, NavLink } from 'react-router-dom';
import { detailCategory } from '../api/category';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ChooseClass from '../components/AdverDeatil/ChooseClass';
import '../css/detailLearning.css'
import { getListPracticeActivitySliceByDay } from '../features/Slide/practiceActivity/PracticeActivitySlice';
import { PracticeActivityType } from '../types/practiceActivity'

type PracticeActivityArr = {
  id: number,
  url: string,
  icon: ReactNode
}

const DetailLearning = () => {
  const { dayId } = useParams();
  const dispatch = useAppDispatch()
  let practiceActivity = useAppSelector<PracticeActivityType[]>(item => item.practiceActivity.valueByDay)
  const practiceLearning = [...practiceActivity]
  practiceLearning.sort((a: PracticeActivityType, b: PracticeActivityType) => a.order - b.order)
  const practiceArr = [
    {
      id: 1,
      url: "listenSpeak/quiz",
      icon: <i className="fa-solid fa-ear-listen"></i>
    },
    {
      id: 2,
      url: "vocabulary/lesson",
      icon: <i className="fa-solid fa-file-word"></i>
    },
    {
      id: 3,
      url: "sentences/lesson",
      icon: <i className="fa-solid fa-bars-staggered"></i>
    },
    {
      id: 4,
      url: "conversation/listenWrite",
      icon: <i className="fa-solid fa-book-open"></i>
    },
    {
      id: 5,
      url: "grammar/lesson",
      icon: <i className="fa-solid fa-book-open"></i>
    }
  ]


  const onChangeURL = (order: number) => {
    const flag: PracticeActivityArr[] = practiceArr.filter((item2: PracticeActivityArr) => {
      if (item2.id === order) {
        return item2.url
      }
    })
    return flag[0].url
  }

  const flag = onChangeURL(2)


  useEffect(() => {
    dispatch(getListPracticeActivitySliceByDay(dayId))
  }, [dayId])
  
  return (
    <div className='detail__learning__page'>
      <div className="content__detail__learning">
        <div className="video__learning">
          <img src="https://i.pinimg.com/564x/46/1e/a8/461ea8504beb717ac0364e55c712d16e.jpg" alt="" />
        </div>
        <div className="deatil__main__learning">
          <h3 className="title__detail__main">
            CÁC PHẦN HỌC CHÍNH :
          </h3>
          <div className="list__main__learning">
            {practiceLearning.map((item: PracticeActivityType, index: number) => {
              return <div key={index + 1}>
                <NavLink to={`/learning/${dayId}/detailLearning/${item._id}/${onChangeURL(item.order)}`}>
                  <div className="item__list__learning">
                    <div className="info__item__list">
                      <div>
                        {practiceArr.map((item2: PracticeActivityArr) => {
                          if (item2.id === item.order) {
                            return item2.icon
                          }
                        })}
                      </div>
                      <div>
                        <h4 className="title__info__item">
                          {item.title}
                        </h4>
                        <p>
                          00 điểm |<span> bắt buộc</span>
                        </p>
                      </div>
                    </div>
                    <div className='icon__item__list'>
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </div>
                </NavLink>
              </div>
            })}

          </div>
        </div>
      </div>
      <div className="setting__detail__learning">
        <ChooseClass />
      </div>
    </div>
  )
}

export default DetailLearning
