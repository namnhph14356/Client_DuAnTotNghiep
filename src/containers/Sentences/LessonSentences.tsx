import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { listSentencesByIdActivity } from '../../api/sentence'
import { SentenceType } from '../../types/sentence'


const arraySentences = [
  {
    _id: 1,
    title: 'I had a nightmare last night and I lost sleep 1',
    order: 1
  },
  {
    _id: 2,
    title: 'hello bay be',
    order: 2
  },
  {
    _id: 4,
    title: 'oh my goood',
    order: 3
  }
]


const LessonSentences = () => {
  const { dayId, id } = useParams();
  const [dataSent, setDataSent] = useState<any>([])

  const getSents = async () => {
    if (id) {
      const { data } = await listSentencesByIdActivity(String(id))
      setDataSent(data)
    }
  }
  useEffect(() => {
    getSents()
  }, [])

  return (
    <div className="">
      <div className='list__sentences '>
        {dataSent.map((item) => (
          <div className="item__list_sentences ">
            <div className="item__content__list">
              <h3 className="title__item__content__list">
                <i className="fa-solid fa-volume-high"></i> {item.words}
              </h3>
              <div className="phonetic__content">
                {item.phoneticTranscription}
              </div>
              <div className="viet__phonetic__content">
                {item.meaning}
              </div>
            </div>
            <div className="item__icon__list">
              <button >
                <NavLink to={`/learning/${dayId}/detailLearning/${id}/sentences/lesson/${item._id}`} className="text-black" >
                  <i className="fa-solid fa-chevron-right"></i>
                </NavLink>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export default LessonSentences