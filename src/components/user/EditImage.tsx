import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { UserType } from '../../types/user'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom'
import { uploadImage } from '../../utils/upload'
import { editUser } from '../../api/user'
import { message } from 'antd'
import { useAppDispatch } from '../../app/hooks'
import { editUserSilce } from '../../features/Slide/auth/authSlide'



type FormTypes = {
  img: string
}

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/


const fromSchema = yup.object().shape({
  username: yup.string()
    .required("Tên không được để trống")
    .min(3, 'Tên không được nhỏ hơn 3 kí tự'),
  phone: yup.string()
    .required("Số điện thoại không được để trống")
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
    .min(10, 'Số điện thoại không được nhỏ hơn 10 kí tự'),
  address: yup.string()
    .required("Địa chỉ không được để trống")
    .min(6, 'Địa chỉ không được nhỏ hơn 6 kí tự'),

})
const validation = { resolver: yupResolver(fromSchema) }


const EditImage = () => {
  const auth = useSelector(((item: RootState) => item.auth.value)) as UserType

  const { register, handleSubmit, formState, reset } = useForm<UserType>(validation);
  const [preview, setPreview] = useState<string>();

  const dispatch = useAppDispatch()


  const navigate = useNavigate()

  const handlePreview = (e: any) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
  }

  const onSubmit: SubmitHandler<UserType> = async data => {
    const imgPost = document.querySelector<any>("#file-upload");
    const imgLink = await uploadImage(imgPost);
    if (imgPost.files.length) {
      const response = await uploadImage(imgPost);
      data.img = response;
    }
    await dispatch(editUserSilce(data));
    console.log('data', data);
    
    // message.success('Cập nhật thành công')
    // navigate('/user')
  }

  return (
    <div className='box__img__user'>
      <div className="form__edit__img">
        <form onSubmit={() => handleSubmit(onSubmit)}>
          <p>Chọn ảnh cần upload từ máy của bạn ( Tối đa 2MB):</p>
          <input type="file" {...register('img')} onChange={e => handlePreview(e)} id='file-upload' />
          <div className='mt-3'>
            <button className='btn__edit__img'>
              Lưu ảnh
            </button>
          </div>

        </form>
      </div>
      <div className="from__review__img">
        <img src={preview || auth?.img} id='img-preview' alt="" />
      </div>
    </div>
  )
}

export default EditImage