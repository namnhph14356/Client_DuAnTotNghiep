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
import { addQuizSlide } from '../../../../features/Slide/quiz/QuizSlide';
import { addAnswerQuizSlide } from '../../../../features/Slide/answerQuiz/AnswerQuizSlide';

type Props = {}

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
  { id: 1, name: "Nghe rồi chọn Đáp Án" },
  { id: 2, name: "Chọn Đáp Án" },
  { id: 3, name: "Nghe rồi Viết Đáp Án" }
]

type SightsKeys = keyof typeof sights;

const AddSentencesExercise = (props: Props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const breadcrumb = useAppSelector(data => data.listenWrite.breadcrumb)
  const categories = useAppSelector(data => data.category.value)
  const listWrite = useAppSelector(data => data.listenWrite.value)

  const [valueQuestion, setValueQuestion] = useState("")
  const [arrAnswer, setArrAnswer] = useState<any>([])
  const [arrQuestion, setArrQuestion] = useState<any>([])

  const [categoryExist, setCategoryExist] = useState<string[]>([])
  const [listenWrite, setListenWrite] = useState<ListenWriteType>()
  const [turnOnListenWrite, setTurnOnListenWrite] = useState(false)
  const [turnOnQuiz, setTurnOnQuiz] = useState(false)
  const [audio, setAudio] = useState<string>("");
  const [quiz, setQuiz] = useState<QuizType>()
  const [fileList, setfileList] = useState<any>();
  const { data, error, mutate, add, edit, remove } = useQuiz()

  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { id, dayId } = useParams();

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };


  const onFinish = async () => {
    const question = arrQuestion.map((item) => item.text).join(" ")
    const { payload } = await dispatch(addQuizSlide({
      question: question,
      questionAfter: valueQuestion,
      type: "listenWrite",
      practiceActivity: "6346d44a034348adfcfce592"
    }))
    if (payload) {
      arrAnswer.map(async (item) => {
        if (item.checkAnswer === true) {
          const { payload: answer } = await dispatch(addAnswerQuizSlide({
            quiz: payload._id,
            answer: item.text
          }))
          if (answer) {
            message.success("Thêm thành công !")
          }
        }
      })
    }
    setTurnOnListenWrite(true)
    setTurnOnQuiz(true)
  };

  const onFinishFailed = (errorInfo) => {
    id ? message.error('Sửa Không Thành Công!') : message.error('Thêm Không Thành Công!');
  };
  const onChange = async (value) => {
    setValueQuestion(value.target.value)

    // arr question
    let arrQues = value.target.value.split(' ')
    const arrQ: any = [];
    let koin = "";
    arrQues.map((element: any, index: number) => {
      if (element !== '') {
        arrQ.push({ id: index + 1, text: element })
        koin += element
      }
    });
    setArrQuestion(arrQ)


    // arr answer
    let arrAns = value.target.value.replaceAll("?", '').replaceAll(',', '').replaceAll('.', '').split(' ')
    const arr: any = [];
    arrAns.map((element: any, index: number) => {
      if (element !== '') {
        arr.push({ id: index + 1, text: element, checkAnswer: false })
      }
    });
    setArrAnswer(arr)
  }

  const changeAnswer = (value: any, id: number, checkAnswer: boolean) => {
    arrAnswer.map((e: any) => {
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

  useEffect(() => {
    if (id) {
      // const getListenAndWrite = async () => {
      //   const { data } = await detailListenWrite(id)
      //   setListenWrite(data);
      //   setAudio(data.audio)
      //   let arr: {
      //     _id: string,
      //     name: string,
      //     text: string,
      //     answer?: string
      //   }[] = [];
      //   if (data) {
      //     const { data: question } = await getListQuestionListenWriteById(String(data._id))
      //     for (let i = 0; i < question.length; i++) {
      //       const { data: answer } = await listAnswerListenWriteById(question[i]._id)
      //       arr.push({ ...question[i], answer: answer ? answer.answer : null })
      //     }
      //   }
      //   const category: CategoryType[] = categories.filter(((item: CategoryType) => item._id == data.category ? item.title : ""))
      //   form.setFieldsValue({
      //     _id: id,
      //     area: data.area,
      //     // category: category[0].title,
      //     category: data.category,
      //     audio: data.imgLink,
      //     content: arr
      //   });
      // }
      // getListenAndWrite()
      dispatch(changeBreadcrumb("Sửa bài tập"))
    } else {
      dispatch(changeBreadcrumb("Thêm bài tập"))
    }
    dispatch(getCategoryList())
    dispatch(getListListenWrite())
    // listCate();

  }, [id])

  const onChangeImage = (e: any) => {
    const imgPreview = document.getElementById("img-preview") as any;
    console.log(e.target.files[0]);
    imgPreview.src = URL.createObjectURL(e.target.files[0])
  }

  const onChangeAudio = (e: any) => {
    const audioPreview = document.getElementById("audio-preview") as any;
    audioPreview.src = URL.createObjectURL(e.target.files[0])
  }

  return (
    <div>
      <AdminPageHeader breadcrumb={breadcrumb} day={dayId} activity={{ title: "Luyện cấu trúc & câu", route: "sentences" }} type={{ title: "Bài tập", route: "listExercise" }} />
      {/* <Form layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <div className='shadow-md mb-8'>
          <div className='flex justify-between font-medium text-lg border-b hover:text-indigo-600 cursor-pointer' onClick={() => setTurnOnListenWrite(!turnOnListenWrite)}>
            <div>Nghe và trả lời câu hỏi.</div>
            <div className='px-4 rounded-t bg-gray-400'>
              {
                turnOnListenWrite ?
                  <i className="fa-sharp fa-solid fa-caret-up"></i>
                  :
                  <i className="fa-sharp fa-solid fa-caret-down"></i>
              }
            </div>
          </div>
          {
            turnOnListenWrite ?
              <div className='border px-8 py-4'>
                <div>
                  {id ? <Form.Item label="quiz._id" name="quiz._id" hidden={true}>
                    <Input />
                  </Form.Item> : ""}

                  <div className='mb-4'>
                    <Form.Item
                      label="Câu Hỏi"
                      name="quiz.question"
                      tooltip="Câu Hỏi dành cho Category"
                      rules={[{ required: true, message: 'Không để Trống!' }]}
                      className="py-4"
                    >
                      <Input />
                    </Form.Item>
                  </div>

                  <div className='mb-4'>
                    <Form.Item
                      label="Upload ảnh"
                      tooltip="Ảnh dành cho Quiz"

                      rules={[{ required: true, message: 'Không để Trống!' }]}

                    >
                      <Input type="file" accept='.png,.jpg' className="form-control" id="upload_image" onChange={(e) => onChangeImage(e)} />
                    </Form.Item>
                  </div>

                  <div className='mb-4'>
                    <Form.Item name="quiz.image" valuePropName="src" label="ImagePreview" >
                      <img id="img-preview" style={{ width: "100px" }} />
                    </Form.Item>
                  </div>

                  <div className='mb-4'>
                    <Form.Item
                      label="Thể Loại"
                      name="quiz.type"
                      tooltip="Thể Loại Quiz"
                      rules={[{ required: true, message: 'Không để Trống!' }]}
                    >
                      {id
                        ? <Select >
                          {typeQuiz?.map((item: any, index) => (
                            <Option key={index + 1} value={item.id}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>
                        : <Select
                          defaultValue={typeQuiz?.map((item: any, index) => {
                            if (item.id === quiz?.type) {
                              return <Option key={index + 1} value={item.id}>
                                {item.name}
                              </Option>
                            }
                          })}
                        >

                          {typeQuiz?.map((item: any, index) => (
                            <Option key={index + 1} value={item.id}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>}


                    </Form.Item>
                  </div>
                </div>
              </div>
              : ""
          }
        </div>

        <div className='shadow-md'>
          <div className='flex justify-between font-medium text-lg border-b hover:text-indigo-600 cursor-pointer' onClick={() => setTurnOnQuiz(!turnOnQuiz)}>
            <div>Nghe và điền từ vào ô trống.</div>
            <div className='px-4 rounded-t bg-gray-400'>
              {
                turnOnQuiz ?
                  <i className="fa-sharp fa-solid fa-caret-up"></i>
                  :
                  <i className="fa-sharp fa-solid fa-caret-down"></i>
              }
            </div>
          </div>
          {
            turnOnQuiz ?
              <div className='border px-8 py-4'>
                <div>
                  {id ? <Form.Item label="listenWrite._id" name="listenWrite._id" hidden={true}>
                    <Input />
                  </Form.Item> : ""}
                  <div className='mb-4'>
                    <Form.Item name="area" label="Chọn vai" rules={[{ required: true, message: 'Missing area' }]}>
                      <Select options={areas} onChange={handleChange} />
                    </Form.Item>
                  </div>
                  <div className='mb-4'>
                    <Form.List name="content" >
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map((field, index) => (
                            <Space key={index + 1} align="baseline" >
                              <Form.Item
                                noStyle
                                shouldUpdate={(prevValues, curValues) =>
                                  prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                }
                              >
                                {() => (
                                  <Form.Item
                                    {...field}
                                    label="Tên"
                                    name={[field.name, 'name']}
                                    rules={[{ required: true, message: 'Chưa chọn tên nhân vật' }]}
                                  >
                                    <Select disabled={!form.getFieldValue('area')} style={{ width: 130 }}>
                                      {(sights[form.getFieldValue('area') as SightsKeys] || []).map(item => (
                                        <Option key={item} value={item}>
                                          {item}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                )}
                              </Form.Item>

                              <Form.Item
                                {...field}
                                label="Câu thoại"
                                name={[field.name, 'text']}
                                rules={[{ required: true, message: 'Không được để trống' }]}
                                style={{ minWidth: "500px" }}

                              >
                                <Input />
                              </Form.Item>

                              <Form.Item
                                {...field}
                                label="Đáp án"
                                name={[field.name, 'answer']}

                              >
                                <Input />
                              </Form.Item>
                              <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Space>
                          ))}

                          <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                              Thêm câu thoại
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </div>
                  <div className='mb-4'>
                    <Form.Item
                      label="Audio"
                      tooltip="Audio"
                      rules={[{ required: true, message: 'Không để Trống!' }]}
                    >
                      <Input type={'file'} id={'upload_audio'} name="listenWrite.audio" onChange={(e) => onChangeAudio(e)} />


                    </Form.Item>
                    <Form.Item name="listenWrite.audio" valuePropName="src" label="AudioPreview" >
                      <ReactAudioPlayer
                        id='audio-preview'
                        src={audio ? audio : ""}
                        controls
                        className='mt-2'
                      />
                    </Form.Item>

                  </div>

                </div>
                <div>
                  <h3>* Ghi chú:</h3>
                  <ul style={{ listStyle: "inside", marginLeft: "20px", color: "#0a76cf" }}>
                    <li>Câu thoại: Dùng "___" (Ba dấu gạch chân) để tạo khoảng chống để điền đáp án</li>
                    <li>Abccc</li>
                  </ul>
                </div>
              </div>
              : ""
          }

        </div>

        <div className='mt-4'>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </div>
      </Form> */}

      <Form layout="vertical" form={form} onChange={onChange} onFinishFailed={onFinishFailed}>
        <div className=' mb-8'>
          <div className='text-xl font-semibold'>Thêm câu hỏi:</div>
          <div className='border px-8 py-4'>
            <div>
              <div className='mb-4'>
                <Form.Item
                  label="Nhập câu Hỏi"
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
                      arrQuestion.map((item: any) => (
                        <div key={item.id}>
                          {item.text}
                        </div>
                      ))}
                  </div>
                </div>

                <div className='grid grid-cols-12 gap-4'>
                  <div className='font-bold py-1 col-span-2'>Chọn đáp án: </div>
                  <ul className='flex space-x-8 col-span-10'>
                    {arrAnswer?.map((item: any, index: number) => {
                      return (
                        <button key={item.id} onClick={(e) => changeAnswer(e, item.id, !item.checkAnswer)}><li className='border px-3 py-1 my-auto rounded cursor-pointer border-green-600 hover:bg-green-600 hover:text-white'>{item.text}</li></button>
                      );
                    })
                    }
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className='mt-4'>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={onFinish}>
              Thêm
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default AddSentencesExercise