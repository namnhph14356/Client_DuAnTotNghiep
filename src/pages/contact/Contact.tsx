import React from "react";
import { Col, DatePicker, Input, Row, Typography } from "antd";
import "./contact.css";
import Footer from "../../Component/Footer";
import HeaderComponent from "../../Component/HeaderHome";
type Props = {};
const { TextArea } = Input;

const Contact = (props: Props) => {
  return (
    <>
      <HeaderComponent />
      <div className="container">
        <div className="p-3">
          <h2 className="text-[24px] mt-[30px]">
            Liên hệ với chúng tôi
          </h2>
          <div className="email">
            <p className="m-0 text-[18px] pt-2">Email của bạn</p>
            <span className="text-[16px]">
              Liên hệ với chúng tôi qua email bằng cách điền vào biểu mẫu trên
              trang này
            </span>
            <br />
            <div className="py-3">
              <span className="text-[16px] py-3">
                Bạn cũng có thể truy cập khu vực Chăm sóc khách hàng để tìm câu
                trả lời cho những câu hỏi thường gặp nhất về các dịch vụ của
                Voguie.
              </span>
            </div>
          </div>
          <form action="" className="mt-[23px]"> 
            <Row className="form" >
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <h5  className="uppercase m-0 text-[14px] mb-[15px]">
                    Họ (*)
                  </h5>
                  <Input placeholder="Nhập họ" />
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <h5  className="uppercase m-0 text-[14px] mb-[15px]">
                    Tên (*)
                  </h5>
                  <Input placeholder="Nhập tên" />
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <h5  className="uppercase m-0 text-[14px] mb-[15px]">
                    QUỐC GIA / VÙNG (*)
                  </h5>
                  <Input placeholder="Nhập quốc gia / vùng" />
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <h5  className="uppercase m-0 text-[14px] mb-[15px]">
                    NGÀY SINH (*)
                  </h5>
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Chọn ngày sinh"
                  />
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <h5  className="uppercase m-0 text-[14px] mb-[15px]">
                    ĐỊA CHỈ EMAIL(*)
                  </h5>
                  <Input placeholder="Nhập địa chỉ email" />
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <h5  className="uppercase m-0 text-[14px] mb-[15px]">
                    ĐIỆN THOẠI (*)
                  </h5>
                  <Input placeholder="Nhập số điện thoại" />
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <h5  className="uppercase m-0 text-[14px] mb-[15px]">
                    MESSAGE (*)
                  </h5>
                  <TextArea placeholder="Nhập số điện thoại" />
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <button className="uppercase bg-[#512E5F] text-[#fff] py-[2px] px-4 btn-file">
                    FILE ĐÍNH KÈM
                  </button>
                  <div className="pt-3">
                    <Typography.Text className="text-[12px] text-font-weight">
                      Bạn có thể đính kèm tệp lên đến 4096KB ở bất kỳ định dạng
                      nào sau đây: doc, xsl, txt, pdf, jpg, jpeg, gif, png
                    </Typography.Text>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="text pt-[35px]">
              <p className="text-[16px] m-0">
                Trang web này được bảo vệ bởi reCAPTCHA và Chính sách quyền
                riêng tư và Điều khoản dịch vụ của Google sẽ được áp dụng.
              </p>
              <br />
              <p className="text-[16px] m-0">
                Dữ liệu cá nhân của bạn sẽ được Vogue sử dụng chỉ cho các mục
                đích liên quan đến dịch vụ / liên hệ được yêu cầu.
              </p>
              <br />
              <p className="text-[16px] m-0">
                Tham khảo Chính sách quyền riêng tư của chúng tôi để biết thêm
                thông tin và liên hệ với Valentino nếu có các mối quan tâm và
                yêu cầu về quyền riêng tư
              </p>
              <br />
              <p className="text-[16px] m-0">
                Hơn nữa, nếu bạn cũng muốn giữ liên lạc với Vogue khi nhận các
                thông tin liên lạc thương mại được cá nhân hóa, vui lòng cho
                phép chúng tôi:
              </p>
            </div>
            <div className="check-box">
              <div className="flex items-center pt-5">
                <input type="checkbox" name="" id="" className="text-[16px]" />
                <p className="m-0 pl-3">
                  xử lý dữ liệu của bạn cho mục đích tiếp thị và khuyến mại
                  (thông báo được gửi qua bưu điện, email hoặc SMS về bộ sưu tập
                  hoặc lời mời tham gia sự kiện, v.v.)
                </p>
              </div>
              <div className="flex items-center pt-5">
                <input type="checkbox" name="" id="" className="text-[18px]" />
                <p className="m-0 pl-3">
                  xử lý dữ liệu của bạn cho mục đích phân tích thói quen và sở
                  thích của bạn (để Valentino có thể cung cấp cho bạn các dịch
                  vụ được cá nhân hóa)
                </p>
              </div>
            </div>
            <div className="submit flex justify-center items-center pt-[36px] mb-[60px]">
              <button className="py-[2px] px-[40px] bg-[#4A235A] w-[337px] h-[52px] text-white font-bold border ">
                GỬI PHẢN HỒI
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
