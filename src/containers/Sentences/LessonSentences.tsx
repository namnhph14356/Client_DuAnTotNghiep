import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { listSentences } from '../../api/sentence'
import { SentenceType } from '../../types/sentence'


const arraySentences = [
  {
    id: 1,
    title: 'I had a nightmare last night and I lost sleep 1',
    order: 1
  },
  {
    id: 2,
    title: 'hello bay be',
    order: 2
  },
  {
    id: 4,
    title: 'oh my goood',
    order: 3
  }
]


const LessonSentences = () => {
  const {_id} = useParams();
  const [dataSent , setDataSent] = useState<SentenceType[]>([])
  useEffect(() => {
    const getSents = async () => {
      const {data} = await listSentences()
      console.log('data', data);
      
      setDataSent(data)
    }
    getSents()
  }, [])

  return (
    <div className="">
      <div className='list__sentences'>
        <div className="item__list_sentences">
          <div className="item__content__list">
            <h3 className="title__item__content__list">
              <i className="fa-solid fa-volume-high"></i> I had a nightmare last night and I lost sleep
            </h3>
            <div className="phonetic__content">
              /aɪ hæd ə naɪt.mer læst naɪt ænd aɪ lɑːst sliːp/
            </div>
            <div className="viet__phonetic__content">
              Tối qua, tôi gặp ác mộng rồi mất ngủ luôn.
            </div>
          </div>
          <div className="item__icon__list">
            <button >
              <NavLink to={`/${_id}`}>
                <i className="fa-solid fa-chevron-right"></i>
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default LessonSentences