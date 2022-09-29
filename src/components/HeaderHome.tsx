import React, { useState } from 'react'
import { NavLink, useNavigate, useRoutes } from 'react-router-dom'
import { logout } from '../features/Slide/auth/authSlide';
import { message, Modal } from "antd";
import '../css/header.css';
import { useEffect } from '@storybook/addons';
import { useDispatch } from 'react-redux';
const HeaderComponent = () => {

    const navigate = useNavigate()
    const dispath = useDispatch()
    const onLogout = () => {
        const confirm = window.confirm("Bạn muốn đăng xuất ?")
        if (confirm) {

            localStorage.removeItem("user");
            // dispath(increase())
            message.success("Đăng xuất thành công !")
        }
    }
    return (
        <div>
            {/* START: header */}
            <header role="banner" className="probootstrap-header probootstrap-header-no-intro">
                <div className="container-fluid">
                    {/* <div class="row"> */}
                    <a href="index.html" className="probootstrap-logo">VianEnglish<span>.</span></a>
                    <div className="mobile-menu-overlay" />
                    <nav role="navigation" className="probootstrap-nav hidden-xs">
                        <ul className="probootstrap-main-nav">
                            <li>
                                <NavLink to={'/'}> Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/learning'}> Learning</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/contact'}> Contact</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/login'}> signin</NavLink>
                            </li>

                            <li className="probootstrap-cta"> <NavLink to={'/register'}> SignUp</NavLink></li>
                        </ul>
                        <div className="extra-text visible-xs">
                            <ul className="social-buttons">
                                <li><a href="#"><i className="icon-twitter" /></a></li>
                                <li><a href="#"><i className="icon-facebook" /></a></li>
                                <li><a href="#"><i className="icon-instagram2" /></a></li>
                            </ul>
                        </div>
                    </nav>
                    {/* </div> */}
                </div>
            </header>
            {/* END: header */}

        </div>

    )
}

export default HeaderComponent