import { Form, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { editUser, getUser } from '../../api/user';
import Header from '../../Component/Header'
import { UserType } from '../../types/category';
import { changeImage, uploadImage } from '../../utils/upload'
import "./edituser.css";

type FormTypes = {
    _id: number,
    username: string,
    phone: number,
    password: string,
    img: string,
}

const EditUser = () => {
    const { register, handleSubmit, formState, reset } = useForm<UserType>();
    const [preview, setPreview] = useState<string>();
    const [info, getInfo] = useState<FormTypes>()

    const { id } = useParams();
    useEffect(() => {
        const getProducts = async () => {
            const { data } = await getUser(id);
            reset(data)
            getInfo(data)
        }
        getProducts()
    }, [])
    console.log(info?.img);
    const handlePreview = (e: any) => {
        
        setPreview(URL.createObjectURL(e.target.files[0]));
    }
    const onSubmit: SubmitHandler<UserType> = async data => {
        const imgPost = document.querySelector<any>("#file-upload");
        const imgLink = await uploadImage(imgPost);

        try {
            await editUser({ ...data, img: imgLink });
            message.success('Cập nhật thành công')

        } catch (error: any) {
            console.log(error)
        }
    }
    

    return (

        <div>
            <Header />
            <section className='w-10/12 mx-auto'>
                <p className='text-2xl font-bold py-[10px]'>Hồ sơ</p>
            </section>
            <section className='w-6/12 mx-auto'>
                <div className='edit_user'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <img src={preview || info?.img}  id='img-preview' alt="" width='100px' />
                            <input type="file" {...register('img')} onChange={e => handlePreview(e)} id='file-upload' />
                        </div>
                        <div>
                            <label>Tên: </label>
                            <input type="text" {...register('username')} />
                        </div>
                        <div>
                            <label>Số điện thoại: </label>
                            <input type="text" {...register('phone')} />
                        </div>
                        <div>
                            <label>Địa chỉ: </label>
                            <input type="text" {...register('address')} />
                        </div>
                        <div>
                            <button className='button'>Sửa</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default EditUser