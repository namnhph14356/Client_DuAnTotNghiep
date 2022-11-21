import React from 'react'
import MenuSettingUser from './MenuSettingUser'

const PrivateUser = () => {
  return (
    <div className='edit__private__page'>
      <MenuSettingUser />
      <div className="list__private__edit">
        <table>
          <tbody>
            <tr>
              <td className='firts__col__private'>
                Tùy chọn hiển thị :
              </td>
              <td>
                <ul className='list__checkbox__private'>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Cho phép hiển thị ngày sinh.</label>

                  </li>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Cho phép hiển thị địa chỉ email.</label>

                  </li>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Cho phép hiển thị giới tính.</label>

                  </li>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Cho phép xem những cặp câu đã thêm.</label>

                  </li>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Nhận thông tin mới nhất từ hệ thống qua email.</label>

                  </li>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Nhận thông báo khi có phản hồi comment qua email.</label>

                  </li>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor=""> Nhận thông báo khi có tin nhắn qua email.</label>

                  </li>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor=""> Nhận thông báo khi có câu dịch trợ giúp các keyword qua email.</label>

                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <td className='firts__col__private'>
                Tham gia chương trình:
              </td>
              <td>
                <ul className='list__checkbox__private'>
                  <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">Nhận thông tin từ chương trình "Kiếm tiền online cùng HelloChao" qua email.</label>

                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="btn__save__info">
        <button>
          Lưu thay đổi
        </button>
      </div>

    </div>
  )
}

export default PrivateUser