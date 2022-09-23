/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { Button, Form, Input, InputNumber, message, Select, Space, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import toas from 'toastr';
import { changeImage, uploadImage } from '../../../utils/upload';
import { addCategorySlide } from '../../../features/Slide/category/CategorySlide';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { CategoryType } from '../../../types/category';
import AdminPageHeader from '../../../components/AdminPageHeader';
import axios from 'axios';
import { changeBreadcrumb } from '../../../features/Slide/quiz/QuizSlide';
import useCategory from '../../../features/Slide/category/use_category';
import { detailCategory } from '../../../api/category';

const Add = () => {
  const { data, error, mutate, add, edit, remove } = useCategory()
  const categories = useAppSelector(data => data.category.value)
  const { Option } = Select;
  const [form] = Form.useForm();
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
  const breadcrumb = useAppSelector(data => data.quiz.breadcrumb)
  const [category, setCategory] = useState<CategoryType>()
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [fileList, setfileList] = useState<any>();
  const { id } = useParams();

  const onFinish = async (value) => {
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
    if (!value.image) {
      return message.error('Không để trống Ảnh!');
    }

    const key = 'updatable';
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      if (id) {
        mutate(edit(value))
        message.success({ content: 'Sửa Thành Công!', key });
        navigate("/admin/category");
      } else {
        mutate(add(value))
        message.success({ content: 'Thêm Thành Công!', key });
        navigate("/admin/category");
      }

    }, 2000);

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

  useEffect(() => {
    if (id) {
      const getCate = async () => {
        const { data } = await detailCategory(id)
        setCategory(data.category)

        form.setFieldsValue(data.category);
        dispatch(changeBreadcrumb("Sửa đề tài"))
      }
      getCate()
    } else {
      dispatch(changeBreadcrumb("Thêm đề tài"))
    }

  }, [id])

  return (
    <div className="container">
      <AdminPageHeader breadcrumb={breadcrumb} />
      <div className="pb-6 mx-6">
        <Form layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>

          {id ? <Form.Item label="_id" name="_id" hidden={true}>
            <Input />
          </Form.Item> : ""}

          <Form.Item
            label="Tiêu đề"
            name="title"
            tooltip="Tiêu đề"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Upload ảnh"
            tooltip="Ảnh dành cho Quiz"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            <Input type="file" accept='.png,.jpg' className="form-control" onChange={onChangeImage} />
          </Form.Item>

          <Form.Item name="image" valuePropName="src" label="ImagePreview" >
            <img id="img-preview" style={{ width: "100px" }} />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="detail"
            tooltip="Mô tả"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            <Input />
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

export default Add