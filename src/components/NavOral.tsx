import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { listLearningProgress } from '../api/learningProgress'
import { LearningProgressType } from '../types/learningProgress'

const NavOral = () => {
  const [listLearning, setListLearning] = useState<LearningProgressType[]>([])
  const { dayId } = useParams()

  const listProgress = async () => {
    const { data } = await listLearningProgress();
    const top10 = data.filter((e) => e.day?._id === dayId).sort((a, b) => b.oralScore - a.oralScore).slice(0, 10)
    setListLearning(top10)
  }

  useEffect(() => {
    listProgress()
  }, [])

  return (
    <div className="nav__oral__page">
      <div className='title__nav'>
        <h2>
          Bảng xếp hạng Oral
        </h2>

      </div>
      <nav className='nav__list'>
        <ul className=''>
          {listLearning?.map((item: any, index: number) => (
            <li className='item__list__user'>
              <div className='img__user__item'>
                <a href="">
                  <img src={item.user?.img} alt="" />
                </a>
              </div>
              <div className='info__user__item'>
                <h3>
                  <span>{index + 1} .</span> {item.user?.username}
                </h3>
                <p className='font-semibold'>
                  {item.oralScore} điểm
                </p>
              </div>
            </li>
          ))}
        </ul>
      </nav>
      
    </div>
  )
}

export default NavOral
