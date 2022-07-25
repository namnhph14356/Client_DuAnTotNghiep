import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../features/Slide/auth/authSlide';
import { message, Modal } from "antd";
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
    <header className="header">
      <div className="logo">
        <NavLink to={''}   ><img src="" />VOGUE</NavLink>
        <div className="fas fa-bars my-auto text-[32px] px-8 hidden"  />
      </div>
      {/* <div class="menu hidden">
                            <ul>
                                <li><a href="">Menu</a></li>
                                <li><a href="">Menu</a></li>
                                <li><a href="">Menu</a></li>
                                <li><a href="">Menu</a></li>
                            </ul>
                        </div>
                        <div class="user">
                            <a href="" class="fa fa-user text-2xl my-auto" aria-hidden="true"></a>
                        </div> */}
                        <div>
                          <button onClick={() => onLogout()}>Logout</button>
                        </div>
    </header>
  )
}

export default HeaderComponent