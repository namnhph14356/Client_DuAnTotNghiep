
/* eslint-disable jsx-a11y/alt-text */
import { Button, DatePicker, Form, Input, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toas from 'toastr';
import { editdContactSlide, getContactList, getContactsById } from '../../../features/Slide/contact/ContactSlide';

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16 },
};
const { TextArea } = Input;

const EditContact = () => {
    const contact = useSelector<any, any>(data => data.contact.value);
    const [orderId, setOrderId] = useState<any>({});
    const dispath = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    console.log(orderId);
    

    useEffect(() => {

        if (id) {
            const getContact = async (id: any) => {
                const { payload } = await dispath(getContactsById(id));
                form.setFieldsValue(payload)
                setOrderId(payload)
                // onreset(payload)
            }
            getContact(id);
        }
        dispath(getContactList())

    }, [])



    const onFinish = async (values: any) => {
        try {
            await dispath(editdContactSlide(
                {
                    _id: id,
                    surname: orderId.surname,
                    name: orderId.name,
                    address: orderId.address,
                    birthday: orderId.birthday,
                    email: orderId.email,
                    phone: orderId.phone,
                    message: orderId.message,
                    status: values.status,
                    sendAds: values.sendAds
                }
            ))

            toas.success("Edit successfully");

            navigate('/admin/contact')

        } catch (error: any) {
            toas.error(error);
            
        }

    };

    return (
        <div>
            <></>
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
                        <Input  />
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
                <Form.Item name={'sendAds'} label="Gửi quảng cáo">
                    <Select>
                        <Select.Option value={0}>Không cho phép</Select.Option>
                        <Select.Option value={1}>Cho phép</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditContact