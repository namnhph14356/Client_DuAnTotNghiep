

import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams, NavLink } from 'react-router-dom';
import { detailCategory } from '../api/category';
import AdverDeatil from '../components/AdverDeatil';
import '../css/detailLearning.css'

const DetailLearning = () => {
  const { id }: any = useParams()

  useEffect(() => {
    const getQuiz = async () => {
      const { data } = await detailCategory(id)
      console.log(data);
    }
    getQuiz()
  }, [id])

  return (
    <div>
      <div className='box__deatil__learning__main'>
        <div className="main__topic col-span-9 w-full">
          <div className='box__main__topic'>
            <h2 className="title__deatial__learning">
              Giới thiệu lớp tiếng Anh cho trẻ em
            </h2>
            <p className='info__topic'>
              Các em hãy làm theo yêu cầu của chương trình dù có phải làm bài tập lại, thi lại bao nhiêu lần đi nữa. Chương trình được thiết kế để các em nhớ bài nhiều nhất có thể trước khi học sang bài mới. Các em có thể học một bài trong nhiều ngày, không cần phải học nhanh. Nếu làm bài chưa đạt, hãy làm lại cho đến khi đạt được yêu cầu về thời gian và điểm số.                </p>
            <p className='info__topic'>
              Khi học 3 câu thông dụng và các câu hỏi trong ngày, hãy tận dụng thời gian rảnh rỗi để đọc to mỗi câu ít nhất 200 lần trước khi học sang các câu mới. Chắc chắn chương trình này sẽ giúp các em giỏi tiếng Anh!                </p>
          </div>

          <div className="box__list__detail">
            <NavLink to={`/learning/detailLearning/${id}/speak`} >
              <p className='text-lg'>Bắt đầu học</p>
              <div className='mt-2'>
                <p className='text-2xl'><span className='font-bold'> Tuần 1</span> <i className="fa-solid fa-caret-right"></i> Ngày 1</p>
              </div>
            </NavLink>
          </div>
        </div>

        <div className="col-span-3 advertisement__source__learning">
          <AdverDeatil />
        </div>

      </div>
    </div>
  )
}

export default DetailLearning