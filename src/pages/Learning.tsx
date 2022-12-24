import React, { useEffect, useMemo } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import "../css/learning.css";
import { Progress, Button, Modal, Collapse } from "antd";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Helmet } from "react-helmet";
import {
  ArrowPathIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  DocumentTextIcon,
  EllipsisHorizontalIcon,
  HomeIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import { getListMonthSlice } from "../features/Slide/month/MonthSlice";
import {
  getListWeekSlice,
  getListWeekSliceByMonth,
} from "../features/Slide/week/WeekSlice";
import {
  getListDaySlice,
  getListDaySliceByWeek,
} from "../features/Slide/day/DaySlice";
import { MonthType } from "../types/month";
import { WeekType } from "../types/week";
import { DayType } from "../types/day";
import { LearningProgressType } from "../types/learningProgress";
import {
  addLearningProgressSlice,
  editLearningProgressSlice,
  getLearningProgressByUserSlice,
} from "../features/Slide/learningProgress/LearningProgress";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { UserType } from "../types/user";
import { detailHistory, listHistoryByUser } from "../api/history";
import { HistoryType } from "../types/history";
import BoxPayment from "../components/Payment/BoxPayment";
import { PracticeActivityType } from "../types/practiceActivity";
import { getListPracticeActivitylice } from "../features/Slide/practiceActivity/PracticeActivitySlice";
import { currentUserSlice } from "../features/Slide/auth/authSlide";
import PopupPayment from "../components/Payment/PopupPayment";
import { checkAccents } from '../utils/checkAccents';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Learning = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let months = useAppSelector<MonthType[]>((item) => item.month.value);
  let weeks = useAppSelector<WeekType[]>((item) => item.week.value);
  let days = useAppSelector<DayType[]>((item) => item.day.value);
  let activity = useAppSelector((item) => item.practiceActivity.value);
  let learningProgress = useAppSelector<LearningProgressType[]>(
    (item) => item.learningProgress.value
  );
  const user = useSelector((item: RootState) => item.auth.value) as UserType;

  const [userHistory, setUserHistory] = useState<any>();
  const [monthSelect, setMonthSelect] = useState<MonthType | null>();
  const [weekSelect, setWeekSelect] = useState<WeekType | null>();
  const [daySelect, setDaySelect] = useState<DayType | null>();
  const [listDay, setListDay] = useState<DayType[]>([]);
  const [listWeek, setListWeek] = useState<WeekType[]>([]);
  const [lastDay, setLastDay] = useState<DayType>();
  const [isModal, setIsModal] = useState(false);

  const handlonClick = () => {
    setIsModal((prevState) => !prevState);
  };

  const [learningProgressSelect, setLearningProgressSelect] =
    useState<LearningProgressType | null>();
  const weeks2 = listWeek.filter(
    (item: WeekType) => item.month === monthSelect?._id
  );
  let days2 = listDay?.filter(
    (item: DayType) => item.week?._id === weekSelect?._id
  );

  const getListDay = () => {
    if (days) {
      const arr: DayType[] = [];
      days.map((item) => {
        const activityByDay = activity.filter(
          (e: PracticeActivityType) => e.day === item._id && e.status === true
        );
        if (activityByDay.length >= 4) {
          arr.push(item);
        }
      });
      const arrWeek: WeekType[] = [];
      weeks.map((item) => {
        const lengthWeek = arr.filter((e) => e.week?._id === item._id);
        if (lengthWeek.length > 0) {
          arrWeek.push(item);
        }
      });

      setListDay(arr);
      setListWeek(arrWeek);
    }
  };

  const onHandleSelectWeek = (value: any) => {
    setWeekSelect(value);
    const day: any = days.find((item: DayType) => item.week?._id === value._id);
    setDaySelect(day);
    if (learningProgress.length === 0) {
      setLearningProgressSelect(null);
    } else {
      setLearningProgressSelect(
        learningProgress.find(
          (item2: any) => item2.day === day._id || item2.day?._id === day?._id
        )
      );
    }
  };

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
  const onChange = (key: string | string[]) => { };

  const findSmallestOrder = (data, id) => {
    const temp = data?.filter((item: WeekType) => item.month === id);
    const minOrder = Math.min(...temp.map(({ order }) => order));
    const smallestOrder = temp.find(({ order }: any) => minOrder === order);
    const day: any = days.find(
      (item: DayType) => item.week?._id === smallestOrder._id
    );
    setDaySelect(day);
    if (learningProgress.length === 0) {
      setLearningProgressSelect(null);
    } else {
      setLearningProgressSelect(
        learningProgress.find(
          (item2: any) => item2.day === day._id || item2.day?._id === day?._id
        )
      );
    }
    return smallestOrder;
  };

  const onHandleAddProgress = async () => {
    const { payload } = await dispatch(
      addLearningProgressSlice({ day: daySelect?._id, user: user._id })
    );
    if (payload) {
      navigate(`/learning/${daySelect?._id}/detailLearning`);
    }
  };

  const getHistoryUser = async () => {
    const { data } = await listHistoryByUser(user._id);

    // const test2 = await Promise.all(data.map(async (item: HistoryType, index) => {
    //   const { data } = await detailHistory(item._id)
    //   return data
    // }))
    // setUserHistory(test2.reverse())

    setUserHistory(data);
  };
  const getList = async () => {
    const { payload: listDay } = await dispatch(getListDaySlice());
    getLearning(listDay, user);
  };

  useEffect(() => {
    dispatch(getListMonthSlice());
    dispatch(getListWeekSlice());
    dispatch(getListPracticeActivitylice());
    getHistoryUser();
    dispatch(currentUserSlice());
    getList();
  }, []);

  useEffect(() => {
    getListDay();
    if (months.length > 0 && weeks.length > 0 && days.length > 0) {
      const flag = months?.reduce(function (prev, current) {
        return prev.order < current.order ? prev : current;
      });

      const temp = weeks
        ?.filter((item: WeekType) => item.month === flag._id)
        .reduce(function (prev, current) {
          return prev.order < current.order ? prev : current;
        });
      const day: any = days.find(
        (item: DayType) => item.week?._id === temp._id
      );
      setMonthSelect(flag);
      setWeekSelect(temp);
      setDaySelect(day);
    }
  }, [months, weeks, days, activity, user]);

  const getLearning = async (listDay: DayType[], user: UserType) => {
    if (listDay && user) {
      const { payload: learningProgress } = await dispatch(
        getLearningProgressByUserSlice(user._id)
      );
      const learningUser = learningProgress.find((item: any) => item.day === listDay[0]?._id || item.day._id === listDay[0]?._id) || null
      setLearningProgressSelect(learningUser);

      if (learningProgress.length !== 0) {
        const lastLearningProgress: any = learningProgress[learningProgress.length - 1];
        const lastDay: any = days.find(
          (item: DayType) =>
            item._id === lastLearningProgress.day ||
            item._id === lastLearningProgress?.day?._id
        );
        const nextDay: any = days.find(
          (item: DayType) => item.order === lastDay?.order + 1
        );
        const lastDayWeek = days.filter((e: any) => e.week._id === lastLearningProgress.day.week)
        if (lastLearningProgress.day._id === lastDayWeek[lastDayWeek.length - 1]._id) {
          if (
            lastLearningProgress.conversationScore >= 8 &&
            lastLearningProgress.listeningSpeakingScore >= 8 &&
            lastLearningProgress.structureSentencesScore >= 8 &&
            lastLearningProgress.vocabularyScore >= 8 &&
            lastLearningProgress.grammarScore >= 8 &&
            lastLearningProgress.oralWeekVocabularyScore >= 8 &&
            lastLearningProgress.structureSentencesScore >= 8 &&
            lastLearningProgress.isPass === false
          ) {
            dispatch(
              editLearningProgressSlice({ ...lastLearningProgress, isPass: true })
            );
            dispatch(
              addLearningProgressSlice({ day: nextDay?._id, user: user._id })
            );
          }
        } else if (
          lastLearningProgress.conversationScore >= 8 &&
          lastLearningProgress.listeningSpeakingScore >= 8 &&
          lastLearningProgress.structureSentencesScore >= 8 &&
          lastLearningProgress.vocabularyScore >= 8 &&
          lastLearningProgress.grammarScore >= 8 &&
          lastLearningProgress.isPass === false
        ) {
          dispatch(
            editLearningProgressSlice({ ...lastLearningProgress, isPass: true })
          );
          dispatch(
            addLearningProgressSlice({ day: nextDay?._id, user: user._id })
          );
        }
      }
    }
  };

  const lastDayInWeek = (day: DayType, week: WeekType) => {
    const lastDay = days.filter((e: any) => e.week._id === week._id)
    if (day._id === lastDay[lastDay.length - 1]._id) {
      setLastDay(lastDay[lastDay.length - 1])
    } else {
      setLastDay(undefined)
    }
  }

  useMemo(() => {
    if (daySelect && weekSelect) {
      lastDayInWeek(daySelect, weekSelect)
    }
  }, [daySelect, weekSelect])

  const checkDay7 = (weekId: string) => {
    const listDays = days.filter((item: DayType) => item.week?._id === weekId);
    return listDays[listDays.length - 1];
  };

  return (
    <div className="learning__page">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Lớp Học Tiếng Anh Giao Tiếp Online Vian English</title>
      </Helmet>
      <div className="box__learning">
        <div>
          <button className="box__learning__title">
            Lớp học tiếng anh giao tiếp 360
          </button>
        </div>
        <div className="content__learning">
          <div className="desc__content__learning">
            360 ngày làm quen với giao tiếp tiếng Anh
          </div>
          <div className="learning__time">

            <div className="box__learning__time">

              <div className="learning__btn__time">
                <div className="item__btn__time">
                  <Menu as="div" className="relative inline-block text-left ">
                    <div>
                      <Menu.Button className="relative flex w-full py-2 pr-4 text-base font-semibold text-left text-indigo-600 cursor-default sm:text-lg">
                        {`Chặng ${monthSelect?.order}`}{" "}
                        <span className="h-full my-auto">
                          <ChevronDownIcon className="w-5 h-5" />
                        </span>
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
                      <Menu.Items className="absolute left-0 z-10 mt-[2px] mr-2 w-56 origin-top-right divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {months.map((item: MonthType, index: number) => {
                          const listMonth = listWeek.filter(
                            (e: WeekType) => e.month === item._id
                          );
                          return (
                            <div key={index + 1}>
                              {listMonth.length > 0 && (
                                <Menu.Item key={index + 1}>
                                  {({ active }) => (
                                    <p
                                      className={classNames(
                                        active
                                          ? "bg-green-100 text-gray-900"
                                          : "text-gray-700",
                                        "group flex items-center px-5 mb-0 pr-3 py-2 text-sm cursor-pointer"
                                      )}
                                      onClick={() => {
                                        setMonthSelect(item);
                                        setWeekSelect(
                                          findSmallestOrder(weeks, item?._id)
                                        );
                                      }}
                                    >
                                      {`Chặng ${item?.order}`}
                                    </p>
                                  )}
                                </Menu.Item>
                              )}
                            </div>
                          );
                        })}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="item__btn__time">
                  <Menu as="div" className="relative inline-block text-left ">
                    <div>
                      <Menu.Button className="relative flex w-full py-2 pr-4 text-base font-semibold text-left text-indigo-600 cursor-default sm:text-lg">
                        {weekSelect ? weekSelect.title : "Tuần 1"}{" "}
                        <span className="h-full my-auto">
                          <ChevronDownIcon className="w-5 h-5" />
                        </span>
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
                      <Menu.Items className="absolute left-0 z-10 mt-[2px] mr-2 w-56 origin-top-right divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {weeks2.map((item: WeekType, indexWeek: number) => {
                          return (
                            <div key={indexWeek + 1}>
                              <Menu.Item key={indexWeek + 1}>
                                {({ active }) => (
                                  <p
                                    className={classNames(
                                      active
                                        ? "bg-green-100 text-gray-900"
                                        : "text-gray-700",
                                      "group flex items-center px-5 mb-0 pr-3 py-2 text-sm cursor-pointer"
                                    )}
                                    onClick={() => {
                                      onHandleSelectWeek(item);
                                    }}
                                  >
                                    {item.title}
                                  </p>
                                )}
                              </Menu.Item>
                            </div>
                          );
                        })}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
                <div className="item__btn__time">
                  <Menu as="div" className="relative inline-block text-left ">
                    <div>
                      <Menu.Button className="relative flex w-full py-2 pr-4 text-base font-semibold text-left text-indigo-600 cursor-default sm:text-lg">
                        {daySelect ? daySelect.title : "Ngày 1"}{" "}
                        <span className="h-full my-auto">
                          <ChevronDownIcon className="w-5 h-5" />
                        </span>
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
                      <Menu.Items className="absolute left-0 z-10 mt-[2px] mr-2 w-56 origin-top-right divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {days2.map((item: DayType, index: number) => {
                          return (
                            <div key={index + 1}>
                              {
                                <Menu.Item>
                                  {({ active }) => (
                                    <p
                                      className={classNames(
                                        active
                                          ? "bg-green-100 text-gray-900"
                                          : "text-gray-700",
                                        "group flex items-center px-5 mb-0 pr-3 py-2 text-sm cursor-pointer"
                                      )}
                                      onClick={() => {
                                        setDaySelect(item);
                                        if (index === 0) {
                                          if (learningProgress.length === 0) {
                                            setLearningProgressSelect(null);
                                          } else {
                                            setLearningProgressSelect(
                                              learningProgress.find(
                                                (item2: any) =>
                                                  item2.day === item._id ||
                                                  item2.day?._id === item?._id
                                              )
                                            );
                                          }
                                        } else {
                                          setLearningProgressSelect(
                                            learningProgress.find(
                                              (item2: any) =>
                                                item2.day === item?._id ||
                                                item2.day?._id === item?._id
                                            )
                                          );
                                        }
                                      }}
                                    >
                                      {item.title}
                                    </p>
                                  )}
                                </Menu.Item>
                              }
                            </div>
                          );
                        })}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>

              <div className="learning__page__time">
                <div className=" sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <div
                      className="inline-flex -space-x-px rounded-md shadow-sm isolate"
                      aria-label="Pagination"
                    >
                      {days2.map((item: DayType, index: number) => {
                        if (item._id === daySelect?._id) {
                          return (
                            <button
                              key={index + 1}
                              className="relative z-10 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 border focus:z-20"
                              onClick={() => {
                                setDaySelect(item);
                                if (index === 0) {
                                  if (learningProgress.length === 0) {
                                    setLearningProgressSelect(null);
                                  } else {
                                    setLearningProgressSelect(
                                      learningProgress.find(
                                        (item2: any) =>
                                          item2.day === item._id ||
                                          item2.day?._id === item?._id
                                      )
                                    );
                                  }
                                } else {
                                  setLearningProgressSelect(
                                    learningProgress.find(
                                      (item2: any) =>
                                        item2.day === item._id ||
                                        item2.day?._id === item?._id
                                    )
                                  );
                                }
                              }}
                            >
                              {item.order}
                            </button>
                          );
                        } else {
                          return (
                            <button
                              key={index + 1}
                              className="relative inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 focus:z-20"
                              onClick={() => {
                                setDaySelect(item);
                                if (index === 0) {
                                  if (learningProgress.length === 0) {
                                    setLearningProgressSelect(null);
                                  } else {
                                    setLearningProgressSelect(
                                      learningProgress.find(
                                        (item2: any) =>
                                          item2.day === item._id ||
                                          item2.day?._id === item?._id
                                      )
                                    );
                                  }
                                } else {
                                  setLearningProgressSelect(
                                    learningProgress.find(
                                      (item2: any) =>
                                        item2.day === item._id ||
                                        item2.day?._id === item?._id
                                    )
                                  );
                                }
                              }}
                            >
                              {item.order}
                            </button>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${learningProgressSelect !== undefined ? "" : "!hidden"} statistical__learning__time`}>
              <div className="statistical__topic__learning">
                <div className="statistical__topic__learning__title">
                  <ul>
                    <li>Nghe nói phản xạ: </li>
                    <li>Từ vựng: </li>
                    <li>Cấu trúc và câu: </li>
                    <li>Hội thoại:</li>
                    <li>Ngữ pháp: </li>
                    {
                      lastDay &&
                      <div>
                        <li>Thi tuần (Từ Vựng):</li>
                        <li>Thi tuần (Câu): </li>
                      </div>
                    }
                  </ul>
                </div>
                <div className="statistical__topic__learning__point">
                  {learningProgressSelect === null || learningProgressSelect === undefined ?
                    <ul>
                      <li>0</li>
                      <li>0</li>
                      <li>0</li>
                      <li>0</li>
                      <li>0</li>
                    </ul>
                    : (
                      <ul>
                        <li
                          className={`${learningProgressSelect.listeningSpeakingScore >= 8
                            ? "text-green-500"
                            : "text-red-500"
                            }`}
                        >
                          {learningProgressSelect.listeningSpeakingScore}
                        </li>
                        <li
                          className={`${learningProgressSelect.vocabularyScore >= 8
                            ? "text-green-500"
                            : "text-red-500"
                            }`}
                        >
                          {learningProgressSelect.vocabularyScore}
                        </li>
                        <li
                          className={`${learningProgressSelect.structureSentencesScore >= 8
                            ? "text-green-500"
                            : "text-red-500"
                            }`}
                        >
                          {learningProgressSelect.structureSentencesScore}
                        </li>
                        <li
                          className={`${learningProgressSelect.conversationScore >= 8
                            ? "text-green-500"
                            : "text-red-500"
                            }`}
                        >
                          {learningProgressSelect.conversationScore}
                        </li>
                        <li
                          className={`${learningProgressSelect.grammarScore >= 8
                            ? "text-green-500"
                            : "text-red-500"
                            }`}
                        >
                          {learningProgressSelect.grammarScore}
                        </li>

                        {
                          lastDay &&
                          <div>
                            <li
                              className={`${learningProgressSelect.oralWeekVocabularyScore && learningProgressSelect?.oralWeekVocabularyScore >= 8
                                ? "text-green-500"
                                : "text-red-500"
                                }`}
                            >
                              {learningProgressSelect?.oralWeekVocabularyScore}
                            </li>

                            <li
                              className={`${learningProgressSelect.oralWeekSentencesScore && learningProgressSelect?.oralWeekSentencesScore >= 8
                                ? "text-green-500"
                                : "text-red-500"
                                }`}
                            >
                              {learningProgressSelect?.oralWeekSentencesScore}
                            </li>
                          </div>
                        }
                      </ul>
                    )}
                </div>
              </div>

              <div className="btn__learning__statistical">
                <div>
                  {learningProgressSelect ? (
                    <NavLink to={`/learning/${daySelect?._id}/detailLearning`}>
                      <button className="btn__start__statistical text-white hover:text-white">
                        Bắt đầu học
                      </button>
                    </NavLink>
                  ) : (
                    <button
                      className="btn__start__statistical text-white hover:text-white"
                      onClick={onHandleAddProgress}
                    >
                      Bắt đầu học
                    </button>
                  )}

                  {user?.pay == 1 ? (
                    <NavLink
                      to={`/learning/oral/${daySelect?._id}`}
                      className="text-white hover:text-white"
                    >
                      <button className="btn__exam__statistical">
                        Thi Oral ngày
                      </button>
                    </NavLink>
                  ) : (
                    <button
                      className="btn__exam__statistical text-white hover:text-white"
                      onClick={() => handlonClick()}
                    >
                      Thi Oral ngày
                    </button>
                  )}
                </div>
                <div>{isModal && <PopupPayment closeModal={setIsModal} />}</div>
                {daySelect === checkDay7(String(weekSelect?._id)) && (
                  <div className="mt-4">
                    <NavLink
                      to={`/learning/oralWeekVocabulary/${weekSelect?._id}/${daySelect?._id}`}
                      className="text-white hover:text-white "
                    >
                      <button className="btn__exam__week">
                        Thi tuần (bắt buộc)
                        <div>Từ vựng (35)</div>
                      </button>
                    </NavLink>

                    <NavLink
                      to={`/learning/oralWeekSaying/${weekSelect?._id}/${daySelect?._id}`}
                      className="text-white hover:text-white"
                    >
                      <button className="ml-4 btn__exam__week">
                        Thi tuần (bắt buộc)
                        <div>Câu (35)</div>
                      </button>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
            {learningProgressSelect === undefined &&
              <div className="text-red-500 my-4">Bạn phải hoàn thành bài tập ngày trước đó để mở khóa ngày tiếp theo</div>
            }
          </div>

          {/* <div className="total__learning">
            <p className='font-semibold text-cyan-700'>
              Lịch sử các nội dung bạn đã làm:
            </p>
            <Collapse defaultActiveKey={1} onChange={onChange}>
              {userHistory?.map((item: any, index: number) => {
                return <Panel
                  key={index + 1}
                  showArrow={false}
                  className={'w-full'}
                  header={
                    <div key={index + 1} className="w-full flex flex-row items-center gap-8">
                      <div className="basis-6/12">{moment(item.createdAt).format("H:mm:ss, Do/MM/YYYY")}</div>
                      <div className="basis-2/12">{item.practiceActivity?.day.title}</div>
                      <div className="">{item.practiceActivity?.title}</div>
                    </div>
                  }
                  extra={<div className="flex items-center gap-10">
                    <div className="">{item.score}</div>
                    <div className={`${item.result === 0 ? "text-red-500" : "text-green-500"}`}>{item.result === 0 ? "Fail" : "Pass"}</div>
                  </div>}
                >
                </Panel>
              })}
            </Collapse>
          </div> */}
        </div>
      </div>

      <BoxPayment />
    </div>
  );
};

export default Learning;
