import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import '../../css/chooseClass.css'
import { addLearningProgressSlice, getLearningProgressByUserSlice } from '../../features/Slide/learningProgress/LearningProgress'
import { LearningProgressType } from '../../types/learningProgress'
import { UserType } from '../../types/user'

const ChooseClass = () => {
  const learningProgress = useAppSelector<LearningProgressType[]>(item => item.learningProgress.value)
  const { dayId } = useParams();
  const dispatch = useAppDispatch();
  const auth = useSelector(((item: RootState) => item.auth.value)) as UserType
  let listLearningProgressByDay = learningProgress?.find((e: any) => e.day?._id === dayId)
  console.log("listLearningProgressByDay", listLearningProgressByDay);


  const colorProgress = (percent: number) => {
    let html = ""
    switch (percent) {
      case 0:
        html = ""
        break;
      case 1:
        html = "bg-red-500"
        break;
      case 2:
        html = "bg-orange-500"
        break;
      case 3:
        html = "bg-[#F89201]"
        break;
      case 4:
        html = "bg-[#F6B600]"
        break;
      case 5:
        html = "bg-[#FCFB2D]"
        break;
      case 6:
        html = "bg-[#CBE426]"
        break;
      case 7:
        html = "bg-[#62AA2D]"
        break;
      case 8:
        html = "bg-[#028CCA]"
        break;
      case 9:
        html = "bg-[#0244FC] text-[#fff]"
        break;
      case 10:
        html = "bg-[#4F46E5] text-[#fff]"
        break;
      default:
        break;
    }
    // if (percent === 1 || percent === 2) {
    //   html = "bg-red-500"
    // } else if (percent === 3 || percent === 4) {
    //   html = "bg-orange-500"
    // } else if (percent === 5 || percent === 6) {
    //   html = "bg-yellow-500"
    // } else if (percent === 7 || percent === 8) {
    //   html = "bg-green-500"
    // } else if (percent === 9 || percent === 10) {
    //   html = "bg-blue-500"
    // }
    return html
  }

  useEffect(() => {
    dispatch(getLearningProgressByUserSlice(auth._id))
  }, [])

  const checkPoint = (point: number) => {
    if (point === 0) {
      return `${point}%`
    } else {
      return `${point}0%`
    }
  }

  return (
    <div>

      <div className='p-4 pb-8 border shadow-lg '>
        <div className='text-xl mb-4'>TIẾN ĐỘ LÀM BÀI</div>
        <div className='border py-4 bg-[#F8F8F8] px-4 '>

          <div className='pb-4'>
            <div className='font-semibold'>Luyện nghe nói phản xạ:</div>
            {/* <progress color='#fff' max="10" value="5" >long chanh thôn</progress> */}
            <div className="container22">
              <div className={`${colorProgress(Number(listLearningProgressByDay?.listeningSpeakingScore))} skills w-[${listLearningProgressByDay?.listeningSpeakingScore}0%]`}>
                {checkPoint(Number(listLearningProgressByDay?.listeningSpeakingScore))}
              </div>
            </div>
          </div>

          <div className='pb-4'>
            <div className='font-semibold'>Luyện từ vựng:</div>
            <div className="container22">
              <div className={`${colorProgress(Number(listLearningProgressByDay?.vocabularyScore))} skills w-[${listLearningProgressByDay?.vocabularyScore}0%]`}>
                {checkPoint(Number(listLearningProgressByDay?.vocabularyScore))}
              </div>
            </div>
          </div>

          <div className='pb-4'>
            <div className='font-semibold'>Luyện cấu trúc và câu:</div>
            <div className="container22">
              <div className={`${colorProgress(Number(listLearningProgressByDay?.structureSentencesScore))} skills w-[${listLearningProgressByDay?.structureSentencesScore}0%]`}>
                {checkPoint(Number(listLearningProgressByDay?.structureSentencesScore))}
              </div>
            </div>
          </div>

          <div className='pb-4'>
            <div className='font-semibold'>Luyện hội thoại:</div>
            <div className="container22">
              <div className={`${colorProgress(Number(listLearningProgressByDay?.conversationScore))} skills w-[${listLearningProgressByDay?.conversationScore}0%]`}>
                {checkPoint(Number(listLearningProgressByDay?.conversationScore))}
              </div>
            </div>
          </div>

          <div className='pb-4'>
            <div className='font-semibold'>Luyện ngữ pháp:</div>
            <div className="container22">
              <div className={`${colorProgress(Number(listLearningProgressByDay?.grammarScore))}  skills w-[${listLearningProgressByDay?.grammarScore}0%]`}>
                {checkPoint(Number(listLearningProgressByDay?.grammarScore))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ChooseClass
