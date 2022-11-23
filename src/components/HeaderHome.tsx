import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useRoutes } from 'react-router-dom'
import { Dropdown, Menu, message, Modal } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/Slide/auth/authSlide';
import { RootState } from '../app/store';
import { UserType } from '../types/user';
import { Avatar } from './Avatar';
const navigation = [
  { name: 'Học thử', to: '/learning' },
  { name: 'Giới thiệu', to: 'aboutUs' },
  { name: 'Liên hệ', to: '/contact' },
  { name: 'Khóa học', to: '/course' },
  { name: 'Tra từ', to: '/directory' },
]

const HeaderComponent = () => {
  const auth = useSelector(((item: RootState) => item.auth.value)) as UserType

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

  return (
    <div className="relative bg-gray-50 ">
      <header className="bg-indigo-600">
        <nav className="mx-auto w-10/12 " aria-label="Top">
          <div className="flex w-full items-center justify-between border-b border-indigo-500 py-4 lg:border-none">
            <div className="flex items-center">
              <NavLink to={'/'} className="text-white font-bold text-3xl hover:text-indigo-50 font-mono">
                <img src={'https://res.cloudinary.com/chanh-thon/image/upload/v1667831318/upload_preset/LogoHeader-removebg-preview_q6pbxp.png'} width={100} alt="" />
              </NavLink>
              <div className=" ml-10 space-x-8 lg:block">
                {navigation.map((link) => (
                  <NavLink key={link.name} to={link.to} className="text-base font-medium text-white hover:text-indigo-50">
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>
            {
              auth ?
                <Dropdown overlay={menu} trigger={["click"]}>
                  <img
                    src={auth.img}
                    className="text-sm w-10 h-10 text-white rounded-full cursor-pointer"
                    alt=""
                  />
                </Dropdown>
                :
                <div className=" ml-10 space-x-4">
                  <NavLink to={'/signin'}
                    className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-indigo-600 hover:bg-opacity-75"
                  >
                    Đăng nhập
                  </NavLink>
                  <NavLink to={'/signup'}

                    className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50"
                  >
                    Đăng ký
                  </NavLink>
                </div>
            }
          </div>
          <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
            {navigation.map((item) => (
              <NavLink key={item.name} to={item.to} className="text-base font-medium text-white hover:text-indigo-50">
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent