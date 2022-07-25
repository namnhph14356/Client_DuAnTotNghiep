import { Col, Row } from "antd";
import React from "react";
import "./style.css";
type Props = {};

const ThongKe = (props: Props) => {
  return (
    <div className="container">
      <div className="py-[90px]">
        <h1 className="font-bold text-[32px] px-4">Thống kê</h1>
        <div className="big-box">
          <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="p-4">
              <div className="small-box px-3 py-5 border rounded-md hover:shadow-lg transition-all ease-linear duration-300">
                <div className="level flex items-center">
                  <div className="icon px-3">
                    <img src="../../image/image 39.png" />
                  </div>
                  <div className="info px-7">
                    <p className="m-0 text-[18px]">0</p>
                    <span className="text-[20px]">Level</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="p-4">
              <div className="small-box px-3 py-5 border rounded-md hover:shadow-lg transition-all ease-linear duration-300">
                <div className="level flex items-center">
                  <div className="icon px-3">
                    <img src="../../image/image 39 (1).png" />
                  </div>
                  <div className="info px-7">
                    <p className="m-0 text-[18px]">0</p>
                    <span className="text-[20px]">Tổng vương miệng</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="p-4">
              <div className="small-box px-3 py-5 border rounded-md hover:shadow-lg transition-all ease-linear duration-300">
                <div className="level flex items-center">
                  <div className="icon px-3">
                    <img src="../../image/image 39 (2).png" />
                  </div>
                  <div className="info px-7">
                    <p className="m-0 text-[18px]">0</p>
                    <span className="text-[20px]">Điểm kinh nghiệm</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="p-4">
              <div className="small-box px-3 py-5 border rounded-md hover:shadow-lg">
                <div className="level flex items-center">
                  <div className="icon px-3">
                    <img src="../../image/image 39 (3).png" />
                  </div>
                  <div className="info px-7">
                    <p className="m-0 text-[18px]">0</p>
                    <span className="text-[20px]">Thứ hạng</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ThongKe;
