
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import './../css/signup.css';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { signUp } from "../features/Slide/auth/authSlide";
import { Modal, message } from "antd";
import { colors } from "../utils/color";
import { AppDispatch } from "../app/store";
type Props = {};

const fromSchema = yup.object().shape({
  username: yup
    .string()
    .required("Không được để trống họ và tên !")
    .min(6, "Họ và tên phải lớn hơn 6 kí tự !"),
  email: yup.string().required("Không được để trống email !").email("Email sai cú pháp !"),
  password: yup
    .string()
    .required("Không được để trống mật khẩu !")
    .min(6, "Mật khẩu phải lớn hơn 6 kí tự !"),
  confirmPassword: yup
    .string()
    .required("Không được để trống mật khẩu !")
    .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp !"),
});
const validation = { resolver: yupResolver(fromSchema) };

type FormInputs = {
  username: string;
  email: string;
  password: string | number;
  confirmPassword?: string | number;
};

const SignUp = (props: Props) => {
  const { register, handleSubmit, formState } = useForm<FormInputs>(validation);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { errors } = formState;

  if (errors) {
    if (errors.username) {
      message.error(String(errors.username.message))
    } else
      if (errors.email) {
        message.error(String(errors.email.message))
      } else
        if (errors.password) {
          message.error(String(errors.password.message))
        } else
          if (errors.confirmPassword) {
            message.error(String(errors.confirmPassword.message))
          }
  }
  const onSubmit: SubmitHandler<FormInputs> = async (userForm: FormInputs) => {
    try {
      let colorRandom = colors[Math.floor(Math.random() * colors.length)];
      const user = {
        username: userForm.username,
        email: userForm.email,
        password: userForm.password,
        colorImage: colorRandom.color
      };
      const { payload } = await dispatch(signUp(user));
      if (payload.message) {
        Modal.error({
          title: "Tài khoản đã tồn tại !",
          onOk: () => {
          },
        });
      } else {
        Modal.success({
          title: "Đăng kí tài khoản thành công !",
          onOk: () => {
            navigate("/signin");
          },
        });
      }
    } catch (error) {
      alert("Error");
    }
  };


  const checkValue = (e) => {
    if (e.target.value !== "") {
      e.nativeEvent.path[2].classList.add('field--non-empty');
    } else {
      e.nativeEvent.path[2].classList.remove('field--non-empty');
    }
  }
  return (
    <div className="box__signup ">
      <div className="signin__form  m-auto px-8">
        <div className="signin__main__left  w-full ">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-8">Đăng kí </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="field">
                <div className="field__input">
                  <input spellCheck="false" data-testid="input-username" autoCapitalize="off" {...register('username')} type="text" onChange={(e) => checkValue(e)} className={`field__form-input text__ignore-subset ${errors.username ? 'outline-red-500' : ''}`} autoComplete="on" />
                  <label className="field__label">Họ và tên</label><span className="field__placeholder" >Họ và tên</span>
                </div>
              </div>
              <div className="field">
                <div className="field__input">
                  <input spellCheck="false" data-testid="input-username" autoCapitalize="off" {...register("email")} onChange={(e) => checkValue(e)} className={`field__form-input text__ignore-subset ${errors.email ? 'outline-red-500' : ''}`} type="email" autoComplete="on" />
                  <label className="field__label">Email</label><span className="field__placeholder" >Email</span>
                </div>
              </div>
              <div className="field">
                <div className="field__input">
                  <input spellCheck="false" data-testid="input-password" autoCapitalize="off" {...register("password")} onChange={(e) => checkValue(e)} className={`field__form-input text__ignore-subset ${errors.password ? 'outline-red-500' : ''}`} type="password" autoComplete="on" />
                  <label className="field__label">Mật khẩu</label><span className="field__placeholder">Mật khẩu</span>
                </div>
              </div>
              <div className="field">
                <div className="field__input">
                  <input spellCheck="false" data-testid="input-password" autoCapitalize="off" {...register("confirmPassword")} onChange={(e) => checkValue(e)} className={`field__form-input text__ignore-subset ${errors.confirmPassword ? 'outline-red-500' : ''}`} type="password" autoComplete="on" />
                  <label className="field__label">Xác nhận mật khẩu</label><span className="field__placeholder">xác nhận Mật khẩu</span>
                </div>
              </div>
              <div>
                <button className="bg-blue-500 text-white rounded text-lg font-semibold py-4 w-full hover:cursor-pointer hover:bg-blue-600">ĐĂNG KÍ</button>
              </div>
              <div className="mt-6 text-right">
                <span>Bạn đã có tài khoản?<Link to={'/signin'}> Đăng nhập</Link></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

