import React, { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Divider, Form, Input, Button, Checkbox, Upload, Select, Avatar, message, Modal, Progress, Image, Empty } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { AnswerQuizType } from '../../../../../types/answerQuiz';
import { editQuizSlide, getListQuizSlide } from '../../../../../features/Slide/quiz/QuizSlide';
import { addAnswerQuizSlide, editAnswerQuizSlide } from '../../../../../features/Slide/answerQuiz/AnswerQuizSlide';
import { changeBreadcrumb } from '../../../../../features/Slide/sentences/sentencesSlice';
import { detailAnswerQuiz, listAnswerQuiz } from '../../../../../api/answerQuiz';
import AdminPageHeader from '../../../../../components/AdminPageHeader';
import { QuizType } from '../../../../../types/quiz';

type Props = {}

const FormAnswerSentences = (props: Props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const breadcrumb = useAppSelector(data => data.sentences.breadcrumb)
  const quizs = useAppSelector(data => data.quiz.value)
  const [answerQuiz, setAnswerQuiz] = useState<AnswerQuizType>()
  const [listAnswer, setListAnswer] = useState<AnswerQuizType[]>([])
  const { dayId, id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  let filterAnswer = listAnswer.filter((item) => item.quiz === id)

  const checkAnswer = (question: QuizType, length: number) => {
    switch (question.type) {
      case "selectAuto":
        if (length === 3) {
          dispatch(editQuizSlide({ ...question, status: true }))
        }
        break;

      default:
        break;
    }
  }

  const onFinish = async (value) => {
    const key = 'updatable';
    let detailQuiz = quizs.find((e: QuizType) => e._id === id)
    if (filterAnswer.length === 4) {
      message.warning("Đã đạt giới hạn đáp án !")
      return navigate(`/manageDay/${dayId}/sentences/listExercise`);
    }
    if (detailQuiz) {
      checkAnswer(detailQuiz, filterAnswer.length);
    }

    message.loading({ content: 'Loading...', key });
    dispatch(addAnswerQuizSlide({
      ...value,
      quiz: id
    }));
    message.success({ content: 'Thêm Thành Công!', key, duration: 2 });
    await dispatch(getListQuizSlide())
    navigate(`/manageDay/${dayId}/sentences/listExercise`);

  };

  const onFinishFailed = (errorInfo) => {
    message.error('Thêm Không Thành Công!');
  };

  const onReset = () => {
    form.resetFields();
  };

  const getQuiz = async () => {
    const { data } = await detailAnswerQuiz(String(id))
    setAnswerQuiz(data)
    form.setFieldsValue(data);
  }

  useEffect(() => {
    if (id) {
      getQuiz()
      dispatch(changeBreadcrumb("Sửa đáp án"))
    }
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
      <AdminPageHeader breadcrumb={breadcrumb} day={dayId} activity={{ title: "Luyện cấu trúc & câu", route: "sentences" }} type={{ title: "Bài tập", route: "listExercise" }} />
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

          <Form.Item
            label="Trạng Thái"
            name="isCorrect"
            tooltip="Trạng Thái Đáp Án"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            <Select>
              <Option key={1} value={0}>
                Sai
              </Option>
              <Option key={2} value={1}>
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

export default FormAnswerSentences