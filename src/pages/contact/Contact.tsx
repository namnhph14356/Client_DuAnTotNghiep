import React from "react";
import { Col, DatePicker, Input, Row, Typography } from "antd";
import "./contact.css";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
type Props = {};
const { TextArea } = Input;

const Contact = (props: Props) => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="p-3">
          <Typography.Title level={2} className="text-left">
            Liên hệ với chúng tôi
          </Typography.Title>
          <div className="email">
            <p className="m-0 text-[24px] pt-10">Email của bạn</p>
            <span className="text-[18px]">
              Liên hệ với chúng tôi qua email bằng cách điền vào biểu mẫu trên
              trang này
            </span>
            <br />
            <div className="py-3">
              <span className="text-[18px] py-3">
                Bạn cũng có thể truy cập khu vực Chăm sóc khách hàng để tìm câu
                trả lời cho những câu hỏi thường gặp nhất về các dịch vụ của
                Voguie.
              </span>
            </div>
          </div>
          <form action="">
            <Row className="form">
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <Typography.Title level={5} className="uppercase m-0">
                    Họ (*)
                  </Typography.Title>
                  <Input placeholder="Nhập họ" />
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <Typography.Title level={5} className="uppercase m-0">
                    Tên (*)
                  </Typography.Title>
                  <Input placeholder="Nhập tên" />
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <Typography.Title level={5} className="uppercase m-0">
                    QUỐC GIA / VÙNG (*)
                  </Typography.Title>
                  <Input placeholder="Nhập quốc gia / vùng" />
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <Typography.Title level={5} className="uppercase m-0">
                    NGÀY SINH (*)
                  </Typography.Title>
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Chọn ngày sinh"
                  />
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <Typography.Title level={5} className="uppercase m-0">
                    ĐỊA CHỈ EMAIL(*)
                  </Typography.Title>
                  <Input placeholder="Nhập địa chỉ email" />
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <Typography.Title level={5} className="uppercase m-0">
                    ĐIỆN THOẠI (*)
                  </Typography.Title>
                  <Input placeholder="Nhập số điện thoại" />
                </div>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12} className="mb-3">
                <div className="pr-3">
                  <Typography.Title level={5} className="uppercase m-0">
                    MESSAGE (*)
                  </Typography.Title>
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
            <div className="text pt-[85px]">
              <p className="text-[18px] m-0">
                Trang web này được bảo vệ bởi reCAPTCHA và Chính sách quyền
                riêng tư và Điều khoản dịch vụ của Google sẽ được áp dụng.
              </p>
              <br />
              <p className="text-[18px] m-0">
                Dữ liệu cá nhân của bạn sẽ được Vogue sử dụng chỉ cho các mục
                đích liên quan đến dịch vụ / liên hệ được yêu cầu.
              </p>
              <br />
              <p className="text-[18px] m-0">
                Tham khảo Chính sách quyền riêng tư của chúng tôi để biết thêm
                thông tin và liên hệ với Valentino nếu có các mối quan tâm và
                yêu cầu về quyền riêng tư
              </p>
              <br />
              <p className="text-[18px] m-0">
                Hơn nữa, nếu bạn cũng muốn giữ liên lạc với Vogue khi nhận các
                thông tin liên lạc thương mại được cá nhân hóa, vui lòng cho
                phép chúng tôi:
              </p>
            </div>
            <div className="check-box">
              <div className="flex items-center pt-5">
                <input type="checkbox" name="" id="" className="text-[18px]" />
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
            <div className="submit flex justify-center items-center pt-[96px]">
              <button className="py-2 px-[40px] bg-[#4A235A] w-[337px] h-[64px] text-white font-bold border rounded-[10px]">
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
