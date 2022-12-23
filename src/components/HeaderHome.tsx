/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useRoutes } from 'react-router-dom'
import { Dropdown, Menu, message, Modal } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/Slide/auth/authSlide';
import { RootState } from '../app/store';
import { UserType } from '../types/user';
import '../css/header.css';

const navigation = [
  { name: 'Học thử', to: '/learning' },
  { name: 'Giới thiệu', to: 'aboutUs' },
  { name: 'Liên hệ', to: '/contact' },
  // { name: 'Khóa học', to: '/course' },
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
      {
        auth && auth.role === "1" &&
        <Menu.Item>
          <Link to="/manageteacher" className='text-white my-auto'>
            Danh sách lớp học
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

  const checkMenu = () => {
    let navbar: any = document.querySelector('.navbarHeader')
    navbar.classList.remove('active');
  }

  const checkOpenMenu = () => {
    let navbar: any = document.querySelector('.navbarHeader')
    navbar.classList.add('active');
  }

  return (
    <div className="relative">
      <header className="bg-indigo-600">
        <nav className="mx-auto w-10/12 " aria-label="Top">
          <div className="flex w-full items-center justify-between border-b border-indigo-500 py-3 lg:border-none">
            <div className="flex items-center">
              <NavLink to={'/'} className="text-white font-bold text-3xl hover:text-indigo-50 font-mono">
                <img src={'https://res.cloudinary.com/chanh-thon/image/upload/v1667831318/upload_preset/LogoHeader-removebg-preview_q6pbxp.png'} className="w-[70px] lg:w-[90px]" alt="" />
              </NavLink>
              <div className="navbarHeader px-4">
                <div className='head flex justify-between w-full'>
                  <div>
                    <NavLink className="text-lg text-center font-semibold text-white space-x-1" to="/">
                      <span className="my-auto">
                        <img src="https://res.cloudinary.com/chanh-thon/image/upload/v1669194029/Layer_2_qkue5t.png" width={20} />
                      </span>
                      <span className="text-white">Vian English</span>
                    </NavLink>
                  </div>

                  <div id="close-navbar" onClick={() => checkMenu()} className="fas fa-times my-auto"></div>
                </div>
                <div className='menuContent'>
                  {navigation.map((link) => (
                    <NavLink key={link.name} to={link.to} className="text-base font-medium text-white hover:text-orange-500">
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className='ml-10 space-x-8 menu'>
                {navigation.map((link) => (
                  <NavLink key={link.name} to={link.to} className="text-base font-medium text-white hover:text-orange-500">
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className='flex justify-between gap-4 my-auto'>
              {
                auth && auth.username ?
                  <Dropdown overlay={menu} trigger={["click"]}>
                    <img
                      src={auth.img}
                      className="text-sm w-8 h-8 md:w-10 md:h-10 text-white rounded-full cursor-pointer"
                      alt=""
                    />
                  </Dropdown>
                  :
                  <div className=" ml-10 space-x-4">
                    <NavLink to={'/signin'}
                      className="inline-block rounded-md border border-transparent bg-white py-[6px] px-4 text-base font-medium text-indigo-600 hover:bg-opacity-75"
                    >
                      Đăng nhập
                    </NavLink>
                    <NavLink to={'/signup'}

                      className="inline-block rounded-md border border-transparent bg-white py-[6px] px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50"
                    >
                      Đăng ký
                    </NavLink>
                  </div>
              }
              <div id="menu-btn" className="fas fa-bars my-auto text-white text-2xl  md:hidden" onClick={checkOpenMenu}></div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent