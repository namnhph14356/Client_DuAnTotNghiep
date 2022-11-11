import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Button, Form, Input, message, Select } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { detailDay } from "../../api/day";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addDaySlice,
  editDaySlice,
  getListDaySlice,
} from "../../features/Slide/day/DaySlice";
import { getListMonthSlice } from "../../features/Slide/month/MonthSlice";
import { getListWeekSlice } from "../../features/Slide/week/WeekSlice";
import { DayType } from "../../types/day";
import { MonthType } from "../../types/month";
import { WeekType } from "../../types/week";
type Props = {};
interface IModalProps {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const PopupChange = ({ closeModal }: IModalProps) => {
  const dispatch = useAppDispatch();
  const months = useAppSelector<MonthType[]>((item) => item.month.value);
  const weeks = useAppSelector<WeekType[]>((item) => item.week.value);
  const days = useAppSelector<DayType[]>((item) => item.day.value);
  const [monthSelect, setMonthSelect] = useState<MonthType | null>();
  const [weekSelect, setWeekSelect] = useState<WeekType | null>();
  const [daySelect, setDaySelect] = useState<DayType | null>();
  const [dayNow, setDayNow] = useState<DayType>();
  const [form] = Form.useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const { dayId } = useParams();
  const weeks2 = weeks.filter(
    (item: WeekType) => item.month === monthSelect?._id
  );
  const days2 = days?.filter((item: DayType) => item.week === weekSelect?._id);
  const findSmallestOrder = (data, id) => {
    const temp = data?.filter((item: WeekType) => item.month === id);
    const minPrice = Math.min(...temp.map(({ order }) => order));
    const smallestOrder = temp.find(({ order }: any) => minPrice === order);
    return smallestOrder;
  };

  useEffect(() => {
    dispatch(getListMonthSlice());
    dispatch(getListWeekSlice());
    dispatch(getListDaySlice());
    const flag = months.reduce(function (prev, current) {
      return prev.order < current.order ? prev : current;
    });

    const temp = weeks
      ?.filter((item: WeekType) => item.month === flag._id)
      .reduce(function (prev, current) {
        return prev.order < current.order ? prev : current;
      });

    const day: any = days.find((item: DayType) => item.week === temp._id);
    setMonthSelect(
      months?.reduce(function (prev, current) {
        return prev.order < current.order ? prev : current;
      })
    );
    setWeekSelect(temp);
    setDaySelect(day);

    const getDetailDay = async () => {
      const { data } = await detailDay(dayId);
      setDayNow(data);
    };
    getDetailDay();
  }, []);

  const navigate = useNavigate();
  // =============== Update ===============
  const onFinish = async () => {
    navigate(`/manageDay/${daySelect?._id}`);
    closeModal(false);
  };

  const onFinishFailed = async () => {};
  return (
    <div className="modal">
      <div className="modal-header">
        <h4
          className="bg"
          onClick={() => {
            closeModal(false);
          }}
        >
          X
        </h4>
      </div>
      <Form
        className="model_body_day"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="mt-[60px]">
          <Menu
            as="div"
            className="relative inline-block h-[35px] bg-white w-[350px]"
          >
            <div>
              <Menu.Button className="relative flex w-full py-2 pr-4 text-base font-semibold text-center text-indigo-600 cursor-default sm:text-lg justify-center">
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
                {months.map((item: MonthType, index: number) => (
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
                          setMonthSelect(item);
                          setWeekSelect(findSmallestOrder(weeks, item?._id));
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

        {/* Week */}
        <div className="my-8">
          <Menu
            as="div"
            className="relative inline-block  h-[35px] bg-white w-[350px]"
          >
            <div>
              <Menu.Button className="relative flex w-full py-2 pr-4 text-base font-semibold text-left text-indigo-600 cursor-default sm:text-lg justify-center">
                {weekSelect ? weekSelect?.title : "Tuần 1"}
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
              <Menu.Items className="absolute left-[25%] z-10 mt-[2px] mr-2 w-56 origin-top-right divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {weeks2.map((item: WeekType) => (
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        className={classNames(
                          active
                            ? "bg-green-100 text-gray-900"
                            : "text-gray-700",
                          "group flex items-center px-5 mb-0 pr-3 py-2 text-sm cursor-pointer"
                        )}
                        onChange={() => {
                          setWeekSelect(item);
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
        {/* Day */}
        <div className="">
          <Menu
            as="div"
            className="relative inline-block h-[35px] bg-white w-[350px] "
          >
            <div>
              <Menu.Button className="relative flex w-full py-2 pr-4 text-base font-semibold text-left text-indigo-600 cursor-default sm:text-lg justify-center">
                {dayNow ? dayNow.title : "Ngày 1"}{" "}
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
              <Menu.Items className="absolute left-0 z-10 mt-[2px] mr-2 w-56 origin-top-right divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overscroll-auto">
                {days2.map((item: DayType, index: number) => (
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

        <div className="flex gap-2 justify-center mt-8">
          <Form.Item>
            <Button
              className="w-[120px] rounded bg-oranger-500 text-lg font-bold text-white mr-4"
              type="primary"
              htmlType="submit"
            >
              Sửa
            </Button>
            <Button
              className="w-[120px] rounded bg-blue-500 text-lg font-bold text-white"
              type="dashed"
              onClick={() => closeModal(false)}
            >
              Đóng
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default PopupChange;
