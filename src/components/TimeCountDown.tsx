import React, { useState, useEffect } from 'react'
import Countdown from 'react-countdown';
import { Progress, Button, Modal, Collapse } from 'antd';
import moment from 'moment';

type TimeCountdownProps = {
    time: number,
    reset: any
}

const TimeCountdown = ({ time, reset }: TimeCountdownProps) => {
    //---TimeLimitCountdown---
    //Đếm ngược thời gian làm 
    const [state, setState] = useState<any>()
    const renderer = ({ hours, minutes, seconds, completed }) => {
        return <span>{seconds}</span>;
    };

    useEffect(() => {
        setState(Date.now() + time)
    }, [time, reset])

    return <Countdown
        // date={Date.now() + 7000}
        date={state}
        renderer={renderer}
    />
}

export default React.memo(TimeCountdown)