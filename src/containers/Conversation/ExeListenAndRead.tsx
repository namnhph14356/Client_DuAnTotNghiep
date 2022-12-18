/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-globals */
import '../../css/conversation.css'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import '../../css/writeAndListen.css'
import { useSpeechSynthesis } from 'react-speech-kit';
import { getListQuestionListenWriteById } from '../../api/questionListenWrite';
import { listAnswerListenWriteById } from '../../api/answerListenWrite';
import { ListenWriteType, QuestionAnswerListenWriteType } from '../../types/listenWrite';
import Loading from '../../components/Loading';
import { getListenWriteByActivitySlice } from '../../features/Slide/listenWrite/ListenWriteSlice';
import { useAppDispatch } from '../../app/hooks';

const ExeListenAndRead = () => {
  const listenWrite = useSelector((item: any) => item.listenWrite.value);
  const [listQuestionAnswer, setListQuestionAnswer] = useState<QuestionAnswerListenWriteType[]>([]);
  const [conversation, setConversation] = useState<ListenWriteType>()
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [checkPause, setCheckPause] = useState(false)
  const [checkMeaning, setCheckMeaning] = useState(false)
  const { speaking, supported, voices, speak, resume, cancel, stop, pause } = useSpeechSynthesis();
  const [listText, setListText] = useState<any>([])


  const btListenWrite = async () => {
    const { payload } = await dispatch(getListenWriteByActivitySlice(String(id)))
    setConversation(payload)
  }

  useEffect(() => {
    if (id) {
      btListenWrite();
    }
  }, [id])


  const onStartAudio = async (value: any, index: number) => {
    const audio: any = document.getElementById("audio1");
    const firstItem = value?.alternatives[0].words[0]
    audio.startTime = firstItem.startTime.seconds
    audio.endTime = value.resultEndTime.seconds
    audio.currentTime = firstItem.startTime.seconds

    setCheckPause(true)
    checkColorSpeech(value, index)
    await audio.play()

  }

  const onTimeUpdate = async () => {
    const audio: any = document.getElementById("audio1");
    let speech: any = document.querySelectorAll("#speech");
    let iconAudio: any = document.querySelectorAll("#iconAudio");

    if (Math.floor(audio.currentTime) === Number(audio.endTime)) {
      speech.forEach((element, i) => {
        speech[i].style.color = "black";
        iconAudio[i].style.display = "block"
      });
      setCheckPause(false)
      await audio.pause()
    }
  }

  const onPause = async () => {
    const audio: any = document.getElementById("audio1");
    let speech: any = document.querySelectorAll("#speech");
    let iconAudio: any = document.querySelectorAll("#iconAudio");
    speech.forEach((element, i) => {
      speech[i].style.color = "black";
      iconAudio[i].style.display = "block"
    });
    setCheckPause(false)
    await audio.pause()
  }

  const convertText = (text: String) => {
    if (text.charAt(0) === " ") {
      return text.charAt(1).toUpperCase() + text.slice(2).toLowerCase();
    }
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  const checkColorSpeech = (text: any, index: number) => {
    let speech: any = document.querySelectorAll("#speech");
    let iconAudio: any = document.querySelectorAll("#iconAudio");

    if (convertText(text.alternatives[0].beforeQuestion).toLowerCase() === speech[index]?.innerHTML.toLowerCase()) {
      speech[index].style.color = "orange";
      iconAudio.forEach((element, i) => {
        if (i !== index) {
          iconAudio[i].style.display = "none"
        }
      });
    }
  }

  return (
    <div className='conversation__page'>
      {conversation ?
        <div className="main__conversation">
          <form className="content__conversation"  >
            <div className='mx-4 pb-8'>
              <audio
                id='audio1'
                className='w-full rounded-none'
                controls={true}
                onTimeUpdate={onTimeUpdate}
                src={`${listenWrite?.audio}`}>
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            </div>

            <div className='mx-4 pb-8'>
              {/* <div className='mb-4 float-right'>
                <div className='border px-3 rounded bg-gray-200 font-medium cursor-pointer hover:border-slate-400' onClick={() => setCheckMeaning(!checkMeaning)}>
                  {
                    checkMeaning ? 'Ẩn tiếng việt' : 'Hiện tiếng việt'
                  }
                </div>
              </div> */}
              <div>
              <div className="content">
                {
                  conversation?.conversation?.response?.results.map((item: any, index: number) => {

                    return (
                      <div key={index + 1} className="hover:cursor-pointer grid grid-cols-12 gap-8 w-full px-4 py-3 even:bg-slate-100"  >
                        <div className='col-span-2 flex justify-between gap-4 my-auto'>
                          <strong className='my-auto'>Long: </strong>
                          {
                            checkPause ?
                              <span id='iconAudio' key={index + 1} onClick={onPause}><i className="fa-sharp fa-solid fa-circle-pause text-green-500 text-lg"></i></span>
                              :
                              <span id='iconAudio' key={index + 1} onClick={() => onStartAudio(item, index)}><i className="fa-solid fa-circle-play text-green-500 text-lg"></i></span>
                          }
                        </div>
                        <div className='col-span-10 my-auto'>
                          <span id='speech' key={index + 1} className='text-base'>{ (item.alternatives[0].beforeQuestion) }</span>
                          {
                            checkMeaning ?
                              <div className='text-sm text-gray-500'>Nghĩa tiếng việt</div>
                              : ""
                          }
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              </div>
            </div>

            <div className='mx-4 pb-8'>
              <div className='text-xl font-bold'>Phân tích cấu trúc</div>
              <div className='px-4 mt-4' dangerouslySetInnerHTML={{ __html: `${conversation.structure}` }}></div>
            </div>
          </form>

        </div>
        :
        <Loading />

      }
    </div>
  )
}

export default ExeListenAndRead