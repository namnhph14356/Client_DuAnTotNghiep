import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { vnpay_return } from '../../../api/vnpay'

type Props = {}

const VnpayReturn = (props: Props) => {

  const [data, setData] = useState()
  
  useEffect(() => {
    const getData = async () => {
        const {data} = await vnpay_return(); 
        setData(data)
    }
    getData();
  },[])
  console.log(data);
  
  return (
    <div className=''>
         <div className="w-8/12 m-auto mt-16 border-l-[5px] pl-4 border-[#ff9933]">
         
      <div className='mt-8'>
        <h1 className="text-3xl text-center text-[#167AC6]">Hóa đơn thanh toán thành công</h1>

      </div>
    </div>
    </div>
  )
}

export default VnpayReturn