import React, { useEffect, useState } from 'react'

type TimerProps = {
    seconds: number
}

const Timer = ({ seconds }: TimerProps) => {
    const [timeLeft, setTimeLeft] = useState<number>(seconds);

    useEffect(() => {
        if(timeLeft === 0){
            setTimeLeft(seconds)
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
    );
};

export default Timer