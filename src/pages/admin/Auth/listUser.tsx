/* eslint-disable react-hooks/rules-of-hooks */
import { Modal, Space, Table, Tag } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { removeUser } from '../../../api/user';
import { AppDispatch } from '../../../app/store';
import { getUserList, removeUserSlide } from '../../../features/Slide/user/userSlide';

const ListUser = () => {

    const users =  useSelector<any, any>(data => data.user.value);
    const dispath = useDispatch<AppDispatch>();

    useEffect( () => {
      dispath(getUserList())
  }, []);

  const onRemoveUser = (id:any) => {
    Modal.confirm({
        title:"You want to delete this user ?",
        onOk:() => {
            dispath(removeUserSlide(id))
        }
        
    })
    
}
     // title 
     const headings = [
      {title: 'STT', dataIndex: 'stt', key:'stt'},
      {title: 'Username', dataIndex: 'username', key:'username'},
      {title: 'Email', dataIndex: 'email', key:'email'},
      {title: 'Phone', dataIndex: 'phone', key:'phone'},
      {title: 'Image', dataIndex: 'img', key:'img'},
      {title: "Gender", dataIndex: "sex", key: "sex", render: (_: any, { sex }: any) => (
            <>
                {sex == "0"
                    ? <Tag color="volcano">Male</Tag>
                    : sex == "1"
                        ? <Tag color="geekblue">Female</Tag>
                        : ""
                }
            </>
        ),
    },
      {title: 'Address', dataIndex: 'address', key:'address'},
      {
        title: "Role", dataIndex: "role", key: "role", render: (_: any, { role }: any) => (
            <>
                {role == "0"
                    ? <Tag color="volcano">User có quyền truy cập</Tag>
                    : role == "1"
                        ? <Tag color="green">Admin có quyền truy cập</Tag>
                        : role == "2"
                        ? <Tag color="green">Teacher có quyền truy cập</Tag>
                        : ""
                }
  
  
            </>),
    },
    {
      title: 'Action',
      key:'action',
      render: (recore:any) => (
        <Space size="middle">
            <NavLink to={'/admin/user/edit/'+recore.id}>Edit</NavLink>
            <button  onClick={() => onRemoveUser(recore.id)}>Delete </button>
        </Space>
      )
    }

  ]

  // data
  const dataSourd = users.map((item:any, index:any) => {
    return {
      key: index + 1,
      stt: index + 1,
      username: item.username,
      email: item.email,
      image:item.img,
      phone: item.phone ,
      address: item.address,
      role: item.role ,
      sex: item.sex ,
      id: item._id 
    }
  })
  return (
    
    <div>
      <h1>User Manager</h1>
        <button className='btnAdmin border px-4 py-1 bg-green-600 my-4 '><NavLink to="/admin/user/add" className="text-white">Add User</NavLink></button>
        
        <Table columns={headings} dataSource={dataSourd}></Table>
    </div>
  )
}

export default ListUser