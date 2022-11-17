import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Divider, Form, Input, Button, Checkbox, Upload, Select, Avatar, message, Modal, Progress, Image, Empty } from 'antd';
import axios from "axios";
import AdminPageHeader from '../../../../components/AdminPageHeader';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { changeBreadcrumb } from '../../../../features/Slide/quiz/QuizSlide';
import { getCategoryList } from '../../../../features/Slide/category/CategorySlide';
import { detailQuiz } from '../../../../api/quiz';
import { QuizType } from '../../../../types/quiz';
import useQuiz from '../../../../features/Slide/quiz/use_quiz';
import { PracticeActivityType } from '../../../../types/practiceActivity';

type Props = {}

interface DataQuizType {
  _id?: string;
  category?: string;
  question: string;
  questionAfter?: string;
  image?: string;
  meaning?: string,
  suggestions?: string,
  timeLimit?: string;
  type?: string;
  practiceActivity?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TypeQuiz {
  _id?: number;
  name?: string,
  type?: string
}

const FormQuestion = () => {

  const { data, error, mutate, add, edit, remove } = useQuiz()
  const quizs = useAppSelector(item => item.quiz.value)
  const practiceActivity = useAppSelector(item => item.practiceActivity.value)
  const { Option } = Select;
  const [form] = Form.useForm();
  const breadcrumb = useAppSelector(data => data.quiz.breadcrumb)
  const [quiz, setQuiz] = useState<DataQuizType>()
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { id, dayId } = useParams();
  const [fileList, setfileList] = useState<any>();
  const [selected, setSelected] = useState<any>();
  const typeQuiz = [
    { id: 1, name: "Chọn đáp án", type: "selectRadio" },
  ]
  const type = "grammar"
  let prative: any = practiceActivity.find((item: PracticeActivityType) => item.type === type && item.day === dayId)
  let lengthQuiz = quizs.filter((e: QuizType) => e.practiceActivity?.day === dayId && e.practiceActivity?.type === "grammar")

  const onFinish = async (value) => {
    if (fileList && lengthQuiz.length < 10) {
      const CLOUDINARY_PRESET = "ypn4yccr";
      const CLOUDINARY_API_URL =
        "https://api.cloudinary.com/v1_1/vintph16172/image/upload"
      const formData = new FormData();
      formData.append("file", fileList);
      formData.append("upload_preset", CLOUDINARY_PRESET);

      const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
        headers: {
          "Content-Type": "application/form-data"
        }
      });
      value.image = data.url;
      setfileList(null);
    }

    if (value.type === 'selectImage') {
      if (!value.image) {
        return message.error('Không để trống Ảnh!');
      }
    }

    const key = 'updatable';

    if (id) {
      message.loading({ content: 'Loading...', key });
      mutate(edit(value))
      message.success({ content: 'Sửa Thành Công!', key, duration: 2 });
      navigate(`/manageDay/${dayId}/grammar/listExercise`);
    } else {

      if (lengthQuiz.length === 10) {
        message.warning("Đã đạt giới hạn câu hỏi !")
        return navigate(`/manageDay/${dayId}/grammar/listExercise`);
      }

      message.loading({ content: 'Loading...', key });
      mutate(add({ ...value, practiceActivity: prative._id }))
      message.success({ content: 'Thêm Thành Công!', key, duration: 2 });
      navigate(`/manageDay/${dayId}/grammar/listExercise`);
    }

  };

  const onFinishFailed = (errorInfo) => {
    id ? message.error('Sửa Không Thành Công!') : message.error('Thêm Không Thành Công!');
  };

  const onReset = () => {
    form.resetFields();
  };

  //----------------------UPLOAD
  const onChangeImage = async (e) => {
    if (e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpeg") {
      setfileList(e.target.files[0])
      const imgPreview = document.getElementById("img-preview") as HTMLImageElement
      imgPreview.src = await URL.createObjectURL(e.target.files[0])


    } else {
      message.error('File không hợp lệ!');
    }
  }
  useEffect(() => {
    if (id) {
      const getQuiz = async () => {
        const { data } = await detailQuiz(id)
        setQuiz(data)
        setSelected(data.quiz.type)
        form.setFieldsValue(data.quiz);
        dispatch(changeBreadcrumb("Sửa câu hỏi"))
      }
      getQuiz()
    } else {
      dispatch(changeBreadcrumb("Thêm câu hỏi"))
    }
    dispatch(getCategoryList())
  }, [])

  return (
    <div className="">
      <AdminPageHeader breadcrumb={breadcrumb} day={dayId} activity={{ title: "Luyện ngữ pháp", route: "grammar" }} type={{ title: "Bài tập", route: "listExercise" }} />
      <div className="pb-6 ">
        <Form layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>

          {id ? <Form.Item label="_id" name="_id" hidden={true}>
            <Input />
          </Form.Item> : ""}

          <Form.Item
            label="Thể Loại"
            name="type"
            tooltip="Thể Loại"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            {id
              ? <Select >
                {typeQuiz?.map((item: TypeQuiz, index) => (
                  <Option key={index + 1} value={item.type}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              : <Select onChange={(e) => setSelected(e)}
                defaultValue={typeQuiz?.map((item: TypeQuiz, index) => {
                  if (item.type === quiz?.type) {
                    return <Option key={index + 1} value={item.type}>
                      {item.name}
                    </Option>
                  }
                })}
              >

                {typeQuiz?.map((item: TypeQuiz, index) => (
                  <Option key={index + 1} value={item.type}>
                    {item.name}
                  </Option>
                ))}
              </Select>}
          </Form.Item>

          <Form.Item
            label="Câu Hỏi"
            name="question"
            tooltip="Câu Hỏi dành cho Category"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            {id ?
              <Input /> :
              <Input disabled={!selected} />
            }
          </Form.Item>
          <Form.Item
            label="Gợi ý"
            name="suggestions"
            tooltip="Câu Hỏi dành cho Category"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            {id ?
              <Input /> :
              <Input disabled={!selected} />
            }
          </Form.Item>
          <Form.Item
            label="Ý nghĩa"
            name="meaning"
            tooltip="Câu Hỏi dành cho Category"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            {id ?
              <Input /> :
              <Input disabled={!selected} />
            }
          </Form.Item>

          {
            selected === 'selectImage' ?
              <div>
                <Form.Item
                  label="Upload ảnh"
                  tooltip="Ảnh dành cho Quiz"
                >
                  <Input type="file" accept='.png,.jpg' className="form-control" onChange={onChangeImage} />
                </Form.Item>

                <Form.Item name="image" valuePropName="src" label="ImagePreview" >
                  <img id="img-preview" style={{ width: "100px" }} />
                </Form.Item>
              </div>
              :
              <Form.Item label="_id" name="_id" hidden={true}>
                <Input />
              </Form.Item>
          }
          <Form.Item label="practiceActivity" name="practiceActivity" hidden={true}>
            <Input value={prative?._id} />
          </Form.Item>

          <Form.Item className='float-right'>
            <Button className='inline-block mr-2' type="primary" htmlType="submit" >
              {id ? "Sửa" : "Thêm"}
            </Button>
            <Button className='inline-block ' type="primary" danger onClick={() => { onReset() }}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div >
  )
}
export default FormQuestion
