
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BankOutlined
} from '@ant-design/icons';
import { Dropdown, Layout, Menu, message, Modal } from 'antd';
import React, { useState } from 'react';
import '../../css/adminTeacher.css'
import { Typography } from 'antd';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { UserType } from '../../types/user';
import { logout } from '../../features/Slide/auth/authSlide';

const { Header, Sider, Content } = Layout;

const LayoutTeacher = () => {
  const [collapsed, setCollapsed] = useState(false);
  const auth = useSelector((item: RootState) => item.auth.value) as UserType;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataMenu = [
    {
      key: '0',
      icon: <BankOutlined />,
      label: 'Dashboard',
      path: 'dashboard'
    },
    {
      key: '10',
      icon: <BankOutlined />,
      label: 'Quản lý lớp học',
      path: 'class'
    },
  ]

  const items2 = dataMenu.map((data: any) => {
    return {
      key: `${data.key}`,
      icon: data.icon,
      label: <Link to={data.path}>{data.label}</Link>
    };
  });

  const onLogout = () => {
    Modal.confirm({
      title: "Bạn có chắc muốn đăng xuất không ?",
      onOk: () => {
        dispatch(logout(auth))
        message.success("Đăng xuất thành công")
        navigate('/')
      }
    })
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/user" className='text-white my-auto'>
          Hồ sơ của bạn
        </Link>
      </Menu.Item>
      {
        auth && auth.role === "2" &&
        <Menu.Item>
          <Link to="/admin" className='text-white my-auto'>
            Admin
          </Link>
        </Menu.Item>
      }
      {
        auth && auth.role === "1" &&
        <Menu.Item>
          <Link to="/manageteacher" className='text-white my-auto'>
            Danh sách lớp học
          </Link>
        </Menu.Item>
      }
      <Menu.Item danger={true}>
        <span onClick={onLogout}>
          Đăng xuất
        </span>
      </Menu.Item>

    </Menu>
  );

  return (
    <div>
      <Layout style={{ overflow: 'hidden' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo my-2 text-black">
            {collapsed ?
              <NavLink to="/">
                <img src="https://res.cloudinary.com/chanh-thon/image/upload/v1669194120/Layer_2_xzvkpt.png" width={30} className="mx-auto" alt="" />
              </NavLink>
              :
              <NavLink aria-current="page" className={`text-lg text-center active flex px-4 font-semibold text-black space-x-2`} to="/">
                <span className="my-auto"><img src="https://res.cloudinary.com/chanh-thon/image/upload/v1669194120/Layer_2_xzvkpt.png" width={20} alt="" /></span>
                <span className="text-black">Vian English</span>
              </NavLink>
            }
          </div>
          <Menu
            style={{ backgroundColor: 'white', height: "unset" }}
            mode="inline"
            defaultSelectedKeys={['0']}
            items={items2}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background " style={{ padding: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            <div className="px-4 my-auto">
              <Dropdown overlay={menu} trigger={["click"]}>
                <img
                  src={auth.img}
                  width={"30"}
                  alt=""
                  className="rounded-full cursor-pointer"
                />
              </Dropdown>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>

    </div>
  )
}

export default LayoutTeacher
