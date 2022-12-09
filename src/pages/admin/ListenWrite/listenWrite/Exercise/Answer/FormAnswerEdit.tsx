import React, { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Divider, Form, Input, Button, Checkbox, Upload, Select, Avatar, message, Modal, Progress, Image, Empty } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { AnswerQuizType } from '../../../../../../types/answerQuiz';
import { changeBreadcrumb, editAnswerQuizSlide } from '../../../../../../features/Slide/answerQuiz/AnswerQuizSlide';
import { detailAnswerQuiz } from '../../../../../../api/answerQuiz';
import { getListQuizSlide } from '../../../../../../features/Slide/quiz/QuizSlide';
import AdminPageHeader from '../../../../../../components/AdminPageHeader';

const FormAnswerEditListenWrite = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
  const breadcrumb = useAppSelector(data => data.answerQuiz.breadcrumb)
  const quizs = useAppSelector(data => data.quiz.value)
  const [answerQuiz, setAnswerQuiz] = useState<AnswerQuizType>()
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { dayId } = useParams();
  const { id } = useParams();

  const onFinish = async (value) => {
    const key = 'updatable';
    message.loading({ content: 'Loading...', key });
      if (id) {
        dispatch(editAnswerQuizSlide(value));
        message.success({ content: 'Sửa Thành Công!', key, duration: 2 });
        navigate(`/manageDay/${dayId}/conversation/listExercise`);
      }
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
        setAnswerQuiz(data)
        form.setFieldsValue(data);
        dispatch(changeBreadcrumb("Sửa đáp án bài tập ngữ pháp"))
      }
      getQuiz()
    } else {
      dispatch(changeBreadcrumb("Thêm đáp án bài tập ngữ pháp"))
    }

    dispatch(getListQuizSlide())

  }, [])

  return (
    <div>
      <AdminPageHeader breadcrumb={breadcrumb} day={dayId} activity={{ title: "Luyện hội thoại", route: "conversation" }} type={{ title: "Bài tập", route: "listExercise" }} />
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

export default FormAnswerEditListenWrite