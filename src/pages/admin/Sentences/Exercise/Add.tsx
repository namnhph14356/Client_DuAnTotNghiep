/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Divider, Form, Input, Button, Space, Checkbox, Upload, Select, Avatar, message, Modal, Progress, Image, Empty } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getCategoryList } from '../../../../features/Slide/category/CategorySlide';
import { CategoryType } from '../../../../types/category';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ReactAudioPlayer from 'react-audio-player';
import { changeImage, changeVideo, uploadImage, uploadVideo } from '../../../../utils/upload';
import { addListen, changeBreadcrumb, editListen, getListListenWrite } from '../../../../features/Slide/listenWrite/ListenWriteSlice';
import { ListenWriteType } from '../../../../types/listenWrite';
import { detailListenWrite } from '../../../../api/listenWrite';
import AdminPageHeader from '../../../../components/AdminPageHeader';
import { addQuestionListenSlide, editQuestionListenWriteSlide } from '../../../../features/Slide/questionListenWrite/questionListenWrite';
import { addAnswerListenWriteSlide, editAnswerListenWriteSlide } from '../../../../features/Slide/answerListenWrite/answerListenWrite';
import { getListQuestionListenWriteById } from '../../../../api/questionListenWrite';
import { listAnswerListenWriteById } from '../../../../api/answerListenWrite';
import { async } from '@firebase/util';
import { QuizType } from '../../../../types/quiz';
import useQuiz from '../../../../features/Slide/quiz/use_quiz';
import { addQuizSlide, editQuizSlide, getListQuizSlide } from '../../../../features/Slide/quiz/QuizSlide';
import { addAnswerQuizSlide, removeAnswerQuizSlide } from '../../../../features/Slide/answerQuiz/AnswerQuizSlide';
import { detailQuiz } from '../../../../api/quiz';
import { getAnswerByIdQuiz } from '../../../../api/answerQuiz';
import axios from 'axios';
import { editPracticeActivitylice } from '../../../../features/Slide/practiceActivity/PracticeActivitySlice';
import { PracticeActivityType } from '../../../../types/practiceActivity';
import { AnswerQuizType } from '../../../../types/answerQuiz';
import { Helmet } from "react-helmet";

type Props = {}

interface TypeQuiz {
  id?: number,
  name: string,
  type: string
}

interface TypeArrQuestion {
  id: number,
  text: string
}

interface TypeArrAnswer {
  id: number,
  text: string,
  checkAnswer: boolean
}

const areas = [
  { label: 'Hai nhân vật', value: 'twoPeople' },
  { label: 'Ba nhân vật', value: 'threePeople' },
  { label: 'Nhiều nhân vật', value: 'manyPeople' },
];

const sights = {
  twoPeople: ['Cap', 'Tony'],
  threePeople: ['Kevin', 'Stuart', 'Bob'],
  manyPeople: ['Cap', 'Tony', 'Kevin', 'Stuart', 'Bob', 'Natasha', 'Bruce', 'Peter'],
};

const typeQuiz = [
  { id: 1, name: "Chọn đáp án", type: "selectAuto" },
  { id: 2, name: "Nghe rồi Viết Đáp Án", type: "listenWrite" },
]

type SightsKeys = keyof typeof sights;

const AddSentencesExercise = (props: Props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const breadcrumb = useAppSelector(data => data.listenWrite.breadcrumb)
  const practiceActivity = useAppSelector(item => item.practiceActivity.value)
  const quizs: any = useAppSelector(item => item.quiz.value)

  const [valueQuestion, setValueQuestion] = useState("")
  const [arrAnswer, setArrAnswer] = useState<TypeArrAnswer[]>([])
  const [arrQuestion, setArrQuestion] = useState<TypeArrQuestion[]>([])

  const [quiz, setQuiz] = useState<QuizType>()
  const [answerListenWrite, setAnswerListenWrite] = useState<any>()

  const [fileList, setfileList] = useState<any>();
  const [selected, setSelected] = useState<any>();
  const [preview, setPreview] = useState<string>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { id, dayId } = useParams();

  let prative: any = practiceActivity.find((item: PracticeActivityType) => item.type === "sentences" && item.day === dayId)
  let lengthQuiz = quizs.filter((e: QuizType) => e.practiceActivity?.day === dayId && e.practiceActivity?.type === "vocabulary")

  const tableWithType = quizs.filter((item: QuizType) => item.practiceActivity?.type === "sentences" && item.type === 'selectAuto' || item.type === 'listenWrite')
  const tableListenSpeak = tableWithType.filter((item: QuizType) => item.practiceActivity?.day === String(dayId))
  
  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };
  const handlePreview = async (e: any) => {
    const imgLink = await uploadImage(e.target);
    message.loading({ content: "Đang thêm ảnh" });
    setPreview(imgLink);
    const imgPreview = document.getElementById("img-preview") as HTMLImageElement
    imgPreview.src = URL.createObjectURL(e.target.files[0])
  }

  const onFinish = async (value) => {

    if (fileList && lengthQuiz.length < 10) {
      const CLOUDINARY_PRESET = "ypn4yccr";
      const CLOUDINARY_API_URL = "https://api.cloudinary.com/v1_1/vintph16172/image/upload"
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

    if (id) {
      switch (selected) {
        case "selectAuto":
          dispatch(editQuizSlide({ ...value, image: preview }));
          message.success({ content: 'Sửa Thành Công!' });
          navigate(`/manageDay/${dayId}/sentences/listExercise`)
          break;
        case "listenWrite":
          const question = arrQuestion.map((item) => item.text).join(" ")
          const { payload } = await dispatch(editQuizSlide({
            _id: id,
            question: question,
            questionAfter: valueQuestion,
            type: "listenWrite",
            practiceActivity: prative._id
          }))

          const test2 = await Promise.all(answerListenWrite.map(async (item: AnswerQuizType) => {
            await dispatch(removeAnswerQuizSlide(item._id))
          }))

          if (payload) {
            arrAnswer.map(async (item, index: number) => {
              if (item.checkAnswer === true) {
                await dispatch(addAnswerQuizSlide({
                  quiz: payload._id,
                  answer: item.text,
                  order: index + 1
                }))
              }
            })
          }
          message.success("Sửa thành công !")
          navigate(`/manageDay/${dayId}/sentences/listExercise`)
          break;
        default:
          break;
      }
    } else {

      if (tableListenSpeak.length === 10) {
        message.warning("Đã đạt giới hạn câu hỏi !")
        return navigate(`/manageDay/${dayId}/sentences/listExercise`)
      }
      switch (selected) {
        case "selectAuto":
          if (!preview) {
            return message.error('Không để trống Ảnh!');
          }
          dispatch(addQuizSlide({ ...value, image: preview }));
          message.success('Thêm Thành Công!');
          navigate(`/manageDay/${dayId}/sentences/listExercise`)
          break;
        case "listenWrite":
          const question = arrQuestion.map((item) => item.text).join(" ")
          const { payload } = await dispatch(addQuizSlide({
            question: question,
            questionAfter: valueQuestion,
            type: "listenWrite",
            practiceActivity: prative._id,
            status: true
          }))
          await dispatch(getListQuizSlide())
          if (payload) {
            arrAnswer.map(async (item, index: number) => {
              if (item.checkAnswer === true) {
                await dispatch(addAnswerQuizSlide({
                  quiz: payload._id,
                  answer: item.text,
                  order: index + 1
                }))
              }
            })
          }
          message.success("Thêm thành công !")
          navigate(`/manageDay/${dayId}/sentences/listExercise`)
          break;
        default:
          break;
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    id ? message.error('Sửa Không Thành Công!') : message.error('Thêm Không Thành Công!');
  };

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
        arr.push({ id: index + 1, text: element, checkAnswer: false })
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
        arr.push({ id: index + 1, text: element, checkAnswer: false })
      }
    });
    setArrAnswer(arr)
  }

  const changeAnswer = (value: any, id: number, checkAnswer: boolean) => {

    arrAnswer.map((e: TypeArrAnswer) => {
      if (e.text === value.target.innerHTML && e.id === id) {
        if (checkAnswer === true) {
          value.target.style.background = "#16A34A"
          value.target.style.color = "white"
          setArrQuestion(arrQuestion.map((e) => e.id === id ? { id: id, text: "......................" } : e))
          setArrAnswer(arrAnswer.map((e) => e.id === id ? { id: id, text: e.text, checkAnswer: checkAnswer } : e))
        } else {
          value.target.style.background = "white"
          value.target.style.color = "black"
          setArrQuestion(arrQuestion.map((e) => e.id === id ? { id: id, text: value.target.innerHTML } : e))
          setArrAnswer(arrAnswer.map((e) => e.id === id ? { id: id, text: e.text, checkAnswer: checkAnswer } : e))
        }
      }
    })
  }

  const onReset = () => {
    form.resetFields();
  };

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

        if (data.quiz.type === "listenWrite") {
          setQuestionById(data.quiz.questionAfter)
          const { data: answer } = await getAnswerByIdQuiz(id)
          setAnswerListenWrite(answer)
        }

        dispatch(changeBreadcrumb("Sửa câu hỏi"))
      }
      getQuiz()
      dispatch(changeBreadcrumb("Sửa bài tập"))
    } else {
      dispatch(changeBreadcrumb("Thêm bài tập"))
    }
    dispatch(getCategoryList())
    dispatch(getListListenWrite())
  }, [id])

  const onChangeImage = async (e) => {
    if (e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpeg") {
      setfileList(e.target.files[0])
      const imgPreview = document.getElementById("img-preview") as HTMLImageElement
      imgPreview.src = await URL.createObjectURL(e.target.files[0])
    } else {
      message.error('File không hợp lệ!');
    }
  }


  return (
    <div className='h-screen'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Luyện Cấu Trúc Và Câu | Vian English</title>
      </Helmet>

      <AdminPageHeader breadcrumb={breadcrumb} day={dayId} activity={{ title: "Luyện cấu trúc & câu", route: "sentences" }} type={{ title: "Bài tập", route: "listExercise" }} />
      <div className="pb-6">
        <Form layout="vertical" form={form} onFinishFailed={onFinishFailed} onFinish={selected === "selectAuto" ? onFinish : () => { }} onChange={onChange}>
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
              ? <Select disabled={true}>
                {typeQuiz?.map((item: TypeQuiz, index) => (
                  <Option key={index + 1} value={item.type} >
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
            selected === 'listenWrite' ?
              <div className='mb-4'>
                <Form.Item
                  label="Câu Hỏi"
                  name="question"
                  tooltip="Câu Hỏi dành cho Category"
                  rules={[{ required: true, message: 'Không để Trống!' }]}
                  className="py-4"
                >
                  <Input />
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
                  <ul className='flex-auto space-x-8 col-span-10 w-full'>
                    {arrAnswer?.map((item: TypeArrAnswer, index: number) => {
                      return (
                        <button key={item.id} onClick={(e) => changeAnswer(e, item.id, !item.checkAnswer)}><li className='border px-3 py-1 my-auto mb-4 rounded cursor-pointer border-green-600 hover:bg-green-600 hover:text-white'>{item.text}</li></button>
                      );
                    })
                    }
                  </ul>
                </div>

              </div>
              :
              <div>
                <Form.Item
                  label="Câu Hỏi"
                  name="question"
                  tooltip="Câu Hỏi"
                  rules={[{ required: true, message: 'Không để Trống!' }]}
                >
                  {id ?
                    <Input /> :
                    <Input disabled={!selected} />
                  }
                </Form.Item>
                <Form.Item
                  label="Upload ảnh"
                  tooltip="Hình ảnh"
                >
                  {id ?
                    <Input type="file" accept='.png,.jpg' className="form-control" onChange={handlePreview} /> :
                    <Input type="file" accept='.png,.jpg' className="form-control" onChange={handlePreview} disabled={!selected} />
                  }
                </Form.Item>

                <Form.Item name="image" valuePropName="src" label="ImagePreview" >
                  <img id="img-preview" style={{ width: "100px" }} />
                </Form.Item>
              </div>
          }

          <Form.Item label="practiceActivity" name="practiceActivity" hidden={true}>
            <Input value={prative?._id} />
          </Form.Item>

          <Form.Item className='float-right'>
            <Button className='inline-block mr-2' type="primary" htmlType="submit" onClick={selected === "listenWrite" ? onFinish : () => { }} >
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

export default AddSentencesExercise