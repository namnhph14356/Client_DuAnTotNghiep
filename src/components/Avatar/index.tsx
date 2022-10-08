import React from 'react'
import { convertUsername } from '../../services/user'

type AvatarProps = {
  name?: string,
  image?: string
}
const Avatar = ({ name, image }: AvatarProps) => {

  return (
    <div>
      {
        image ?
          <div className='flex rounded-full bg-red-600 text-white h-8 w-8 '>
            <img src={image} alt="" className='m-auto text-xs' />
          </div>
          :
          <div className='flex rounded-full bg-red-600 text-white h-8 w-8 '>
            <span className='m-auto text-xs'>{convertUsername(String(name))}</span>
          </div>
      }

    </div>
  )
}

export default Avatar