
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { signUp } from "../../features/Slide/auth/authSlide";
import { Modal } from "antd";

// import yup from 'yup'
type Props = {};

const fromSchema = yup.object().shape({
  username: yup
    .string()
    .required("Không được để trống")
    .min(6, "Tên quá ngắn"),
  email: yup.string().required("Không được để trống").email("Email không chính xác"),
  password: yup
    .string()
    .required("Không được để trốngd")
    .min(6, "Mật khẩu quá ngắn"),
  confirmPassword: yup
    .string()
    .required("Không được để trống")
    .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp"),
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errors } = formState;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit: SubmitHandler<FormInputs> = async (userForm: any) => {
    console.log(userForm);
    try {
      const user = {
        username: userForm.username,
        email: userForm.email,
        password: userForm.password,
        img: "https://i.pinimg.com/564x/04/8c/7e/048c7e0904fe27ffd0b91784a93eacc4.jpg"
      };
      // console.log(user.confirmPassword)
      const { payload } = await dispatch(signUp(user));
      console.log(payload);
      if (payload.message) {
        Modal.error({
          title: "Account is exist !",
          onOk: () => {
            // navigate("/login")
          },
        });
      } else {
        Modal.success({
          title: "Register successfully",
          onOk: () => {
            navigate("/login");
          },
        });
      }
    } catch (error) {
      alert("Username is exist");
    }
  };

  return (
    <div className="box__signup ">
      <div className="signin__form col-span-12 w-10/12 m-auto  flex justify-center">
        <div className="signin__main__right w-full my-24">
          <h3 className="text-2xl font-bold text-center">Chào mừng trở lại !</h3>
          <p className="signin__main__right__text text-center my-8 ">
          Để giữ kết nối với chúng tôi, vui lòng đăng nhập bằng thông tin cá nhân của bạn
          </p>
          <div className="text-center">
            <NavLink to={"/login"} className="button px-4 border-1 rounded">Đăng nhập</NavLink>
          </div>
        </div>
        <div className="signin__main__left  w-full ">
          <div className="text-center mr-24">

            <h1 className="text-3xl font-bold">Đăng kí</h1>
            {/* <div className="signin__main__right__login__google text-center my-6">
              <i className="fa-brands fa-facebook" />
              <i className="fa-brands fa-twitter" />
              <i className="fa-solid fa-g" />
            </div> */}
            <p className="text-center">Đăng kí tài khoản mới</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="m">
                <input className="px-4 text-white" {...register('username')} type="text" placeholder="Name" />
                <div className="text-red-500 float-left text-left px-4">{errors.username?.message}</div>
              </div>
              <div className="m">
                <input className="px-4 text-white" {...register("email")} type="email" placeholder="Email" />
                <div className="text-red-500 float-left text-left px-4">{errors.email?.message}</div>
              </div>

              <div>
                <input className="px-4 text-white" {...register("password")} type="password" placeholder="Password" />
                <div className="text-red-500 float-left text-left px-4">{errors.password?.message}</div>
              </div>

              <div>
                <input className="px-4 text-white" {...register("confirmPassword")} type="password" placeholder="Confirm password" />
                <div className="text-red-500 float-left text-left px-4">{errors.confirmPassword?.message}</div>
              </div>

              <p className="my-6 text-center">

              </p>

              <div className="text-center">
                <button className="button px-4 text-white border-1 rounded">Đăng kí</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

