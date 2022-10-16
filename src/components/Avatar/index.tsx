import React from 'react'
import { convertUsername } from '../../services/user'

type AvatarProps = {
  image: string,
  className?:string
}

export const Avatar = ({ image, className }: AvatarProps) => {
  return (
    <div>
      <img src={image} alt="" className={`m-auto rounded-full ${className} `} />
    </div>
  )
}

