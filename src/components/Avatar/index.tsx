import React from 'react'
import { convertUsername } from '../../services/user'

type AvatarProps = {
  name?: string,
  image?: string,
  color?:string
}
const Avatar = ({ name, image, color }: AvatarProps) => {
  return (
    <div>
      {
        image ?
          <div className='flex rounded-full bg-red-600 text-white h-8 w-8 '>
            <img src={image} alt="" className='m-auto text-xs rounded-full' />
          </div>
          :
          <div className='flex rounded-full  text-white h-8 w-8' style={{background:`${color}`}}>
            <span className='m-auto text-xs'>{convertUsername(String(name))}</span>
          </div>
      }

    </div>
  )
}

export default Avatar