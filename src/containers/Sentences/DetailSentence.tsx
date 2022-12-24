/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { SentenceType } from '../../types/sentence'
import parse from "html-react-parser";
import { useSpeechSynthesis } from 'react-speech-kit';
import { detailSentences, listSentences } from '../../api/sentences';
import { audioSpeak } from '../../utils/audio';
import Loading from '../../components/Loading';

const DetailSentence = () => {
  const { dayId, id, idDetailSentence } = useParams();
  const { speaking, supported, voices, speak } = useSpeechSynthesis();
  const [sentence, setSenstence] = useState<SentenceType>()
  const [listSentence, setListSentence] = useState<SentenceType[]>([])
  const [order, setOrder] = useState<any>()
  const [openGrammarAnalysis, setOpenGrammarAnalysis] = useState(false)

  const listLesson = async () => {
    const { data } = await listSentences();
    setListSentence(data)
    if (!sentence) {
      const find = data.findIndex((e) => e._id === idDetailSentence)
      setOrder(find)
    }
  }

  const reSetOrder = () => {
    setSenstence(listSentence[order])
  }
  
  useEffect(() => {
    listLesson()
    reSetOrder()
  }, [idDetailSentence, order])

  return (
    <div >
      {
        sentence ?
          <div className="content__detail__sentences">
            <div>
              <NavLink to={`/learning/${dayId}/detailLearning/${id}/sentences/lesson`}>
                <button className='btn__close__sentences'>
                  Quay lại
                </button>
              </NavLink>

              <button onClick={() => setOrder(order - 1)} className={`btn__pre__sentences ${order <= 0 ? 'bg-blue-400 hover:bg-blue-400' : ''}`} disabled={order <= 0 ? true : false}>
                Câu trước
              </button>
              <button onClick={() => setOrder(order + 1)} className={`btn__pre__sentences ${order >= listSentence.length - 1 ? 'bg-blue-400 hover:bg-blue-400' : ''}`} disabled={order >= listSentence.length - 1 ? true : false}>
                Câu sau
              </button>
            </div>
            <div className="content__detail__main">
              <div className="topic__sentence">
                <h3 className="title__topic__sentence">
                  <i className="fa-solid fa-volume-high cursor-pointer" onClick={() => audioSpeak(sentence?.words, false)}></i> {sentence?.words}
                </h3>
                <p className='phonetic__vn__sentence'>
                  {sentence?.phoneticTranscription}
                </p>
                <p className="phonetic__vn__sentence">
                  {sentence?.meaning}
                </p>
              </div>
              <div className="phonetic__content__detail my-4">
                <div className="">
                  <p>
                    <span>ÂM VÀ TỔ HỢP ÂM CẦN CHÚ Ý LUYỆN TẬP</span>
                  </p>
                  <div className='table__item__spelling'>
                    {sentence?.soundCombinations.map((item, index: number) => (
                      <div className='grid grid-cols-8 gap-4 px-2 py-1 '>
                        <div className='col-span-1 font-bold'>
                          <i className="fa-solid fa-volume-high cursor-pointer" onClick={() => speak({ text: item.sound, rate: 1, pitch: 1, voice: voices[1] })}></i> {item.sound}:
                        </div>
                        <div className='col-span-7 flex space-x-4'>
                          {item.combinations.map((e, index: number) => (
                            <div key={index + 1}>
                              <i className="fa-solid fa-volume-high cursor-pointer" onClick={() => speak({ text: e, rate: 1, pitch: 1, voice: voices[2] })}></i> {e}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="structural__analysis__detail">
              <h3 className="title__structural">
                PHÂN TÍCH CẤU TRÚC
              </h3>
              <div className="content__structural">
                {sentence && parse(sentence?.structuralAnalysis)}
              </div>
            </div>

            {openGrammarAnalysis ?
              <div className="structural__analysis__detail">
                <h3 className="title__structural">
                  PHÂN TÍCH NGỮ PHÁP
                </h3>
                <div className="content__structural">
                  {sentence && parse(sentence?.grammarAnalysis)}
                </div>

                <div className='my-4'>
                  <button className='hover:text-blue-600' onClick={() => setOpenGrammarAnalysis(false)}>Thu gọn ▲ </button>
                </div>
              </div>
              :
              <div className='my-4'>
                <button className='hover:text-blue-600' onClick={() => setOpenGrammarAnalysis(true)}>Phân tích thêm ▼</button>
              </div>
            }

            <div>
              <button onClick={() => setOrder(order - 1)} className={`btn__pre__sentences ${order <= 0 ? 'bg-blue-400 hover:bg-blue-400' : ''}`} disabled={order <= 0 ? true : false}>
                Câu trước
              </button>
              <button onClick={() => setOrder(order + 1)} className={`btn__pre__sentences ${order >= listSentence.length - 1 ? 'bg-blue-400 hover:bg-blue-400' : ''}`} disabled={order >= listSentence.length - 1 ? true : false}>
                Câu sau
              </button>
            </div>
          </div>
          :
          <Loading />
      }
    </div >
  )
}

export default DetailSentence