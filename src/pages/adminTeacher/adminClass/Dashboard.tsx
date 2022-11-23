import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Row, Typography } from "antd";

import { UserOutlined, CalendarFilled } from '@ant-design/icons';
import "./dashboard.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { UserType } from "../../../types/user";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { currentUserSlice } from "../../../features/Slide/auth/authSlide";
import { async } from "@firebase/util";
import { ClassType } from "../../../types/Class";
import moment from "moment";
import { NavLink } from "react-router-dom";
const { Meta } = Card;
const Dashboard = (props) => {
  const { listClass } = useAppSelector((state: any) => state.class);
  const auth = useAppSelector(((item: RootState) => item.auth.value)) as UserType
  const [teacherClass, setTeacherClass] = useState<ClassType[]>([]);
  const dispatch = useAppDispatch();

  const getClassList = () => {
    let myClass: any = []
    listClass?.map(async (e: any) => {
      e.teacherOfClass?.map((item) => {
        if (item.userId === auth._id) {
          // return e
          myClass.push(e)
        }
      })
    })
    setTeacherClass(myClass)
  }

  useEffect(() => {
    getClassList()
    dispatch(currentUserSlice())
  }, [])

  return (
    <div className="h-screen">
      <div>
        <p className="text-2xl font-semibold">Lớp học của tôi ({teacherClass.length})</p>
      </div>
      <Row>
        {teacherClass?.map((item: ClassType) => (
          <Col xs={8} sm={8} md={8} lg={8} xl={8} className="p-2">
            <NavLink to={`/manageteacher/class/detail/${item._id}`}>
              <Card hoverable style={{ width: "100%" }}>
                <Typography.Title className="" level={4}>
                  {item.linkJoinClass?.toUpperCase()}
                </Typography.Title>

                <Typography.Text className="mt-2" >
                  <div className="flex justify-between">
                    <span className="flex space-x-1"><UserOutlined className="my-auto" style={{ color: "blue" }} /><span>{item.userOfClass.length} học sinh</span></span>
                    <span className="flex space-x-1"><CalendarFilled className="my-auto" style={{ color: "orange" }} /> <span>{moment(item.createdAt).format("Do/MM/YYYY")}</span></span>
                  </div>
                </Typography.Text>
                <div className="mt-2">
                  <span className="py-1 px-3 bg-blue-200 rounded text-blue-600 font-medium">{item.nameClass}</span>
                </div>
                <div className="mt-4">
                  <div className="text-gray-600">
                    Teacher
                  </div>
                  <div className="text-lg font-semibold">
                    {auth.username}
                  </div>
                </div>
              </Card>
            </NavLink>
          </Col>
        ))}
      </Row>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
