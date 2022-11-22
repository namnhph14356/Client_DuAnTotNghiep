import React, { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Divider, Form, Input, Button, Checkbox, Upload, Select, Avatar, message, Modal, Progress, Image, Empty } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { editQuizSlide, getListQuizSlide } from '../../../../features/Slide/quiz/QuizSlide';
import { QuizType } from '../../../../types/quiz';
import { AnswerQuizType } from '../../../../types/answerQuiz';
import { changeBreadcrumb, addAnswerQuizSlide, editAnswerQuizSlide } from '../../../../features/Slide/answerQuiz/AnswerQuizSlide';
import { detailAnswerQuiz, listAnswerQuiz } from '../../../../api/answerQuiz';
import AdminPageHeader from '../../../../components/AdminPageHeader';
import { editPracticeActivitylice } from '../../../../features/Slide/practiceActivity/PracticeActivitySlice';
import axios from 'axios';



type Props = {}

const FormAnswerListenSpeak = (props: Props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
  const breadcrumb = useAppSelector(data => data.answerQuiz.breadcrumb)
  const quizs = useAppSelector(data => data.quiz.value)
  const [answerQuiz, setAnswerQuiz] = useState<AnswerQuizType>()
  const [listAnswer, setListAnswer] = useState<any>([])
  const [fileList, setfileList] = useState<any>();
  const { dayId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { id } = useParams();
  const filterQuizAnswer: any = quizs.find((item: QuizType) => item._id === id)
  
  const filterAnswer = listAnswer.filter((item) => item.quiz === id)
  const filterIsCorrect = filterAnswer.find((item) => item.isCorrect === true)

  const checkAnswer = (question: any, length: number) => {
    switch (question.type) {
      case "selectRadio":
        if (length === 3) {
          dispatch(editQuizSlide({ ...question, status: true }))
        } else if (length === 4) {
          return true
        }
        break;

      case "selectImage":
        if (length === 3) {
          dispatch(editQuizSlide({ ...question, status: true }))
        } else if (length === 4) {
          return true
        }
        break;

      case "selectCompound":
        if (length >= 2) {
          dispatch(editQuizSlide({ ...question, status: true }))
        } else if (length === 6) {
          return true
        }
        break;
      default:
        break;
    }
  }

  const onFinish = async (value) => {
    if (fileList) {
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
    const detailQuiz = quizs.find((e: QuizType) => e._id === id)

    const check = checkAnswer(detailQuiz, filterAnswer.length);
    if (check === true) {
      message.warning("Đã đạt giới hạn đáp án !")
    } else {
      message.loading({ content: 'Loading...', key });
      await dispatch(addAnswerQuizSlide({
        ...value,
        quiz: id
      }));
      message.success({ content: 'Thêm Thành Công!', key, duration: 2 });
      await dispatch(getListQuizSlide())
    }
    navigate(`/manageDay/${dayId}/listenspeak`);
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Thêm Không Thành Công!');
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleChange = (e) => {
    if (filterIsCorrect.isCorrect === e) {
      console.log('Đã có đáp án đúng');
    } else {
      console.log('CHưa có');
    }
  }

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
    dispatch(changeBreadcrumb("Thêm đáp án"))
    dispatch(getListQuizSlide())
    const getAnswer = async () => {
      const { data } = await listAnswerQuiz()
      setListAnswer(data);
    }
    getAnswer()
  }, [])

  return (
    <div>
      <AdminPageHeader breadcrumb={breadcrumb} day={dayId} activity={{ title: "Luyện nghe nói phản xạ", route: "listenspeak" }} type={{ title: "Khởi động", route: "" }} />
      <div className="pb-6">
        <Form layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>

          <Form.Item
            label="Đáp Án"
            name="answer"
            tooltip="Đáp án dành cho Quiz"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            {
              filterQuizAnswer?.type === 'selectImage' ?
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
          </Form.Item>
          <Form.Item
            label="Trạng Thái"
            name="isCorrect"
            tooltip="Trạng Thái Đáp Án"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            <Select>
              <Option key={1} value={false}>
                Sai
              </Option>
              <Option key={2} value={true}>
                Đúng
              </Option>
            </Select>
          </Form.Item>



          <Form.Item className='float-right'>
            <Button className='inline-block mr-2' type="primary" htmlType="submit" >
              Thêm
            </Button>
            <Button className='inline-block ' type="primary" danger onClick={() => { onReset() }}>
              Reset
            </Button>
          </Form.Item>


        </Form>
      </div>




    </div>
  )
}

export default FormAnswerListenSpeak