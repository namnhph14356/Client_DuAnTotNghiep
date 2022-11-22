
/* eslint-disable jsx-a11y/alt-text */
import { Button, DatePicker, Form, Input, message, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toas from 'toastr';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import AdminPageHeader from '../../../components/AdminPageHeader';
import { editUserSlide, getUser, getUserList, changeBreadcrumb } from '../../../features/Slide/user/userSlide';
import { UserType } from '../../../types/user';
import { changeImage, uploadImage } from '../../../utils/upload';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 16 },
};
const { TextArea } = Input;

const EditUser = () => {
  const user = useSelector<any, any>(data => data.user.value);
  const breadcrumb = useAppSelector(data => data.user.breadcrumb)
  const [preview, setPreview] = useState<string>();
  const [values, setValues] = useState<any>({});
  const dispath = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();

  const handlePreview = async (e: any) => {
    message.loading("Vui lòng đợi...")
    const imgLink = await uploadImage(e.target);
    setPreview(imgLink);
  }

  const getListUser = async (id: any) => {
    const { payload } = await dispath(getUser(id));
    form.setFieldsValue(payload)
    setValues(payload)
    setPreview(payload.img)
    // onreset(payload)
  }

  useEffect(() => {
    if (id) {
      getListUser(id);
    }
    dispath(getUserList())
    dispath(changeBreadcrumb("Sửa thông tin người dùng"))
  }, [id])



  const onFinish = async (values: UserType) => {
    console.log("va", values);
    
    try {
      await dispath(editUserSlide(
        {
          _id: values._id,
          username: values.username,
          email: values.email,
          img: preview as string,
          phone: values.phone,
          address: values.address,
          role: values.role,
          sex: values.sex,
        }
      ))

      message.success("Sửa thành công !");
      navigate('/admin/user')
    } catch (error: any) {
      message.error(error);
    }

  };


  return (
    <div>
      <AdminPageHeader breadcrumb={breadcrumb} />
      <Form layout="vertical" name="nest-messages" form={form} onFinish={onFinish} >
        <Form.Item name={'_id'} label="_id" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item name={'username'} tooltip="Họ Tên" label="Họ Tên" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'email'} tooltip="Email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['image']} tooltip="Chọn Ảnh" label="Chọn Ảnh" >
          <Input type="file" className="form-control" id="file-upload" onChange={handlePreview} />
        </Form.Item>

        <Form.Item name={'image2'} label="Hình ảnh">
          <span className="inline-block  rounded-full overflow-hidden bg-gray-100">
            <img id="img-preview" src={preview} style={{ width: "100px" }} />
          </span>
        </Form.Item>
        <Form.Item name={'phone'} label="Điện Thoại">
          <Input />
        </Form.Item>
        <Form.Item name={'address'} label="Địa chỉ">
          <Input />
        </Form.Item>
        <Form.Item name={'role'} label="Quyền">
          <Select>
            <Select.Option value={"0"}>Học sinh</Select.Option>
            <Select.Option value={"1"}>Giảng viên</Select.Option>
            <Select.Option value={"2"}>Admin</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name={'sex'} label="Giới tính">
          <Select>
            <Select.Option value={0}>Nam</Select.Option>
            <Select.Option value={1}>Nữ</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sửa
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditUser