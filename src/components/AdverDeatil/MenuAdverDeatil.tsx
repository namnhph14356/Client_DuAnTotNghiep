import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuAdverDeatil = () => {
  return (
    <div className='p-4 pb-8 border shadow-lg mb-8'>
    <div className='text-xl mb-4'>BẠN MUỐN ĐẾN PHẦN: </div>
    <ul className='m-0 p-0 divide-y-2'>
      <li className='bg-indigo-600 px-2 py-1'><NavLink to="" className='text-white'>Luyện nghe nói từ phản xạ</NavLink></li>
      <li className='bg-indigo-600 px-2 py-1'><NavLink to="" className='text-white'>Luyện từ vựng</NavLink></li>
      <li className='bg-indigo-600 px-2 py-1'><NavLink to="" className='text-white'>Luyện cấu trúc và câu</NavLink></li>
      <li className='bg-indigo-600 px-2 py-1'><NavLink to="" className='text-white'>Luyện hội thoại</NavLink></li>
      <li className='bg-indigo-600 px-2 py-1'><NavLink to="" className='text-white'>Luyện ngữ pháp</NavLink></li>
      <li className='bg-indigo-600 px-2 py-1'><NavLink to="" className='text-white'>Thi oral</NavLink></li>
      <li className='bg-indigo-600 px-2 py-1'><NavLink to="" className='text-white'>Danh sách ngày học</NavLink></li>
    </ul>
  </div>
  )
}

export default MenuAdverDeatil