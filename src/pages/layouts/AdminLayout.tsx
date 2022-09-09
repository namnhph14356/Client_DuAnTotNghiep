import { Breadcrumb, Layout, Menu, Avatar, Badge, Dropdown, Space } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { UserOutlined, CommentOutlined, DollarOutlined, LaptopOutlined, FolderFilled, BellOutlined, ReadOutlined } from '@ant-design/icons';


const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { Header, Content, Footer, Sider } = Layout;
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
                            Log Out
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
                            Profile
                        </span>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <span>
                            Log Out
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
        <Layout style={{ width: "100%", minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="logo flex justify-center py-2" >
                    <NavLink aria-current="page" className="logo active" to="/"> Logo </NavLink>
                </div>



                <Menu
                    theme="dark"
                    mode="inline"
                    onClick={handleClick}
                    selectedKeys={[current]}
                >
                    <SubMenu key="sub1" icon={<FolderFilled />} title="Category">
                        <Menu.Item key="/admin/category"><NavLink to='/admin/category'>List Category</NavLink></Menu.Item>
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
                    <SubMenu key="sub5" icon={<ReadOutlined />} title="User infomation">
                        <Menu.Item key="/admin/wellcome"><NavLink to='/admin/wellcome'>List User Infomation</NavLink></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub6" icon={<ReadOutlined />} title="Vocabulary">
                        <Menu.Item key="/admin/vocabulary"><NavLink to='/admin/vocabulary'>List Vocabulary</NavLink></Menu.Item>
                        <Menu.Item key="/admin/vocabulary/add"><NavLink to='/admin/vocabulary/add'>Add Vocabulary</NavLink></Menu.Item>
                    </SubMenu>


                </Menu>
            </Sider>



            <Layout className="site-layout" >
                <Header className="site-layout-background" style={{ padding: 0 }} >

                    <div className="flex justify-end">
                        <div className="px-4">
                            <Dropdown overlay={notification} trigger={['click']} placement="bottomRight">
                                <Badge dot>
                                    <BellOutlined style={{ fontSize: 24, color: 'white' }} />
                                </Badge>
                            </Dropdown>
                        </div>
                        <div className="px-4">

                            <Dropdown overlay={menu} trigger={['click']}>
                                <Avatar size="large" icon={<UserOutlined />} />
                            </Dropdown>
                        </div>
                    </div>

                </Header>

                <Content
                    className="site-layout-background"
                    style={{
                        margin: '16px',
                        minHeight: 280,
                        background: "#fff"
                    }}
                >
                    <aside style={{ padding: 24 }} ><Outlet /></aside>
                </Content>
            </Layout>


        </Layout>
    )
}

export default AdminLayout