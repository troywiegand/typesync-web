import React, { Component } from 'react';
import './Title.css'

class Title extends Component{

    render(){
        return(
            <div className="Title rainbow">
            <h2 onClick={() => {window.location.href="/"}}>TYPESYNC</h2>
            </div>
        )
    }
}

export default Title;