import React from 'react'
import Footer from '../Component/Footer'
import Header from '../Component/Header'

type Props = {}

const Store = (props: Props) => {
  return (
    <div>
      <Header />

      <section className='w-10/12 mx-auto py-[30px]'>
        <div>
          <h1 className='text-xl border-b-2 py-[20px]'>Tăng sức mạnh</h1>
        </div>
        <div className='md:flex justify-between items-center py-[15px]'>
          <div className='flex'>
            <div className='w-[200px] md:w-[100px]'>
              <img src="../image/image 42.png" alt="" />
            </div>
            <div>
              <h2 className='font-bold text-sm md:text-lg'>Crown Power</h2>
              <p className='text-xs md:text-sm'>Streak Freeze cho phép bạn giữ nguyên streak trong một ngày bạn không có hoạt động nào.</p>
            </div>
          </div>
          <div>
            <button className='flex border-2 shadow-lg text-xs md:text-sm rounded-lg font-bold px-[20px] py-[5px] border-[#CCCCCC]'>Giá mua crow: 20 <img src="../image/image 41.png" className='w-[20px]' alt="" /></button>
          </div>
        </div>
        <div className='md:flex justify-between items-center py-[15px]'>
          <div className='flex'>
            <div className='w-[200px] md:w-[100px]'>
              <img src="../image/image 42.png" alt="" />
            </div>
            <div>
              <h2 className='font-bold text-sm md:text-lg'>Crown Power</h2>
              <p className='text-xs md:text-sm'>Streak Freeze cho phép bạn giữ nguyên streak trong một ngày bạn không có hoạt động nào.</p>
            </div>
          </div>
          <div>
            <button className='flex border-2 shadow-lg text-xs md:text-sm rounded-lg font-bold px-[20px] py-[5px] border-[#CCCCCC]'>Giá mua crow: 20 <img src="../image/image 41.png" className='w-[20px]' alt="" /></button>
          </div>
        </div>
      </section>
      <section className='w-10/12 mx-auto py-[30px]'>
        <div>
          <h1 className='text-xl border-b-2 py-[20px]'>Khung ảnh</h1>
        </div>
        <div className='md:flex md:justify-between grid place-items-center md:items-center py-[20px]'>
          <div className='w-[200px]'>
            <img src="../image/Group 154.png" alt="" />
          </div>
          <div>
            <button className='flex border-2 shadow-lg rounded-lg font-bold px-[20px] py-[5px] border-[#CCCCCC]'>Giá mua crow: 20 <img src="../image/image 41.png" className='w-[20px]' alt="" /></button>
          </div>
        </div>
        <div className='md:flex md:justify-between grid place-items-center md:items-center py-[20px]'>
          <div className='w-[200px]'>
            <img src="../image/Group 156.png" alt="" />
          </div>
          <div>
            <button className='flex border-2 shadow-lg rounded-lg font-bold px-[20px] py-[5px] border-[#CCCCCC]'>Giá mua crow: 20 <img src="../image/image 41.png" className='w-[20px]' alt="" /></button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Store