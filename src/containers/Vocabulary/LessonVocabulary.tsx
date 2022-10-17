import React, { useEffect, useState } from 'react'

import { NavLink, Outlet } from 'react-router-dom';
import { useSpeechSynthesis } from "react-speech-kit";
import { listVocabulary } from '../../api/vocabulary';
import MenuVocab from '../../components/VocabConponent/MenuVocab';
import { VocabulatyType } from '../../types/vocabularyType';

const LessonVocabulary = () => {
  const [dataVocab, setDataVocab] = useState<VocabulatyType[]>([])
  useEffect(()=>{
    const getVocab = async () => {
      const {data} = await listVocabulary();
      setDataVocab(data);
    }
    getVocab()
  },[])
  console.log(dataVocab);
  
  const { speaking, supported, voices, speak, resume, cancel, stop, pause } =
  useSpeechSynthesis();
  return (
    <div className='voabulary__page'>
      <div className="main__voacbulary">
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

export default LessonVocabulary