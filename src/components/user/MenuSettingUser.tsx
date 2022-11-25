import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { RootState } from '../../app/store'
import { UserType } from '../../types/user'

const MenuSettingUser = () => {
  const auth = useSelector(((item: RootState) => item.auth.value)) as UserType

  return (
    <div className="header__edit__infomation">
      <ul className='list__nav__edit__info'>
        <li className='inline-block px-2 border py-1 bg-slate-100 hover:bg-white transition '><NavLink className={'text-blue-600 font-sans text-base hover:text-black font-normal'} to={`/user/settingUser/${auth._id}`}>Thông tin cơ bản</NavLink></li>
        <li className='inline-block px-2 border py-1 bg-slate-100 hover:bg-white transition '><NavLink className={'text-blue-600 font-sans text-base hover:text-black font-normal'} to={`/user/editEmailUser/${auth._id}`}>Thay đổi Email</NavLink></li>
        <li className='inline-block px-2 border py-1 bg-slate-100 hover:bg-white transition '><NavLink className={'text-blue-600 font-sans text-base hover:text-black font-normal'} to={`/user/editPasswordUser/${auth._id}`}>Thay đổi mật khẩu</NavLink></li>
      </ul>
    </div>
  )
}

export default MenuSettingUser