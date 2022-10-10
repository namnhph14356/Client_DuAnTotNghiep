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

const FormListenWrite = (props: Props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const breadcrumb = useAppSelector(data => data.listenWrite.breadcrumb)
  const categories = useAppSelector(data => data.category.value)
  const listWrite = useAppSelector(data => data.listenWrite.value)
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
  const { id } = useParams();

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };

  const listCate = async () => {
    let arr: string[] = []
    listWrite.map((item: ListenWriteType) => {
      arr.push(item.category);
    })
    setCategoryExist(arr)
  }


  const onFinish = async (value) => {
    setTurnOnListenWrite(true)
    setTurnOnQuiz(true)
    // quizz
    const imgPost = document.querySelector<any>("#upload_image");
    const imgLink = await uploadImage(imgPost);
    value['quiz.image'] = imgLink;
    if (!value['quiz.image']) {
      return message.error('Không để trống Ảnh!');
    }
    const key = 'updatable';
    if (id) {
      // // dispatch(editQuizSlide(value));
      // mutate(edit(value))
      // console.log("data swr",data);
      // console.log("data redux",quizs);
      // message.success({ content: 'Sửa Thành Công!', key, duration: 2 });
      // navigate("/admin/quiz");
    } else {
      // // dispatch(addQuizSlide(value));
      // mutate(add(value))
      // console.log("data swr",data);
      // message.success({ content: 'Thêm Thành Công!', key, duration: 2 });
      // // navigate("/admin/quiz");
    }

    // listen and write
    const audioPost = document.querySelector("#upload_audio");
    let audioLink = await uploadVideo(audioPost);
    value['listenWrite.audio'] = audioLink;
    if (!value['listenWrite.audio']) {
      return message.error('Không để trống audio!');
    }
    for (let key in value.content) {
      if (value.content[key].answer) {
        value.content[key].answer = await value.content[key].answer.toString().replaceAll(" ", "").split(",");
      }
    }


    // if (id) {
    //   const { payload } = await dispatch(editListen({
    //     _id: value._id,
    //     area: value.area,
    //     category: value.category,
    //     audio: audioLink || audio
    //   }));

    //   if (payload) {
    //     value.content?.forEach(async (e: {
    //       _id: string,
    //       name: string,
    //       text: string,
    //       order: number,
    //       answer?: string
    //     }, index: number) => {
    //       const { data: listQuestion } = await getListQuestionListenWriteById(payload._id)
    //       const findIndex = listQuestion.findIndex((item: any) => item._id === e._id);
    //       if (findIndex !== -1) {
    //         const { payload: question } = await dispatch(editQuestionListenWriteSlide({ _id: e._id, idListenWrite: payload._id, name: e.name, text: e.text, order: index }))
    //         if (question && e.answer) {
    //           const { payload: answer } = await dispatch(editAnswerListenWriteSlide({ idQuestion: question._id, answer: e.answer }))
    //         }
    //       } else {
    //         const { payload: question } = await dispatch(addQuestionListenSlide({ idListenWrite: payload._id, name: e.name, text: e.text, order: index }))
    //         if (question && e.answer) {
    //           const { payload: answer } = await dispatch(addAnswerListenWriteSlide({ idQuestion: question._id, answer: e.answer }))
    //         }
    //       }
    //     });
    //   }

    //   message.success({ content: 'Sửa Thành Công!', key, duration: 2 });
    //   navigate("/admin/listenWrite");
    // } else {
    //   const { payload } = await dispatch(addListen({
    //     area: value.area,
    //     category: value.category,
    //     audio: audioLink
    //   }));

    //   if (payload) {
    //     value.content?.forEach(async (e: {
    //       _id: string,
    //       name: string,
    //       text: string,
    //       order: number,
    //       answer?: string
    //     }, index: number) => {

    //       const { payload: question } = await dispatch(addQuestionListenSlide({ idListenWrite: payload._id, name: e.name, text: e.text, order: index }))

    //       if (question && e.answer) {
    //         const { payload: answer } = await dispatch(addAnswerListenWriteSlide({ idQuestion: question._id, answer: e.answer }))
    //       }
    //     });
    //   }
    //   message.success({ content: 'Thêm Thành Công!', key });
    //   navigate("/admin/listenWrite");
    // }
  };

  const onFinishFailed = (errorInfo) => {
    id ? message.error('Sửa Không Thành Công!') : message.error('Thêm Không Thành Công!');
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    if (id) {
      const getListenAndWrite = async () => {
        const { data } = await detailListenWrite(id)
        setListenWrite(data);
        setAudio(data.audio)
        let arr: {
          _id: string,
          name: string,
          text: string,
          answer?: string
        }[] = [];
        if (data) {
          const { data: question } = await getListQuestionListenWriteById(String(data._id))
          for (let i = 0; i < question.length; i++) {
            const { data: answer } = await listAnswerListenWriteById(question[i]._id)
            arr.push({ ...question[i], answer: answer ? answer.answer : null })
          }
        }
        const category: CategoryType[] = categories.filter(((item: CategoryType) => item._id == data.category ? item.title : ""))
        form.setFieldsValue({
          _id: id,
          area: data.area,
          // category: category[0].title,
          category: data.category,
          audio: data.imgLink,
          content: arr
        });
        dispatch(changeBreadcrumb("SỬA BÀI TẬP LUYỆN HỘI THOẠI"))
      }
      getListenAndWrite()
    } else {
      dispatch(changeBreadcrumb("THÊM BÀI TẬP LUYỆN HỘI THOẠI"))
    }
    dispatch(getCategoryList())
    dispatch(getListListenWrite())
    listCate();

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
      <AdminPageHeader breadcrumb={breadcrumb} />
      <Form layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
      </Form>
    </div>
  )
}

export default FormListenWrite