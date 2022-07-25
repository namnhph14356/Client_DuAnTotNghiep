import { yupResolver } from '@hookform/resolvers/yup';
import { message } from 'antd';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {  newPass  } from '../../features/Slide/auth/authSlide';

const fromSchema = yup.object().shape({

    password: yup.string()

      .required("Không được để trống")
      .min(6, 'Mật khẩu phải lớn hơn 6 kí tự'),
    confirmPassword: yup.string()
      .required("Không được để trống")
      .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp'),
  })
  const validation = { resolver: yupResolver(fromSchema) }
  
  
  type FormInputs = {
    password: string | number,
    confirmPassword?: string | number,
  }
const NewPassword = () => {
    const { register, handleSubmit, formState } = useForm<FormInputs>(validation);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { errors } = formState;

    const { email } = useParams();
    const onSubmit: SubmitHandler<FormInputs> = async (userForm: any) => {
      console.log(userForm);

      try {
       
        const { payload } = await dispatch(newPass({
            // _id: id,
            
            email:email,
            password: userForm.password,
            
          }))

        console.log(payload);
        if (payload.message) {
          // errors.otp?.message = "mã otp không đúng";
          message.warning(payload.message)
        
        }else{
          message.success("Đổi mật khẩu thành công !")
          // navigate("/login")
          // Modal.error({
          //   title: "Account is exist !",
          //   onOk: () => {
              navigate("/login")
          //   }
          // }) 
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


            <h1 className="text-3xl font-bold">Thiết lập mật khẩu mới</h1>
           
            <p className="text-center">Mật khẩu mới</p>


            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="m " >
                <input className="p-2 text-white" {...register('password', { required: true })} type="password" placeholder="Password" />
                <div className="text-red-500  text-center px-4">{errors.password?.message}</div>
              </div>

              <div>
                <input className="px-4 text-white" {...register("confirmPassword")} type="password" placeholder="Confirm password" />
                <div className="text-red-500 text-center px-4">{errors.confirmPassword?.message}</div>
              </div>

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

export default NewPassword