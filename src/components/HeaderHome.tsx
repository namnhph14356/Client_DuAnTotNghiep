import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useRoutes } from 'react-router-dom'
import { message, Modal } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/Slide/auth/authSlide';
import { RootState } from '../app/store';
import { UserType } from '../types/user';
import { Avatar, AvatarDefault } from './Avatar';

const navigation = [
  { name: 'Học thử', to: '/learning' },
  { name: 'Liên hệ chúng tôi', to: 'contact' },

]

const HeaderComponent = () => {
  const auth = useSelector(((item: RootState) => item.auth.value)) as UserType
  const dispatch = useDispatch();
  const onLogout = () => {
    Modal.confirm({
      title: "Bạn có chắc muốn đăng xuất không ?",
      onOk: () => {
        dispatch(logout(auth))
        message.success("Đăng xuất thành công")
      }
    })
  }

  return (
    <div className="relative bg-gray-50">
      <header className="bg-indigo-600">
        <nav className="mx-auto w-10/12 " aria-label="Top">
          <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
            <div className="flex items-center">
              <NavLink to={'/'} className="text-white font-bold text-3xl hover:text-indigo-50 font-mono">
                VianEnglish
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
                <div className='text-white flex space-x-2 '>
                  <Link to="/user" className='text-white my-auto'>
                    {auth.img
                      ? <Avatar image={auth.img} className="text-sm w-10 h-10 text-white"/>
                      : <AvatarDefault name={auth.username} color={String(auth.colorImage)} className="text-sm w-10 h-10 text-white" />
                    }
                  </Link>
                  <span className='my-auto'> / </span>
                  <button className='my-auto' onClick={onLogout}>Đăng xuất</button>
                </div>
                :
                <div className=" ml-10 space-x-4">
                  <NavLink to={'/signin'}
                    className="inline-block rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75"
                  >
                    Sign in
                  </NavLink>
                  <NavLink to={'/signup'}

                    className="inline-block rounded-md border border-transparent bg-white py-2 px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50"
                  >
                    Sign up
                  </NavLink>
                </div>
            }
          </div>
          <div className="flex flex-wrap justify-center space-x-6 py-4 lg:hidden">
            {navigation.map((item) => (
              <NavLink key={item.name} to='{item.to}' className="text-base font-medium text-white hover:text-indigo-50">
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