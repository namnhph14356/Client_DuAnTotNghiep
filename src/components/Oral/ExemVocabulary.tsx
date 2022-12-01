import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addVocabularySlice, getListVocabularySlice } from '../../features/Slide/vocabulary/vocabulary';
import { DayType } from '../../types/day';
import { VocabulatyType } from '../../types/vocabularyType';
import { WeekType } from '../../types/week';
import { useSpeechSynthesis } from 'react-speech-kit';
import { useForm } from 'react-hook-form';
import TimeExamWeeks from '../TimeExamWeeks';
import { message, Modal } from 'antd';
import { detailLearningProgressByUser } from '../../api/learningProgress';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { UserType } from '../../types/user';
import { editLearningProgressSlice } from '../../features/Slide/learningProgress/LearningProgress';
import { addHistorySlide } from '../../features/Slide/history/History';

const ExemVocabulary = () => {

  const dispatch = useAppDispatch()
  const auth = useSelector(((item: RootState) => item.auth.value)) as UserType
  const weeks = useAppSelector<WeekType[]>(item => item.week.value)
  const days = useAppSelector<DayType[]>(item => item.day.value)
  const [listQuestion, setListQuestion] = useState<VocabulatyType[]>([])
  const [sentencesIndex, setSentencesIndex] = useState<number>(0)
  const [history, setHistory] = useState<any>([])
  const [value, setValue] = useState<any>("")
  const [done, setDone] = useState<boolean>(false)
  const [score, setScore] = useState<number>(0)
  const [time, setTime] = useState<number>(0)
  const [numTrueCorrect, setnNumTrueCorrect] = useState<number>(0)
  const [checkSubmit, setCheckSubmit] = useState<boolean>(false)
  const [checkStopTime, setCheckStopTime] = useState<boolean>(false)
  const { weekId, dayId } = useParams();

  const { register, handleSubmit, reset } = useForm();

  const { cancel, speak, speaking, supported, voices, pause, resume } = useSpeechSynthesis();

  const listDayByWeek = days?.filter((item: DayType) => item.week?._id === weekId)

  const onSubmit = () => {
    onContinute()
  }
  const changeValue = (value: string) => {
    setValue(value)
  }

  const onContinute = () => {
    if (value === "") {
      return Modal.warning({
        title: "Chú ý",
        content: <div className=' text-sm'>
          <p>Bạn không được để câu trả lời trống</p>
        </div>,
        width: "30%",
        onOk: () => {
        }
      })
    }

    const exitsHistory = history.find(item => item.id === sentencesIndex)
    if (exitsHistory) {
      setHistory(history.map((item: any) => item.id === sentencesIndex ? { ...item, value: { question: listQuestion[sentencesIndex].meaning, answer: value } } : item))
    } else {
      if (listQuestion[sentencesIndex].words.toLocaleLowerCase() === value.toLocaleLowerCase()) {
        setHistory([...history, { id: sentencesIndex, answerCorrect: true, value: { question: listQuestion[sentencesIndex].meaning, answer: value } }])
      } else {
        setHistory([...history, { id: sentencesIndex, answerCorrect: false, value: { question: listQuestion[sentencesIndex].meaning, answer: value } }])
      }
    }
    if (sentencesIndex < listQuestion.length - 1) {
      setSentencesIndex(sentencesIndex + 1)
    } else {
      setDone(true)
    }
    setValue("")
  }

  const getSentences = async () => {
    const { payload } = await dispatch(getListVocabularySlice())
    let listVoca: VocabulatyType[] = []
    listDayByWeek.map((e) => {
      listVoca.push(...payload.filter((item: VocabulatyType) => item.dayId?._id === e._id))
    })
    setListQuestion(listVoca)
  }

  useEffect(() => {
    getSentences()
  }, [weekId])

  const onHandlerTimeResult = (value: number) => {
    setTime(300 - value)
    setCheckSubmit(true)
    if (value === 0) {
      onResultExam()
    }
  }

  const onResultExam = () => {
    const point = 10 / listQuestion.length
    const numAnswerCorrect = history.filter((e) => e.answerCorrect === true)
    const oralWeekVocabularyScore = point * numAnswerCorrect.length
    setnNumTrueCorrect(numAnswerCorrect.length)
    setScore(Math.round(oralWeekVocabularyScore * 10) / 10)
    setCheckStopTime(true)
  }

  const onFinnish = async () => {
    const { data: learningProgress } = await detailLearningProgressByUser(String(dayId), auth._id)
    if (learningProgress) {
      dispatch(editLearningProgressSlice({ ...learningProgress, oralWeekVocabularyScore: score }))
    }

    const { payload: data2 } = await dispatch(addHistorySlide({
      user: auth._id as string,
      learningProgress: learningProgress._id,
      score: score,
      totalScore: 0,
      totalCorrect: numTrueCorrect,
      result: score >= 8 ? 1 : 0,
      type: "Thi tuần (Từ vựng)"
    }))
    if (data2) {
      message.success("Chúc mừng bạn đã hoàn thành bài kiểm tra")
    }
  }


  return (
    <div>
      <div className="exem__vocabulary__quiz">

        {checkSubmit ?
          <div className="result__exam__info">
            <h1>
              Kết quả
            </h1>
            <div className='text-base '>
              <p className='font-semibold'>Số điểm :<span className={`${score >= 8 ? 'text-green-500' : 'text-red-500'} text-xl`}> {score} điểm</span></p>
            </div>
            <div className='text-base '>
              <p className='font-semibold'>Thời gian hoàn thành  :<span className='text-xl'> {time} giây</span></p>
            </div>
            <div className='text-base '>
              <p className='font-semibold'>Số câu đúng :<span className='text-xl'> {numTrueCorrect} câu</span></p>
            </div>
            <div className="btn__control__result__exem">
              <button onClick={onFinnish}>Lưu điểm</button>
              <NavLink to={`/learning/oralWeekVocabulary/${weekId}/${dayId}`}>  <button >Làm lại</button></NavLink>
              <NavLink to={'/learning'}><button>Quay lại lớp học</button></NavLink>
            </div>

          </div>
          :
          <div>
            <div className="node__excem__quiz">
              <h1>
                Bài thi Từ vựng cơ bản Tuần 1
              </h1>
              <p>
                - Hãy gõ từ hoặc cụm từ tương ứng nghĩa tiếng Việt vào ô trống và bấm Enter (hoặc click nút Câu tiếp theo) để chuyển sang câu tiếp theo.
              </p>
              <p>
                - Khi hoàn thành bài thi trước thời hạn, bạn có thể bấm nút Nộp bài để kiểm tra kết quả. Khi hết thời gian, chương trình tự động tính kết quả bất kể bạn đã làm xong bài hay chưa.                    </p>
            </div>

            <div className="exam__content__quiz">
              <div className="activity__contents">
                <table className='table__user'>
                  <tbody>

                    <tr>
                      <td className='first__col__voca text-xl'>
                        Hỏi
                      </td>
                      <td className='text-md font-bold py-8 font-mono'>
                        <div className=''>
                          <div className="flex gap-1">
                            {listQuestion.length !== 0
                              ? <button>
                                <span className='text-2xl font-semibold hover:text-[#8EC300]'>{listQuestion[sentencesIndex]?.meaning}</span>
                              </button>
                              : ""}
                          </div>

                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className='first__col__voca text-xl'>
                        Trả lời
                      </td>
                      <td>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <input type="text" value={value} onChange={(e) => changeValue(e.target.value)} disabled={done ? true : false} />
                        </form>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
              <div className='flex justify-between mt-4'>
                <div className="bnt__control__exem__quiz">
                  <button className='btn__next__quiz__voca' onClick={onContinute}>
                    Câu tiếp theo
                  </button>
                  <button disabled={done ? false : true} className={`${done ? "btn__next__quiz__voca" : ""}`} onClick={() => onResultExam()}>
                    Nộp bài
                  </button>
                </div>
                <div className="status__exem__quiz">
                  <div>Số câu : <span>{sentencesIndex + 1}/{listQuestion.length}</span></div>
                  <div className='flex  my-auto'><div className='my-auto'>Thời gian :</div> <span><TimeExamWeeks addTime={onHandlerTimeResult} seconds={300} stop={checkSubmit ? true : false} /></span></div>
                </div>
              </div>
            </div>
          </div>
        }

        <div className="lst__answered__oral__vocabulary">
          <div className=' hidden'>
            <TimeExamWeeks addTime={onHandlerTimeResult} seconds={300} stop={checkStopTime ? true : false} />
          </div>
          <div className="header__list__ansered__oral">
            <p>Danh sách các câu đã làm</p>
          </div>
          {history?.sort((a, b) => b.id - a.id).map((item) => (
            <div key={item.id} className='py-2 border-b-2 border-slate-200'>
              <div className='item__result__answerd'>
                <h2 className='mb-0'> <span> {item.id + 1} .</span> {item.value.question}</h2>
              </div>
              <div >
                <h2 className={`text-sm  font-mono font-semibold ${checkSubmit ? item.answerCorrect === true ? 'text-green-500' : 'text-red-500' : ''}`}>
                  <span>
                    {checkSubmit ? item.answerCorrect === true ?
                      <i className="fa-solid fa-check text-green-500 text-xl rounded font-bold"></i>
                      :
                      <i className="fa-solid fa-xmark text-red-500  text-xl my-auto font-bold"></i>
                      : ''}
                  </span>
                  <span className={`${checkSubmit ? 'ml-6' : 'ml-8'}`}>{item.value.answer}</span>
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div >
  )
}

export default ExemVocabulary