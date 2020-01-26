import React, { Component } from 'react';

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
                <form onSubmit={this.submitUserScore}>
                    <input type="text" name="userName" autoComplete="off" placeholder="Enter your name:" />
                </form><div hidden={!this.state.showVictory} id="victoryText">
                {this.state.victoryMessage}
                </div>
            </div>
        )
    }

}

export default UserSubmitScore;