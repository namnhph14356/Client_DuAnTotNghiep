import { Breadcrumb, Layout, Menu, Avatar, Badge, Dropdown, Space } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  UserOutlined,
  CommentOutlined,
  DollarOutlined,
  LaptopOutlined,
  FolderFilled,
  BellOutlined,
  ReadOutlined,
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
    <Menu
      items={[
        {
          key: '1',
          icon: <BellOutlined />,
          label: (
            <span>
              Hồ sơ của bạn
            </span>
          ),
        },
        {
          key: '2',
          label: (
            <span>
              Đăng xuất
            </span>
          ),
          icon: <BellOutlined />,
          danger: true,


        }
      ]}
    />
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
      <Sider  collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} >
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
          <SubMenu key="sub11" icon={<FolderFilled />} title="Quản lí ngày học">
            <Menu.Item key="/admin/day"><NavLink to='/admin/day'>Danh sách ngày</NavLink></Menu.Item>
          </SubMenu>

          <SubMenu key="sub1" icon={<FolderFilled />} title="Categories">
            <Menu.Item key="/admin/category"><NavLink to='/admin/category'>List Categories</NavLink></Menu.Item>
            <Menu.Item key="/admin/category/add"><NavLink to='/admin/category/add'>Add Category</NavLink></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<ReadOutlined />} title="Quiz">
            <Menu.Item key="/admin/quiz"><NavLink to='/admin/quiz'>List Quiz</NavLink></Menu.Item>
            <Menu.Item key="/admin/quiz/add"><NavLink to='/admin/quiz/add'>Add Quiz</NavLink></Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<ReadOutlined />} title="AnswerQuiz">
            <Menu.Item key="/admin/answerQuiz"><NavLink to='/admin/answerQuiz'>List Answer Quiz</NavLink></Menu.Item>
            <Menu.Item key="/admin/answerQuiz/add"><NavLink to='/admin/answerQuiz/add'>Add Answer Quiz</NavLink></Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<ReadOutlined />} title="UserQuiz">
            <Menu.Item key="/admin/userQuiz"><NavLink to='/admin/userQuiz'>List User Quiz</NavLink></Menu.Item>
            <Menu.Item key="/admin/userQuiz/add"><NavLink to='/admin/userQuiz/add'>Add User Quiz</NavLink></Menu.Item>
          </SubMenu>

          <SubMenu key="sub6" icon={<FolderFilled />} title="Liên hệ">
            <Menu.Item key="/admin/contact"><NavLink to='/admin/contact'>Danh sách</NavLink></Menu.Item>
          </SubMenu>

        </Menu>
      </Sider>

      <Layout className="site-layout" >
        <Header className="site-layout-background header__top__admin" style={{ padding: 0 }} >

          <div className="flex justify-end">
            <div className="px-4 ">
              <Dropdown
                overlay={notification}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Badge dot>
                  <BellOutlined
                    style={{ fontSize: 24, color: "white" }}
                    className="cursor-pointer"
                  />
                </Badge>
              </Dropdown>
            </div>
            <div className="px-4 my-auto">
              <Dropdown overlay={menu} trigger={["click"]}>
                <img
                  src={auth.img}
                  width={"40"}
                  alt=""
                  className="rounded-full cursor-pointer"
                />
              </Dropdown>
            </div>
          </div>

        </Header>

        <Content className=" main__content__admin  p-8" >
          <Outlet />
        </Content>
      </Layout>


    </Layout>
  )
}

export default AdminLayout
