import React, { useState,useEffect } from 'react'
import Countdown from 'react-countdown';
import { Progress, Button, Modal, Collapse } from 'antd';
import moment from 'moment';

type TimeCountdownProps = {
    time: number,

}

const TimeCountdown = ({ time }: TimeCountdownProps) => {
    const [timeLimit2, setTimeLimit2] = useState<number>(time)
    const Completionist = () => <span>You are good to go!</span>;
    let timeLimit = 100
    let point = 1000
    let timeCurrent = ""
    const [state, setState] = useState<number>()


    const renderer = ({ total, hours, minutes, seconds, milliseconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {

            let tempTime = moment.duration(120000);
            // console.log("minutes", tempTime.minutes());
            // console.log("seconds", tempTime.seconds());
            const total = (1 / (tempTime.minutes() * 60) + tempTime.seconds()) * 100
            const total2 = (1 / (tempTime.minutes() * 60) + tempTime.seconds()) * 1000
            timeLimit = timeLimit - total
            point = point - total2
            if (timeLimit === 0) {
                timeLimit = 100;
            }

            timeCurrent = `${minutes}:${seconds}`


            return <div className="">
                <Progress
                    strokeColor={{
                        from: '#108ee9',
                        to: '#87d068',
                    }}
                    percent={timeLimit}
                    status="active"
                    className="!mt-[3px] !h-4 !text-white "
                    showInfo={false}
                />

            </div>
        }
    };

    useEffect(()=>{
        setState(Date.now() + time)
    },[time])

    return (
        <div>
            <Countdown
                date={state}
                // ref={setRef}
                key={state}
                // ref={ref}
                renderer={renderer}
                autoStart={true}
            />
            {/* <Countdown
                date={Date.now() + timeLimit2}

                renderer={renderer}
            /> */}
        </div>
    )
}

export default React.memo(TimeCountdown)