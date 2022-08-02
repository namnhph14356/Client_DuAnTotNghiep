import React from 'react'
import { Link } from 'react-router-dom'

const NavBarTeacher = () => {
    return (
        <div>
            <section className='nav__management__teacher'>
                <div className="logo__managent">
                    <a href="">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/VOGUE_LOGO.svg/1544px-VOGUE_LOGO.svg.png" alt="" />
                    </a>
                </div>
                <div className="menu__managent">
                    {/* <h2>
                        MAIN MENU
                    </h2> */}
                    <ul className='list__item__menu'>
                        <li><Link to={''}><i className="fa-solid fa-video"></i>Quản lý video bài giảng</Link></li>
                        <li><Link to={''}><i className="fa-solid fa-microphone"></i>Quản lý từ vựng</Link></li>
                        <li><Link to={''}><i className="fa-solid fa-ear-listen"></i>Đàm thoại</Link></li>
                        <li><Link to={''}><i className="fa-solid fa-gamepad"></i>Quản lý  quiz</Link></li>
                        <li><Link to={''}><i className="fa-solid fa-list"></i>Quản lý  danh mục</Link></li>
                    </ul>
                </div>
            </section>
        </div>
    )
}

export default NavBarTeacher
