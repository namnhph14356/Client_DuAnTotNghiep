import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/HeaderHome'

const WebsiteLayout = () => {
    return (
        <div >

            <Outlet />
          
        </div>
    )
}

export default WebsiteLayout