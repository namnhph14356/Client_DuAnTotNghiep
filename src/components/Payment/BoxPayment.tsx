import { ShoppingBag } from 'heroicons-react'
import { StarOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import PopupPayment from './PopupPayment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { UserType } from '../../types/user';
import { currentUserSlice, getUserByIdSlice } from '../../features/Slide/auth/authSlide';



type Props = {}

const BoxPayment = (props: Props) => {
  const [isModal, setIsModal] = useState(false)
  const dispatch = useDispatch();
  const [currentUser, setCurrenUser] = useState<UserType>()  
  const auth = useSelector((item: RootState) => item.auth.value) as UserType;
  const handlonClick = () => {
    setIsModal((prevState) => !prevState);
  }
  useEffect(() => {
    const getCurrentUser = async () => {
      const {data} = await dispatch(getUserByIdSlice(auth._id))
      setCurrenUser(data)
    }
    getCurrentUser()
  },[])

  
  return (
    <div className="box__buy__source">
    <h3 className="title__buy__source">
      <ShoppingBag className='w-5 h-5' />  Lớp học tiếng Anh giao tiếp 360
    </h3>
    <div className='flex justify-center my-4'>
    <svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" fill="#ff9933" aria-hidden="true">
        <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" fill='#ff9933'></path>
    </svg>
    <svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" fill="#ff9933" aria-hidden="true">
        <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" fill='#ff9933'></path>
    </svg>
    <svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" fill="#ff9933" aria-hidden="true">
        <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" fill='#ff9933'></path>
    </svg>
    <svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" fill="#ff9933" aria-hidden="true">
        <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" fill='#ff9933'></path>
    </svg>
    <svg viewBox="64 64 896 896" focusable="false" data-icon="star" width="1em" height="1em" fill="#ff9933" aria-hidden="true">
        <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3zM664.8 561.6l36.1 210.3L512 672.7 323.1 772l36.1-210.3-152.8-149L417.6 382 512 190.7 606.4 382l211.2 30.7-152.8 148.9z" fill='#ff9933'></path>
    </svg>
    </div>
    <p className='my-4'>
      350,000 ĐỒNG / <span className='font-bold text-orange-500'>360 ngày sử dụng</span>
    </p>
    <div className="text-center">
      {auth.pay == 1 ? <span className='font-bold text-[#ff9933]'>Đã thanh toán</span> : <button className="p-1 bg-red-500 rounded text-white hover:bg-white hover:text-blue-500 border-[1px] border-red-600 font-bold hover:text-red-500" onClick={()=>handlonClick()}>Thanh toán</button>}
           
          </div>
    <div>
       {isModal && <PopupPayment closeModal={setIsModal} />}
       
    </div>
  </div>
  )
}

export default BoxPayment