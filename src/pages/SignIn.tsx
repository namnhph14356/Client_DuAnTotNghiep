
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { currentUserSlice, forgotPassword, signIn, signInWidthFacebookSlice, signInWidthGoogleSlice, signUp } from "../features/Slide/auth/authSlide";
import { message, Modal } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import './../css/signin.css';
import Google from "../components/Icons/IconGoogle/Google";
import { getCurrenUser } from "../api/user";
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin, useGoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script'
import { AppDispatch } from "../app/store";

type Props = {};

const fromSchema = yup.object().shape({
  email: yup.string()
    .required("Email không được để trống !")
    .email("Email sai cú pháp !"),
  password: yup.string()
    .required("Mật khẩu không được để trống !")
    .min(6, 'Mật khẩu không được nhỏ hơn 6 kí tự !'),

})
const validation = { resolver: yupResolver(fromSchema) }

type FormInputs = {
  email: string,
  password: string | number,
}

const SignIn = (props: Props) => {
  const { register, handleSubmit, formState } = useForm<FormInputs>(validation);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { errors } = formState;
  if (errors) {
    if (errors.email) {
      message.error(String(errors.email.message))
    } else if (errors.password) {
      message.error(String(errors.password.message))
    }
  }

  const onSubmit: SubmitHandler<FormInputs> = async (userForm: FormInputs) => {
    try {
      const { payload } = await dispatch(signIn(userForm))
      if (payload.message === "Đăng nhập thành công !") {
        message.success('Đăng nhập thành công !');
        localStorage.setItem("tokenUser", JSON.stringify(payload.token))
        navigate("/")
      } else {
        message.error(payload.message);
      }
    } catch (error) {
      alert(error)
    }
  }

  const checkValue = (e) => {
    if (e.target.value !== "") {
      e.nativeEvent.path[2].classList.add('field--non-empty');
    } else {
      e.nativeEvent.path[2].classList.remove('field--non-empty');
    }
  }
  // login width facebook
  const responseFacebook = async (response: any) => {
    const { payload } = await dispatch(signInWidthFacebookSlice({
      id: response.id,
      email: response.email,
      name: response.name,
      img: response.picture.data.url
    }))

    if (payload.message === "Đăng nhập thành công !") {
      message.success('Đăng nhập thành công !');
      localStorage.setItem("tokenUser", JSON.stringify(payload.token))
      navigate("/")
    }
  }

  const componentClicked = (data: any) => {
    console.log("On Login width Facebook", componentClicked);
  }

  //login width google 
  const responseGoogle = async (response:any) => {
    const { payload } = await dispatch(signInWidthGoogleSlice({
      id: response.profileObj.googleId,
      email: response.profileObj.email,
      name: response.profileObj.name,
      img: response.profileObj.imageUrl
    }))

    if (payload.message === "Đăng nhập thành công !") {
      message.success('Đăng nhập thành công !');
      localStorage.setItem("tokenUser", JSON.stringify(payload.token))
      navigate("/")
    }
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '544533877204-g9egm7rifl6tk8ie3j6rbc5cgj461mg0.apps.googleusercontent.com',
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  return (
    <div className="box__sigin">
      <div className="signin__form ">
        <div className="signin__main__left  w-full ">
          <div className="text-center mx-9">
            <h1 className="text-3xl font-bold mb-12">Đăng nhập</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="field">
                <div className="field__input">
                  <input spellCheck="false" data-testid="input-username" autoCapitalize="off" {...register('email')} onChange={(e) => checkValue(e)} className={`field__form-input text__ignore-subset ${errors.email ? 'outline-red-500' : ''}`} type="text" autoComplete="on" />
                  <label className="field__label">EMAIL</label><span className="field__placeholder" >EMAIL</span>
                </div>
              </div>
              <div className="field">
                <div className="field__input">
                  <input spellCheck="false" data-testid="input-password" autoCapitalize="off" {...register('password')} onChange={(e) => checkValue(e)} className={`field__form-input text__ignore-subset ${errors.password ? 'outline-red-500' : ''}`} type="password" autoComplete="on" />
                  <label className="field__label">mật khẩu</label><span className="field__placeholder">mật khẩu</span>
                </div>
              </div>
              <div className="flex justify-between gap-6">
                <div className="bg-blue-500 text-white rounded py-2 w-full hover:cursor-pointer hover:bg-blue-600">
                  <FacebookLogin
                    appId="557397382768020"
                    textButton=""
                    fields="name,email,picture"
                    onClick={componentClicked}
                    callback={responseFacebook}
                    cssClass="bg-blue-500 text-white rounded w-full hover:cursor-pointer hover:bg-blue-600 text-white"
                    icon={<i className="fa-brands fa-facebook text-2xl"></i>}
                  />
                </div>
                <GoogleLogin
                  clientId="544533877204-g9egm7rifl6tk8ie3j6rbc5cgj461mg0.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  // isSignedIn={true}
                  render={renderProps => {
                    return (
                      <div onClick={renderProps.onClick} className="bg-white rounded m-auto py-2 w-full border shadow-sm  hover:cursor-pointer hover:bg-slate-100">
                        <button ><Google /></button>
                      </div>
                    );
                  }}
                />
              </div>
              <div >
                <button className="bg-blue-500 mt-8 text-white rounded text-lg font-semibold py-4 w-full hover:cursor-pointer hover:bg-blue-600">ĐĂNG NHẬP</button>
              </div>
              <div className="mt-6 text-right">
                <Link to={'/forgotPassword'} className="text-black hover:text-blue-500">Quên mật khẩu ?</Link>
              </div>
              <div className=" text-right">
                <span>Bạn chưa có tài khoản?<Link to={'/signup'}> Đăng kí</Link></span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;