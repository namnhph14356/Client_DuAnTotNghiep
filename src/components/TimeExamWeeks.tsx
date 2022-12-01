/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from 'react'

type TimerProps = {
  seconds: number,
  stop?: boolean,
  addTime: (time: number) => void
}
const TimeExamWeeks = ({ seconds, stop, addTime }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(seconds);

  useEffect(() => {
    if (timeLeft === 0) {
      return addTime(0)
    }
    
    if (stop === true) {
      return addTime(Number(timeLeft))
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);

  }, [timeLeft]);

  return (
    <div>
      <span className="text-white mt-2 ">{timeLeft}</span>
    </div>
  )
}

export default TimeExamWeeks