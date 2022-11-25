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
  Modal,
  message,
  Tooltip,
} from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FolderFilled,
  BellOutlined,
  ReadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CustomerServiceOutlined,
  FireOutlined,
  AudioOutlined,
  EditOutlined,
  FormOutlined,
  FontSizeOutlined,
  RollbackOutlined
} from "@ant-design/icons";
import "../../css/admin.css";
import { Option } from "antd/lib/mentions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { UserType } from "../../types/user";
import PopupChange from "../../components/AdminDayConponent/PopupChange";
import AdminPageHeader from "../../components/AdminPageHeader";
import { logout } from "../../features/Slide/auth/authSlide";

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


const DayLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { Header, Content, Footer, Sider } = Layout;
  const auth = useSelector((item: RootState) => item.auth.value) as UserType;
  let location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const [isModal, setIsModal] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dayId } = useParams();
  function textOver(text: String, len: number) {
    if (text.length > len) return `${text.slice(0, len)}...`;
  }

  const handlonClick = () => {
    setIsModal((prevState) => !prevState);
  };

  const openModal = () => {
    setIsOpen(true);
  }


  function handleClick(e: any) {
    setCurrent(e.key);
  }

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current, dayId]);



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

  return (
    <Layout style={{ width: "100%" }}>
      <Sider
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
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
          theme="light"
          mode="inline"
          onClick={handleClick}
          selectedKeys={[current]}
          style={{ height: "100%", width: "100%", color: 'black' }}
        >
          <SubMenu
            key="sub5"
            icon={<CustomerServiceOutlined />}
            title={textOver("Luyện nghe nói phản xạ", 15)}
            className="title_antd_custom"
          >
            <SubMenu key="sub5_1" title="Khởi động">
              <Menu.Item key={`/manageDay/${dayId}/listenspeak`}>
                <NavLink to={`/manageDay/${dayId}/listenspeak`}>Danh sách</NavLink>
              </Menu.Item>
            </SubMenu>
          </SubMenu>

          <SubMenu key="sub6" icon={<FontSizeOutlined />} title="Luyện từ vựng">
            <SubMenu key="sub6_1" title="Bài học">
              <Menu.Item key={`/manageDay/${dayId}/vocabulary/listLesson`}>
                <NavLink to={`/manageDay/${dayId}/vocabulary/listLesson`}>
                  Danh sách
                </NavLink>
              </Menu.Item>
              <Menu.Item key={`/manageDay/${dayId}/vocabulary/addLesson`}>
                <NavLink to={`/manageDay/${dayId}/vocabulary/addLesson`}>
                  Thêm từ vựng
                </NavLink>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="sub6_2" title="Bài tập">
              <Menu.Item key={`/manageDay/${dayId}/vocabulary/listExercise`}>
                <NavLink to={`/manageDay/${dayId}/vocabulary/listExercise`}>
                  Danh sách
                </NavLink>
              </Menu.Item>
              <Menu.Item key={`/manageDay/${dayId}/vocabulary/addExercise`}>
                <NavLink to={`/manageDay/${dayId}/vocabulary/addExercise`}>
                  Thêm bài tập
                </NavLink>
              </Menu.Item>
            </SubMenu>
          </SubMenu>

          <SubMenu
            key="sub7"
            icon={<EditOutlined />}
            title={textOver("Luyện cấu trúc và câu", 15)}
          >
            <SubMenu key="sub7_1" title="Bài học">
              <Menu.Item key={`/manageDay/${dayId}/sentences/listLesson`}>
                <NavLink to={`/manageDay/${dayId}/sentences/listLesson`}>
                  Danh sách
                </NavLink>
              </Menu.Item>
              <Menu.Item key={`/manageDay/${dayId}/sentences/addLesson`}>
                <NavLink to={`/manageDay/${dayId}/sentences/addLesson`}>
                  Thêm bài học
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub7_2" title="Bài tập">
              <Menu.Item key={`/manageDay/${dayId}/sentences/listExercise`}>
                <NavLink to={`/manageDay/${dayId}/sentences/listExercise`}>
                  Danh sách
                </NavLink>
              </Menu.Item>
              <Menu.Item key={`/manageDay/${dayId}/sentences/addExercise`}>
                <NavLink to={`/manageDay/${dayId}/sentences/addExercise`}>
                  Thêm bài tập
                </NavLink>
              </Menu.Item>
            </SubMenu>
          </SubMenu>

          <SubMenu key="sub8" icon={<AudioOutlined />} title="Luyện hội thoại">
            <SubMenu key="sub8_1" title="Bài tập">
              <Menu.Item key={`/manageDay/${dayId}/conversation/listExercise`}>
                <NavLink to={`/manageDay/${dayId}/conversation/listExercise`}>
                  Danh sách
                </NavLink>
              </Menu.Item>
              <Menu.Item key={`/manageDay/${dayId}/conversation/addExercise`}>
                <NavLink to={`/manageDay/${dayId}/conversation/addExercise`}>
                  Thêm bài tập
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub8_2" title="Nghe và đọc">
              <Menu.Item key={`/manageDay/${dayId}/conversation/listListenRead`}>
                <NavLink to={`/manageDay/${dayId}/conversation/listListenRead`}>
                  Danh sách
                </NavLink>
              </Menu.Item>
              <Menu.Item key={`/manageDay/${dayId}/conversation/addListenRead`}>
                <NavLink to={`/manageDay/${dayId}/conversation/addListenRead`}>
                  Thêm bài tập
                </NavLink>
              </Menu.Item>
            </SubMenu>
          </SubMenu>

          <SubMenu key="sub9" icon={<FormOutlined />} title="Luyện ngữ pháp ">
            <SubMenu key="sub9_1" title="Bài học">
              <Menu.Item key={`/manageDay/${dayId}/grammar/listLesson`}>
                <NavLink to={`/manageDay/${dayId}/grammar/listLesson`}>Danh sách</NavLink>
              </Menu.Item>
              <Menu.Item key={`/manageDay/${dayId}/grammar/addLesson`}>
                <NavLink to={`/manageDay/${dayId}/grammar/addLesson`}>
                  Thêm ngữ pháp
                </NavLink>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="sub9_2" title="Bài tập">
              <Menu.Item key={`/manageDay/${dayId}/grammar/listExercise`}>
                <NavLink to={`/manageDay/${dayId}/grammar/listExercise`}>
                  Danh sách{" "}
                </NavLink>
              </Menu.Item>
              <Menu.Item key={`/manageDay/${dayId}/grammar/question/add`}>
                <NavLink to={`/manageDay/${dayId}/grammar/question/add`}>
                  Thêm bài tập
                </NavLink>
              </Menu.Item>
            </SubMenu>
          </SubMenu>

          <div>
            {isModal && <PopupChange closeModal={setIsModal} />}
          </div>
          <div className="mt-8 mx-auto text-center">
            {collapsed ?
              <NavLink to={"/admin/day"} >
                <Tooltip title={'Quay lại'}>
                  <RollbackOutlined />
                </Tooltip>
              </NavLink>
              :
              <NavLink
                to={"/admin/day"}
                className="m-auto rounded text-white text-center"
              >
                <div className="flex space-x-2 px-4 w-[80%] m-auto text-white bg-blue-500 py-2 text-center justify-center rounded">
                  <span className="my-auto "> <RollbackOutlined /></span>
                  <span className="my-auto">Quay lại</span>
                </div>
              </NavLink>
            }
          </div>
        </Menu>
      </Sider>

      <Layout className="site-layout w-[100%]">
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
        <Content style={{ margin: "24px 16px", overflow: "initial" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24 }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DayLayout;
