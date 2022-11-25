import React, { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Divider, Form, Input, Button, Checkbox, Upload, Select, Avatar, message, Modal, Progress, Image, Empty } from 'antd';
import axios from "axios";
import AdminPageHeader from '../../../../components/AdminPageHeader';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { addQuizSlide, changeBreadcrumb, editQuizSlide, getListQuizSlide } from '../../../../features/Slide/quiz/QuizSlide';
import { getCategoryList } from '../../../../features/Slide/category/CategorySlide';
import { detailQuiz } from '../../../../api/quiz';
import { QuizType } from '../../../../types/quiz';
import useQuiz from '../../../../features/Slide/quiz/use_quiz';
import { PracticeActivityType } from '../../../../types/practiceActivity';
import { getAnswerByIdQuiz } from '../../../../api/answerQuiz';
import { addAnswerQuizSlide, removeAnswerQuizSlide } from '../../../../features/Slide/answerQuiz/AnswerQuizSlide';
import { AnswerQuizType } from '../../../../types/answerQuiz';
import { uploadImage } from '../../../../utils/upload';

type Props = {}

interface TypeQuiz {
  id?: number,
  name: string,
  type: string
}
interface TypeArrAnswer {
  id: number,
  text: string,
  checkAnswer: boolean
}
interface TypeArrQuestion {
  id: number,
  text: string
}
const FormQuestionListenSpeak = (props: Props) => {

  const { data, error, mutate, add, edit, remove } = useQuiz()
  const quizs = useAppSelector(item => item.quiz.value)
  const practiceActivity = useAppSelector(item => item.practiceActivity.value)
  const { Option } = Select;
  const [form] = Form.useForm();
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
  const breadcrumb = useAppSelector(data => data.quiz.breadcrumb)
  const [quiz, setQuiz] = useState<QuizType>()
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { dayId } = useParams();
  const [fileList, setfileList] = useState<any>();
  const [selected, setSelected] = useState<any>();
  const [arrAnswer, setArrAnswer] = useState<TypeArrAnswer[]>([])
  const [arrQuestion, setArrQuestion] = useState<TypeArrQuestion[]>([])
  const [valueQuestion, setValueQuestion] = useState("")
  const [answerListenWrite, setAnswerListenWrite] = useState<any>()
  const [preview, setPreview] = useState<string>();
  const typeQuiz = [
    { id: 1, name: "Chọn đáp án", type: "selectRadio" },
    { id: 2, name: "Chọn Đáp Án có hình ảnh", type: "selectImage" },
    { id: 3, name: "Ghép từng đáp án", type: "selectCompound" }
  ]
  const type = "listenspeak"
  const prative: any = practiceActivity.find((item: PracticeActivityType) => item.type === type && item.day === dayId)

  let quizLength = quizs.filter((e: QuizType) => e.practiceActivity?.day === dayId && e.practiceActivity?.type === "listenspeak")

  const { id } = useParams();
  const handlePreview = async (e: any) => {
    const imgLink = await uploadImage(e.target);
    message.loading({ content: "Đang thêm ảnh" });
    setPreview(imgLink);
    const imgPreview = document.getElementById("img-preview") as HTMLImageElement
    imgPreview.src = URL.createObjectURL(e.target.files[0])
  }
  const onFinish = async (value) => {
    if (fileList && quizLength.length < 10) {
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


    let key = 'updatable';
    console.log(data.url);

    if (id) {
      switch (selected) {
        case "selectRadio":
          console.log(value);
          dispatch(editQuizSlide({ ...value, image: preview }));
          message.success({ content: 'Sửa Thành Công!' });
          navigate(`/manageDay/${dayId}/listenspeak`);
          break;
        case "selectImage":
          dispatch(editQuizSlide(value));
          message.success({ content: 'Sửa Thành Công!' });
          navigate(`/manageDay/${dayId}/listenspeak`);
          break;
        case "selectCompound":
          const question = arrQuestion.map((item) => item.text).join(" ")
          const { payload } = await dispatch(editQuizSlide({
            _id: id,
            question: question,
            questionAfter: valueQuestion,
            type: "selectCompound",
            practiceActivity: prative._id,
            timeLimit: value.timeLimit
          }))

          const test2 = await Promise.all(answerListenWrite.map(async (item: AnswerQuizType) => {
            await dispatch(removeAnswerQuizSlide(item._id))
          }))

          if (payload) {
            arrAnswer.map(async (item) => {
              if (item.checkAnswer === true) {
                await dispatch(addAnswerQuizSlide({
                  quiz: payload._id,
                  answer: item.text,
                  isCorrect: true
                }))
              }
            })
          }
          message.success("Sửa thành công !")
          navigate(`/manageDay/${dayId}/listenspeak`);
          break;
        default:
          break;
      }
    } else {
      if (quizLength.length === 10) {
        message.warning("Đã đạt giới hạn câu hỏi !")
        return navigate(`/manageDay/${dayId}/listenspeak`);
      }
      switch (selected) {
        case "selectRadio":
          if (!preview) {
            return message.error('Không để trống Ảnh!');
          }

          dispatch(addQuizSlide({...value, image: preview}));
          message.success('Thêm Thành Công!');
          navigate(`/manageDay/${dayId}/listenspeak`);
          break;
        case "selectImage":
          dispatch(addQuizSlide(value));
          message.success('Thêm Thành Công!');
          navigate(`/manageDay/${dayId}/listenspeak`);
          break;
        case "selectCompound":
          const question = arrQuestion.map((item) => item.text).join(" ")
          const { payload } = await dispatch(addQuizSlide({
            question: question,
            questionAfter: valueQuestion,
            type: "selectCompound",
            practiceActivity: prative._id,
            status: true,
            timeLimit: value.timeLimit
          }))
          await dispatch(getListQuizSlide())
          if (payload) {
            arrAnswer.map(async (item) => {
              if (item.checkAnswer === true) {
                await dispatch(addAnswerQuizSlide({
                  quiz: payload._id,
                  answer: item.text,
                  isCorrect: true
                }))
              }
            })
          }
          message.success("Thêm thành công !")
          navigate(`/manageDay/${dayId}/listenspeak`);
          break;
        default:
          break;
      }
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
  const onChange = async (value) => {
    setValueQuestion(value.target.value)

    // arr question
    let arrQues = value.target.value.split(' ')
    const arrQ: TypeArrQuestion[] = [];
    let koin = "";
    arrQues.map((element: string, index: number) => {
      if (element !== '') {
        arrQ.push({ id: index + 1, text: element })
        koin += element
      }
    });
    setArrQuestion(arrQ)


    // arr answer
    let arrAns = value.target.value.replaceAll("?", '').replaceAll(',', '').replaceAll('.', '').split(' ')
    const arr: TypeArrAnswer[] = [];
    arrAns.map((element: string, index: number) => {
      if (element !== '') {
        arr.push({ id: index + 1, text: element, checkAnswer: true })
      }
    });
    setArrAnswer(arr)
  }
  const setQuestionById = async (value) => {
    setValueQuestion(value)
    // arr question
    let arrQues = value.split(' ')
    const arrQ: TypeArrQuestion[] = [];
    let koin = "";
    arrQues.map((element: string, index: number) => {
      if (element !== '') {
        arrQ.push({ id: index + 1, text: element })
        koin += element
      }
    });
    setArrQuestion(arrQ)

    // arr answer
    let arrAns = value.replaceAll("?", '').replaceAll(',', '').replaceAll('.', '').split(' ')
    const arr: TypeArrAnswer[] = [];
    arrAns.map((element: string, index: number) => {
      if (element !== '') {
        arr.push({ id: index + 1, text: element, checkAnswer: true })
      }
    });
    setArrAnswer(arr)
  }
  React.useEffect(() => {
    form.setFieldsValue({
      practiceActivity: prative?._id
    })
  }, [])
  useEffect(() => {
    if (id) {
      const getQuiz = async () => {
        const { data } = await detailQuiz(id)
        setQuiz(data)
        setSelected(data.quiz.type)
        form.setFieldsValue(data.quiz);
        if (data.quiz.type === "selectCompound") {
          setQuestionById(data.quiz.questionAfter)
          const { data: answer } = await getAnswerByIdQuiz(id)
          setAnswerListenWrite(answer)
        }
        dispatch(changeBreadcrumb("Sửa câu hỏi"))
      }
      getQuiz()
    } else {
      dispatch(changeBreadcrumb("Thêm câu hỏi"))
    }

    dispatch(getCategoryList())

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
            label="Thể Loại"
            name="type"
            tooltip="Thể Loại Quiz"
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


          {
            selected === 'selectRadio' ?
              <div>
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
                  label="Upload ảnh"
                  tooltip="Ảnh dành cho Quiz"
                >
                  <Input type="file" accept='.png,.jpg' className="form-control" onChange={handlePreview} />
                </Form.Item>

                <Form.Item name="image" valuePropName="src" label="ImagePreview" >
                  <img id="img-preview" style={{ width: "100px" }} />
                </Form.Item>
              </div>
              :
              selected === 'selectCompound' ?
                <div className='mb-4'>
                  <Form.Item
                    label="Câu Hỏi"
                    name="question"
                    tooltip="Câu Hỏi dành cho Category"
                    rules={[{ required: true, message: 'Không để Trống!' }]}
                    className="py-4"
                  >
                    <Input onChange={onChange} />
                  </Form.Item>

                  <div className='grid grid-cols-12 gap-4 mb-4'>
                    <div className='font-bold py-1 col-span-2'>Câu hỏi: </div>
                    <div className='flex col-span-10 space-x-1'>
                      {arrQuestion &&
                        arrQuestion.map((item: TypeArrQuestion) => (
                          <div key={item.id}>
                            {item.text}
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className='grid grid-cols-12 gap-4'>
                    <div className='font-bold py-1 col-span-2'>Chọn đáp án: </div>
                    <ul className='flex space-x-8 col-span-10'>
                      {arrAnswer?.map((item: TypeArrAnswer, index: number) => {
                        return (
                          <li className='border px-3 py-1 my-auto rounded cursor-pointer border-green-600'>{item.text}</li>
                        );
                      })
                      }
                    </ul>
                  </div>

                </div> :
                <div>
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
                  <Form.Item label="_id" name="_id" hidden={true}>
                    <Input />
                  </Form.Item>

                </div>
          }
          <Form.Item
            label="Thời Gian Làm"
            name="timeLimit"
            tooltip="Thời gian làm bài"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            {id ?
              <Input type='number' min={30000} /> :
              <Input type='number' min={30000} disabled={!selected} />
            }
          </Form.Item>


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

export default FormQuestionListenSpeak