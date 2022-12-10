import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Input, Button, Select, message } from 'antd';
import { AnswerQuizType } from '../../../../../../types/answerQuiz';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { QuizType } from '../../../../../../types/quiz';
import { editQuizSlide, getListQuizSlide } from '../../../../../../features/Slide/quiz/QuizSlide';
import { addAnswerQuizSlide, changeBreadcrumb } from '../../../../../../features/Slide/answerQuiz/AnswerQuizSlide';
import { listAnswerQuiz } from '../../../../../../api/answerQuiz';
import AdminPageHeader from '../../../../../../components/AdminPageHeader';

const FormAnswerListenWrite = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const breadcrumb = useAppSelector(data => data.answerQuiz.breadcrumb)
  const quizs = useAppSelector(data => data.quiz.value)
  const [listAnswer, setListAnswer] = useState<AnswerQuizType[]>([])
  const { dayId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const { id } = useParams();
  const filterAnswer = listAnswer.filter((item: AnswerQuizType) => item.quiz === id)

  const checkAnswer = (question: QuizType, length: number) => {
    if (length === 3) {
      dispatch(editQuizSlide({ ...question, status: true }))
    }
  }

  const onFinish = async (value) => {
    if (filterAnswer.length === 4) {
      message.warning("Đã đạt giới hạn đáp án !")
      return navigate(`/manageDay/${dayId}/conversation/listExercise`);
    }
    const key = 'updatable';
    let detailQuiz = quizs.find((e: QuizType) => e._id === id)
    if (detailQuiz) {
      checkAnswer(detailQuiz, filterAnswer.length);
    }
    message.loading({ content: 'Loading...', key });
    dispatch(addAnswerQuizSlide({
      ...value,
      quiz: id
    }));
    await dispatch(getListQuizSlide())
    message.success({ content: 'Thêm Thành Công!', key, duration: 2 });
    navigate(`/manageDay/${dayId}/conversation/listExercise`);
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Thêm Không Thành Công!');
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    dispatch(getListQuizSlide())
    dispatch(changeBreadcrumb("Thêm đáp án bài tập ngữ pháp"))
    const getAnswer = async () => {
      const { data } = await listAnswerQuiz()
      setListAnswer(data);
    }
    getAnswer()
  }, [])

  return (
    <div>
      <AdminPageHeader breadcrumb={breadcrumb} day={dayId} activity={{ title: "Luyện hội thoại", route: "conversation" }} type={{ title: "Bài tập", route: "listExercise" }} />
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

export default FormAnswerListenWrite