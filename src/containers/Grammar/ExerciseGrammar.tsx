/* eslint-disable @typescript-eslint/no-unused-vars */
import { async } from '@firebase/util'
import { Modal } from 'antd'
import Item from 'antd/lib/list/Item'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAnswerByIdQuiz } from '../../api/answerQuiz'
import { addHistory } from '../../api/history'
import { getExerciseQuizByIdPracticeActivity } from '../../api/quiz'
import { RootState } from '../../app/store'
import { AnswerQuizType, AnswerType } from '../../types/answerQuiz'
import { UserType } from '../../types/user'

// const questionQuiz = [
//   { id: 1, name: 'Where are you going ?', nghiaTV: "Không có nội dung cho mục này", goiY: "Đọc lại đi" },
//   { id: 2, name: 'How are you ?', nghiaTV: "Có nghĩa ", goiY: "Các đồ vật trong gia đình" },
// ]
// const answerQuiz = [
//   { id: "1", name: 'aaaaaaaaaaaaaa', idQuestion: "1", isCorrect: false, wordMeaning: "chữ a" },
//   { id: "2", name: 'bbbbbbbbbbbbbb', idQuestion: "1", isCorrect: false, wordMeaning: "chữ b" },
//   { id: "3", name: 'cccccccccccccc', idQuestion: "1", isCorrect: false, wordMeaning: "chữ c" },
//   { id: "4", name: 'ddddddddddddddd', idQuestion: "1", isCorrect: true, wordMeaning: "chữ d" },

//   { id: "5", name: '666666666', idQuestion: "2", isCorrect: false, wordMeaning: "so 6" },
//   { id: "6", name: '888888888888', idQuestion: "2", isCorrect: true, wordMeaning: "số 8" },
//   { id: "7", name: 'vvvvvvvvvvvvvvv', idQuestion: "2", isCorrect: false, wordMeaning: "chữ v" },
//   { id: "8", name: 'hhhhhhhh', idQuestion: "2", isCorrect: false, wordMeaning: "chữ h" },
// ]

type FormInputs = {
  username: string,
  email: string,
}

const ExerciseGrammar = () => {
  const [convertQuizz, setConvertQuizz] = useState<any>([])
  const [questionQuiz, setQuestionQuiz] = useState<any>([])
  const [answerQuiz, setAnswerQuiz] = useState<AnswerType[]>([])
  const auth = useSelector(((item: RootState) => item.auth.value)) as UserType

  const [check, setCheck] = useState(false)
  const { register, handleSubmit, formState } = useForm();
  const [openVietnameseMeaning, setOpenVietnameseMeaning] = useState<{ id: string, open: boolean }[]>([])
  const [openSuggest, setOpenSuggest] = useState<{ id: string, open: boolean }[]>([])
  const [openWordMeaning, setOpenWordMeaning] = useState<{ id: string, open: boolean }[]>([])
  const [openExplainAnswer, setOpenExplainAnswer] = useState<{ id: string, open: boolean }[]>([])
  const [point, setPoint] = useState(0)

  const { dayId, id } = useParams();

  const onSubmit = async (item: any) => {
    let num: number = 0;
    for (const key in item.ans) {
      if (item.ans[key] != "") {
        num++
      }
    }
    let countAnswer: number = questionQuiz.length;
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

    // lưu thông tin làm bài vào bảng userQuizz
    const arr: any = []
    arr.push()

    const { totalCorrect, score } = calculatePoints(convertQuizz)
    setCheck(true)
    // console.log("convertQuizz", convertQuizz);
    // console.log(auth, id);
    // console.log("dayId", dayId, totalCorrect);
    const { data: history } = await addHistory({
      user: auth,
      learningProgress: '6346d455034348adfcfce594',
      practiceActivity: id,
      score: point,
      totalScore: 0,
      totalCorrect: totalCorrect,
      result: score >= questionQuiz.length ? 1 : 0,
      type: 5
    })

    console.log("history", history);
    

  }

  const calculatePoints = (array: any) => {
    const soDiem1cau = 10 / questionQuiz.length
    let index = array.filter((val) => val.isCorrect === true);
    const point = soDiem1cau * index.length
    setPoint(point)
    return { totalCorrect: index.length, score: point }
  }

  const changeValueQuiz = (e: any, answer: any) => {
    const exist = convertQuizz.find((item) => item.quiz == answer.quiz)
    if (exist) {
      return
    }
    console.log(answer);
    console.log(convertQuizz);
    setConvertQuizz([...convertQuizz, answer])

  }

  const checkOpen = (open: boolean, nameTask: string, statusId: string) => {
    if (nameTask === "openVietnameseMeaning") {
      setOpenVietnameseMeaning(openVietnameseMeaning.map((item: any) => String(item.id) === statusId ? { open: open, id: item.id } : item))
    }
    if (nameTask === "openSuggest") {
      setOpenSuggest(openSuggest.map((item: any) => String(item.id) === statusId ? { id: item.id, open: open } : item))
    }
    if (nameTask === "openWordMeaning") {
      setOpenWordMeaning(openWordMeaning.map((item: any) => String(item.id) === statusId ? { open: open, id: item.id } : item))
    }
    if (nameTask === "openExplainAnswer") {
      if (!check) {
        return Modal.warning({
          title: "Chú ý",
          content: <div className=' text-sm'>
            <p>Bạn phải hoàn thành 2 bước sau trước khi có thể xem [Giải thích đáp án]: </p>
            <ul className='font-bold list-disc'>
              <li>Hoàn thành tất cả các câu hỏi</li>
              <li>[Nộp bài]</li>
            </ul>
          </div>,
          width: "30%",
          onOk: () => {
          }
        })
      }
      setOpenExplainAnswer(openExplainAnswer.map((item: any) => String(item.id) === statusId ? { open: open, id: item.id } : item))
    }
  }

  const arrayVietNamMeaning = (question: any) => {
    let arr: any = [];
    question.forEach((e: any) => {
      arr.push({ id: e._id, open: false })
    })
    setOpenVietnameseMeaning(arr)
    setOpenSuggest(arr)
    setOpenWordMeaning(arr)
    setOpenExplainAnswer(arr)
  }

  const remake = () => {
    Modal.confirm({
      title: "Bạn có thật sự muốn làm lại ?",
      onOk: () => {
        setConvertQuizz([])
        setCheck(false)
        const input = document.querySelectorAll(".inputAnswer")
        input.forEach((e: any) => {
          e.checked = false
        });
        // dispatch(logout(auth))
        // message.success("Đăng xuất thành công")
      }
    })
  }

  const getListQuestion = async () => {
    if (id) {
      const { data } = await getExerciseQuizByIdPracticeActivity(id)
      arrayVietNamMeaning(data)
      setQuestionQuiz(data)

      let arr: any = []
      data.map(async (item: any, index) => {
        const { data: answer } = await getAnswerByIdQuiz(item._id)
        answer.map((e) => {
          const findIndex = answerQuiz.findIndex((elem) => elem._id === e._id)
          if (findIndex === -1) {
            arr.push(e)
          }
        })
        setAnswerQuiz([...answerQuiz, ...arr])
      })
    }
  }

  useEffect(() => {
    getListQuestion();
  }, [id, dayId])

  return (
    <div>
      <form className="content__conversation" onSubmit={handleSubmit(onSubmit)} >
        <div className=''>
          {
            check &&
            <p className='font-bold text-center text-lg'>Kết quả của bạn: <span className={`ml-2 rounded py-1 px-3 ${point >= 5 ? 'bg-green-600' : 'bg-red-600'}  text-white`}>{point} / 10 điểm</span></p>
          }
        </div>
        <div className='mx-4 my-8 '>
          <div className='divide-y-2 divide-gray-400 space-y-4'>
            {questionQuiz.map((item, index) => {
              const findVietnameseMeaning = openVietnameseMeaning.filter((e) => String(e.id) === String(item._id))
              const findSuggest = openSuggest.filter((e) => String(e.id) === String(item._id))
              const findWordMeaning = openWordMeaning.filter((e) => String(e.id) === String(item._id))
              const findExplainAnswer = openExplainAnswer.filter((e) => String(e.id) === String(item._id))
              return (
                <div className='py-4' key={item._id}>

                  {/* question */}
                  <div className='text-base flex font-medium space-x-4 mx-auto'>
                    <div >
                      <span className='bg-gray-400 px-2 mr-3 rounded'> {index + 1}</span>
                      <span> {item.question}</span>
                    </div>
                    <span >{convertQuizz.length > 0 && check == true ?
                      convertQuizz[index].isCorrect == true ?
                        <i className="fa-solid fa-check text-green-500 text-xl rounded font-bold"></i>
                        :
                        <i className="fa-solid fa-xmark text-red-500  text-xl my-auto "></i>
                      : ""
                    }
                    </span>
                  </div>

                  {/* gợi ý */}
                  <div className='space-y-4 ml-10 my-2'>
                    {
                      openVietnameseMeaning.length > 0 &&
                      findVietnameseMeaning[0].open &&
                      <div className='border-l-8 border-l-orange-500 border-y border-r px-4 pt-3 pb-2 relative'>
                        <div>
                          <div className='text-orange-500 font-semibold'>Nghĩa tiếng việt</div>
                          <div className='text-xs'>{item.meaning}</div>
                        </div>
                        <div className='absolute top-2 right-4 '>
                          <i className="fa-solid fa-xmark hover:text-orange-500" onClick={() => setOpenVietnameseMeaning(openVietnameseMeaning?.map((e: any) => e.id === item._id ? { open: false, id: e.id } : e))}></i>
                        </div>
                      </div>
                    }

                    {
                      openSuggest.length > 0 &&
                      findSuggest[0].open &&
                      <div className='border-l-8 border-l-orange-500 border-y border-r px-4 pt-3 pb-2 relative'>
                        <div>
                          <div className='text-orange-500 font-semibold'>Gợi í cách làm</div>
                          <div className='text-xs'>{item.suggestions}</div>
                        </div>
                        <div className='absolute top-2 right-4 '>
                          <i className="fa-solid fa-xmark hover:text-orange-500" onClick={() => setOpenSuggest(openSuggest.map((e: any) => e.id === item._id ? { id: e.id, open: false } : e))}></i>
                        </div>
                      </div>
                    }
                  </div>

                  {/* answer */}
                  <ul className='mb-0 ml-10'>
                    {
                      answerQuiz.map((e, index) => {

                        let answer: any = []
                        if (check == true) {
                          const find = convertQuizz.filter((ans) => ans._id == e._id)
                          answer.push(...find)
                        }
                        if (e.quiz == item._id) {
                          return (
                            <div className='even:bg-slate-100 '>
                              <li key={e._id} className={` ${answer.length > 0 && answer[0].quiz == e.quiz ? answer[0]._id == e._id && e.isCorrect == false ? "bg-[#FBE1DB]" : "" : ""} ${check == true && e.isCorrect == true ? "bg-[#CCF0A5]" : ""}    hover:cursor-pointer  font-sans   `} >
                                <div className='grid grid-cols-3 gap-4 divide-x-8 divide-gray-400'>
                                  <div className='flex gap-2  py-2 px-5'>
                                    <input type="radio" id={e.answer} name={String(item._id)} onChange={(em) => changeValueQuiz(em, e)} value={e.answer} className="inputAnswer" />
                                    <label className='align-middle mt-[-2px]' htmlFor={e.answer}>{e.answer}</label>
                                  </div>

                                  {
                                    openWordMeaning.length > 0 &&
                                    findWordMeaning[0].open &&
                                    <div className='flex gap-2  py-2 px-5'>
                                      <span className='align-middle mt-[-2px] font-semibold'>{e.wordMeaning}</span>
                                    </div>
                                  }
                                  {
                                    openExplainAnswer.length > 0 &&
                                    check &&
                                    findExplainAnswer[0].open &&
                                    <div className='flex gap-2  py-2 px-5'>
                                      <span className='align-middle mt-[-2px] font-semibold'>{e.explainAnswer}</span>
                                    </div>
                                  }
                                </div>
                              </li>
                            </div>
                          )
                        }
                      })
                    }
                  </ul>

                  {/* view */}
                  <div className='flex justify-end space-x-2 my-4'>
                    <div><span><i className="fa-solid fa-eye font-medium"></i> </span> Xem: </div>
                    <div>
                      <ul className='p-0  divide-x'>
                        <li className={`${findVietnameseMeaning[0]?.open ? 'bg-orange-500 hover:bg-orange-600 text-white' : "text-blue-500 hover:bg-gray-200"} inline-block px-2  cursor-pointer `} onClick={() => checkOpen(!findVietnameseMeaning[0]?.open, "openVietnameseMeaning", String(item._id))}><span> Nghĩa Tiếng Việt</span></li>
                        <li className={`${findSuggest[0]?.open ? 'bg-orange-500 hover:bg-orange-600 text-white' : "text-blue-500 hover:bg-gray-200"} inline-block px-2  cursor-pointer `} onClick={() => checkOpen(!findSuggest[0]?.open, "openSuggest", String(item._id))} ><span>Gợi í cách làm</span></li>
                        <li className={`${findWordMeaning[0]?.open ? 'bg-orange-500 hover:bg-orange-600 text-white' : "text-blue-500 hover:bg-gray-200"} inline-block px-2  cursor-pointer `} onClick={() => checkOpen(!findWordMeaning[0]?.open, "openWordMeaning", String(item._id))}><span>Ngữ nghĩa / Từ loại</span></li>
                        <li className={`${findExplainAnswer[0]?.open && check ? 'bg-orange-500 hover:bg-orange-600 text-white' : "text-blue-500 hover:bg-gray-200"} inline-block px-2  cursor-pointer `} onClick={() => checkOpen(!findExplainAnswer[0]?.open, "openExplainAnswer", String(item._id))}><span>Giải thích đáp án</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex px-8 space-x-4" >
          <button className='px-4 py-1 bg-[#4F46E5] text-white rounded'>Nộp bài</button>
          <div className='px-4 py-1 bg-[#4F46E5] text-white rounded cursor-pointer' onClick={remake}>Làm lại </div>
        </div>
      </form>
    </div>
  )
}

export default ExerciseGrammar