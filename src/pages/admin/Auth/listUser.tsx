/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Modal, Space, Table, Tag, Image, Row, Col, Card, Typography } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { removeUser } from '../../../api/user';
import { AppDispatch } from '../../../app/store';
import { changeBreadcrumb, getUserList, removeUserSlide } from '../../../features/Slide/user/userSlide';
import AdminPageHeader from '../../../components/AdminPageHeader';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
const ListUser = () => {
  const breadcrumb = useAppSelector(data => data.user.breadcrumb)

  const users = useSelector<any, any>(data => data.user.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeBreadcrumb("Danh sách người dùng"))
    dispatch(getUserList("Quản Lý User"))

  }, []);

  const onRemoveUser = (id: any) => {
    Modal.confirm({
      title: "You want to delete this user ?",
      onOk: () => {
        dispatch(removeUserSlide(id))
      }

    })

  }
  // title 
  const headings = [
    { title: 'STT', dataIndex: 'stt', key: 'stt' },
    { title: 'Họ Tên', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    {
      title: 'Ảnh', key: 'img',
      render: (record) => (
        <div className="">
          <Image
            width={80}
            height={80}
            src={record.img}
          />
        </div>
      )
    },
    {
      title: "Giới tính", dataIndex: "sex", key: "sex", render: (_: any, { sex }: any) => (
        <>
          {sex == 1
            ? <Tag color="volcano">Nữ</Tag>
            : <Tag color="geekblue">Nam</Tag>
          }
        </>
      ),
    },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
    {
      title: "Vai trò", dataIndex: "role", key: "role", render: (_: any, { role }: any) => (
        <>
          {role == "0"
            ? <Tag color="blue">Học sinh</Tag>
            : role == "1"
              ? <Tag color="purple">Giảng viên</Tag>
              : role == "2"
                ? <Tag color="green">Admin</Tag>
                : ""
          }
        </>),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (recore: any) => (
        <Space size="middle">
          <NavLink type="primary" to={'/admin/user/edit/' + recore.id}><Button type="primary" style={{ background: "#198754" }}  >Sửa</Button></NavLink>
          <Button type="primary" danger onClick={() => onRemoveUser(recore.id)}>Xóa</Button>
        </Space>
      )
    }

  ]

  // data
  const dataSourd = users.map((item: any, index: any) => {
    return {
      key: index + 1,
      stt: index + 1,
      username: item.username,
      email: item.email,
      img: item.img,
      phone: item.phone,
      address: item.address,
      role: item.role,
      sex: item.sex,
      id: item._id
    }
  })

  let totalStudent;
  let totalTeacher;
  let totalAdmin;

  if (users && users.length > 0) {
    totalStudent = users.filter((item) => item.role === "0");
    totalTeacher = users.filter((item) => item.role === "1");
    totalAdmin = users.filter((item) => item.role === "2");
  }


  return (
    <div>
      <AdminPageHeader breadcrumb={breadcrumb} />
      <Row>
        <Col xs={8} sm={8} md={8} lg={8} xl={8} className="pr-2 py-2">
          <Card hoverable style={{ width: "100%" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-lightning icon-dashboard"
              viewBox="0 0 20 20"
            >
              <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5zM6.374 1 4.168 8.5H7.5a.5.5 0 0 1 .478.647L6.78 13.04 11.478 7H8a.5.5 0 0 1-.474-.658L9.306 1H6.374z" />
            </svg>
            <Typography.Title className="mt-2" level={5}>
              HỌC SINH
            </Typography.Title>
            <Typography.Title level={2} className="m-0 ">
              {totalStudent?.length}
            </Typography.Title>
          </Card>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8} className="p-2">
          <Card hoverable style={{ width: "100%" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-people icon-dashboard"
              viewBox="0 -5 10 24"
            >
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
            <Typography.Title className="mt-2" level={5}>
              GIẢNG VIÊN
            </Typography.Title>
            <Typography.Title level={2} className="m-0 ">
              {totalTeacher.length}
            </Typography.Title>
          </Card>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8} className="pl-2 py-2">
          <Card hoverable style={{ width: "100%" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-people icon-dashboard"
              viewBox="0 -5 10 24"
            >
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
            <Typography.Title className="mt-2" level={5}>
              ADMIN
            </Typography.Title>
            <Typography.Title level={2} className="m-0 ">
              {totalAdmin.length}
            </Typography.Title>
          </Card>
        </Col>
      </Row>
      <Table columns={headings} dataSource={dataSourd} bordered ></Table>
    </div>
  )
}
export default ListUser