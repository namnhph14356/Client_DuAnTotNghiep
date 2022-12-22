import React from 'react'
import { Outlet } from 'react-router-dom'
import ChooseClass from '../../components/AdverDeatil/ChooseClass'
import MenuAdverDeatil from '../../components/AdverDeatil/MenuAdverDeatil'

const DetailLearningLayout = () => {
  return (
    <div className='w-10/12 m-auto xl:grid xl:grid-cols-12 xl:gap-8 py-16'>
      <div className='col-span-9 w-full ml-auto mb-8'>
        <Outlet />
      </div>
      <div className='col-span-3 '>
        <div className='menuAdverDeatil'>
          <MenuAdverDeatil />
        </div>
        <ChooseClass />
      </div>
    </div>
  )
}

export default DetailLearningLayout