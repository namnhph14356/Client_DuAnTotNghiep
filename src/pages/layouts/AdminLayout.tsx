import { Breadcrumb, Layout, Menu, Avatar, Badge, Dropdown, Space } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  UserOutlined,
  FolderFilled,
  TeamOutlined,
  BellOutlined,
  BankOutlined,
  ContactsOutlined,
  HighlightOutlined
} from "@ant-design/icons";
import "../../css/admin.css";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { UserType } from "../../types/user";
const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Content, Footer, Sider } = Layout;
  const auth = useSelector((item: RootState) => item.auth.value) as UserType;
  let location = useLocation();
  const [current, setCurrent] = useState(location.pathname)

  const notification = (
    <Menu
      items={[
        {
          key: '1',
          icon: <BellOutlined />,
          label: (
            <span>
              Profile
            </span>
          ),
        },
        {
          key: '2',
          label: (
            <span>
              Log out
            </span>
          ),
          icon: <BellOutlined />,
          danger: true,
        }
      ]}
    />
  );

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
        {/* <span onClick={onLogout}> */}
          Đăng xuất
        {/* </span> */}
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
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} >
        <div className="logo  bg-[#001529]">
          <NavLink aria-current="page" className="active text-[#fff] " to="/">
            <img
              src="https://res.cloudinary.com/chanh-thon/image/upload/v1667831318/upload_preset/LogoHeader-removebg-preview_q6pbxp.png"
              width={70}
              alt=""
            />
          </NavLink>
        </div>
        <Menu
          className="bg-[#001529]"
          theme="dark"
          mode="inline"
          onClick={handleClick}
          selectedKeys={[current]}
          style={{ background: "#001529", height: "100%", width: "100%" }}
        >
          <Menu.Item key="/admin/dashboard" icon={<BankOutlined />} ><NavLink to='/admin/dashboard'>Dashboard</NavLink></Menu.Item>
          <Menu.Item key="/admin/day" icon={<HighlightOutlined />}><NavLink to='/admin/day'>Quản lí ngày học</NavLink></Menu.Item>
          <Menu.Item key="/admin/contact" icon={<ContactsOutlined />}><NavLink to='/admin/contact'>Liên hệ</NavLink></Menu.Item>
          <Menu.Item key="/admin/user" icon={<UserOutlined />}><NavLink to='/admin/user'>Quản lí người dùng</NavLink></Menu.Item>
          <Menu.Item key="/admin/class" icon={<TeamOutlined />} ><NavLink to='/admin/class'>Quản lí lớp học</NavLink></Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" >
        <Header className="site-layout-background header__top__admin" style={{ padding: 0 }} >

          <div className="flex justify-end">
            <div className="px-4 my-auto">
              <Dropdown overlay={menu} trigger={["click"]}>
                <img
                  src={auth.img}
                  alt=""
                  className="rounded-full w-10 h-10 my-3 m-auto cursor-pointer"
                />
              </Dropdown>
            </div>
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