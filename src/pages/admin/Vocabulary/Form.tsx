import {
  Divider,
  Form,
  Input,
  Button,
  Checkbox,
  Upload,
  Select,
  Avatar,
  message,
  Modal,
  Progress,
  Image,
  Empty,
} from "antd";
import { useForm } from "react-hook-form";
import React, { useEffect, useState, Fragment } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  addVocabulary,
  detailVocabulary,
  editVocabulary,
} from "../../../api/vocabulary";
import ReactQuill from "react-quill";
import AdminPageHeader from "../../../components/AdminPageHeader";
import { getCategoryList } from "../../../features/Slide/category/CategorySlide";
import { getListMonthSlice } from "../../../features/Slide/month/MonthSlice";
import { getListWeekSlice } from "../../../features/Slide/week/WeekSlice";
import { getListDaySlice } from "../../../features/Slide/day/DaySlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { MonthType } from "../../../types/month";
import { WeekType } from "../../../types/week";
import { DayType } from "../../../types/day";
import { Menu, Transition } from "@headlessui/react";
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
type Props = {};
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const FormVocabulary = (props: Props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setfileList] = useState<any>();
  const [vocabulary, setVocabulary] = useState();

  const dispatch = useAppDispatch();
  const categories = useAppSelector((item) => item.category.value);
  let months = useAppSelector<MonthType[]>((item) => item.month.value);
  let weeks = useAppSelector<WeekType[]>((item) => item.week.value);
  let days = useAppSelector<DayType[]>((item) => item.day.value);

  const [monthSelect, setMonthSelect] = useState<MonthType | null>();
  const [weekSelect, setWeekSelect] = useState<WeekType | null>();
  const [daySelect, setDaySelect] = useState<DayType | null>();
  const weeks2 = weeks.filter(
    (item: WeekType) => item.month === monthSelect?._id
  );
  const days2 = days.filter((item: DayType) => item.week === weekSelect?._id);

  const findSmallestOrder = (data, id) => {
    const temp = data?.filter((item: WeekType) => item.month === id);
    const minPrice = Math.min(...temp.map(({ order }) => order));
    const cheapeastShirt = temp.find(({ order }: any) => minPrice === order);
    return cheapeastShirt;
  };
  // getCategoryList

  useEffect(() => {
    dispatch(getCategoryList());
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
    setMonthSelect(
      months?.reduce(function (prev, current) {
        return prev.order < current.order ? prev : current;
      })
    );
    setWeekSelect(temp);
    setDaySelect(days.find((item: DayType) => item.week === temp._id));
  }, []);
  // const [selected, setSelected] = useState(item[3])
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const { id } = useParams();
  var titlePage: string = "";

  if (id) {
    titlePage = "Update Vocablulary";
  } else {
    titlePage = "Add New Vocabulary";
  }
  const onFinish = async (value: any) => {
    if (fileList) {
      const CLOUDINARY_PRESET = "ypn4yccr";
      const CLOUDINARY_API_URL =
        "https://api.cloudinary.com/v1_1/vintph16172/image/upload";
      const formData = new FormData();
      formData.append("file", fileList);
      formData.append("upload_preset", CLOUDINARY_PRESET);

      const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
        headers: {
          "Content-Type": "application/form-data",
        },
      });
      value.image = data.url;
      setfileList(null);
    }

    const key = "updatable";

    message.loading({ content: "Loading...", key });
    if (id) {
      editVocabulary(value);
      message.success({ content: "Sửa Thành Công!", key, duration: 2 });
      navigate("/admin/vocabulary");
    } else {
      const dayId = daySelect ? daySelect._id : "";
      console.log("dayIDAdd", dayId);

      addVocabulary({ ...value, dayId: dayId });
      message.success({ content: "Thêm Thành Công!", key, duration: 2 });
      navigate("/admin/vocabulary");
    }
  };

  const onFinishFailed = (errorInfo) => {
    id
      ? message.error("Sửa Không Thành Công!")
      : message.error("Thêm Không Thành Công!");
  };

  const onReset = () => {
    form.resetFields();
  };

  const onChangeImage = async (e) => {
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpeg"
    ) {
      setfileList(e.target.files[0]);
      const imgPreview = document.getElementById(
        "img-preview"
      ) as HTMLImageElement;

      imgPreview.src = await URL.createObjectURL(e.target.files[0]);
    } else {
      message.error("File không hợp lệ!");
    }
  };

  useEffect(() => {
    if (id) {
      const getDetail = async () => {
        const { data } = await detailVocabulary(id);
        setVocabulary(data);
        form.setFieldsValue(data);
      };
      getDetail();
    }
  }, []);

  const check = (id: any) => {
    console.log(id);
  };

  console.log("Day select", daySelect);

  return (
    <div className="">
      <AdminPageHeader breadcrumb={titlePage} />
      <div className="">
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {id ? (
            <Form.Item label="_id" name="_id" hidden={true}>
              <Input />
            </Form.Item>
          ) : (
            ""
          )}

          {/* Tháng - Tuần -Ngày */}
          {/* <div className="flex gap-3">
          <Form.Item className="w-[30%]" 
          label="Tháng"
          >
            <Select defaultValue={"M1"}>
              <Option value="M2">M2</Option>
              <Option value="M3">M3</Option>
            </Select>
          </Form.Item>

          <Form.Item className="w-[30%]" 
          label="Tuần"
          >
            <Select defaultValue={"T1"}>
              <Option value="T2">T2</Option>
              <Option value="T3">T3</Option>
            </Select>
          </Form.Item>

          <Form.Item className="w-[30%]" 
          label="Ngày"
          >
            <Select defaultValue={"N1"}>
              <Option value="N2">N2</Option>
              <Option value="N3">N3</Option>
            </Select>
          </Form.Item>

          </div> */}

          {/*======================== */}

          <div className="">
            <div className="learning__btn__time">
              <div className="item__btn__time">
                <Menu as="div" className="relative inline-block text-left ">
                  <div>
                    <Menu.Button className="relative flex w-full py-2 pr-4 text-base font-semibold text-left text-indigo-600 cursor-default sm:text-lg">
                      {`Tháng ${monthSelect?.order}`}{" "}
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
                    <Menu.Items className="absolute right-0 z-10 ml-5 mt-[2px] mr-2 w-56 origin-top-right divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                setWeekSelect(
                                  findSmallestOrder(weeks, item?._id)
                                );
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
                    <Menu.Items className="absolute right-0 z-10 ml-5 mt-[2px] mr-2 w-56 origin-top-right divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                              onClick={() => {
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
              {/* <Form.Item className="" name="dayId"> */}
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
                    <Menu.Items className="absolute right-0 z-10 ml-5 mt-[2px] mr-2 w-56 origin-top-right divide-y divide-gray-100  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {days2.map((item: DayType) => (
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
                              {/* check(item._id) */}
                              {item.title}
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              {/* </Form.Item> */}
            </div>
          </div>

          <Form.Item className="" name="dayId">
            <span className="" hidden> {daySelect ? daySelect._id : ""} </span>
          </Form.Item>

          <Form.Item
            label="Words"
            name="words"
            tooltip="Câu Hỏi dành cho Category"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Meaning"
            name="meaning"
            tooltip="Ý nghĩa"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="WordForm"
            name="wordForm"
            tooltip="dạng từ"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              <Option value="1">nouns</Option>
              <Option value="2">adj</Option>
              <Option value="3">verbs</Option>
              <Option value="4">adv</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Spelling"
            name="pa"
            tooltip="phiên âm"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Upload image" tooltip="Image for Quiz">
            <Input
              type="file"
              accept=".png,.jpg"
              className="form-control"
              onChange={onChangeImage}
            />
          </Form.Item>

          <Form.Item
            label="Example"
            name="example"
            tooltip="ví dụ"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <ReactQuill
              className="form-control rounded"
              theme="snow"
              style={{ background: "#fff" }}
            />
          </Form.Item>

          <Form.Item name="image" valuePropName="src" label="ImagePreview">
            <img id="img-preview" style={{ width: "100px" }} />
          </Form.Item>
          <Form.Item className="float-right">
            <Button
              className="inline-block mr-2"
              type="primary"
              htmlType="submit"
            >
              {id ? "Sửa" : "Thêm"}
            </Button>
            <Button
              className="inline-block "
              type="primary"
              danger
              onClick={() => {
                onReset();
              }}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormVocabulary;
