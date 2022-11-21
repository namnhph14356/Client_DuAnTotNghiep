import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAppDispatch } from '../../app/hooks'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import MenuSettingUser from './MenuSettingUser'
import { message } from 'antd';
import { newPassSlice } from '../../features/Slide/auth/authSlide';


const fromSchema = yup.object().shape({

  password: yup.string()
    .required("Mật khẩu không được để trống")
    .min(6, 'Mật khẩu phải lớn hơn 6 kí tự'),
  confirmPassword: yup.string()
    .required("Mật khẩu không được để trống")
    .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp'),
})
const validation = { resolver: yupResolver(fromSchema) }

type FormType = {
  password: string | number,
  confirmPassword?: string | number,
}


const EditPasswordUser = () => {

  const { register, handleSubmit, formState } = useForm<FormType>()
  const dispatch = useAppDispatch()
  const { errors } = formState;

  if (errors) {
    if (errors.password) {
      message.error(String(errors.password.message))
    } else if (errors.confirmPassword) {
      message.error(String(errors.confirmPassword.message))
    }
  }

  const onSubmit: SubmitHandler<FormType> = async (useForm: FormType) => {
    try {
      const { payload } = await dispatch(newPassSlice({
        password: String(useForm.password)
      }))
      console.log('payload', payload);
      if (payload.message) {
        message.warning(payload.message)
      } else {
        message.success("Đổi mật khẩu thành công !")
      }
    } catch (error) {
      alert('Error !!!')
    }
   
    
  }

  const checkValue = (e) => {
    if (e.target.value !== "") {
      e.nativeEvent.path[2].classList.add('field--non-empty');
    } else {
      e.nativeEvent.path[2].classList.remove('field--non-empty');
    }
  }


  return (
    <div className='edit__password__page'>
      <MenuSettingUser />
      <div className="content__change__password">
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="form__edit__user">
            
            <div className='item__form__edit'>
              <div className='labal__form__edit__pass'>
                <label htmlFor="">Mật khẩu hiện tại :</label>
              </div>
              <div className='change__form__edit'>
                <input {...register('password')} className='inp__name__edit__pass' type="password" id=""  />
              </div>
            </div>
            <div className='item__form__edit'>
              <div className='labal__form__edit__pass'>
                <label htmlFor="">Mật khẩu mới :</label>
              </div>
              <div className='change__form__edit'>
                <input {...register('password')} onChange={(e) => checkValue(e)} className={` inp__name__edit__pass  ${errors.password ? 'outline-red-500' : ''}`}  autoComplete="on"  type="password" id=""  />
              </div>
            </div>
            <div className='item__form__edit'>
              <div className='labal__form__edit__pass'>
                <label htmlFor="">Xác nhận mật khẩu :</label>
              </div>
              <div className='change__form__edit'>
                <input  {...register('confirmPassword')} onChange={(e) => checkValue(e)} className={`inp__name__edit__pass ${errors.confirmPassword ? 'outline-red-500' : ''}`} type="password" autoComplete="on"  id=""  />
              </div>
            </div>
          </div>
          <div className="btn__save__info">
            <button>
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default EditPasswordUser