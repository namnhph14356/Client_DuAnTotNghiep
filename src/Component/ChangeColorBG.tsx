import React, { useState } from 'react'

type Props = {}

const ChangeColorBG = ({getColor}) => {
    const [color, setColor] = useState('')
    const handleColor = (e:any) => {
        const {value} = e.target;
        console.log(value);
        setColor(value);
        getColor(value);
    }
  return (
    <div>
        <kbd className='colorChange__label'>Change corlor background</kbd>
        <input type="text"
        className='colorChange'
        onChange={handleColor}
        value={color}
        />
    </div>
  )
}

export default ChangeColorBG