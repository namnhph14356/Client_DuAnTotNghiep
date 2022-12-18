import { Breadcrumb, Layout, Menu, Avatar, Badge, Dropdown, Space, Modal, message } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  FolderFilled,
  TeamOutlined,
  BellOutlined,
  BankOutlined,
  ContactsOutlined,
  HighlightOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";
import "../../css/admin.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { UserType } from "../../types/user";
import { logout } from "../../features/Slide/auth/authSlide";
const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Content, Footer, Sider } = Layout;
  const auth = useSelector((item: RootState) => item.auth.value) as UserType;
  let location = useLocation();
  const [current, setCurrent] = useState(location.pathname)
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <Menu.Item danger={true}>
        <span onClick={onLogout}>
          Đăng xuất
        </span>
      </Menu.Item>

    </Menu>
  );
  function handleClick(e: any) {
    setCurrent(e.key);
  }
  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current])
  return (
    <Layout style={{ width: "100%" }}>
      <Sider collapsed={collapsed} onCollapse={value => setCollapsed(value)} >
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
          className="bg-[#fff]"
          theme="light"
          mode="inline"
          onClick={handleClick}
          selectedKeys={[current]}
          style={{ background: "#fff", height: "100%", width: "100%", color: 'black' }}
        >
          <Menu.Item key="/admin/dashboard" icon={<BankOutlined />} ><NavLink to='/admin/dashboard'>Dashboard</NavLink></Menu.Item>
          <Menu.Item key="/admin/day" icon={<HighlightOutlined />}><NavLink to='/admin/day'>Quản lý ngày học</NavLink></Menu.Item>
          <Menu.Item key="/admin/contact" icon={<ContactsOutlined />}><NavLink to='/admin/contact'>Liên hệ</NavLink></Menu.Item>
          <Menu.Item key="/admin/user" icon={<UserOutlined />}><NavLink to='/admin/user'>Quản lý người dùng</NavLink></Menu.Item>
          <Menu.Item key="/admin/class" icon={<TeamOutlined />} ><NavLink to='/admin/class'>Quản lý lớp học</NavLink></Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" >
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

        <Content className=" main__content__admin" style={{
          margin: '24px 16px',
          padding: 24,
        }}>
          <Outlet />
        </Content>
      </Layout>


    </Layout>
  )
}
export default AdminLayout