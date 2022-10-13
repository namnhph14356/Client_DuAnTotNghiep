import { yupResolver } from '@hookform/resolvers/yup';
import { message, Modal } from 'antd';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { changeOtp, forgotPassword } from '../../features/Slide/auth/authSlide';
import '../../css/signin.css';
import { AppDispatch } from '../../app/store';
const fromSchema = yup.object().shape({
  email: yup.string()
    .required("Email không được để trống !")
    .email("Email sai cú pháp !"),

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
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { errors } = formState;

  if (errors) {
    if (errors.email) {
      message.error(String(errors.email.message))
    } else if (errors.otp) {
      message.error(String(errors.otp.message))
    }
  }

  const onSubmit: SubmitHandler<FormInputs> = async (userForm: FormInputs) => {
    try {
      if (!userForm.otp) {
        const { payload } = await dispatch(forgotPassword({ email: userForm.email }) ) 
        if (payload.message === "Tài khoản không tồn tại !") {
          message.error(payload.message);
        } else {
          message.success(payload.message);
          setotp(payload.otpHash);
          setchange(true)
        }
      } else {
        const { payload } = await dispatch(changeOtp({ email: userForm.email, otp: userForm.otp, otpHash: otp }))

        if (payload.message) {
          message.error(payload.message);
        } else {
          navigate(`/newPassword/${userForm.email}`)
        }
      }
    } catch (error) {
      alert("Error !!!")
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
    <div>
      <div className="box__sigin">
        <div className="signin__form ">
          <div className="signin__main__left  w-full ">
            <div className="text-center  mx-9">
              <h1 className="text-3xl font-bold mb-12">Lấy lại mật khẩu</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                  <div className="field__input">
                    <input spellCheck="false" data-testid="input-username" autoCapitalize="off" {...register('email')} onChange={(e) => checkValue(e)} className={`field__form-input text__ignore-subset ${errors.email ? 'outline-red-500' : ''}`} type="text" autoComplete="on" />
                    <label className="field__label">EMAIL</label><span className="field__placeholder" >EMAIL</span>
                  </div>
                </div>
                {change ?
                  <div className="field">
                    <div className="field__input">
                      <input spellCheck="false" data-testid="input-username" autoCapitalize="off" {...register('otp')} onChange={(e) => checkValue(e)} className={`field__form-input text__ignore-subset ${errors.otp ? 'outline-red-500' : ''}`} type="text" autoComplete="on" />
                      <label className="field__label">NHẬP MÃ OTP</label><span className="field__placeholder" >NHẬP MÃ OTP</span>
                    </div>
                  </div>
                  : ""}
                <div >
                  <button className="bg-blue-500 mt-8 text-white rounded text-lg font-semibold py-4 w-full hover:cursor-pointer hover:bg-blue-600">LẤY LẠI MẬT KHẨU</button>
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