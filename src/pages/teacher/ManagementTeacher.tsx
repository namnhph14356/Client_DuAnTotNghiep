import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import HeaderAdminTeacher from './header/headerNav'
import NavBarTeacher from './header/navbar'

const ManageTeacher = () => {
    return (
        <div>
            <NavBarTeacher />
            <HeaderAdminTeacher />
            <main >
                <Outlet />

            </main>
        </div>
    )
}

export default ManageTeacher
