import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../features/Slide/auth/authSlide';
import { message, Modal } from "antd";
import '../css/header.css';
const HeaderComponent = () => {

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
                    <a href="#" className="probootstrap-burger-menu visible-xs"><i>Menu</i></a>
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
                            <a href="#" className="probootstrap-burger-menu"><i>Menu</i></a>
                            <h5>Social</h5>
                            <ul className="social-buttons">
                                <li><a href="#"><i className="icon-twitter" /></a></li>
                                <li><a href="#"><i className="icon-facebook" /></a></li>
                                <li><a href="#"><i className="icon-instagram2" /></a></li>
                            </ul>
                            <p><small>© Copyright 2017. All Rights Reserved.</small></p>
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