
/* eslint-disable jsx-a11y/alt-text */
import { Button, Form, Input, InputNumber, Upload } from 'antd'
import React, { useEffect } from 'react'
import { UploadOutlined } from '@ant-design/icons';
// import { changeImage, uploadImage } from '../../utils/upload';
import { useDispatch, useSelector } from 'react-redux';
// import { addCategorySlide } from '../../features/category/CategorySlide';
import { useNavigate } from 'react-router-dom';
import toas from 'toastr';
import { changeImage, uploadImage } from '../../../utils/upload';
import { addCategorySlide } from '../../../features/Slide/category/CategorySlide';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};


const Add = () => {
  const category = useSelector<any, any>(data => data.category.value);
  const dispath = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const imgPreview = document.getElementById("img-preview");
    const imgPost = document.getElementById("file-upload");

    changeImage(imgPost, imgPreview);
  }, [])
  const onFinish = async (values: any) => {
    const imgPost = document.querySelector<any>("#file-upload");
    const imgLink = await uploadImage(imgPost);

    // console.log(values.category);
    try {
      if (imgLink) {
        console.log(imgLink);
        dispath(addCategorySlide(
          {
            title: values.category.title,
            image: imgLink,
            detail: values.category.detail
          }
        ))
        
        toas.success("Add successfully");
          setTimeout(() => {
            navigate('/admin/category')
         }, 1000); 
       
      }
    } catch (error:any) {
      toas.error(error.response.data);
    }
  
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['category', 'title']} label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['category', 'image']} label="Image" rules={[{ required: true }]}>
        <Input type="file" className="form-control" id="file-upload" />
      </Form.Item>

      <Form.Item name={['category', 'image2']} label="Image" >
        <span className="inline-block  rounded-full overflow-hidden bg-gray-100">
          <img id="img-preview" src='' style={{ width: "100px" }} />
        </span>
      </Form.Item>

      <Form.Item name={['category', 'detail']} label="Detail" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Add