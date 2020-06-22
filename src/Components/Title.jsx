import React, { Component } from 'react';
import './Title.scss'

class Title extends Component{
    render(){
        return <div className="Title rainbow">
            <h2 onClick={this.props.backHome}>TYPESYNC</h2>
        </div>
    }
}

export default Title;
