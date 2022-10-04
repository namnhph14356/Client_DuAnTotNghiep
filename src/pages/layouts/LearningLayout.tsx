import React from 'react'
import { Outlet } from 'react-router-dom'
import AdverDeatil from '../../components/AdverDeatil'
import ExeWriteAndListen from '../ExeWriteAndListen'

const LearningLayout = () => {
  return (
    <div className='w-10/12 m-auto grid grid-cols-12 gap-8 py-16'>
      <div className='col-span-9 w-full ml-auto'>
        <Outlet />
      </div>
      <div  className='col-span-3 '>
        <AdverDeatil/>
      </div>
    </div>
  )
}

export default LearningLayout