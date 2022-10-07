/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react'
import { listVocabulary } from '../api/vocabulary';
import NavDeatil from '../components/NavDeatil'
import "../css/vocabulary.css";
import { VocabulatyType } from '../types/vocabularyType';
import { useSpeechSynthesis } from "react-speech-kit";

const Vocabulary = () => {
  
  const [dataVocab, setDataVocab] = useState<VocabulatyType[]>([])

  useEffect(()=>{
    const getVocab = async () => {
      const {data} = await listVocabulary();
      setDataVocab(data);
    }
    getVocab()
  },[])

  console.log(dataVocab);
  
  const backPage = () => {
    history.back();
  }
  const { speaking, supported, voices, speak, resume, cancel, stop, pause } =
  useSpeechSynthesis();
  return (
    <div className='voabulary__page'>
      <div className="main__voacbulary">
        <div className="w-full bg-indigo-600 px-4 py-2">
          <div className='flex gap-4'>
            <div className='my-auto' onClick={backPage}>
              <i className="fa-solid fa-angle-left text-5xl text-white font-bold cursor-pointer"></i>
            </div>
            <div className='my-auto'>
              <div className='text-xl uppercase text-white'>Luyện Từ Vựng</div>
              <div className='text-white'>00 Điểm</div>
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
            <button className="btn__start__speaking">
              <i className="fa-solid fa-book"></i> Khởi động
            </button>
            <button className="btn__comment__speaking">
              <i className="fa-solid fa-pen-to-square mr-1"></i>Bài tập
            </button>
            <button className="btn__comment__speaking">
            <i className="fa-solid fa-pencil"></i>Ghi chú
            </button>
            <button className="btn__comment__speaking">
              <i className="fa-solid fa-comments"></i> Hỏi và đáp
            </button>

          </div>
        </div>
        <div className="content__vocabualry">
        {dataVocab?.map((item, index)=>{
              return <div className="list__item__vocabulary">
              <div className="img__vocabulary">
                <img src={item.image} alt="" />
              </div>
              <div className="info__vocabulary">
                <div className="item__vocabulary">
                  <button className='title__vocabulary__item'  onClick={() =>
                        speak({
                          text: item.words,
                          rate: 0.5,
                          pitch: 0.7,
                          voice: voices[2],
                        })
                      }>

                    <i className="fa-solid fa-volume-high"></i>
                    {item.words} <span>{item.pa}</span>
                  </button>
                  <p>
                    {item.meaning}
                  </p>
                  <span>(intransitive/transitive verb) to telephone someone</span>
                </div>
                <div className="item__exemple__vocabulary">
  
                  <p>
  
                    <i className="fa-solid fa-volume-high"></i>
                      
                    {item.example}
                  </p>
                  <span>
                    Gọi điện cho tôi khi bạn đến đó nhé.
                  </span>
                </div>
              </div>
            </div>
            })}
        </div>
      </div>
    </div>
  )
}

export default Vocabulary
