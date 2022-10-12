import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeImage, uploadImage } from '../../../utils/upload';
import toastr from 'toastr';
import { Button, Form, Input } from 'antd';
import { addUserSlide } from '../../../features/Slide/user/userSlide';
import { AppDispatch } from '../../../app/store';

const layout = {
    labelCol: { span: 3 },
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

const AddUser = () => {
    const category = useSelector<any, any>(data => data.category.value);
    const dispath = useDispatch<AppDispatch>();
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
                // dispath(addUserSlide(
                //     {
                //         title: values.category.title,
                //         image: imgLink,
                //         detail: values.category.detail
                //     }
                // ))
                alert("Error !!")
                // toastr.success("Add successfully");
                // setTimeout(() => {
                //     navigate('/admin/user')
                // }, 1000);

            }
        } catch (error) {
            toastr.error(error.response.data);
        }

    };

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item name={'username'} label="Username" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={'email'} label="Email" rules={[{ required: true }]}>
                <Input type="email" className="form-control" />
            </Form.Item>

            <Form.Item name={'password'} label="Password" rules={[{ required: true }]}>
                <Input type="password" className="form-control" />
            </Form.Item>

            <Form.Item name={'confirmPassword'} label="Confirm Password" rules={[{ required: true }]}>
                <Input type="password" className="form-control" />
            </Form.Item>

            <Form.Item name={['category', 'image']} label="Image" rules={[{ required: true }]}>
                <Input type="file" className="form-control" id="file-upload" />
            </Form.Item>

            <Form.Item name={'image2'} label="Image" >
                <span className="inline-block  rounded-full overflow-hidden bg-gray-100">
                    <img id="img-preview" src='' style={{ width: "100px" }} />
                </span>
            </Form.Item>

            <Form.Item name={'detail'} label="Detail" rules={[{ required: true }]}>
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

export default AddUser