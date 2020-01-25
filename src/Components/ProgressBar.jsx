import React, { Component } from 'react';
import './ProgressBar.css'
class ProgressBarExample extends Component {

    constructor(props) {
        super(props)

        this.state = {
            percentage: 0
        }

    }
    componentWillReceiveProps(prevProps){
        if(prevProps.percentage !== this.props.percentage){
            this.setState({          
                percentage: this.props.percentage
            },()=>{console.log(this.state.percentage)});
        }
    }


    render() {
        return (
            <ProgressBar percentage={this.state.percentage} />
        )
    }

}

const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
            <Filler percentage={props.percentage} />
        </div>
    )
}

const Filler = (props) => {
    return <div className="filler" style={{ width: `${props.percentage}%` }} />
}

export default ProgressBar
