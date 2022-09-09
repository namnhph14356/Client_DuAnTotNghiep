import { Divider, Form, Input, Button, Checkbox, Upload, Select, Avatar, message, Modal, Progress, Image, Empty } from 'antd';
import { useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import AdminPageHeader from '../../../Component/AdminPageHeader'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { addVocabulary, detailVocabulary, editVocabulary } from '../../../api/vocabulary';

type Props = {}

const FormVocabulary = (props: Props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const [fileList, setfileList] = useState<any>();
  const [vocabulary, setVocabulary] = useState();
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm()

  const {id} = useParams();
  console.log('demo');
  console.log(id);
  
  
  const onFinish = async (value:any) => {


    if (fileList) {
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

    console.log("value", value);
    if (!value.image) {
      return message.error('Không để trống Ảnh!');
    }


    const key = 'updatable';

    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      if (id) {
        editVocabulary(value);
        console.log(value);
        
        message.success({ content: 'Sửa Thành Công!', key, duration: 2 });
        navigate("/admin/vocabulary");
      } else {
        addVocabulary(value);
        console.log(value);
        message.success({ content: 'Thêm Thành Công!', key, duration: 2 });
        navigate("/admin/vocabulary");
      }

    }, 2000);

  };
  
  const onFinishFailed = (errorInfo) => {
    id ? message.error('Sửa Không Thành Công!') : message.error('Thêm Không Thành Công!');

  };

  const onReset = () => {
    form.resetFields();
  };


  const onChangeImage = async (e) => {
    console.log("e", e.target.files[0]);
    if (e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpeg") {
      setfileList(e.target.files[0])
      console.log("fileList before", fileList);
      const imgPreview = document.getElementById("img-preview") as HTMLImageElement

      imgPreview.src = await URL.createObjectURL(e.target.files[0])


    } else {
      message.error('File không hợp lệ!');
    }

  }

  useEffect(()=>{
    if(id){
      const getDetail = async () => {
          const {data} = await detailVocabulary(id);
          setVocabulary(data);
          form.setFieldsValue(data)
      } 
      getDetail()
    }  
  },[])
  return (
    <div className="container">
      {/* <AdminPageHeader  />   */}
      <div className="pb-6 mx-6">
        <Form layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          {id ? <Form.Item label="_id" name="_id" hidden={true}>
            <Input />
          </Form.Item> : ""}

          <Form.Item
            label="Words"
            name="words"
            tooltip="Câu Hỏi dành cho Category"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Meaning"
            name="meaning"
            tooltip="Ý nghĩa"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="WordForm"
            name="wordForm"
            tooltip="dạng từ"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          <Option value="1">nouns</Option> 
          <Option value="2">adj</Option>
          <Option value="3">verbs</Option>
          <Option value="4">adv</Option>
          </Select>
          </Form.Item>

          <Form.Item
            label="Upload image"
            tooltip="Image for Quiz"
          >
            <Input type="file" accept='.png,.jpg' className="form-control" onChange={onChangeImage} />
          
          </Form.Item>

          <Form.Item name="image" valuePropName="src" label="ImagePreview" >
            {/* {quiz?.image || fileList
              ? <img id="img-preview" style={{ width: "100px" }} />
              : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            } */}
            <img id="img-preview" style={{ width: "100px" }} />

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

export default FormVocabulary