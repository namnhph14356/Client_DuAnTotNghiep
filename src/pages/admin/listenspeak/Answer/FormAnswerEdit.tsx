import React, { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Divider, Form, Input, Button, Checkbox, Upload, Select, Avatar, message, Modal, Progress, Image, Empty } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getListQuizSlide } from '../../../../features/Slide/quiz/QuizSlide';
import { QuizType } from '../../../../types/quiz';
import { AnswerQuizType } from '../../../../types/answerQuiz';
import { changeBreadcrumb, addAnswerQuizSlide, editAnswerQuizSlide } from '../../../../features/Slide/answerQuiz/AnswerQuizSlide';
import { detailAnswerQuiz } from '../../../../api/answerQuiz';
import AdminPageHeader from '../../../../components/AdminPageHeader';
import { detailQuiz } from '../../../../api/quiz';
import axios from 'axios';

type Props = {}

const FormAnswerListenSpeakEdit = (props: Props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
  const breadcrumb = useAppSelector(data => data.answerQuiz.breadcrumb)
  const quizs = useAppSelector(data => data.quiz.value)
  const [answerQuiz, setAnswerQuiz] = useState<AnswerQuizType>()
  const [fileList, setfileList] = useState<any>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { dayId } = useParams();
  const { id } = useParams();
  const filterQuizAnswer: any = quizs.find((item: QuizType) => item._id === answerQuiz?.quiz)


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
    message.loading({ content: 'Loading...', key });
    if (id) {
      dispatch(editAnswerQuizSlide(value));
      message.success({ content: 'Sửa Thành Công!', key, duration: 2 });
      navigate(`/manageDay/${dayId}/listenspeak`);
    } else {
      dispatch(addAnswerQuizSlide(value));
      message.success({ content: 'Thêm Thành Công!', key, duration: 2 });
      navigate(`/manageDay/${dayId}/listenspeak`);
    }
  };

  const onFinishFailed = (errorInfo) => {
    id ? message.error('Sửa Không Thành Công!') : message.error('Thêm Không Thành Công!');
  };

  const onReset = () => {
    form.resetFields();
  };

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
        const { data } = await detailAnswerQuiz(id)
        setAnswerQuiz(data)
        form.setFieldsValue(data);
        dispatch(changeBreadcrumb("Sửa đáp án"))
      }
      getQuiz()
    } else {
      dispatch(changeBreadcrumb("Thêm đáp án"))
    }

    dispatch(getListQuizSlide())

  }, [])

  return (
    <div>
      <AdminPageHeader breadcrumb={breadcrumb} day={dayId} activity={{ title: "Luyện nghe nói phản xạ", route: "listenspeak" }} type={{ title: "Khởi động", route: "" }} />
      <div className="pb-6">
        <Form layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          {id ? <Form.Item label="_id" name="_id" hidden={true}>
            <Input />
          </Form.Item> : ""}
          <Form.Item
            label="Đáp Án"
            name="answer"
            tooltip="Đáp án dành cho Quiz"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Trạng Thái"
            name="isCorrect"
            tooltip="Trạng Thái Đáp Án"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            {answerQuiz?.isCorrect === false
              ? <Select>
                <Option key={1} value={false}>
                  Sai
                </Option>
                <Option key={2} value={true}>
                  Đúng
                </Option>
              </Select>

              : <Select>
                <Option key={1} value={true}>
                  Đúng
                </Option>
                <Option key={2} value={false}>
                  Sai
                </Option>
              </Select>
            }
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
    </div>
  )
}

export default FormAnswerListenSpeakEdit