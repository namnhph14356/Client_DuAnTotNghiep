import { message } from "antd";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { create_url, redirect_url } from "../../../api/vnpay";
import { RootState } from "../../../app/store";
import { UserType } from "../../../types/user";
type Props = {};
type FormVnpay = {
  name ?: string;
  price ?: number;
  content ?: string;
  bank ?: string;
};
const FormCreateVnPay = (props: Props) => {
  const [bank, setBank] = useState("");
  const auth = useSelector((item: RootState) => item.auth.value) as UserType;
  console.log(auth);
  
  const handleChange = (event) => {
    setBank(event.target.value);
  };


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormVnpay>();
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<FormVnpay> = async (data:any) => {
      try {
        const confirm =  window.confirm("Bạn đã xác nhận thanh toán ?");
        if(confirm){
           const url:any =  await create_url(data)
           setTimeout(() => {
             window.location.replace(url.data);
           }, 1000);
        }
      } catch (error) {
        message.error("Hệ thống bận");
      }
  };

  return (
    <div className="w-8/12 m-auto mt-16 border-l-[5px] pl-4 border-[#ff9933]">
      <div>
        <h1 className="text-3xl text-[#167AC6]">Thanh toán khóa học</h1>
        <form className="form_payment" onSubmit={handleSubmit(onSubmit)}>
          <div className="fomt-element text-xl flex flex-col gap-2">
            <label htmlFor="" className="">
              Tên
            </label>
            <input
              type="text"
              id=""
              placeholder="Ten dang nhap"
              value={auth.username}
              {...(register("name", { required: true }))}
              // disabled
            />
          </div>

          <div className="fomt-element text-xl flex flex-col gap-2">
            <label htmlFor="" className="">
              Gía tiền
            </label>
            <input
              type="number"
              {...register("price")}
              value={360000}
            />
          </div>

          <div className="fomt-element text-xl flex flex-col gap-2">
            <label htmlFor="" className="">
              Nội dung thanh toán
            </label>
            <textarea
              id=""
              {...register("content")}
              defaultValue="Khoa hoc 360"
            />
          </div>

          <div className="fomt-element text-xl flex flex-col gap-2">
            <label htmlFor="" className="">
              Chọn ngân hàng thanh toán
            </label>
            <select value={bank} {...register("bank")} onChange={handleChange} >
              <option value="">Không có</option>
              <option value="EXIMBANK">EXIMBANK</option>
              <option value="VISA">VISA</option>
              <option value="NCB">NCB</option>
              <option value="TPBANK">TPBANK</option>
            </select>
          </div>

          <button type="submit">Thanh toán</button>
        </form>
      </div>
    </div>
  );
};

export default FormCreateVnPay;
