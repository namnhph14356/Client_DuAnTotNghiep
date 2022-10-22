import { Button, Col, Form, Input, InputNumber, message, Modal, Row, Typography, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { editUser, getUserById } from "../../api/user";
import { uploadImage } from "../../utils/upload";
import './style.css'
import { UploadOutlined } from '@ant-design/icons';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { UserType } from '../../types/user'
import { Avatar } from "../Avatar";
import { editUserSlide, getUser } from "../../features/Slide/user/userSlide";
import axios from 'axios';
import { editdUserSlide } from "../../features/Slide/auth/authSlide";
type Props = {};

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

const UpdateProfile = ({form,onSubmit,users,onChangeImage}) => {
  {

    return (
      <Form form={form} id='myForm' name="nest-messages" onFinish={onSubmit} >
        <Form.Item name="img" valuePropName="src" >
          <img className="rounded-full w-[154px] h-[154px]"
            src={users?.img} id='img-preview' alt="" width='100px' />
        </Form.Item>
        <Form.Item
          label="Upload ảnh"
          tooltip="Ảnh dành cho Quiz"
          rules={[{ required: true, message: 'Không để Trống!' }]}
        >
          <Input type="file" accept='.png,.jpg' id='file-upload' className="form-control" onChange={onChangeImage} />
        </Form.Item>
        <Form.Item name={'username'} label="Họ và tên" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={'phone'} label="Số điện thoại">
          <Input />
        </Form.Item>
        <Form.Item name={'address'} label="Địa chỉ">
          <Input />
        </Form.Item>
      </Form>
    )
  }
}

const BannerUser = (props: Props) => {
  const [value, setValue] = useState<UserType>();
  const [visible, setVisible] = useState(false);
  const auth = useSelector(((item: RootState) => item.auth.value)) as UserType
  const { register, handleSubmit, formState, reset } = useForm<UserType>(validation);
  const [fileList, setfileList] = useState<any>();
  // const [info, getInfo] = useState<UserType>()
  const { errors } = formState;
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const id = auth._id
  const dispath = useDispatch();
  const users = useSelector<any, any>(data => data.user.value);
  useEffect(() => {
    const getText = async () => {
      const { payload } = await dispath(getUser(id));
      form.setFieldsValue(payload)
      setValue(payload);
    };
    getText();
  }, [id]);
  console.log(users);

  const preview = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
  const onChangeImage = async (e) => {
    if (e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpeg") {
      setfileList(e.target.files[0])
      const imgPreview = document.getElementById("img-preview") as HTMLImageElement
      imgPreview.src = await URL.createObjectURL(e.target.files[0])
    } else {
      message.error('File không hợp lệ!');
    }
  }
  const onSubmit: SubmitHandler<UserType> = async (values: any) => {
    try {
      const imgPost = document.querySelector<any>("#file-upload");
      if (imgPost.files.length) {
        const response = await uploadImage(imgPost);
        values.img = response;
      }
      await dispath(editdUserSlide({
        _id: id,
        username: values.username,
        phone: values.phone,
        address: values.address,
        img: values.img
      }))
      message.success('Cập nhật thành công')
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
                  <Avatar image={String(value?.img)} className="text-4xl w-32" />
                </Col>
                <Col
                  xs={24}
                  sm={16}
                  md={16}
                  lg={16}
                  xl={16}
                  className="info-detail ps-2"
                >
                  <Typography.Title level={3} className="font-bold text-[32px]">{value?.username}</Typography.Title>
                  <span>Quê quán: {value?.address}</span>
                  <div className="flex py-4 items-center">
                    <div className="">
                      {/* <img
                        className="w-[26px] h-[30px] object-cover"
                        src="https://cdn-icons-png.flaticon.com/512/3564/3564808.png"
                        alt=""
                      /> */}
                    </div>
                    <p className="px-2 m-0">Đã tham gia {moment(value?.createdAt).format("MM YYYY")}</p>
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
                <div>
                    <UpdateProfile form={form} onSubmit={onSubmit} onChangeImage={onChangeImage} users={users}  />
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
