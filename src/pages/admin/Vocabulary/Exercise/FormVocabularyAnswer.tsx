import React, { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Divider, Form, Input, Button, Checkbox, Upload, Select, Avatar, message, Modal, Progress, Image, Empty } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getListQuizSlide } from '../../../../features/Slide/quiz/QuizSlide';
import { QuizType } from '../../../../types/quiz';
import { AnswerQuizType } from '../../../../types/answerQuiz';
import { changeBreadcrumb, addAnswerQuizSlide, editAnswerQuizSlide } from '../../../../features/Slide/answerQuiz/AnswerQuizSlide';
import { detailAnswerQuiz, listAnswerQuiz } from '../../../../api/answerQuiz';
import AdminPageHeader from '../../../../components/AdminPageHeader';

type Props = {}

const FormAnswerListenSpeak = (props: Props) => {
    const { Option } = Select;
    const [form] = Form.useForm();
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
    const breadcrumb = useAppSelector(data => data.answerQuiz.breadcrumb)
    const quizs = useAppSelector(data => data.quiz.value)
    const [answerQuiz, setAnswerQuiz] = useState<AnswerQuizType>()
    const [listAnswer, setListAnswer] = useState<any>([])

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const { id } = useParams();
    const filterAnswer = listAnswer.filter((item) => item.quiz === id)
    const filterIsCorrect = filterAnswer.find((item) => item.isCorrect === true)

    const onFinish = async (value) => {
        const key = 'updatable';

        message.loading({ content: 'Loading...', key });
        setTimeout(() => {

            dispatch(addAnswerQuizSlide({
                ...value,
                quiz: id
            }));
            message.success({ content: 'Thêm Thành Công!', key, duration: 2 });
            navigate("/manageDay/vocabulary/listExercise");

        }, 2000);

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

    useEffect(() => {

        dispatch(changeBreadcrumb("Thêm câu trả lời"))
        dispatch(getListQuizSlide())
        const getAnswer = async () => {
            const { data } = await listAnswerQuiz()
            setListAnswer(data);
        }
        getAnswer()


    }, [])

    return (
        <div className="container">
            <AdminPageHeader breadcrumb={breadcrumb} />
            <div className="pb-6 mx-6">
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
                        <Select onChange={(e) => handleChange(Boolean(e))}>
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

export default FormAnswerListenSpeak