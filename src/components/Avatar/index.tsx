import React from 'react'
import { convertUsername } from '../../services/user'

type AvatarProps = {
  image: string,
  className?:string
}

type AvatarDefaultProps = {
  name: string,
  color: string,
  className?:string
}

export const Avatar = ({ image, className }: AvatarProps) => {
  return (
    <div>
      <img src={image} alt="" className={`m-auto rounded-full ${className} `} />
    </div>
  )
}

export const AvatarDefault = ({ name, color, className }: AvatarDefaultProps) => {
  return (
    <div className={`rounded-full`} style={{ background: `${color}` }}>
      <div className={`m-auto ${className} flex justify-center items-center `}>{convertUsername(String(name))}</div>
    </div>
  )
}
