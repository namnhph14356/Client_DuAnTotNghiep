import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../Component/Footer'
import Header from '../../Component/HeaderHome'

const WebsiteLayout = () => {
    return (
        <div >

            <Outlet />
          
        </div>
    )
}

export default WebsiteLayout