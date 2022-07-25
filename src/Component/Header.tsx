import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  const abc = () => {
    let navbar = document.querySelector<any>('.nav__learning-menu');
      
    navbar.classList.toggle('active');
   
    
    window.onscroll = ():any => {
        navbar.classList.remove('active');
    }
}
  return (
    <div>
       <header className="header__learning">
                <div className="header__learning_box">

                    <div className="logo">
                        <a ><img src="" />Logo</a>
                        <div className="fas fa-bars" id="menu-btn" onClick={() => abc()} />
                    </div>

                    <div className="nav__learning-menu">
                        <ul className="nav__learning">
                            <li><Link to={"/learning"} >Học</Link></li>
                            <li><a >Bài hát</a></li>
                            <li><Link to={"/store"} >Cửa hàng</Link></li>
                        </ul>
                    </div>

                    <nav className="nav__user">
                        <a ><i className="fa-solid fa-bolt" /> 0 </a>
                        <a ><i className="fa-solid fa-crown" /> 0</a>
                        <a ><i className="fa-solid fa-user nav__icon__user" /></a>
                    </nav>
                </div>
            </header>
    </div>
  )
}

export default Header