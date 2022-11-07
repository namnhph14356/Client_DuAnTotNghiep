import { Breadcrumb, Layout, Menu, Avatar, Badge, Dropdown, Space, Select, Button } from "antd";
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
          label: <span>Hồ sơ của bạn</span>,
        },
        {
          key: "2",
          label: <span>Đăng xuất</span>,
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
    <Layout style={{ width: "100%" }}>
      <Sider
        className=""
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
          className="bg-[#001529]"
          theme="dark"
          mode="inline"
          onClick={handleClick}
          selectedKeys={[current]}
          style={{ background: "#001529", height:"100%" }}
        >

          <SubMenu key="sub5" icon={<FolderFilled />} title="Luyện nghe nói phản xạ">
            <SubMenu key="sub5_1" title="Khởi động">
              <Menu.Item key="/sub5_1_1">
                <NavLink to="/manageDay/listenspeak">Danh sách</NavLink>
              </Menu.Item>
              {/* <Menu.Item key="/manageDay">
                <NavLink to="/manageDay">Thêm bài tập</NavLink>
              </Menu.Item> */}
            </SubMenu>
          </SubMenu>

          <SubMenu key="sub6" icon={<FolderFilled />} title="Luyện từ vựng">
            <SubMenu key="sub6_1" title="Bài học">
              <Menu.Item key="sub6_1_1">
                <NavLink to="/manageDay/vocabulary/listLesson">Danh sách từ vựng</NavLink>
              </Menu.Item>
              <Menu.Item key="sub6_1_2">
                <NavLink to="/manageDay/vocabulary/addLesson">Thêm từ vựng</NavLink>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="sub6_2" title="Bài tập">
              <Menu.Item key="sub6_2_1">
                <NavLink to="/manageDay/vocabulary/listExercise">Danh sách bài tập</NavLink>
              </Menu.Item>
              <Menu.Item key="sub6_2_2">
                <NavLink to="/manageDay/vocabulary/addExercise">Thêm bài tập</NavLink>
              </Menu.Item>
            </SubMenu>
          </SubMenu>


          <SubMenu key="sub7" icon={<ReadOutlined />} title="Luyện cấu trúc và câu">
            <SubMenu key="sub7_1" title="Bài học">
              <Menu.Item key="sub7_1_1">
                <NavLink to="/manageDay/sentences/listLesson">
                  Danh sách
                </NavLink>
              </Menu.Item>
              <Menu.Item key="sub7_1_2">
                <NavLink to="/manageDay/sentences/addLesson">
                  Thêm bài học
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub7_2" title="Bài tập">
              <Menu.Item key="sub7_2_1">
                <NavLink to="/manageDay/sentences/listExercise">
                  Danh sách
                </NavLink>
              </Menu.Item>
              <Menu.Item key="sub7_2_2">
                <NavLink to="/manageDay/sentences/addExercise">
                  Thêm bài tập
                </NavLink>
              </Menu.Item>
            </SubMenu>
          </SubMenu>


          <SubMenu key="sub8" icon={<FolderFilled />} title="Luyện hội thoại">
            <SubMenu key="sub8_1" title="Bài tập">
              <Menu.Item key="/sub8_1_1">
                <NavLink to="/manageDay/listenWrite/listExercise">Danh sách</NavLink>
              </Menu.Item>
              <Menu.Item key="/sub8_1_2">
                <NavLink to="/manageDay/listenWrite/addExercise">Thêm bài tập</NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub8_2" title="Nghe và đọc">
              <Menu.Item key="/sub8_2_1">
                <NavLink to="/manageDay/listenWrite/listListenRead">Danh sách</NavLink>
              </Menu.Item>
              <Menu.Item key="/sub8_2_2">
                <NavLink to="/manageDay/listenWrite/addListenRead">Thêm bài tập</NavLink>
              </Menu.Item>
            </SubMenu>
          </SubMenu>


          <SubMenu key="sub9" icon={<FolderFilled />} title="Luyện ngữ pháp ">
            <SubMenu key="sub9_1"  title="Bài học">
              <Menu.Item key="sub9_1_1">
                <NavLink to="/manageDay/grammar/listLesson">Danh sách</NavLink>
              </Menu.Item>
              <Menu.Item key="sub9_1_2">
                <NavLink to="/manageDay/grammar/addLesson">Thêm ngữ pháp</NavLink>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="sub9_2" title="Bài tập">
              <Menu.Item key="sub9_2_1">
                <NavLink to="/manageDay/grammar/listExercise">Danh sách </NavLink>
              </Menu.Item>
              <Menu.Item key="sub9_2_2">
                <NavLink to="/manageDay/grammar/addExercise">Thêm bài tập</NavLink>
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

        <Content className=" main__content__admin  px-20 py-4">
          <NavLink to={"/admin/day"} className="p-1 bg-blue-500 rounded px-6 text-white hover:bg-white hover:text-blue-500 border-double border-4 border-indigo-600">Back</NavLink>
          <Outlet />
        </Content>
      </Layout>


      {/* <Layout className="w-[100%]"> */}
      <div className="w-[10%] mt-[5%]">
        <label htmlFor="" className="text-xl font-bold">Tháng</label>
        <div className="mt-2 mb-4">
          <Select value={"Tuần 1"} className="w-full h-[30px]">
            <Option value="">Tuần 2</Option>
            <Option value="">Tuần 3</Option>
            <Option value="">Tuần 4</Option>
          </Select>
        </div>

        <label htmlFor="" className="text-xl font-bold">Tuần</label>
        <div className="mt-2">
          <Select value={"Ngày 1"} className="w-full h-[40px]">
            <Option value="">Ngày 2</Option>
            <Option value="">Ngày 3</Option>
            <Option value="">Ngày 4</Option>
            <Option value="">Ngày 5</Option>
            <Option value="">Ngày 6</Option>
          </Select>
        </div>

        <button className="text-blue-600 border-double border-4 border-indigo-600 w-full text-xl font-bold mt-16 hover:text-white hover:bg-blue-600 hover:border-white">Thêm</button>
      </div>
      {/* </Layout> */}

    </Layout>
  );
};

export default DayLayout;
