import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClassByIdSlide } from "../../../features/Slide/class/classSlice";
import { Button, Space, Table, Tag, Typography } from "antd";
import moment from "moment";
import AdminPageHeader from "../../../components/AdminPageHeader";

const DetailClassAdmin = (props) => {
  const { id } = useParams();

  const { class: classDeatail } = useSelector((state: any) => state.class);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClassByIdSlide(id));
  }, []);
  console.log("classDeatail", classDeatail);

  const onRemoveUser = (id: string) => {

  }

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (row, item, index) => `${index + 1}`,
    },
    {
      title: "Họ tên",
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
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (row, item) => `${item?.userId?.phone}`,
    },
    {
      title: "Vai trò", dataIndex: "role", key: "role", render: (row, item) => (
        <>
          {item?.userId?.role == "0"
            ? <Tag color="blue">Học sinh</Tag>
            : item?.userId?.role == "1"
              ? <Tag color="purple">Giảng viên</Tag>
              : item?.userId?.role == "2"
                ? <Tag color="green">Admin</Tag>
                : ""
          }
        </>),
    },
    {
      title: "Ngày vào lớp",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (row, item) =>
        `${moment(item?.timeJoinClass).format("DD/MM/YYYY")}`,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (recore: any) => (
        <Space size="middle">
          <Button type="primary" danger onClick={() => onRemoveUser(recore.id)}>Xóa</Button>
        </Space>
      )
    }
  ];

  return (
    <div className="p-2 h-screen">
      <AdminPageHeader breadcrumb={"Chi tiết lớp học"} class1={{ title: "Quản lí lớp học", route: "class" }} />

      <div className="d-flex align-items-center justify-between">
        <Typography.Title className="m-0 py-4" level={4}>
          Tên lớp học: {classDeatail?.nameClass}
        </Typography.Title>
        <Typography.Title className="m-0 py-4" level={4}>
          Mã lớp: {classDeatail?.linkJoinClass}
        </Typography.Title>
      </div>
      
      <div className="py-2 ">
        <Button type="primary"  >
          Thêm mới giảng viên
        </Button>
      </div>
      <Table bordered dataSource={classDeatail?.teacherOfClass} columns={columns} />

      <div className="py-2 ">
        <Button type="primary"  >
          Thêm mới học sinh
        </Button>
      </div>
      <Table bordered dataSource={classDeatail?.userOfClass} columns={columns} />
    </div>
  );
};

DetailClassAdmin.propTypes = {};

export default DetailClassAdmin;
