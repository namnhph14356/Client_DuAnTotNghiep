import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store'
import { currentUserSlice, getUserByIdSlice } from '../../features/Slide/auth/authSlide'
import { UserType } from '../../types/user'

const InformationUser = () => {

    const auth = useSelector(((item: RootState) => item.auth.value)) as UserType
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        dispatch(getUserByIdSlice())
    }, [])

    return (

        <div className="page__content">
            <div >
                <button className='btn__edit'>
                    <NavLink to={`/user/settingUser/${auth._id}`}> Chỉnh sửa tài khoản</NavLink>
                </button>
            </div>
            <div className="activity__contents">
                <table className='table__user'>
                    <tbody>
                        <tr>
                            <td className='first__col'>
                                Họ và tên
                            </td>
                            <td>
                                <h2 className='name__user'>
                                    {auth.username}
                                </h2>
                            </td>
                        </tr>
                        <tr>
                            <td className='first__col'>
                                Địa chỉ email
                            </td>
                            <td>
                                {auth.email}
                            </td>
                        </tr>
                        <tr>
                            <td className='first__col'>
                                Giới tính
                            </td>
                            <td>
                                {auth.sex === 1 ? 'Nữ' : 'Nam'}
                            </td>
                        </tr>
                        <tr>
                            <td className='first__col'>
                                Điện thoại
                            </td>
                            <td>
                                {auth.phone}
                            </td>
                        </tr>
                        <tr>
                            <td className='first__col'>
                                Địa chỉ
                            </td>
                            <td>
                                {auth.address}
                            </td>
                        </tr>
                        <tr>
                            <td className='first__col'>
                                Ngày tham gia vianenglish.vn
                            </td>
                            <td>
                                {auth.createdAt}
                            </td>
                        </tr><tr>
                            <td className='first__col'>
                                Loại tài khoản
                            </td>
                            <td>
                                <a href="" className='text-blue-600'>
                                    {auth.role === '0' ? 'Blue Member' : 'Admin'}
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className='first__col'>
                                Tình trạng tài khoản
                            </td>
                            <td>
                                Đang hoạt động
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default InformationUser