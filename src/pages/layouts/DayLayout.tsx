import { Breadcrumb, Layout, Menu, Avatar, Badge, Dropdown, Space, Select } from "antd";
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
import { Option } from "antd/lib/mentions";

const DayLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Content, Footer, Sider } = Layout;
  let location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  const notification = (
    <Menu
      items={[
        {
          key: "1",
          icon: <BellOutlined />,
          label: <span>Profile</span>,
        },
        {
          key: "2",
          label: <span>Log Out</span>,
          icon: <BellOutlined />,
          danger: true,
        },
      ]}
    />
  );

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          icon: <BellOutlined />,
          label: <span>Profile</span>,
        },
        {
          key: "2",
          label: <span>Log Out</span>,
          icon: <BellOutlined />,
          danger: true,
        },
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
  }, [location, current]);

  return (
    <Layout className="h-full" style={{ width: "100%" }}>
      <Sider
        className="sider__bar__admin h-[100%]  "
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo flex justify-center py-2 bg-[#001529]">
          <NavLink
            aria-current="page"
            className="logo active text-[#fff]"
            to="/"
          >
            {" "}
            VianEnglish{" "}
          </NavLink>
        </div>
        <Menu
          className="menu__bar__admin"
          theme="dark"
          mode="inline"
          onClick={handleClick}
          selectedKeys={[current]}
        >
        
        <SubMenu key="sub5" icon={<FolderFilled />} title="Luyện nghe nói phản xạ">
            <SubMenu key="sub5_1" icon={<ReadOutlined />} title="Exercise">
              <Menu.Item key="/manageDay">
                <NavLink to="/manageDay">Danh sách bài tập</NavLink>
              </Menu.Item>
              <Menu.Item key="/manageDay">
                <NavLink to="/manageDay">Thêm bài tập</NavLink>
              </Menu.Item>
            </SubMenu>
          </SubMenu>



          <SubMenu key="sub6" icon={<FolderFilled />} title="Luyện từ vựng">
            <SubMenu key="sub6_1" icon={<ReadOutlined />} title="Lessons">
              <Menu.Item key="/manageDay/vocabulary">
                <NavLink to="/manageDay/vocabulary">Danh sách từ vựng</NavLink>
              </Menu.Item>
              <Menu.Item key="/manageDay/vocabulary/add">
                <NavLink to="/manageDay/vocabulary/add">Thêm từ vựng</NavLink>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="sub6_2" icon={<ReadOutlined />} title="Exercise">
              <Menu.Item key="/manageDay">
                <NavLink to="/manageDay">Danh sách bài tập</NavLink>
              </Menu.Item>
              <Menu.Item key="/manageDay">
                <NavLink to="/manageDay">Thêm bài tập</NavLink>
              </Menu.Item>
            </SubMenu>
          </SubMenu>


          <SubMenu
            key="sub7"
            icon={<ReadOutlined />}
            title="Luyện cấu trúc và câu"
          >
            <SubMenu key="sub7_1" icon={<ReadOutlined />} title="Lesson">
              <Menu.Item key="/manageDay/sentences">
                <NavLink to="/manageDay/sentences/listLesson">
                  Danh sách bài học
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/manageDay/sentences/addLesson">
                <NavLink to="/manageDay/sentences/addLesson">
                  Thêm bài học
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub7_2" icon={<ReadOutlined />} title="Exercise">
              <Menu.Item key="/manageDay/sentences">
                <NavLink to="/manageDay/sentences/listExercise">
                  Danh sách bài tập
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/manageDay/sentences/addExercise">
                <NavLink to="/manageDay/sentences/addExercise">
                  Thêm bài tập
                </NavLink>
              </Menu.Item>
            </SubMenu>
          </SubMenu>


          <SubMenu key="sub8" icon={<FolderFilled />} title="Luyện hội thoại">
            <SubMenu key="sub8_1" icon={<ReadOutlined />} title="Exercise">
              <Menu.Item key="/manageDay">
                <NavLink to="/manageDay">Danh sách bài tập</NavLink>
              </Menu.Item>
              <Menu.Item key="/manageDay">
                <NavLink to="/manageDay">Thêm bài tập</NavLink>
              </Menu.Item>
            </SubMenu>
          </SubMenu>


          <SubMenu key="sub9" icon={<FolderFilled />} title="Luyện ngữ pháp ">
            <SubMenu key="sub9_1" icon={<ReadOutlined />} title="Lessons">
              <Menu.Item key="/manageDay/grammar">
                <NavLink to="/manageDay/grammar">Danh sách ngữ pháp</NavLink>
              </Menu.Item>
              <Menu.Item key="/manageDay/grammar/add">
                <NavLink to="/manageDay/grammar/add">Thêm ngữ pháp</NavLink>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="sub9_2" icon={<ReadOutlined />} title="Exercise">
              <Menu.Item key="/manageDay">
                <NavLink to="/manageDay">Danh sách bài tập</NavLink>
              </Menu.Item>
              <Menu.Item key="/manageDay">
                <NavLink to="/manageDay">Thêm bài tập</NavLink>
              </Menu.Item>
            </SubMenu>
          </SubMenu>


        </Menu>
      </Sider>



      <Layout className="site-layout w-[100%]">
        <Header
          className="site-layout-background header__top__admin"
          style={{ padding: 0 }}
        >
          <div className="flex justify-end">
            <div className="px-4">
              <Dropdown
                overlay={notification}
                trigger={["click"]}
                placement="bottomRight"
              >
                <Badge dot>
                  <BellOutlined style={{ fontSize: 24, color: "white" }} />
                </Badge>
              </Dropdown>
            </div>
            <div className="px-4">
              <Dropdown overlay={menu} trigger={["click"]}>
                <Avatar size="large" icon={<UserOutlined />} />
              </Dropdown>
            </div>
          </div>
        </Header>

        <Content className=" main__content__admin  p-8">
          <NavLink to={"/admin/day"} className="p-1 bg-blue-500 rounded px-6 text-white hover:bg-white hover:text-blue-500 border-double border-4 border-indigo-600">Back</NavLink>
          <Outlet />
        </Content>
      </Layout>


      <Layout className="w-[100px]">
          <div >
              <Select value={"Tháng 1"}>
                 <Option value="">

                 </Option>
              </Select>
          </div>
      </Layout>

    </Layout>
  );
};

export default DayLayout;
