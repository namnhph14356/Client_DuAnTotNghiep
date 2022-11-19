import React, { useState } from 'react'

import MenuSettingUser from './MenuSettingUser'



const EditPasswordUser = () => {
  return (
    <div className='edit__password__page'>
      <MenuSettingUser />
      <div className="content__change__password">
        <table>
          <tbody>
            <tr>
              <td className="firts__col__change__email">
                Mật khẩu hiện tại :
              </td>
              <td>
                <input type="text" name="" id="" />
              </td>
            </tr>
            <tr>
              <td className="firts__col__change__email">
                Mật khẩu mới :
              </td>
              <td>
                <input type="text" name="" id="" />
              </td>
            </tr>
            <tr>
              <td className="firts__col__change__email">
                Nhập lại mật khẩu mới :
              </td>
              <td>
                <input type="text" name="" id="" />
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

export default EditPasswordUser