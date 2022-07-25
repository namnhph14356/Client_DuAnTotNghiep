import { yupResolver } from '@hookform/resolvers/yup';

import { message, Modal } from 'antd';
import React, { useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';


import {  changeOtp, forgotPassword, signIn } from '../../features/Slide/auth/authSlide';


const fromSchema = yup.object().shape({
    email: yup.string()
      .required("Email is required")
      .email("It not Email"),
  
  })
  const validation = { resolver: yupResolver(fromSchema) }
  
  
  type FormInputs = {

    otp: string | number,
    email: string,
  }


const ForgotPassword = () => {
    const { register, handleSubmit, formState } = useForm<FormInputs>(validation);
    const [otp, setotp] = useState();
    const [change, setchange] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormInputs> = async (userForm: any) => {

   
    try {
      
      if (!userForm.otp) {
        const { payload } = await dispatch(forgotPassword({email:userForm.email}))
        console.log(payload);

        if (payload.message === "Không tìm thấy user") {
          message.error(payload.message);
       
        }else{
          message.success(payload.message);
          setotp(payload.otpHash);
          setchange(true)
        }
      }else{
        // console.log( "đã tới đây");
        const {payload} = await dispatch(changeOtp({email:userForm.email, otp:userForm.otp, otpHash:otp}))
        
          if (payload.message) {
            message.error(payload.message);
          }else{
            navigate(`/newPassword/${userForm.email}`)
          }

        
      }
  

    } catch (error) {
      alert("Error !!!")
    }
  }
  return (
    <div>
         <div className=" m-auto">
      <div className="signin__form col-span-12 w-10/12 m-auto py-12 mt-8 ">
        <div className="signin__main__left  w-full ">
          <div className="text-center ml-24">


            <h1 className="text-3xl font-bold">Lấy lại mật khẩu</h1>
           
            <p className="text-center">Bạn muốn lấy lại mật khẩu ?</p>


            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="m " >

                <input className="p-2 text-white" {...register('email', { required: true })} type="email" placeholder="Nhập Email của bạn" />
                <div className="text-red-500  text-center px-4">{errors.email?.message}</div>
              </div>

              {change ? <div className="m " >
                <input className="p-2 text-white w-5/12" {...register('otp', { required: true })} type="text" placeholder="Nhập mã OTP" />
                <div className="text-red-500  text-center px-4">{errors.otp?.message}</div>
              </div> : ""}

              <div className="text-center my-16">
                <button className="button p-2 text-white border-1 rounded">Submit</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
    </div>
  )
}

export default ForgotPassword