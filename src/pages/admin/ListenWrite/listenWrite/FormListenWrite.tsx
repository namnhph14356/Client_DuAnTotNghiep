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
import { changeVideo, uploadVideo } from '../../../../utils/upload';
import { addListen, changeBreadcrumb, editListen, getListListenWrite } from '../../../../features/Slide/listenWrite/ListenWriteSlice';
import { ListenWriteType } from '../../../../types/listenWrite';
import { detailListenWrite } from '../../../../api/listenWrite';
import AdminPageHeader from '../../../../components/AdminPageHeader';
import { addQuestionListenSlide, editQuestionListenWriteSlide } from '../../../../features/Slide/questionListenWrite/questionListenWrite';
import { addAnswerListenWriteSlide, editAnswerListenWriteSlide } from '../../../../features/Slide/answerListenWrite/answerListenWrite';
import { getListQuestionListenWriteById } from '../../../../api/questionListenWrite';
import { listAnswerListenWriteById } from '../../../../api/answerListenWrite';
import { async } from '@firebase/util';

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

type SightsKeys = keyof typeof sights;

const FormListenWrite = (props: Props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const breadcrumb = useAppSelector(data => data.quiz.breadcrumb)
  const categories = useAppSelector(data => data.category.value)
  const listWrite = useAppSelector(data => data.listenWrite.value)
  const [categoryExist, setCategoryExist] = useState<string[]>([])
  const [listenWrite, setListenWrite] = useState<ListenWriteType>()
  const [audio, setAudio] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };

  const { id } = useParams();

  const listCate = async () => {
    let arr: string[] = []
    listWrite.map((item: ListenWriteType) => {
      arr.push(item.category);
    })
    setCategoryExist(arr)
  }

  const onFinish = async (value: ListenWriteType) => {
    const imgPost = document.querySelector("#upload_image");
    for (let key in value.content) {
      if (value.content[key].answer) {
        value.content[key].answer = await value.content[key].answer.toString().replaceAll(" ", "").split(",");
      }
    }

    const key = 'updatable';
    message.loading({ content: 'Loading...', key });
    let imgLink = await uploadVideo(imgPost);

    if (id) {
      const { payload } = await dispatch(editListen({
        _id: value._id,
        area: value.area,
        category: value.category,
        audio: imgLink || audio
      }));

      if (payload) {
        value.content?.forEach(async (e: {
          _id: string,
          name: string,
          text: string,
          answer?: string
        }) => {
          const { payload: question } = await dispatch(editQuestionListenWriteSlide({ _id: e._id, idListenWrite: payload._id, name: e.name, text: e.text }))
          if (question && e.answer) {
            const { payload: answer } = await dispatch(editAnswerListenWriteSlide({ idQuestion: question._id, answer: e.answer }))
          }
        });
      }

      message.success({ content: 'Sửa Thành Công!', key, duration: 2 });
      navigate("/admin/listenWrite");
    } else {
      const { payload } = await dispatch(addListen({
        area: value.area,
        category: value.category,
        audio: imgLink
      }));

      if (payload) {
        value.content?.forEach(async (e: {
          _id: string,
          name: string,
          text: string,
          answer?: string
        }) => {
          const { payload: question } = await dispatch(addQuestionListenSlide({ idListenWrite: payload._id, name: e.name, text: e.text }))
          if (question && e.answer) {
            const { payload: answer } = await dispatch(addAnswerListenWriteSlide({ idQuestion: question._id, answer: e.answer }))
          }
        });
      }
      message.success({ content: 'Thêm Thành Công!', key });
      navigate("/admin/listenWrite");
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
          category: category[0].title,
          audio: data.imgLink,
          content: arr
        });
        dispatch(changeBreadcrumb("SỬA BÀI TẬP NGHE VÀ VIẾT"))
      }
      getListenAndWrite()
    } else {
      dispatch(changeBreadcrumb("THÊM BÀI TẬP NGHE VÀ VIẾT"))
    }
    dispatch(getCategoryList())
    dispatch(getListListenWrite())
    listCate();

    const imgPreview = document.getElementById("img-preview");
    const imgPost = document.getElementById("upload_image");
    changeVideo(imgPost, imgPreview);
  }, [id])

  return (
    <div>
      <AdminPageHeader breadcrumb={breadcrumb} />
      <div>
        <Form form={form} layout="vertical" name="dynamic_form_nest_item" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          {id ? <Form.Item label="_id" name="_id" hidden={true}>
            <Input />
          </Form.Item> : ""}

          <Form.Item name="area" label="Chọn vai" rules={[{ required: true, message: 'Missing area' }]}>
            <Select options={areas} onChange={handleChange} />
          </Form.Item>

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

          <Form.Item
            label="Audio"
            tooltip="Audio"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            <Input type={'file'} id={'upload_image'} />
            <ReactAudioPlayer
              id='img-preview'
              src={audio ? audio : ""}
              controls
            />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="category"
            tooltip="Danh Mục Category"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            <Select>
              {categories.map((item: CategoryType) => {
                const index = categoryExist.findIndex((e) => e == item._id);
                if (index == -1) {
                  return <>
                    <Option key={item._id} value={item._id}>
                      {item.title}
                    </Option>
                  </>
                }
              })}
            </Select>

          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div>
          <h3>* Ghi chú:</h3>
          <ul style={{ listStyle: "inside", marginLeft: "20px", color: "#0a76cf" }}>
            <li>Câu thoại: Dùng "___" (Ba dấu gạch chân) để tạo khoảng chống để điền đáp án</li>
            <li>Abccc</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FormListenWrite