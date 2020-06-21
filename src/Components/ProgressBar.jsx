import React from 'react';
import './ProgressBar.scss'

const ProgressBar = (props) => {
    let percent = props.current / props.total * 100
    percent = percent > 100 ? 100 : percent
    return (
        <div className="progress-bar">
            <Filler percent={percent}/>
        </div>
    )
}

const Filler = (props) => {
    return <div className="filler" style={{ width: `${props.percent}%` }} />
}

export default ProgressBar
