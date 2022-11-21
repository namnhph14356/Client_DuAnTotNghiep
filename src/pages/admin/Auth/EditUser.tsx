
/* eslint-disable jsx-a11y/alt-text */
import { Button, DatePicker, Form, Input, Select } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toas from 'toastr';
import { editUserSlide, getUser, getUserList} from '../../../features/Slide/user/userSlide';
import { changeImage, uploadImage } from '../../../utils/upload';

const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 16 },
};
const { TextArea } = Input;

const EditUser = () => {
    const user = useSelector<any, any>(data => data.user.value);
    const [values, setValues] = useState<any>({});
    const dispath = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    console.log(values);


    useEffect(() => {
        const imgPreview = document.getElementById("img-preview");
        const imgPost = document.getElementById("file-upload");

        changeImage(imgPost, imgPreview);

        if (id) {
            const getListUser = async (id: any) => {
                const { payload } = await dispath(getUser(id));
                form.setFieldsValue(payload)
                setValues(payload)
                // onreset(payload)
            }
            getListUser(id);
        }
        dispath(getUserList())

    }, [])



    const onFinish = async (values: any) => {
    console.log (values)
        try {
            await dispath(editUserSlide(
                {
                    _id: id,
                    username: values.username,
                    email: values.email,
                    img: values.img,
                    phone: values.phone,
                    address: values.address,
                    role: values.role,
                    sex: values.sex,
                }
            ))

            toas.success("Edit successfully");
            navigate('/admin/user')
        } catch (error: any) {
            toas.error(error);

        }

    };
   

    return (
        <div>
            <></>
            <Form {...layout} name="nest-messages" form={form} onFinish={onFinish} >
                <Form.Item name={'username'} label="Họ Tên">
                    <Input />
                </Form.Item>
                <Form.Item name={'email'} label="Email">
                    <Input />
                </Form.Item>
                {/* <Form.Item name={'img'} label="Img">
                    <Input  />
                </Form.Item> */}
                <Form.Item name={[ 'image']} label="Chọn Ảnh" rules={[{ required: true }]}>
                    <Input type="file" className="form-control" id="file-upload" />
                </Form.Item>

                <Form.Item name={'image2'} label="Ảnh" >
                    <span className="inline-block  rounded-full overflow-hidden bg-gray-100">
                        <img id="img-preview" src='' style={{ width: "100px" }} />
                    </span>
                </Form.Item>
                <Form.Item name={'phone'} label="Điện Thoại">
                    <Input />
                </Form.Item>
                <Form.Item name={'address'} label="Địa chỉ">
                    <Input />
                </Form.Item>
                <Form.Item name={'role'} label="Quyền ">
                    <Select>
                        <Select.Option value={"user"}>User</Select.Option>
                        <Select.Option value={"admin"}>Admin</Select.Option>
                        <Select.Option value={"teacher"}>Teacher</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name={'sex'} label="Giới tính">
                    <Select>
                        <Select.Option value={"male"}>Male</Select.Option>
                        <Select.Option value={"femle"}>Female</Select.Option>
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

export default EditUser