import React, { Component } from 'react';

class UserSubmitScore extends Component {

    state = { URL: 'http://34.74.220.91:8080', }

    submitUserScore = (ev) => {
        ev.preventDefault()
        fetch(this.state.URL + '/score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ genius_id: this.props.songUUID, name: ev.target.userName.value, time: this.props.scoreTime }),
        }).then(() => {
            this.props.hideStats()
            this.props.hideVictory()
            this.props.generateLeaderboard()
            this.props.destroyUserSubmitScore()
            this.props.generateSearchBars()
        }
        )

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