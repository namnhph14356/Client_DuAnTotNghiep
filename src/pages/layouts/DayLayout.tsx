import {
  Breadcrumb,
  Layout,
  Menu,
  Avatar,
  Badge,
  Dropdown,
  Space,
  Select,
  Button,
} from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  FolderFilled,
  BellOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import "../../css/admin.css";
import { Option } from "antd/lib/mentions";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { UserType } from "../../types/user";
import PopupChange from "../../components/AdminDayConponent/PopupChange";
const DayLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Content, Footer, Sider } = Layout;
  const auth = useSelector((item: RootState) => item.auth.value) as UserType;
  let location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const [isModal, setIsModal] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  function textOver(text: String, len: number) {
    if (text.length > len) return `${text.slice(0, len)}...`;
  }

  const handlonClick = () => {
    setIsModal((prevState) => !prevState);
  };

  const openModal = () => {
    setIsOpen(true);
  }
  const notification = (
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
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
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
          <SubMenu
            key="sub5"
            icon={<FolderFilled />}
            title={textOver("Luyện nghe nói phản xạ", 15)}
            className="title_antd_custom"
          >
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
                <NavLink to="/manageDay/vocabulary/listLesson">
                  Danh sách
                </NavLink>
              </Menu.Item>
              <Menu.Item key="sub6_1_2">
                <NavLink to="/manageDay/vocabulary/addLesson">
                  Thêm từ vựng
                </NavLink>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="sub6_2" title="Bài tập">
              <Menu.Item key="sub6_2_1">
                <NavLink to="/manageDay/vocabulary/listExercise">
                  Danh sách bài tập
                </NavLink>
              </Menu.Item>
              <Menu.Item key="sub6_2_2">
                <NavLink to="/manageDay/vocabulary/addExercise">
                  Thêm bài tập
                </NavLink>
              </Menu.Item>
            </SubMenu>
          </SubMenu>

          <SubMenu
            key="sub7"
            icon={<ReadOutlined />}
            title={textOver("Luyện cấu trúc và câu", 15)}
          >
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
                <NavLink to="/manageDay/conversation/listExercise">
                  Danh sách
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/sub8_1_2">
                <NavLink to="/manageDay/conversation/addExercise">
                  Thêm bài tập
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub8_2" title="Nghe và đọc">
              <Menu.Item key="/sub8_2_1">
                <NavLink to="/manageDay/conversation/listListenRead">
                  Danh sách
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/sub8_2_2">
                <NavLink to="/manageDay/conversation/addListenRead">
                  Thêm bài tập
                </NavLink>
              </Menu.Item>
            </SubMenu>
          </SubMenu>

          <SubMenu key="sub9" icon={<FolderFilled />} title="Luyện ngữ pháp ">
            <SubMenu key="sub9_1" title="Bài học">
              <Menu.Item key="sub9_1_1">
                <NavLink to="/manageDay/grammar/listLesson">Danh sách</NavLink>
              </Menu.Item>
              <Menu.Item key="sub9_1_2">
                <NavLink to="/manageDay/grammar/addLesson">
                  Thêm ngữ pháp
                </NavLink>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="sub9_2" title="Bài tập">
              <Menu.Item key="sub9_2_1">
                <NavLink to="/manageDay/grammar/listExercise">
                  Danh sách{" "}
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/sub8_2_2">
                <NavLink to="/manageDay/grammar/question/add">
                  Thêm bài tập
                </NavLink>
              </Menu.Item>
            </SubMenu>
          </SubMenu>
          <div className="text-center">
            <button
              className="p-4 bg-blue-500 rounded text-white hover:bg-white hover:text-blue-500 border-double border-4 border-indigo-600"
              onClick={() => handlonClick()}
            >
              Đổi ngày
            </button>

          </div>
         
          <div>
            {isModal && <PopupChange closeModal={setIsModal} />}
          </div>
          <div className="mt-8 mx-auto text-center">
            <NavLink
              to={"/admin/day"}
              className="p-1 bg-blue-500 rounded px-5 text-white hover:bg-white hover:text-blue-500 border-double border-4 border-indigo-600"
            >
              Back
            </NavLink>
          </div>
        </Menu>
      </Sider>

      <Layout className="site-layout w-[100%]">
        <Header
          className="site-layout-background header__top__admin"
          style={{ padding: 0 }}
        >
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
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center" }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DayLayout;
