import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store'
import { getUserByIdSlice } from '../../features/Slide/auth/authSlide'
import { UserType } from '../../types/user'
import '../user/user.css'
const UserLayout = () => {
    const auth = useSelector(((item: RootState) => item.auth.value)) as UserType
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(getUserByIdSlice())
    }, [])
    return (
        <div className='container'>

            <div className='info__user'>
                <div className="header__info__user">
                    <ul className='breadcrumbs__user'>
                        <div>
                          <li>{auth.username}</li>
                          <li>/</li>
                          <li>Profile</li>
                          <li>/</li>
                          <li>Thông tin cá nhân</li>
                        </div>
                    </ul>
                </div>

                <Outlet />

            </div>
            <div className='setting__user'>
                <div className="img__user">
                    <img src={auth.img} alt="" />
                </div>
                <div className="sitting__img">
                    <button>
                        <NavLink to={`/user/editImage/${auth._id}`} > <i className="fa-solid fa-camera"></i> Thay đổi ảnh đại diện</NavLink>
                    </button>
                </div>
                <div className="nav__profile">
                    <ul className='list__link'>
                        <li> <i className="fa-solid fa-user"></i> <NavLink to={''}>Thông tin cá nhân</NavLink></li>
                        <li> <i className="fa-solid fa-newspaper"></i><NavLink to={''}>Lớp học của tôi</NavLink></li>
                        <li> <i className="fa-solid fa-clock-rotate-left"></i><NavLink to={''}>Lịch sử làm bài</NavLink></li>
                        <li> <i className="fa-solid fa-clock-rotate-left"></i><NavLink to={''}>Lịch sử thanh toán</NavLink></li>
                        <li className='border-none'><i className="fa-solid fa-comments"></i><NavLink to={''}>Thảo luận của tôi</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default UserLayout