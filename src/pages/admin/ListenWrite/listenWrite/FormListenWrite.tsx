/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Divider, Form, Input, Button, Space, Checkbox, Upload, Select, Avatar, message, Modal, Progress, Image, Empty } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import AdminPageHeader from '../../../../Component/AdminPageHeader';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { addQuizSlide, changeBreadcrumb, editQuizSlide } from '../../../../features/Slide/quiz/QuizSlide';
import { getCategoryList } from '../../../../features/Slide/category/CategorySlide';
import { CategoryType } from '../../../../types/category';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ReactAudioPlayer from 'react-audio-player';
import { uploadVideo } from '../../../../utils/upload';
import { addListen, editListen } from '../../../../features/Slide/listenWrite/ListenWriteSlice';
import { ListenWriteType } from '../../../../types/listenWrite';
import { detailListenWrite } from '../../../../api/listenWrite';

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
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
  const breadcrumb = useAppSelector(data => data.quiz.breadcrumb)
  const categories = useAppSelector(data => data.category.value)
  const [listenWrite, setListenWrite] = useState<ListenWriteType>()
  const [audio, setAudio] = useState<any>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [fileList, setfileList] = useState<any>();

  console.log(categories);

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };

  const { id } = useParams();
  console.log(id);


  const onFinish = async (value: any) => {

    const imgPost = document.querySelector("#upload_image");
    // console.log(value.content);
    let convertAnswer:any = []
    for (let key in value.content) {
      console.log(value.content[key].answer);
      
     if (value.content[key].answer) {
      value.content[key].answer = value.content[key].answer.replaceAll(" ", "").split(",");
      // convertAnswer.push(answer)
     }
     
    
  }

  console.log(value.content);
  
    const key = 'updatable';
    message.loading({ content: 'Loading...', key });

    let imgLink = await uploadVideo(imgPost);
    console.log(imgLink);
    console.log("value", value);


    if (id) {
      console.log(imgLink);
      console.log(audio);

      dispatch(editListen({
        _id: value._id,
        area: value.area,
        category: value.category,
        content: [{
            name: value.content.name,
            text: value.content.text,
            answer: value.content.a,
        }],
        audio: imgLink || audio
      }));
      message.success({ content: 'Sửa Thành Công!', key, duration: 2 });
      navigate("/admin/listenWrite");

    } else {
      dispatch(addListen({
        area: value.area,
        category: value.category,
        content: value.content,
        audio: imgLink
      }));
      message.success({ content: 'Thêm Thành Công!', key, duration: 2 });
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
        console.log("data edit", data);
        setListenWrite(data);
        console.log(data);
        setAudio(data.audio)
        form.setFieldsValue(data);
        dispatch(changeBreadcrumb("SỬA BÀI TẬP NGHE VÀ VIẾT"))
      }
      getListenAndWrite()
    } else {
      dispatch(changeBreadcrumb("THÊM BÀI TẬP NGHE VÀ VIẾT"))
    }

    dispatch(getCategoryList())

  }, [])



  return (
    <div className="container">
      <AdminPageHeader breadcrumb={breadcrumb} />
      <div className="pb-6 mx-6">
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
            <ReactAudioPlayer style={{ margin: "20px 0" }}
              src={audio}
              controls
            />
          </Form.Item>







          <Form.Item
            label="Danh mục"
            name="category"
            tooltip="Danh Mục Category"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            {id
              ? <Select >
                {categories?.map((item: CategoryType, index) => (
                  <Option key={index + 1} value={item._id}>
                    {item.title}
                  </Option>
                ))}
              </Select>

              : <Select
                defaultValue={categories?.map((item: CategoryType, index) => {
                  if (item._id === listenWrite?.category) {
                    return <Option key={index + 1} value={item._id}>
                      {item.title}
                    </Option>
                  }
                })}
              >

                {categories?.map((item: CategoryType, index) => (
                  <Option key={index + 1} value={item._id}>
                    {item.title}
                  </Option>
                ))}
              </Select>}


          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        {/* <ReactAudioPlayer
          src="http://res.cloudinary.com/chanh-thon/video/upload/v1659450744/upload_preset/a6ulgrn8zn5qjp8ak2wr.mp3"
          controls 
          /> */}
      </div>

        
      
        <div>
          <h3>* Ghi chú:</h3>
          <ul style={{listStyle:"inside", marginLeft:"20px", color:"#0a76cf"}}>
            <li>Câu thoại: Dùng "___" (Ba dấu gạch chân) để tạo khoảng chống để điền đáp án</li>
            <li>Abccc</li>
          </ul>
        </div>
      

    </div>
  )
}

export default FormListenWrite