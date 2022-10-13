import { Button, Col, message, Modal, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { editUser, getUserById } from "../../api/user";
import { uploadImage } from "../../utils/upload";
import './style.css'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { UserType } from '../../types/user'
import { Avatar, AvatarDefault } from "../Avatar";
type Props = {};

type FormTypes = {
  _id: number,
  username: string,
  phone: number,
  password: string,
  img: string,
}
const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

const fromSchema = yup.object().shape({
  username: yup.string()
    .required("Tên không được để trống")
    .min(3, 'Tên không được nhỏ hơn 3 kí tự'),
  phone: yup.string()
    .required("Số điện thoại không được để trống")
    .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
    .min(10, 'Số điện thoại không được nhỏ hơn 10 kí tự'),
  address: yup.string()
    .required("Địa chỉ không được để trống")
    .min(6, 'Địa chỉ không được nhỏ hơn 6 kí tự'),

})
const validation = { resolver: yupResolver(fromSchema) }

const BannerUser = (props: Props) => {
  const [visible, setVisible] = useState(false);
  const auth = useSelector(((item: RootState) => item.auth.value)) as UserType
  // const isAuthenticate = () => {
  //   if (!localStorage.getItem('user')) return;
  //   return JSON.parse(localStorage.getItem('user') as string);
  // }
  // const data = isAuthenticate()
  const { register, handleSubmit, formState, reset } = useForm<UserType>(validation);
  const [preview, setPreview] = useState<string>();
  // const [info, getInfo] = useState<UserType>()
  const { errors } = formState;

  const navigate = useNavigate()
  // const id = data.user._id
  // useEffect(() => {
  //   const getProducts = async () => {
  //     const { data } = await getUserById(id);
  //     reset(data)
  //     getInfo(data)
  //   }
  //   getProducts()
  // }, [id])
  const handlePreview = (e: any) => {

    setPreview(URL.createObjectURL(e.target.files[0]));
  }
  const onSubmit: SubmitHandler<UserType> = async data => {
    try {
      const imgPost = document.querySelector<any>("#file-upload");
      const imgLink = await uploadImage(imgPost);
      if (imgPost.files.length) {
        const response = await uploadImage(imgPost);
        data.img = response;
      }
      await editUser(data);
      message.success('Cập nhật thành công')
      navigate('/user')

    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="mt-[65px] pb-2">
        <div className="box__banner__user">
          <Row className="items-center">
            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
              <Row className="items-center">
                <Col className="info-image">
              
                  {auth.img
                    ? <Avatar image={auth.img} className="text-4xl w-32" />
                    : <AvatarDefault name={auth.username} color={String(auth.colorImage)} className="text-4xl w-32 h-32 text-white" />
                  }
                </Col>
                <Col
                  xs={24}
                  sm={16}
                  md={16}
                  lg={16}
                  xl={16}
                  className="info-detail ps-2"
                >
                  <Typography.Title level={3} className="font-bold text-[32px]">{auth?.username}</Typography.Title>
                  <span>Quê quán: {auth?.address}</span>
                  <div className="flex py-4 items-center">
                    <div className="">
                      <img
                        className="w-[26px] h-[30px] object-cover"
                        src="https://scontent.xx.fbcdn.net/v/t1.15752-9/287139066_753544432656658_6162782829047092404_n.png?stp=cp0_dst-png&_nc_cat=102&ccb=1-7&_nc_sid=aee45a&_nc_ohc=ffZrT9NGsjMAX9w9-G0&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVJBOUJWMH0Bgdro1htltEE3E-1bDQd84RwQ3vYGigdB8Q&oe=62E22D05"
                        alt=""
                      />
                    </div>
                    <p className="px-2 m-0">Đã tham gia {moment(auth?.createdAt).format("MM YYYY")}</p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="ps-2 mb-2">
              <button onClick={() => setVisible(true)} className="flex border font-bold cursor-pointer rounded-[10px] border-[#CCCCCC] items-center px-[23px] py-[8px] cursor-auto hover:shadow-md transition ease-linear duration-200">
                <img
                  className="w-[15px] object-cover"
                  src="https://scontent.xx.fbcdn.net/v/t1.15752-9/287291026_3128117690785848_6081349556072284930_n.png?stp=cp0_dst-png&_nc_cat=106&ccb=1-7&_nc_sid=aee45a&_nc_ohc=EL-petMT1QgAX8oDtW9&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVIckk641yBQKZ1FfhgRP0AWMV460Fp47C2Jdx2X8UTArQ&oe=62E0F077"
                  alt=""

                />
                Sửa hồ sơ
              </button>
              <Modal
                title="Sửa thông tin"
                centered
                visible={visible}
                onCancel={() => setVisible(false)}
                width={700}
                footer={[
                  <>
                    <Button form="myForm" key="onCancel" onClick={() => setVisible(false)} style={{ background: "#ff8080", color: "#fff" }}>
                      Hủy
                    </Button>
                    <Button form="myForm" key="submit" htmlType="submit" style={{ background: "#4d4dff", color: "#fff" }}>
                      Sửa
                    </Button>
                  </>

                ]}
              >
                <div className='edit_user'>
                  <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
                    <div className="">
                      <img className="rounded-full w-[154px] h-[154px]"
                        src={preview || auth?.img} id='img-preview' alt="" width='100px' />
                      <input type="file" {...register('img')} onChange={e => handlePreview(e)} id='file-upload' />
                    </div>
                    <br />
                    <div>
                      <label>Tên: </label>
                      <input type="text" {...register('username')} /> <br />
                      <div className="text-red-500 float-left text-left px-4">{errors.username?.message}</div>
                    </div>
                    <br />
                    <div>
                      <label>Số điện thoại: </label>
                      <input type="text" {...register('phone')} /> <br />
                      <div className="text-red-500 float-left text-left px-4">{errors.phone?.message}</div>
                    </div>
                    <br />
                    <div>
                      <label>Địa chỉ: </label>
                      <input type="text" {...register('address')} /> <br />
                      <div className="text-red-500 float-left text-left px-4">{errors.address?.message}</div>

                    </div>
                    <div>
                      {/* <button className='button'>Sửa</button> */}
                    </div>
                  </form>
                </div>
              </Modal>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default BannerUser;
