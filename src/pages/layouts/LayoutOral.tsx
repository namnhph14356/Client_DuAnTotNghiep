import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutOral = () => {
    return (
        <div className='layout__page__oral'>
            <div className='route__page__oral'>
                <div>Kiểm tra</div>
            </div>
            <Outlet />
        </div>
    )
}

export default LayoutOral