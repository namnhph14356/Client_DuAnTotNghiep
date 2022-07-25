import React from 'react'
import Footer from '../Component/Footer'
import Header from '../Component/Header'

type Props = {}

const FileUser = (props: Props) => {
  return (
    <div>
        <Header/>
        <div className='px-[123px]'>
        <div className="title flex justify-between">
            <h1 className='font-bold text-[32px]'>Ho so</h1>
            <button className='border h-[55px] rounded-[10px] font-bold text-[24px] px-8 hover:shadow-lg transition-all duration-300 ease-linear'>Luu thay doi</button>
        </div>
        <div className="info my-7">
            <div className='flex justify-center items-center align-middle '><img src="../image/avatar.png" alt="" className='m-0'/></div>
            <div className="name flex justify-center items-center align-middle ">
                <div>
                    <label htmlFor="" className='pr-6 text-[24px]'>Ten</label>
                    <input type="text" placeholder='Nguyen Hong Hanh' className='w-[590px] px-3 py-2 border rounded-md border-[#ccc'/>
                </div>
            </div>
            <div className="name flex pl-[270px] py-5">
                <div>
                    <label htmlFor="" className='pr-6 text-[14px]'>Hoc tap từ</label>
                    {/* <input type="date" className='w-[590px] px-3 py-2 border rounded-md border-[#ccc'/> */}
                </div>
            </div>
        </div>
        </div>
    <Footer/>
    </div>
  )
}

export default FileUser