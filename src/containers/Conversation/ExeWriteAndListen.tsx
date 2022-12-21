/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-globals */
import '../../css/conversation.css'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import {  useParams } from 'react-router-dom';
import { getListenWriteByActivitySlice, getListenWriteById, getListListenWrite } from '../../features/Slide/listenWrite/ListenWriteSlice';
import '../../css/writeAndListen.css'
import { ListenWriteType, QuestionAnswerListenWriteType } from '../../types/listenWrite';
import { message, Modal } from 'antd';
import Loading from '../../components/Loading';
import { addHistory } from '../../api/history';
import { RootState } from '../../app/store';
import { UserType } from '../../types/user';
import { LearningProgressType } from '../../types/learningProgress';
import { editLearningProgressSlice } from '../../features/Slide/learningProgress/LearningProgress';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UserQuizType } from '../../types/userQuiz';
import { addUserQuizSlide } from '../../features/Slide/userQuiz/UserQuiz';
import { detailLearningProgressByUser } from '../../api/learningProgress';
import { getListQuizSlide } from '../../features/Slide/quiz/QuizSlide';
import { QuizType } from '../../types/quiz';
import { detailPracticeActivity } from '../../api/practiceActivity';
import { AnswerQuizType } from '../../types/answerQuiz';
import { getAnswerByIdQuiz } from '../../api/answerQuiz';
import { getListAnswerListenWriteSlide } from '../../features/Slide/answerListenWrite/answerListenWrite';


const ExeWriteAndListen = () => {
  const listenWrite = useSelector((item: any) => item.listenWrite.value);
  const quizs = useAppSelector(item => item.quiz.value)
  const [conversation, setConversation] = useState<ListenWriteType>()
  const [answerListenWrite, setAnswerListenWrite] = useState<any>()
  const [questionQuiz, setQuestionQuiz] = useState<QuizType[]>([])
  const [answerQuiz, setAnswerQuiz] = useState<AnswerQuizType[]>([])
  const [listQuestionAnswer, setListQuestionAnswer] = useState<QuestionAnswerListenWriteType[]>([]);
  const { register, handleSubmit, formState, reset } = useForm();
  const dispatch = useAppDispatch();
  const { id, dayId } = useParams();
  const [check, setCheck] = useState(false)
  const [checkPause, setCheckPause] = useState(false)
  const [point, setPoint] = useState(0)
  const [convertValues, setConvertValues] = useState<any>([])
  const [convertQuizz, setConvertQuizz] = useState<any>([])
  const [checkMeaning, setCheckMeaning] = useState(false)
  const auth = useSelector(((item: RootState) => item.auth.value)) as UserType
  const [learningProgress, setLearningProgress] = useState<LearningProgressType>()
  const [listText, setListText] = useState<any>([])
  
  const listQuiz = quizs.filter((e: QuizType) => e.practiceActivity?._id === id && e.practiceActivity?.type === "conversation")

  const onSubmit2 = async (item: any) => {
    let num: number = 0;
    for (const key in item.ans) {
      if (item.ans[key] != "") {
        num++
      }
    }

    let countAnswer: number = questionQuiz.length + answerListenWrite.length;

    let countAnswerUser = num + convertQuizz.length
    if (countAnswerUser < countAnswer) {
      return Modal.warning({
        title: "Chú ý",
        content: <div className=' text-sm'>
          <p>Bạn phải hoàn thành tất cả các câu trước khi [Nộp bài] !</p>
          <div className='font-bold'>Số câu chưa hoàn thành: {countAnswer - countAnswerUser}</div>
        </div>,
        width: "30%",
        onOk: () => {
        }
      })
    }

    // check answer listenWrite
    let convertValues2: any = [];
    for (let key in item.ans) {
      const idQuestion = key.split("-")[1];
      const keyQuestion = key.split("-")[2];
      //   tách chuỗi key (inputAnswer-62ff6998b77f3ffb3d4ec7c3-1) rồi lấy phần tử thứ 2 (62ff6998b77f3ffb3d4ec7c3)
      convertValues2 = [...convertValues2, {
        idQuestion,
        keyQuestion,
        answerUser: item.ans[key],
        answerCorrect: "",
        isCorrect: false
      },]
    }
    let numAnswer = 0;

    answerListenWrite.map((item: any, key: number) => {
      if (item.answer.toLowerCase().replaceAll(" ", "") === convertValues2[key].answerUser.toLowerCase().replaceAll(" ", "") && String(item.index) === convertValues2[key].keyQuestion && convertConfidence(item.confidence) === convertValues2[key].idQuestion) {
        convertValues2[key].isCorrect = true;
        convertValues2[key].answerCorrect = convertValues2[key].answerUser
        numAnswer += 1
      } else {
        convertValues2[key].isCorrect = false;
        convertValues2[key].answerCorrect = item.answer
      }
    })

    const quizTrueAnswer = convertQuizz.filter((item) => item.isCorrect === true)
    const score = pointResult(numAnswer + quizTrueAnswer.length, convertQuizz.length + answerListenWrite.length)
    setConvertValues(convertValues2)
    setCheck(true)
    const { data: history } = await addHistory({
      user: auth._id,
      learningProgress: learningProgress?._id,
      practiceActivity: id,
      score: score,
      totalScore: 0,
      totalCorrect: numAnswer + quizTrueAnswer.length,
      result: score >= 8 ? 1 : 0,
      type: "conversation"
    })

    for (let index = 0; index < convertQuizz.length; index++) {
      const flag: UserQuizType = {
        quiz: convertQuizz[index].quiz as string,
        answer: convertQuizz[index].answer as string,
        history: history._id,
        time: "0",
        point: 0
      }
      await addUserQuizSlide(flag)
    }

    const { payload } = await dispatch(editLearningProgressSlice({
      _id: learningProgress?._id,
      listeningSpeakingScore: learningProgress?.listeningSpeakingScore as number,
      vocabularyScore: learningProgress?.vocabularyScore as number,
      structureSentencesScore: learningProgress?.structureSentencesScore as number,
      conversationScore: score,
      grammarScore: learningProgress?.grammarScore as number,
      oralScore: learningProgress?.oralScore as number,
      isPass: false,
      day: dayId as string,
      user: auth._id as string
    }))
    message.success("Chúc mừng bạn đã hoàn thành bài thi !")
  }

  const pointResult = (totalCorrect: number, lengthQuestion: number) => {
    const score = Math.round(10 / lengthQuestion * totalCorrect)
    setPoint(score)
    return score
  }

  const checkAnswerIscorrect = (id: any, key: any) => {
    let className = "";
    convertValues.forEach(e => {
      if (e.idQuestion == convertConfidence(id) && key == e.keyQuestion) {
        if (e.isCorrect == true) {
          className = "text__result__correct"
        } else {
          className = "red text__result__wrong"
        }
      }
    });
    return className
  }

  const btListenWrite = async () => {
    const { payload } = await dispatch(getListenWriteByActivitySlice(String(id)))
    if (payload) {
      const { payload: answer } = await dispatch(getListAnswerListenWriteSlide(payload._id))

      if (answer) {
        setAnswerListenWrite(convertAnswer(answer))
      }
    }
    setConversation(payload)
  }

  const convertAnswer = (answerList: any) => {
    const newAr: any = [...answerList]
    newAr.sort((a, b) => Number(a.stt) - Number(b.stt) || a.order - b.order)

    const newLi = newAr.reduce((pre: any, next: any) => {
      const index = pre.filter((item) => item.stt === next.stt)
      if (index.length === 0) {
        pre.push({
          ...next, index: 1
        })
      } else {
        pre.push({
          ...next, index: index[index.length - 1].index + 1
        })
      }
      return pre
    }, [])
    console.log("newLi", newLi);
    
    return newLi

  }

  const getLearningProgressByUser = async () => {
    const { data } = await detailLearningProgressByUser(String(dayId), auth._id)
    setLearningProgress(data);
  }

  const getListQuestion = async () => {
    if (id) {
      const { data } = await detailPracticeActivity(String(id), String(auth._id))
      setQuestionQuiz(data.quizs)

      let arr: AnswerQuizType[] = []
      data.quizs.map(async (item: QuizType, index) => {
        const { data: answer } = await getAnswerByIdQuiz(String(item._id))
        answer.map((e) => {
          const findIndex = answerQuiz.findIndex((elem: AnswerQuizType) => elem._id === e._id)
          if (findIndex === -1) {
            arr.push(e)
          }
        })
        setAnswerQuiz([...answerQuiz, ...arr])
      })
    }
  }

  useEffect(() => {
    if (id) {
      dispatch(getListQuizSlide())
      dispatch(getListListenWrite())
      btListenWrite();
      getLearningProgressByUser()
      getListQuestion()
    }
  }, [convertValues, convertQuizz, id])

  const changeValueQuiz = (e: any, answer: any) => {
    if (convertQuizz.length > 0) {
      const exist = convertQuizz.find((item) => String(item.quiz) == answer.quiz)
      if (exist) {
        convertQuizz.map((element) => {
          if (element.quiz == answer.quiz && element.answer !== answer.answer) {
            setConvertQuizz(convertQuizz.map((a) => a.quiz === answer.quiz ? answer : a))
          }
        })
        return
      }
      setConvertQuizz([...convertQuizz, answer])
    } else {
      setConvertQuizz([...convertQuizz, answer])
    }
  }

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

  const convertConfidence = (text: number) => {
    return String(text).replaceAll(".", "0")
  }

  const checkColorSpeech = (text: any, index: number) => {
    let speech: any = document.querySelectorAll("#speech");
    let iconAudio: any = document.querySelectorAll("#iconAudio");

    speech[index].style.color = "orange";
    iconAudio.forEach((element, i) => {
      if (i !== index) {
        iconAudio[i].style.display = "none"
      }
    });
  }

  const reStart = () => {
    setConvertValues([])
    setConvertQuizz([])
    const input = document.querySelectorAll(".inputAnswer");
    input.forEach((e: any) => {
      e.checked = false
    });
    const inp__text: any = document.querySelectorAll(".inp__text")
    inp__text.forEach((e: any) => {
      e.value = ""
    });
    
    reset([])
    setCheck(false)
    setPoint(0)
  }

  return (
    <div className='conversation__page'>
      {listQuiz.length > 0 ?
        <div className="main__conversation">
          <form className="content__conversation" onSubmit={handleSubmit(onSubmit2)} >
            <div className='mx-4 '>
              <audio
                id='audio1'
                className='w-full rounded-none'
                controls={true}
                onTimeUpdate={onTimeUpdate}
                src={`${conversation?.audio}`}>
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            </div>

            {check &&
              <div className='text-center font-bold mt-5'>
                Kết quả của bạn: <span className={`px-2 py-1 text-white rounded ml-2 ${point >= 8 ? 'bg-green-500' : 'bg-red-500'}`}>{point} / 10</span>
              </div>
            }

            <div className='mx-4 my-8 '>
              <div className=' text-lg border-b'>
                <div><i className="fa-solid fa-pen"></i> Nghe và trả lời câu hỏi.</div>
              </div>
              <div>
                {questionQuiz.map((item: QuizType, index) => {
                  return (
                    <div className='py-4' key={item._id}>
                      <div className='text-base flex font-medium space-x-4 mx-auto'>
                        <div >{index + 1}. {item.question}</div>
                        <span >{convertQuizz.length > 0 && check == true ?
                          convertQuizz[index].isCorrect == true ?
                            <i className="fa-solid fa-check text-green-500 text-xl rounded font-bold"></i>
                            :
                            <i className="fa-solid fa-xmark text-red-500  text-xl my-auto "></i>
                          : ""
                        }
                        </span>
                      </div>
                      <ul className='mb-0 '>
                        {
                          answerQuiz.map((e: AnswerQuizType, index) => {
                            const answer: any = []
                            if (check == true) {
                              const find = convertQuizz.filter((ans) => ans._id === e._id)
                              answer.push(...find)
                            }

                            if (e.quiz === item._id) {
                              return (
                                // even:bg-slate-100
                                <div className='even:bg-slate-100 ' key={e._id}>
                                  <li key={e._id} className={`${answer.length > 0 && answer[0].quiz == e.quiz ? answer[0]._id == e._id && e.isCorrect == false ? "bg-[#FBE1DB]" : "" : ""} ${check == true && e.isCorrect == true ? "bg-[#CCF0A5]" : ""}  py-2 px-4  font-sans flex gap-2  `} >
                                    <input type="radio" className='inputAnswer' id={e._id} name={String(item._id)} onChange={(em) => changeValueQuiz(em, e)} value={e.answer} />
                                    <label className='align-middle mt-[-2px] w-full hover:cursor-pointer' htmlFor={e._id}>{e.answer}</label>
                                  </li>
                                </div>
                              )
                            }
                          })
                        }
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className='mx-4 py-8 '>
              <div className='mb-4 text-lg border-b'>
                <div><i className="fa-solid fa-pen"></i> Nghe và điền vào chỗ trống.</div>
              </div>

              <div className='float-right'>
                {/* <div className='border px-3 rounded bg-gray-200 font-medium cursor-pointer hover:border-slate-400' onClick={() => setCheckMeaning(!checkMeaning)}>
                  {
                    checkMeaning ? 'Ẩn tiếng việt' : 'Hiện tiếng việt'
                  }
                </div> */}
              </div>

              <div className="content">
                {
                  conversation?.conversation?.response?.results.map((item: any, index: number) => {

                    const quesToArr = item.alternatives[0].transcript.split("___");
                    var tempQues: any = [];
                    quesToArr.forEach((item2: any, index2: number) => {
                      if (index2 < quesToArr.length - 1) {
                        tempQues.push(<span>{item2}</span>, check == true ?
                          <input key={index2 + 1} className={`inp__text ${checkAnswerIscorrect(item.alternatives[0].confidence, index2 + 1)}`} {...register(`ans.inputAnswer-${convertConfidence(item.alternatives[0].confidence)}-${index2 + 1}`)} disabled />
                          : <input key={index2 + 1} className="inp__text bg-transparent" {...register(`ans.inputAnswer-${convertConfidence(item.alternatives[0].confidence)}-${index2 + 1}`)} />)
                      } else {
                        tempQues.push(<span key={index2 + 1}>{item2}</span>)
                      }
                    })

                    return (
                      <div key={index + 1} className="hover:cursor-pointer grid grid-cols-12 gap-8 w-full px-4 py-3 even:bg-slate-100"  >
                        <div className='col-span-2 flex justify-between gap-4 my-auto'>
                          <strong className='my-auto'>{item.name}: </strong>
                          {
                            checkPause ?
                              <span id='iconAudio' key={index + 1} onClick={onPause}><i className="fa-sharp fa-solid fa-circle-pause text-green-500 text-lg my-auto"></i></span>
                              :
                              <span id='iconAudio' key={index + 1} onClick={() => onStartAudio(item, index)}><i className="fa-solid fa-circle-play text-green-500 text-lg my-auto"></i></span>
                          }
                        </div>
                        <div className='col-span-10 my-auto'>
                          <span id='speech' key={index + 1} className='text-base'>{quesToArr.length == 1 ? convertText(item.alternatives[0].transcript) : tempQues}</span>
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

            <div className="btn__Check__answer" >
              <button type='button' disabled={check ? false : true} className="cursor-pointer" onClick={() => reStart()} style={{ background: `${check ? "#4F46E5" : "#7D88F1"}`, color: `${check ? "white" : "black"}` }}>Làm lại </button>
              <button disabled={check ? true : false} className={`${check ? "bg-[#7D88F1] text-black" : "bg-indigo-600 text-white"} cursor-pointer`}>Nộp bài</button>
            </div>
          </form>
        </div>
        :
        <Loading />
      }
    </div>
  )
}

export default ExeWriteAndListen