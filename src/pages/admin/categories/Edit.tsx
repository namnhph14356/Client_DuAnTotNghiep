
/* eslint-disable jsx-a11y/alt-text */
import { Button, Form, Input } from 'antd';
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import toas from 'toastr';
import { changeImage, uploadImage } from '../../../utils/upload';
import { editdCategorySlide, getCateById, getCategoryList } from '../../../features/Slide/category/CategorySlide';

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

const Edit = () => {
    const category = useSelector<any, any>(data => data.category.value);
    const dispath = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const [form] = Form.useForm();
    console.log(category);
   
    useEffect(() => {
        const imgPreview = document.getElementById("img-preview");
        const imgPost = document.getElementById("file-upload");
       

        if (id) {
            const getCate = async (id: any) => {
                const { payload } = await dispath(getCateById(id));
                console.log(payload);
                form.setFieldsValue(payload)
                // onreset(payload)
            }
            getCate(id);
        }
        dispath(getCategoryList())
        changeImage(imgPost, imgPreview);
        
    }, [])



    const onFinish = async (values: any) => {
        const imgPost = document.querySelector<any>("#file-upload");
        const imgPreview = document.querySelector<any>("#img-preview");
        const imgLink = await uploadImage(imgPost);

        console.log(values);
        try {
             
                dispath(editdCategorySlide(
                  {
                    _id: id,
                    title: values.title,
                    image: imgLink || imgPreview.src,
                    detail: values.detail
                  }
                ))

                toas.success("Edit successfully");
                 
                navigate('/admin/category')
               

            
        } catch (error: any) {
            toas.error(error.response.data);
        }

        
        
    };
    console.log(category);
    
    return (
        <div>
                <></>
            <Form {...layout} name="nest-messages"  form={form} onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={'title'}  label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item> 

                <Form.Item name={'image2'} label="Image"  valuePropName="src">
                    <Input type="file" className="form-control" id="file-upload" />
                </Form.Item>

                <Form.Item name={'image'} label="Image" valuePropName="src">
                        <img  className="form-control" id="img-preview"  style={{ width: "100px" }} />
                </Form.Item>

                <Form.Item name={'detail'}  label="Detail" rules={[{ required: true }]}>
                    <Input.TextArea />
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

export default Edit