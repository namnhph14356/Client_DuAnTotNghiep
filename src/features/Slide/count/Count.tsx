import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increase, increment } from './CountSlide';
const Count = () => {
    const count = useSelector<any,any>(data => data.count.value);
    const dispath = useDispatch();
    console.log(count);
    
  return (
    <div>Count: {count}
    
        <button onClick={() => dispath(increment())}>Increment</button>
        <br />
        <button onClick={() => dispath(decrement())}>Decrement</button>
        <br />
        <button onClick={() => dispath(increase(5))}>Increase</button>
    </div>
  )
}

export default Count