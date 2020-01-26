import React, { Component } from 'react'
import './UserSubmitScore.css'

class UserSubmitScore extends Component {

    state = { URL: 'http://34.74.220.91:8080', }

    submitUserScore = (ev) => {
        ev.preventDefault()
        fetch(this.state.URL + '/score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ genius_id: this.props.song.genius_id, name: ev.target.userName.value, time: this.props.scoreTime }),
        }).then(() => {
            this.props.research(this.props.song)
        })

    }

    render() {
        return (
            <div className="UserSubmitScore">
                <div id="victoryText">
                    Finished!
                </div>
                <div id="stats">
                    <div>
                        <div id="wpm">{(this.props.song.total_char * 1000 / this.props.scoreTime).toFixed(1)}</div>
                        wpm
                    </div>
                    <div>
                        <div id="time">{(this.props.scoreTime / 1000).toFixed(2)}</div>
                        time
                    </div>
                </div>
                <form onSubmit={this.submitUserScore}>
                    <input type="text" name="userName" autoComplete="off" placeholder="Enter your name:" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }

}

export default UserSubmitScore;