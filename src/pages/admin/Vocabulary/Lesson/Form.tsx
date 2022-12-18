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
} from "../../../../api/vocabulary";
import ReactQuill from "react-quill";
import AdminPageHeader from "../../../../components/AdminPageHeader";
import { getCategoryList } from "../../../../features/Slide/category/CategorySlide";
import { getListMonthSlice } from "../../../../features/Slide/month/MonthSlice";
import { getListWeekSlice } from "../../../../features/Slide/week/WeekSlice";
import { getListDaySlice } from "../../../../features/Slide/day/DaySlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { MonthType } from "../../../../types/month";
import { WeekType } from "../../../../types/week";
import { DayType } from "../../../../types/day";
import { getListVocabularySlice } from "../../../../features/Slide/vocabulary/vocabulary";
import { PracticeActivityType } from "../../../../types/practiceActivity";
import { editPracticeActivitylice } from "../../../../features/Slide/practiceActivity/PracticeActivitySlice";
import { VocabulatyType } from "../../../../types/vocabularyType";
import { Helmet } from "react-helmet";

type Props = {};

const FormVocabulary = (props: Props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setfileList] = useState<any>();
  const [vocabulary, setVocabulary] = useState();
  const vocabularies = useAppSelector((item) => item.vocabulary.value)
  const practiceActivity = useAppSelector(item => item.practiceActivity.value)
  const quizs: any = useAppSelector(item => item.quiz.value)
  const dispatch = useAppDispatch();
  let months = useAppSelector<MonthType[]>((item) => item.month.value);
  let weeks = useAppSelector<WeekType[]>((item) => item.week.value);
  let days = useAppSelector<DayType[]>((item) => item.day.value);
  const { dayId } = useParams()
  const [monthSelect, setMonthSelect] = useState<MonthType | null>();
  const [weekSelect, setWeekSelect] = useState<WeekType | null>();
  const [daySelect, setDaySelect] = useState<DayType | null>();

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
    titlePage = "Sửa từ vựng";
  } else {
    titlePage = "Thêm mới từ vựng";
  }

  const checkActivity = (voca: VocabulatyType[]) => {
    const vocaByDay = voca.filter((e) => e.dayId?._id === dayId)
    let activity: any = practiceActivity.find((e: PracticeActivityType) => e.day === dayId && e.type === "vocabulary")
    const listQuiz = quizs.filter((e) => e.practiceActivity?._id === activity._id && e.status === true)

    if (vocaByDay.length === 4 && listQuiz.length === 10) {
      dispatch(editPracticeActivitylice({ ...activity, status: true }))
    } else if (vocaByDay.length === 5) {
      return true
    }
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

    if (id) {
      message.loading({ content: "Loading...", key });
      editVocabulary(value);
      message.success({ content: "Sửa Thành Công!", key, duration: 2 });
      navigate(`/manageDay/${dayId}/vocabulary/listLesson`);
    } else {
      console.log("value.image", value.image);

      const check = checkActivity(vocabularies);
      if (check === true) {
        message.warning("Đã đạt giới hạn đáp án !")
      } else {
        message.loading({ content: "Loading...", key });
        addVocabulary({ ...value, dayId: dayId });
        message.success({ content: "Thêm Thành Công!", key, duration: 2 });
      }
      navigate(`/manageDay/${dayId}/vocabulary/listLesson`);

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
    dispatch(getListVocabularySlice())
  }, []);
  console.log(id);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Luyện Từ Vựng | Vian English</title>
      </Helmet>

      <AdminPageHeader breadcrumb={titlePage} day={dayId} activity={{ title: "Luyện từ vựng", route: "vocabulary" }} type={{ title: "Bài học", route: "listLesson" }} />
      <div>
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
          <Form.Item
            label="Từ vựng"
            name="words"
            tooltip="Câu Hỏi dành cho Category"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nghĩa"
            name="meaning"
            tooltip="Ý nghĩa"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Dạng từ"
            name="wordForm"
            tooltip="dạng từ"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phiên âm"
            name="pa"
            tooltip="phiên âm"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="image" valuePropName="src" label="Xem trước hình ảnh"
          >
            <img id="img-preview" style={{ width: "100px" }} />
          </Form.Item>

          <Form.Item
            label="Tải ảnh lên"
            tooltip="Image for Quiz"
            name="imageUpload"
            rules={[{ required: id ? false : true, message: "Không để Trống!" }]}
          >
            <Input
              type="file"
              accept=".png,.jpg"
              className="form-control"
              onChange={onChangeImage}


            />
          </Form.Item>

          <Form.Item
            label="Ví dụ"
            name="example"
            tooltip="ví dụ"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nghĩa ví dụ"
            name="exampleDirection"
            tooltip="Nghĩa ví dụ"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <ReactQuill
              className="form-control rounded"
              theme="snow"
              style={{ background: "#fff" }}
            />
          </Form.Item>

          <Form.Item>
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
