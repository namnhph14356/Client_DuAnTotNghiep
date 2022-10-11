
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BankOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import '../../css/adminTeacher.css'
import { Typography } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const LayoutTeacher = () => {
  const [collapsed, setCollapsed] = useState(false);

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
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Quản lý bài giảng',
      path: 'learn'
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: 'Quản lý từ vựng',
      path: 'vocabulary'
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'Đàm thoại',
      path: 'telephone'
    },
    {
      key: '4',
      icon: <UploadOutlined />,
      label: 'Quản lý quiz',
      path: 'quiz'
    },
  ]

  const items2 = dataMenu.map((data: any) => {
    return {
      key: `${data.key}`,
      icon: data.icon,
      label: <Link to={data.path}>{data.label}</Link>
    };
  });
  return (
    <div>
      <Layout style={{  overflow: 'hidden' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" >
            <Typography.Title level={4} className='m-0 text-center'>
              VOGUE
            </Typography.Title>
            <Typography.Title level={5} className='m-0 text-center'>
              MAIN MENU
            </Typography.Title>
          </div>
          <Menu
            style={{ backgroundColor: 'white' }}
            mode="inline"
            defaultSelectedKeys={['0']}
            items={items2}
          />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            <div style={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <img src="./../image/notification.png" />
              <img style={{ margin: 10 }} src="./../image/mail.png" />
              <img src="./../image/user-teacher.png" />
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              height: '80vh',
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
