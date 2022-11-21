import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { RootState } from '../../app/store'
import { UserType } from '../../types/user'
import { Avatar } from '../Avatar'

const SettingUser = () => {

    const auth = useSelector(((item: RootState) => item.auth.value)) as UserType

    return (
        <div className='setting__user'>
            <div className="img__user">
            <Avatar image={String(auth.img)}  />
            </div>
            <div className="sitting__img">
                <button>
                    <i className="fa-solid fa-camera"></i> Thay đổi ảnh đại diện
                </button>
            </div>
            <div className="nav__profile">
                <ul className='list__link'>
                    <li> <i className="fa-solid fa-user"></i> <NavLink to={''}>Thông tin cá nhân</NavLink></li>
                    <li> <i className="fa-solid fa-newspaper"></i><NavLink to={''}>Lớp học của tôi</NavLink></li>
                    <li> <i className="fa-solid fa-clock-rotate-left"></i><NavLink to={''}>Lịch sử thanh toán</NavLink></li>
                    <li> <i className="fa-solid fa-gift"></i><NavLink to={''}>Quà tặng</NavLink></li>
                    <li><i className="fa-solid fa-arrow-right-arrow-left"></i> <NavLink to={''}> Chính sách chuyển đổi lớp học</NavLink></li>
                    <li><i className="fa-solid fa-comments"></i><NavLink to={''}>Thảo luận của tôi</NavLink></li>
                    <li><i className="fa-solid fa-users"></i><NavLink to={''}>Diễn đàn</NavLink></li>
                </ul>
            </div>
        </div>
    )
}

export default SettingUser