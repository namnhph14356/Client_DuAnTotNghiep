import { Col, Row, Typography } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import './style.css'
type Props = {};

const BannerUser = (props: Props) => {
  const isAuthenticate = () => {
    if (!localStorage.getItem('user')) return;
    return JSON.parse(localStorage.getItem('user') as string);
  }
  const data = isAuthenticate()
  console.log(data);
  
  return (
    <div>
      <div className="mt-[65px] pb-2">
        <div className="box__banner__user">
          <Row className="items-center">
            <Col xs={24} sm={24} md={18} lg={18} xl={18}>
              <Row className="items-center">
                <Col className="info-image">
                  <img
                    className="rounded-full w-[154px] h-[154px]"
                    src={data.image}
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
                  <Typography.Title level={3} className="font-bold text-[32px]">{data.user.username}</Typography.Title>
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
                <NavLink to={`/user/edit/${data.user._id}`} className="m-0 text-[18px] font-bold px-3">Sửa hồ sơ</NavLink>
              </button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default BannerUser;
