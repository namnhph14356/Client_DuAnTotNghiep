import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../../app/store";
import { currentUserSlice } from "../../features/Slide/auth/authSlide";
import { UserType } from "../../types/user";
import "../../css/payment.css"
type Props = {};

const CheckoutPayment = (props: Props) => {
  const auth = useSelector((item: RootState) => item.auth.value) as UserType;

 
  return (
    <div>
      <header className="bg-indigo-600 py-2 px-20 flex">
        <NavLink
          to={"/"}
          className="text-white font-bold text-3xl hover:text-indigo-50 font-mono w-[80%]"
        >
          <img
            src={
              "https://res.cloudinary.com/chanh-thon/image/upload/v1667831318/upload_preset/LogoHeader-removebg-preview_q6pbxp.png"
            }
            width={100}
            alt=""
          />
        </NavLink>

        <div className="w-[20%] text-2xl my-auto ">
          <div className="text-white ">
            HOTLINE: <span className="text-[#ff9933]">0332072735</span>
          </div>
        </div>
      </header>
      <div className="mt-8 w-8/12 m-auto">
        <NavLink to='/learning' className="px-4 py-2 bg-red-500 rounded border text-white font-bold hover:text-red-500 hover:bg-white hover:border-red-500">Quay về</NavLink>
      </div>

      <Outlet />


      <footer className="w-8/12 mt-16 m-auto pb-8">
        <h1 className="text-2xl text-[#167AC6]">Hướng dẫn thanh toán</h1>
        <ul className="flex flex-col gap-4">
          <li className="text-base">
            1: Thanh toán với hình thức chuyển khoản hoặc quét mã QR
            <span className="text-red-500 font-bold">
              {" "}
              lưu ý ghi đúng nội dung chuyển khoản
            </span>
          </li>
          <li className="text-base">
            2: Sau khi thanh toán đợi khoảng 5-10 phút sẽ có nhân viên xác nhận
            và mở khóa học cho bạn
          </li>
          <li className="text-base">
            3: Nếu không thấy phản hồi hãy liên hệ tổ tư vấn để được hỗ trợ.{" "}
            <span className="text-red-500 font-bold"> Hotline: 19008198</span>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default CheckoutPayment;
