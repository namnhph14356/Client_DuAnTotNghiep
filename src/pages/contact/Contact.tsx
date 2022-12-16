import React from "react";
import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Typography } from "antd";
import "./contact.css";

import Footer from "../../components/Footer";


import { useDispatch, useSelector } from "react-redux";
import { addContactSlide } from "../../features/Slide/contact/ContactSlide";
import toas from 'toastr';
import { useNavigate } from "react-router-dom";


type Props = {};
const { TextArea } = Input;

const Contact = () => {
  // const contact = useSelector<any, any>(data => data.contact.value);
  const dispath = useDispatch();
  const navigate = useNavigate();


  const onFinish = async (values: any) => {
    try {
      dispath(addContactSlide(
        {
          surname: values.contact.surname,
          name: values.contact.name,
          address: values.contact.address,
          birthday: values.contact.birthday,
          email: values.contact.email,
          phone: values.contact.phone,
          message: values.contact.message,
          status: 0,
          sendAds: values.contact.sendAds || 0
        }
      ))

      toas.success("Gửi biểu mẫu thành công");
      setTimeout(() => {
        navigate('/')
      }, 1000);


    } catch (error: any) {
      toas.error(error.response.data);
    }

  };
  return (
    <>
      <div className="w-10/12 m-auto">
        <div className="p-3">
          <h2 className="text-[24px] mt-[30px]">
            Liên hệ với chúng tôi
          </h2>
          <div className="email">
            <span className="text-[16px]">
              Liên hệ với chúng tôi qua email bằng cách điền vào biểu mẫu trên
              trang này
            </span>
            <p className="text-[16px] py-3">
              Bạn cũng có thể truy cập khu vực chăm sóc khách hàng để tìm câu
              trả lời cho những câu hỏi thường gặp nhất về các dịch vụ của
              Vian English.
            </p>
          </div>
          <Form onFinish={onFinish} className="mt-[23px]">
            <Row className="form" >
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <h5 className="uppercase m-0 text-[14px] mb-[15px]">
                    Họ (*)
                  </h5>
                  <Form.Item name={['contact', 'surname']} rules={[{ required: true, message: 'Họ không được để trống' }]}>
                    <Input placeholder="Nhập họ" />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <h5 className="uppercase m-0 text-[14px] mb-[15px]">
                    Tên (*)
                  </h5>
                  <Form.Item name={['contact', 'name']} rules={[{ required: true, message: 'Tên không được để trống' }]}>
                    <Input placeholder="Nhập tên" />
                  </Form.Item>                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <h5 className="uppercase m-0 text-[14px] mb-[15px]">
                    QUỐC GIA / VÙNG (*)
                  </h5>
                  <Form.Item name={['contact', 'address']} rules={[{ required: true, message: 'Địa chỉ không được để trống' }]}>
                    <Input placeholder="Nhập địa chỉ" />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <h5 className="uppercase m-0 text-[14px] mb-[15px]">
                    NGÀY SINH (*)
                  </h5>
                  <Form.Item name={['contact', 'birthday']} rules={[{ required: true, message: 'Ngày sinh không được để trống' }]}>
                    <DatePicker
                      style={{ width: "100%" }}
                      placeholder="Chọn ngày sinh"
                    />
                  </Form.Item>

                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <h5 className="uppercase m-0 text-[14px] mb-[15px]">
                    ĐỊA CHỈ EMAIL(*)
                  </h5>
                  <Form.Item name={['contact', 'email']} rules={[{ required: true, message: 'Email không được để trống' }]}>
                    <Input placeholder="Nhập email" />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <h5 className="uppercase m-0 text-[14px] mb-[15px]">
                    ĐIỆN THOẠI (*)
                  </h5>
                  <Form.Item name={['contact', 'phone']} rules={[{ required: true, message: 'Số điện thoại không được để trống' }]}>
                    <Input placeholder="Nhập số điện thoại" />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={24} className="mb-3">
                <div className="pr-3">
                  <h5 className="uppercase m-0 text-[14px] mb-[15px]">
                    MESSAGE (*)
                  </h5>
                  <Form.Item name={['contact', 'message']} rules={[{ required: true, message: 'Không được để trống' }]}>
                    <TextArea placeholder="Nhập thông tin muốn gửi" />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <div className="submit flex justify-center items-center pt-[36px] mb-[60px]">

              <Form.Item >
                <Button className="py-[2px] px-[40px] w-[337px] text-white font-bold border" style={{background:'#1890ff', color:"#fff", border:"1px solid #1890ff"}}  htmlType="submit">
                  Gửi phản hồi
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Contact;
