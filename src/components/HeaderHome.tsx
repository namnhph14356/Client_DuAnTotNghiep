import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useRoutes } from 'react-router-dom'
import { message, Modal } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import Avatar from './Avatar';
import { logout } from '../features/Slide/auth/authSlide';
const navigation = [
  { name: 'Học thử', to: '/learning' },
  { name: 'Liên hệ chúng tôi', to: 'contact' },

]

const HeaderComponent = () => {
  const user = useSelector(((item: any) => item.user.value))
  const dispatch = useDispatch();

  const onLogout = () => {
    Modal.confirm({
      title: "Bạn có chắc muốn đăng xuất không ?",
      onOk: () => {
        dispatch(logout(user[0]))
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
              user.length > 0 ?
                <div className='text-white flex space-x-2 '>
                  <Link to="/" className='text-white my-auto'>
                    {user.img
                      ? <Avatar image={user[0].img} />
                      : <Avatar name={user[0].username} color={user[0].colorImage} />
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