import React from 'react'
import { NavLink } from 'react-router-dom'

const ChooseClass = () => {
  return (
    <div>
    
      <div className='p-4 pb-8 border shadow-lg'>
        <div className='text-xl mb-4'>TÙY CHỌN LỚP HỌC </div>
        <div className='border py-4 bg-[#F8F8F8] px-4 '>
          <div className='pb-4'>
            <div className='font-semibold'>Chọn phần học bắt buộc:</div>
            <form action="" className=' px-2'>
              <div className='flex gap-2'>
                <input type="checkbox" id="input1" name="input1" />
                <label htmlFor="input1">Từ vựng cơ bản</label><br />
              </div>

              <div className='flex gap-2'>
                <input type="checkbox" id="input2" name="input2" />
                <label htmlFor="input2">Câu nói thông dụng</label><br />
              </div>

              <div className='flex gap-2'>
                <input type="checkbox" id="input3" name="input3" />
                <label htmlFor="input3">Đàm thoại</label><br />
              </div>

              <div className='flex gap-2'>
                <input type="checkbox" id="input4" name="input4" />
                <label htmlFor="input4">Ngữ pháp</label><br />
              </div>
            </form>
          </div>
          <div className='pb-4'>
            <div className='font-semibold'>Tùy chọn bài tập:</div>
            <div className='px-2'>
              <div className='flex gap-2 my-1 '>
                <span className='col-span-2 w-full my-auto'>Số ngày chọn bài: </span>
                <span><input type="text" className='border  px-2  my-auto w-10 text-center' /></span>
              </div>

              <div className='flex gap-2 my-1'>
                <span className='col-span-2 w-full my-auto'>Số lần lặp lại: </span>
                <span><input type="text" className='border  px-2  my-auto w-10 text-center' /></span>
              </div>

            </div>
          </div>
          <div className='pb-4'>
            <div className='font-semibold'>Chọn kì thi bắt buộc:</div>
            <form action="" className=' px-2'>
              <div className='flex gap-2'>
                <input type="checkbox" id="input1" name="input1" />
                <label htmlFor="input1">Thi tuần</label><br />
              </div>

              <div className='flex gap-2'>
                <input type="checkbox" id="input2" name="input2" />
                <label htmlFor="input2">Thi tháng</label><br />
              </div>

              <div className='flex gap-2'>
                <input type="checkbox" id="input3" name="input3" />
                <label htmlFor="input3">Thi quý</label><br />
              </div>
            </form>
          </div>
          <div className='pb-4'>
            <div className='font-semibold'>Số ngày ôn Playlist:</div>
            <div className='px-2'>
              <div className='flex gap-2 my-1 '>
                <span className='col-span-2 w-full my-auto'>Số ngày ôn bài: </span>
                <span><input type="text" className='border  px-2  my-auto w-10 text-center' /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChooseClass
