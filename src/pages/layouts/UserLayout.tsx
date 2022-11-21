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
                        <li>Bùi Hồng Hạnh  /  </li>
                        <li>Profile / </li>
                        <li>Thông tin cá nhân</li>
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
                        <li> <i className="fa-solid fa-clock-rotate-left"></i><NavLink to={''}>Lịch sử thanh toán</NavLink></li>
                        <li> <i className="fa-solid fa-gift"></i><NavLink to={''}>Quà tặng</NavLink></li>
                        <li><i className="fa-solid fa-arrow-right-arrow-left"></i> <NavLink to={''}> Chính sách chuyển đổi lớp học</NavLink></li>
                        <li><i className="fa-solid fa-comments"></i><NavLink to={''}>Thảo luận của tôi</NavLink></li>
                        <li><i className="fa-solid fa-users"></i><NavLink to={''}>Diễn đàn</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default UserLayout