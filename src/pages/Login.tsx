
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { forgotPassword, signIn, signUp } from "../features/Slide/auth/authSlide";
import { message, Modal } from "antd";
import { SubmitHandler, useForm } from "react-hook-form";
import { FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase/config'
import './../css/signin.css';
import './../css/signup.css';
type Props = {};

const fromSchema = yup.object().shape({
  email: yup.string()
    .required("Email hông được để trống")
    .email("Nó không phải email"),
  password: yup.string()
    .required("Mật khẩu không được để trống")
    .min(6, 'Mật khẩu không được nhỏ hơn 6 kí tự'),

})
const validation = { resolver: yupResolver(fromSchema) }


type FormInputs = {
  email: string,
  password: string | number,
}

const Login = (props: Props) => {
  const { register, handleSubmit, formState } = useForm<FormInputs>(validation);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormInputs> = async (userForm: any) => {
    console.log(userForm);
    try {
      const { payload } = await dispatch(signIn(userForm))
      if (payload.message) {
        message.error(payload.message);
      } else {
        console.log(payload);
        localStorage.setItem("user", JSON.stringify(payload))
        message.success('Login successfully !');
        // navigate("/")
      }
    } catch (error) {
      alert("Error !!!")
    }
  }

  const handlerLoginFacebook = () => {
    const prodider = new FacebookAuthProvider();
    signInWithPopup(auth, prodider).then((result) => {
      console.log(result);

      const id = result.user.uid;
      const name = result.user.displayName;
      const email = result.user.email;
      const image = result.user.photoURL;
      // console.log(result.user);

      localStorage.setItem("user", JSON.stringify({ id, name, email, image }));
    }).then(() => {

      // navigate("/");
    }).catch((error) => {
      console.log(error);

    });
  }

  const handlerLoginGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      // console.log(result);
      const id = result.user.uid;
      const name = result.user.displayName;
      const email = result.user.email;
      const image = result.user.photoURL;
      console.log(result.user);

      localStorage.setItem("user", JSON.stringify({ id, name, email, image }));

    }).then(() => {

      navigate("/");
    })
      .catch((error) => {
        console.log(error);

      });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user is empty");

    } else {
      console.log("unauthorized");

    }

  })

  return (

    <div className="box__sigin">
      <div className="signin__form ">
        <div className="signin__main__left  w-full ">
          <div className="text-center ml-24">
            <h1 className="text-3xl font-bold">Đăng nhập</h1>
            <div className="signin__main__right__login__google text-center my-6">
              <button onClick={() => handlerLoginFacebook()}><i className="fa-brands fa-facebook" /></button>
              <i className="fa-brands fa-twitter" />
              <button onClick={() => handlerLoginGoogle()}><i className="fa-solid fa-g" /></button>
            </div>
            <p className="text-center">Đăng nhập bằng email của bạn</p>


            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="m">
                <input className=" text-white" {...register('email', { required: true })} type="email" placeholder="Email" />
                <div className="text-red-500 float-left text-left px-4">{errors.email?.message}</div>
              </div>

              <div>
                <input className=" text-white" {...register('password', { required: true })} type="password" placeholder="Mật khẩu" />
                <div className="text-red-500 float-left text-left px-4">{errors.password?.message}</div>
              </div>

              <p className="my-6 text-center">
                <Link to={'/forgotPassword'}>Quên mật khẩu ?</Link>
              </p>

              <div className="text-center">
                <button className="button p-2 text-white border-1 rounded">Đăng nhập</button>
              </div>
            </form>
          </div>

        </div>
        <div className="signin__main__right w-full my-24">
          <h3 className="text-2xl font-bold text-center">Xin chào bạn !</h3>
          <p className="signin__main__right__text text-center my-8">
            Nhập thông tin cá nhân của bạn để bắt đầu hành trình với chúng tôi
          </p>
          <div className="text-center">
            <NavLink to={"/register"} className="button p-2 border-1 rounded">Đăng kí</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;