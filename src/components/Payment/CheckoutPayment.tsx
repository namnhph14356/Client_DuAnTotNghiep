import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../app/store";
import { currentUserSlice } from "../../features/Slide/auth/authSlide";
import { UserType } from "../../types/user";

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

        <div className="w-[20%] text-2xl leading-[3.5rem]">
          <h1 className="text-white">
            HOTLINE: <span className="text-[#ff9933]">0332072735</span>
          </h1>
        </div>
      </header>

      <main className="w-8/12 m-auto mt-16 border-l-[5px] pl-4 border-[#ff9933]">
        <div>
          <h1 className="text-3xl text-[#167AC6]">Chọn hình thức thanh toán</h1>
        </div>
        <div className="flex w-full">
          <section className="left__side flex gap-4 mt-8 w-[70%]">
            <div>
              <ul className="flex flex-col gap-6">
                <li className="font-bold text-xl">Ngân hàng:</li>
                <li className="font-bold text-xl">Số tài khoản:</li>
                <li className="font-bold text-xl">Chủ tài khoản:</li>
                <li className="font-bold text-xl">Nội dung chuyển khoản:</li>
              </ul>
            </div>

            <div>
              <ul className="flex flex-col gap-6">
                <li className="font-bold text-xl">Agribank</li>
                <li className="font-bold text-xl">2604205229336</li>
                <li className="font-bold text-xl">Ngô Sỹ Hùng</li>
                <li className="font-bold text-xl text-red-500">
                  Khoa 360 ngay
                </li>
              </ul>
            </div>

            <div className="qr__code">
              <img
                src="../../assets/image/real_qr.jpg"
                alt=""
                width={"200px"}
              />
            </div>
          </section>

          <section className="right__side w-[30%]">
            <div className="border-[1px]">
              <h1 className="p-2 text-center font-bold text-2xl text-white bg-[#167AC6]">Thông tin thanh toán</h1>

              <div className="p-4 flex justify-between text-base">
                <ul className="text-gray-500 font-bold">
                  <li>Tài khoản:</li>
                  <li>Mô tả:</li>
                </ul>

                <ul className="text-[#167AC6] font-bold">
                  <li>{auth.username}</li>
                  <li>Khóa học tiếng anh 360</li>
                </ul>
              </div>

              <div className="bg-[#ff9933] text-gray-700 text-xl p-2 flex justify-between font-bold">
                <span> Thành tiền:</span>
                <span className="text-right text-white">360.000 VND</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="w-8/12 mt-16 m-auto">
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
