import React, { useState } from 'react'
import { NavLink, useNavigate, useRoutes } from 'react-router-dom'
import { logout } from '../features/Slide/auth/authSlide';
import { message, Modal } from "antd";
import { useDispatch, useSelector } from 'react-redux';
const navigation = [
  { name: 'Học thử', to: '/learning' },
  { name: 'Liên hệ chúng tôi', to: 'contact' },

]

const HeaderComponent = () => {
  const navigate = useNavigate()
  const dispath = useDispatch()
  const user = useSelector(((item: any) => item.user.value))
  console.log(user);

  const onLogout = () => {
    const confirm = window.confirm("Bạn muốn đăng xuất ?")
    if (confirm) {
      localStorage.removeItem("user");
      message.success("Đăng xuất thành công !")
    }
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
            <div className=" ml-10 space-x-4">
              <NavLink to={'/sigin'}
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