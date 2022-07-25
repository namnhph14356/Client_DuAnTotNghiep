import { Col, Row, Typography } from "antd";
import React from "react";
import './style.css'
type Props = {};

const BannerUser = (props: Props) => {
  return (
    <div>
      <div className="pt-3">
        <div className="border-b-2">
          <Row className="items-center">
            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
              <Row className="items-center">
                <Col xs={24} sm={8} md={8} lg={8} xl={8} className="info-image">
                  <img
                    className="object-cover m-0 p-5"
                    src="https://scontent.fhan3-2.fna.fbcdn.net/v/t1.15752-9/289426260_1007515679910649_6816727799621106895_n.png?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=up6sOk_MwWEAX8JmNUj&_nc_ht=scontent.fhan3-2.fna&oh=03_AVKYw46aGd4iGKWGH7xK1Kg8kjsIHUqvJCRAh2ow6CiqjA&oe=62E27F33"
                    alt=""
                  />
                </Col>
                <Col
                  xs={24}
                  sm={16}
                  md={16}
                  lg={16}
                  xl={16}
                  className="info-detail ps-2"
                >
                  <Typography.Title level={3} className="font-bold text-[32px]">Bùi Hồng Hạnh</Typography.Title>
                  <span>67349hy</span>
                  <div className="flex py-4 items-center">
                    <div className="">
                      <img
                        className="w-[26px] h-[30px] object-cover"
                        src="https://scontent.xx.fbcdn.net/v/t1.15752-9/287139066_753544432656658_6162782829047092404_n.png?stp=cp0_dst-png&_nc_cat=102&ccb=1-7&_nc_sid=aee45a&_nc_ohc=ffZrT9NGsjMAX9w9-G0&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVJBOUJWMH0Bgdro1htltEE3E-1bDQd84RwQ3vYGigdB8Q&oe=62E22D05"
                        alt=""
                      />
                    </div>
                    <p className="px-2 m-0">Đã tham gia tháng 7 2022</p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="ps-2 mb-2">
              <button className="flex border rounded-[10px] border-[#CCCCCC] items-center px-[23px] py-[8px] cursor-auto hover:shadow-md transition ease-linear duration-200">
                <img
                  className="w-[15px] object-cover"
                  src="https://scontent.xx.fbcdn.net/v/t1.15752-9/287291026_3128117690785848_6081349556072284930_n.png?stp=cp0_dst-png&_nc_cat=106&ccb=1-7&_nc_sid=aee45a&_nc_ohc=EL-petMT1QgAX8oDtW9&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AVIckk641yBQKZ1FfhgRP0AWMV460Fp47C2Jdx2X8UTArQ&oe=62E0F077"
                  alt=""
                />
                <p className="m-0 text-[18px] font-bold px-3">Sửa hồ sơ</p>
              </button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default BannerUser;
