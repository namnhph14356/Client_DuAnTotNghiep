/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Modal, Space, Table, Tag ,Image} from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { removeUser } from '../../../api/user';
import { AppDispatch } from '../../../app/store';
import { getUserList, removeUserSlide } from '../../../features/Slide/user/userSlide';
import AdminPageHeader from '../../../components/AdminPageHeader';
import breadcrumb from 'antd/lib/breadcrumb';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
const ListUser = () => {
  // const breadcrumb = useAppSelector(data => data.user.breadcrumb)

  const users = useSelector<any, any>(data => data.user.value);
  const dispath = useDispatch<AppDispatch>();

  useEffect(() => {
    dispath(getUserList("Quản Lý User"))
    
  }, []);

  const onRemoveUser = (id: any) => {
    Modal.confirm({
      title: "You want to delete this user ?",
      onOk: () => {
        dispath(removeUserSlide(id))
      }

    })

  }
  // title 
  const headings = [
    { title: 'STT', dataIndex: 'stt', key: 'stt' },
    { title: 'Họ Tên', dataIndex: 'username', key: 'username' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    { title: 'Ảnh', 
    render: (record) => (
      <div className="">
          <Image
              width={80}
              height={80}
              src={record.img}
          />
      </div>
  )
     , key: 'img' },

    {
      title: "Giới tính", dataIndex: "sex", key: "sex", render: (_: any, { sex }: any) => (
        <>
          {sex == "male"
            ? <Tag color="volcano">Male</Tag>
            : sex == "female"
              ? <Tag color="geekblue">Female</Tag>
              : ""
          }
        </>
      ),
    },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
    {
      title: "Quyền", dataIndex: "role", key: "role", render: (_: any, { role }: any) => (
        <>
          {role == "user"
            ? <Tag color="volcano">User có quyền truy cập</Tag>
            : role == "admin"
              ? <Tag color="green">Admin có quyền truy cập</Tag>
              : role == "teacher"
                ? <Tag color="green">Teacher có quyền truy cập</Tag>
                : ""
          }


        </>),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (recore: any) => (
        <Space size="middle">
          <NavLink type="primary" to={'/admin/user/edit/' + recore.id}><Button type="primary" >Edit</Button></NavLink>
          <Button type="primary" danger onClick={() => onRemoveUser(recore.id)}>Delete </Button>
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
  return (

    <div>
      <h1>Quản Lý User</h1>
      {/* <AdminPageHeader breadcrumb={breadcrumb} /> */}
      <Table columns={headings} dataSource={dataSourd} bordered ></Table>
    </div>
  )
//   changeBreadcrumb(state, action) {
//     state.breadcrumb = action.payload
//   }s
//   export const { changeBreadcrumb } = user.actions
// }
  }
export default ListUser