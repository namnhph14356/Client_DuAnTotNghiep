import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClassByIdSlide } from "../../../features/Slide/class/classSlice";
import { Table, Typography } from "antd";
import moment from "moment";

const DetailClass = (props) => {
  const { id } = useParams();

  const { class: classDeatail } = useSelector((state: any) => state.class);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClassByIdSlide(id));
  }, []);
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (row, item, index) => `${index + 1}`,
    },
    {
      title: "Tên học sinh",
      dataIndex: "Name Student",
      key: "Name Student",
      render: (row, item) => (
        <Link
          to={`/manageteacher/class/history/${item?.userId?._id}`}
        >{`${item?.userId?.username}`}</Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      render: (row, item) => `${item?.userId?.email}`,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (row, item) => `${item?.userId?.address}`,
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (row, item) => `${item?.userId?.phone}`,
    },
    {
      title: "Ngày vào lớp",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (row, item) =>
        `${moment(item?.timeJoinClass).format("DD/MM/YYYY")}`,
    },
  ];
  return (
    <div className="h-screen">
      <div className=" align-items-center justify-between">
        <Typography.Title className="m-0 pb-4" level={3}>
          Chi tiết lớp học
        </Typography.Title>
        <div className="flex justify-between mb-2">
          <div className="font-medium text-base"> Tên lớp: {classDeatail?.nameClass}</div>
          <div className="font-medium text-base">Mã lớp: {classDeatail?.linkJoinClass}</div>
        </div>
        <div>Link học trực tuyến: <span><a href={classDeatail?.linkGoogleMeet} target="_blank" rel="noreferrer">{classDeatail?.linkGoogleMeet}</a></span> </div>
      </div>
      <Table bordered dataSource={classDeatail?.userOfClass} columns={columns} />
    </div>
  );
};

DetailClass.propTypes = {};

export default DetailClass;
