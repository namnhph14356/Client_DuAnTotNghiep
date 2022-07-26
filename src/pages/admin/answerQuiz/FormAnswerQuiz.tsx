import React, { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Divider, Form, Input, Button, Checkbox, Upload, Select, Avatar, message, Modal, Progress, Image, Empty } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import AdminPageHeader from '../../../Component/AdminPageHeader';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getListQuizSlide } from '../../../features/Slide/quiz/QuizSlide';
import { QuizType } from '../../../types/quiz';
import { AnswerQuizType } from '../../../types/answerQuiz';
import { changeBreadcrumb,addAnswerQuizSlide, editAnswerQuizSlide } from '../../../features/Slide/answerQuiz/AnswerQuizSlide';
import { detailAnswerQuiz } from '../../../api/answerQuiz';



type Props = {}

const FormAnswerQuiz = (props: Props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
  const breadcrumb = useAppSelector(data => data.answerQuiz.breadcrumb)
  const quizs = useAppSelector(data => data.quiz.value)
  const [answerQuiz, setAnswerQuiz] = useState<AnswerQuizType>()
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  console.log("data edit", answerQuiz);

  const { id } = useParams();
  console.log(id);

  const onFinish = async (value) => {

    console.log("value", value);

    const key = 'updatable';

    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      if (id) {
        dispatch(editAnswerQuizSlide(value));
        message.success({ content: 'Sửa Thành Công!', key, duration: 2 });
        navigate("/admin/answerQuiz");
      } else {
        dispatch(addAnswerQuizSlide(value));
        message.success({ content: 'Thêm Thành Công!', key, duration: 2 });
        navigate("/admin/answerQuiz");
      }

    }, 2000);

  };

  const onFinishFailed = (errorInfo) => {

    id ? message.error('Sửa Không Thành Công!') : message.error('Thêm Không Thành Công!');
  };

  const onReset = () => {
    form.resetFields();
  };



  useEffect(() => {
    if (id) {
      const getQuiz = async () => {
        const { data } = await detailAnswerQuiz(id)
        // console.log("data edit", data);
        setAnswerQuiz(data)
        form.setFieldsValue(data);
        dispatch(changeBreadcrumb("Sửa AnswerQuiz"))
      }
      getQuiz()
    } else {
      dispatch(changeBreadcrumb("Thêm AnswerQuiz"))
    }

    dispatch(getListQuizSlide())

  }, [])




  return (
    <div className="container">
      <AdminPageHeader breadcrumb={breadcrumb} />
      <div className="pb-6 mx-6">
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
            label="Câu Hỏi"
            name="quiz"
            tooltip="Chọn Câu Hỏi"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            {id
              ? <Select >
                {quizs?.map((item: QuizType, index) => (
                  <Option key={index + 1} value={item._id}>
                    {item.question}
                  </Option>
                ))}
              </Select>
              : <Select
                defaultValue={quizs?.map((item: QuizType, index) => {
                  if (item._id === answerQuiz?.quiz) {
                    return <Option key={index + 1} value={item._id}>
                      {item.question}
                    </Option>
                  }
                })}
              >

                {quizs?.map((item: QuizType, index) => (
                  <Option key={index + 1} value={item._id}>
                    {item.question}
                  </Option>
                ))}
              </Select>
            }


          </Form.Item>


          <Form.Item
            label="Trạng Thái"
            name="isCorrect"
            tooltip="Trạng Thái Đáp Án"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            {answerQuiz?.isCorrect === 0
                ? <Select>
                  <Option key={1} value={0}>
                    Sai
                  </Option>
                  <Option key={2} value={1}>
                    Đúng
                  </Option>
                </Select>

                : <Select>
                  <Option key={1} value={1}>
                    Đúng
                  </Option>
                  <Option key={2} value={0}>
                    Sai
                  </Option>
                </Select>
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

export default FormAnswerQuiz