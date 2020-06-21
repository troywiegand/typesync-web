import React from 'react';
import './ProgressBar.scss'

const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
            <Filler percentage={
                100 > props.current / props.total * 100 
                ? props.current / props.total * 100 
                : 100
            } />
        </div>
    )
}

const Filler = (props) => {
    return <div className="filler" style={{ width: `${props.percentage}%` }} />
}

export default ProgressBar
