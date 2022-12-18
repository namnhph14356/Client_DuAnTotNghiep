
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
import { editdContactSlide, getContactList, getContactsById } from '../../../features/Slide/contact/ContactSlide';

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16 },
};
const { TextArea } = Input;

const EditContact = () => {
    const [orderId, setOrderId] = useState<any>({});
    const dispath = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();


    useEffect(() => {

        const getContact = async (id: any) => {
            const { payload } = await dispath(getContactsById(id));
            form.setFieldsValue(payload)
            setOrderId(payload)
        }
        getContact(id);
        dispath(getContactList())

    }, [])



    const onFinish = async (values: any) => {
        try {
            await dispath(editdContactSlide(
                {
                    _id: id,
                    surname: values.surname,
                    name: values.name,
                    address: values.address,
                    birthday: values.birthday,
                    email: values.email,
                    phone: values.phone,
                    message: values.message,
                    status: values.status,
                }
            ))
            message.success("Sửa thông tin liên hệ thành công");

            navigate('/admin/contact')

        } catch (error: any) {
            message.error(error);

        }

    };

    return (
        <div>
            <AdminPageHeader breadcrumb={"Sửa thông tin liên hệ"} />
            <Form {...layout} name="nest-messages" form={form} onFinish={onFinish} >
                <Form.Item name={'surname'} label="Họ">
                    <Input disabled />
                </Form.Item>
                <Form.Item name={'name'} label="Tên">
                    <Input disabled />
                </Form.Item>
                <Form.Item name={'phone'} label="Số điện thoại">
                    <Input disabled />
                </Form.Item>
                <Form.Item name={'email'} label="Email">
                    <Input disabled />
                </Form.Item>
                <Form.Item name={'address'} label="Địa chỉ">
                    <Input disabled />
                </Form.Item>
                <div className='hidden'>
                    <Form.Item name={'birthday'} label="Ngày sinh">
                        <Input />
                    </Form.Item>
                </div>
                <Form.Item name={'message'} label="Lời nhắn">
                    <TextArea disabled />
                </Form.Item>
                <Form.Item name={'status'} label="Trạng thái">
                    <Select>
                        <Select.Option value={0}>Chưa liên hệ</Select.Option>
                        <Select.Option value={1}>Đã liên hệ</Select.Option>
                        <Select.Option value={2}>Không liên hệ được</Select.Option>
                        <Select.Option value={3}>Hẹn liên hệ sau</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                    <Button type="primary" htmlType="submit">
                        Sửa
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditContact