import React, { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getCategoryList } from '../features/Slide/category/CategorySlide'
import '../css/learning.css'
import moment from 'moment';
import { ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon } from '@heroicons/react/20/solid'
import { Progress, Button, Modal, Collapse } from 'antd';
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ArrowPathIcon, CheckIcon, ChevronDownIcon, ChevronUpDownIcon, DocumentTextIcon, EllipsisHorizontalIcon, HomeIcon, LockClosedIcon, ShieldCheckIcon, UserPlusIcon } from '@heroicons/react/20/solid'
import { ShoppingBag } from 'heroicons-react'
import { getListMonthSlice } from '../features/Slide/month/MonthSlice'
import { getListWeekSlice, getListWeekSliceByMonth } from '../features/Slide/week/WeekSlice'
import { getListDaySlice, getListDaySliceByWeek } from '../features/Slide/day/DaySlice'
import { MonthType } from '../types/month'
import { WeekType } from '../types/week'
import { DayType } from '../types/day'
import { LearningProgressType } from '../types/learningProgress'
import { addLearningProgressSlice, editLearningProgressSlice, getLearningProgressByUserSlice } from '../features/Slide/learningProgress/LearningProgress'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { UserType } from '../types/user'
import { detailHistory, listHistoryByUser } from '../api/history'
import { HistoryType } from '../types/history'




const item = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
  { id: 7, name: 'Caroline Schultz' },
  { id: 8, name: 'Mason Heaney' },
  { id: 9, name: 'Claudie Smitham' },
  { id: 10, name: 'Emil Schaefer' },
]

const people = [
  { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const Learning = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const months = useAppSelector<MonthType[]>(item => item.month.value)
  const weeks = useAppSelector<WeekType[]>(item => item.week.value)
  const days = useAppSelector<DayType[]>(item => item.day.value)
  const learningProgress = useAppSelector<LearningProgressType[]>(item => item.learningProgress.value)
  const user = useSelector(((item: RootState) => item.auth.value)) as UserType
  const [userHistory, setUserHistory] = useState<any>()
  console.log("userHistory", userHistory)
  const [monthSelect, setMonthSelect] = useState<MonthType | null>()
  const [weekSelect, setWeekSelect] = useState<WeekType | null>()
  const [daySelect, setDaySelect] = useState<DayType | null>()
  const [learningProgressSelect, setLearningProgressSelect] = useState<LearningProgressType | null>()
  const weeks2 = weeks.filter((item: WeekType) => item.month === monthSelect?._id)
  const days2 = days.filter((item: DayType) => item.week === weekSelect?._id)


  //---ModalResult---
  //Hiện Modal kết quả
  const { Panel } = Collapse;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [history, setHistory] = useState<any>([]);

  const showModal = async () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //---ModelCollapse---
  const onChange = (key: string | string[]) => {
  };

  const findSmallestOrder = (data, id) => {
    const temp = data?.filter((item: WeekType) => item.month === id)
    const minPrice = Math.min(...temp.map(({ order }) => order))
    const smallestOrder = temp.find(({ order }: any) => minPrice === order)
    return smallestOrder
  }

  const onHandleAddProgress = () => {
    dispatch(addLearningProgressSlice({ day: daySelect?._id, user: user._id }))
    navigate(`/learning/${daySelect?._id}/detailLearning`)
  }

  useEffect(() => {
    dispatch(getLearningProgressByUserSlice(user._id))
    dispatch(getListMonthSlice())
    dispatch(getListWeekSlice())
    dispatch(getListDaySlice())
    const flag = months.reduce(function (prev, current) {
      return (prev.order < current.order) ? prev : current
    })
    const temp = weeks?.filter((item: WeekType) => item.month === flag._id).reduce(function (prev, current) {
      return (prev.order < current.order) ? prev : current
    })
    const day: any = days.find((item: DayType) => item.week === temp._id)
    setMonthSelect(months?.reduce(function (prev, current) {
      return (prev.order < current.order) ? prev : current
    }))
    setWeekSelect(temp)
    setDaySelect(day)

    if (learningProgress.length === 0) {
      setLearningProgressSelect(null)
    } else {
      setLearningProgressSelect(learningProgress.find((item: any) => item.day === day?._id || item.day._id === day?._id))
    }
    if (learningProgress.length !== 0) {
      const lastLearningProgress: any = learningProgress[learningProgress.length - 1]
      const lastDay: any = days.find((item: DayType) => item._id === lastLearningProgress.day || item._id === lastLearningProgress.day._id)
      const nextDay: any = days.find((item: DayType) => item.order === lastDay?.order + 1)

      if (lastLearningProgress.conversationScore >= 8 && lastLearningProgress.listeningSpeakingScore >= 8 && lastLearningProgress.structureSentencesScore >= 8 && lastLearningProgress.vocabularyScore >= 8 && lastLearningProgress.grammarScore >= 8 && lastLearningProgress.isPass === false) {
        dispatch(editLearningProgressSlice({ ...lastLearningProgress, isPass: true }))
        dispatch(addLearningProgressSlice({ day: nextDay?._id, user: user._id }))
      }
    }


    const getHistoryUser = async () => {
      const { data } = await listHistoryByUser(user._id)
      console.log("data getHistoryUser", data)
      const test2 = await Promise.all(data.map(async (item: HistoryType, index) => {
        const { data } = await detailHistory(item._id)
        return data
      }))
      setUserHistory(test2.reverse())
    }
    getHistoryUser()
  }, [])

  return (
    <div className='learning__page'>
      <div className="box__learning">
        <div>
          <button className="box__learning__title">
            Lớp học tiếng anh giao tiếp 360
          </button>
        </div>
        <div className="content__learning">
          <div className='desc__content__learning'>
            {monthSelect?.title}
          </div>
          <div className="learning__time">
            <div className='box__learning__time'>
              <div className="learning__btn__time">
                <div className="item__btn__time">
                  <Menu as="div" className="relative inline-block text-left ">
                    <div>
                      <Menu.Button className="relative flex w-full py-2 pr-4 text-base font-semibold text-left text-indigo-600 cursor-default sm:text-lg">
                        {`Chặng ${monthSelect?.order}`} <span className='h-full my-auto'><ChevronDownIcon className='w-5 h-5' /></span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 ml-5 mt-[2px] mr-2 w-56 origin-top-right divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                        {months.map((item: MonthType, index: number) => (
                          <Menu.Item >
                            {({ active }) => (
                              <p
                                className={classNames(
                                  active ? 'bg-green-100 text-gray-900' : 'text-gray-700',
                                  'group flex items-center px-5 mb-0 pr-3 py-2 text-sm cursor-pointer'
                                )}
                                onClick={() => {
                                  setMonthSelect(item)
                                  setWeekSelect(findSmallestOrder(weeks, item?._id))
                                }}
                              >

                                {`Chặng ${item?.order}`}
                              </p>
                            )}
                          </Menu.Item>
                        ))}


                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="item__btn__time">
                  <Menu as="div" className="relative inline-block text-left ">
                    <div>
                      <Menu.Button className="relative flex w-full py-2 pr-4 text-base font-semibold text-left text-indigo-600 cursor-default sm:text-lg">
                        {weekSelect ? weekSelect.title : "Tuần 1"} <span className='h-full my-auto'><ChevronDownIcon className='w-5 h-5' /></span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 ml-5 mt-[2px] mr-2 w-56 origin-top-right divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                        {weeks2.map((item: WeekType) => (

                          <Menu.Item >
                            {({ active }) => (
                              <p
                                className={classNames(
                                  active ? 'bg-green-100 text-gray-900' : 'text-gray-700',
                                  'group flex items-center px-5 mb-0 pr-3 py-2 text-sm cursor-pointer'
                                )}
                                onClick={() => { setWeekSelect(item) }}
                              >

                                {item.title}
                              </p>
                            )}
                          </Menu.Item>

                        ))}


                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="item__btn__time">
                  <Menu as="div" className="relative inline-block text-left ">
                    <div>
                      <Menu.Button className="relative flex w-full py-2 pr-4 text-base font-semibold text-left text-indigo-600 cursor-default sm:text-lg">
                        {daySelect ? daySelect.title : "Ngày 1"} <span className='h-full my-auto'><ChevronDownIcon className='w-5 h-5' /></span>
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 ml-5 mt-[2px] mr-2 w-56 origin-top-right divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {days2.map((item: DayType, index: number) => (

                          <Menu.Item >
                            {({ active }) => (
                              <p
                                className={classNames(
                                  active ? 'bg-green-100 text-gray-900' : 'text-gray-700',
                                  'group flex items-center px-5 mb-0 pr-3 py-2 text-sm cursor-pointer'
                                )}
                                onClick={() => {
                                  setDaySelect(item)
                                  if (index === 0) {
                                    if (learningProgress.length === 0) {
                                      setLearningProgressSelect(null)
                                    } else {
                                      setLearningProgressSelect(learningProgress.find((item2: any) => item2.day === item._id || item2.day._id === item._id))
                                    }
                                  } else {
                                    setLearningProgressSelect(learningProgress.find((item2: any) => item2.day === item._id || item2.day._id === item._id))
                                  }
                                }}
                              >
                                {item.title}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="learning__page__time">
                <div className=" sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <div className="inline-flex -space-x-px rounded-md shadow-sm isolate" aria-label="Pagination">
                      {days2.map((item: DayType, index: number) => {
                        if (item._id === daySelect?._id) {
                          return <button
                            key={index + 1}
                            className="relative z-10 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 border focus:z-20"
                            onClick={() => {
                              setDaySelect(item)
                              if (index === 0) {
                                if (learningProgress.length === 0) {
                                  setLearningProgressSelect(null)
                                } else {
                                  setLearningProgressSelect(learningProgress.find((item2: any) => item2.day === item._id || item2.day._id === item._id))
                                }
                              } else {
                                setLearningProgressSelect(learningProgress.find((item2: any) => item2.day === item._id || item2.day._id === item._id))
                              }
                            }}
                          >
                            {item.order}
                          </button>
                        } else {
                          return <button
                            key={index + 1}
                            className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 focus:z-20"
                            onClick={() => {
                              setDaySelect(item)
                              if (index === 0) {
                                if (learningProgress.length === 0) {
                                  setLearningProgressSelect(null)
                                } else {
                                  setLearningProgressSelect(learningProgress.find((item2: any) => item2.day === item._id || item2.day._id === item._id))
                                }
                              } else {
                                setLearningProgressSelect(learningProgress.find((item2: any) => item2.day === item._id || item2.day._id === item._id))
                              }
                            }}
                          >
                            {item.order}
                          </button>
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${learningProgressSelect !== undefined ? "" : "!hidden"} statistical__learning__time`}>
              <div className="statistical__topic__learning">
                <div className='statistical__topic__learning__title'>
                  <ul>
                    <li>Nghe nói phản xạ: </li>
                    <li>Từ vựng: </li>
                    <li>Cấu trúc và câu: </li>
                    <li>Hội thoại:</li>
                    <li>Ngữ pháp: </li>
                  </ul>
                </div>
                <div className="statistical__topic__learning__point">
                  {learningProgressSelect
                    ? <ul>
                      <li>{learningProgressSelect.listeningSpeakingScore}</li>
                      <li>{learningProgressSelect.vocabularyScore}</li>
                      <li>{learningProgressSelect.structureSentencesScore}</li>
                      <li>{learningProgressSelect.conversationScore}</li>
                      <li>{learningProgressSelect.grammarScore}</li>
                    </ul>
                    : <ul>
                      <li>0</li>
                      <li>0</li>
                      <li>0</li>
                      <li>0</li>
                      <li>0</li>
                    </ul>}
                </div>
              </div>

              <div className="btn__learning__statistical">
                {learningProgressSelect
                  ? <NavLink to={`/learning/${daySelect?._id}/detailLearning`} className='btn__start__statistical text-white hover:text-white'>
                    Bắt đầu học
                  </NavLink>
                  : <button className='btn__start__statistical text-white hover:text-white' onClick={onHandleAddProgress}>
                    Bắt đầu học
                  </button>
                }
                <button className='btn__exam__statistical'>
                  <NavLink to={`/learning/oral/${daySelect?._id}`} className='text-white hover:text-white'>
                    Thi Oral ngày
                  </NavLink>
                </button>
              </div>
            </div>
          </div>

          <div className="total__learning">
            <p className='font-semibold text-cyan-700'>
              Lịch sử các nội dung bạn đã làm:
            </p>
            {/* <Collapse defaultActiveKey={1} onChange={onChange}>
              {userHistory?.map((item: any, index: number) => {
                return <Panel
                  key={index + 1}
                  showArrow={false}
                  header={
                    <div key={index + 1} className="flex flex-row justify-between gap-4">
                      <div className="">{moment(item.history.createdAt).format("H:mm:ss, Do/MM/YYYY")}</div>
                      <div className="">{item.category?.title}</div>
                      <div className="">{item.history?.totalCorrect}/9</div>
                      <div className="">{item.history.result === 0 ? "Fail" : "Pass"}</div>
                    </div>
                  }
                >
                  <table className='table__list__result'>
                    <thead>
                      <tr>
                        <th className='m-auto'>Câu trả lời chính xác</th>
                        <th className='m-auto'>Câu trả lời của bạn</th>
                        <th className='m-auto'>Thời gian</th>
                        <th>Điểm</th>
                        <th>Kết quả</th>
                      </tr>
                    </thead>
                    <tbody className='body__table__result '>
                      {item.userQuiz.map((item2: any, index: number) => {
                        return <tr key={index + 1} className="">
                          <td className="">{item2.answerQuiz ? item2.correctAnswer.answer : item2.quiz?.question?.toLowerCase().replace("?", "").trim()}</td>
                          <td className="">{item2.answerQuiz ? item2.answerQuiz.answer : item2.answer}</td>
                          <td className="">{item2.time}</td>
                          <td className="">{Math.round(item2.point)}</td>
                          <td>
                            {item2.answerQuiz?.isCorrect === item2.correctAnswer?.isCorrect || item2.answer === item2.quiz?.question.toLowerCase().replace("?", "").trim()
                              ? <i className="fa-solid fa-thumbs-up result__correct__icon"></i>
                              : <i className="fa-solid fa-circle-xmark result__wrong__icon"></i>}
                          </td>
                        </tr>
                      })}

                    </tbody>
                    <tfoot className='border-t'>
                      <tr className='result__medium'>
                        <td>Kết quả:</td>
                        <td> </td>
                        <td>{item.history?.totalCorrect}/9</td>
                        <td>{item.history.totalPoint}</td>
                        <td>{item.history.result === 0 ? "Fail" : "Pass"}</td>
                      </tr>
                    </tfoot>
                  </table>
                </Panel>
              })}
            </Collapse> */}
          </div>
        </div>
      </div>

      <div className="box__buy__source">
        <h3 className="title__buy__source">
          <ShoppingBag className='w-5 h-5' />  Lớp học tiếng Anh giao tiếp 360
        </h3>
        <p>
          350,000 ĐỒNG / <span>360 ngày sử dụng</span>
        </p>
        <button className='btn__buy__coures__cart'>
          thanh toán
        </button>
      </div>
    </div>
  )
}

export default Learning