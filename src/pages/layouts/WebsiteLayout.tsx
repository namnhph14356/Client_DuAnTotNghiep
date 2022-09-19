import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../Component/Footer'
import HeaderComponent from '../../Component/HeaderHome'


const WebsiteLayout = () => {
    return (
        <div >
            <HeaderComponent/>
            <Outlet />
            <Footer/>
        </div>
    )
}

export default WebsiteLayout