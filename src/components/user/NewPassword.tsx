import { yupResolver } from '@hookform/resolvers/yup';
import { message } from 'antd';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { AppDispatch } from '../../app/store';
import { newPass } from '../../features/Slide/auth/authSlide';

const fromSchema = yup.object().shape({

  password: yup.string()
    .required("Mật khẩu không được để trống")
    .min(6, 'Mật khẩu phải lớn hơn 6 kí tự'),
  confirmPassword: yup.string()
    .required("Mật khẩu không được để trống")
    .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp'),
})
const validation = { resolver: yupResolver(fromSchema) }

type FormInputs = {
  password: string | number,
  confirmPassword?: string | number,
}
const NewPassword = () => {
  const { register, handleSubmit, formState } = useForm<FormInputs>(validation);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { errors } = formState;
  const { email } = useParams();

  if (errors) {
    if (errors.password) {
      message.error(String(errors.password.message))
    } else if (errors.confirmPassword) {
      message.error(String(errors.confirmPassword.message))
    }
  }

  const onSubmit: SubmitHandler<FormInputs> = async (userForm: FormInputs) => {
    try {
      const { payload } = await dispatch(newPass({
        email: email,
        password: userForm.password,
      }))
      if (payload.message) {
        message.warning(payload.message)
      } else {
        message.success("Đổi mật khẩu thành công !")
        navigate("/signin")
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
        <div className="signin__form">
          <div className="signin__main__left  w-full ">
            <div className="text-center mx-9">
              <h1 className="text-3xl font-bold mb-12">Thiết lập mật khẩu mới</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                  <div className="field__input">
                    <input spellCheck="false" data-testid="input-username" autoCapitalize="off" {...register('password')} onChange={(e) => checkValue(e)} className={`field__form-input text__ignore-subset ${errors.password ? 'outline-red-500' : ''}`} type="password" autoComplete="on" />
                    <label className="field__label">Mật khẩu mới</label><span className="field__placeholder" >Mật khẩu mới</span>
                  </div>
                </div>
                <div className="field">
                  <div className="field__input">
                    <input spellCheck="false" data-testid="input-username" autoCapitalize="off" {...register('confirmPassword')} onChange={(e) => checkValue(e)} className={`field__form-input text__ignore-subset ${errors.confirmPassword ? 'outline-red-500' : ''}`} type="password" autoComplete="on" />
                    <label className="field__label">Xác nhận mật khẩu</label><span className="field__placeholder" >Xác nhận mật khẩu</span>
                  </div>
                </div>
                <div >
                  <button className="bg-blue-500 mt-8 text-white rounded text-lg font-semibold py-4 w-full hover:cursor-pointer hover:bg-blue-600">Submit</button>
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