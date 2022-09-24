import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

const Menu = () => {
    const { id } = useParams()
    return (
        <div className="box__list__detail">
            <ul>
                <li>
                    <NavLink style={{ color: '#fff' }} to={`/learning/detailLearning/${id}/speak`}>
                        Khởi động
                        <i className="fa-solid fa-angle-right"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink style={{ color: '#fff' }} to={`/learning/detailLearning/${id}/quiz`}>
                        Hỏi và đáp
                        <i className="fa-solid fa-angle-right"></i>
                    </NavLink>
                </li>
                <li>
                    <NavLink style={{ color: '#fff' }} to={`/learning/detailLearning/${id}/writeAndListen`}>
                        Nghe và trả lời
                        <i className="fa-solid fa-angle-right"></i>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Menu