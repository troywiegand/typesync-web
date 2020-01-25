import React, { Component } from 'react';

class UserSubmitScore extends Component {

    submitUserScore = (ev) => {
        ev.preventDefault()
        alert("Do a POST: " + ev.target.userName.value + this.props.scoreTime + this.props.songUUID)
        this.setState({ showLeaderboard: true, showUserForm: false })
    }

    render() {
        return (
            <div className="UserSubmitScore">
                <form onSubmit={this.submitUserScore}>
                    <input type="text" name="userName" autoComplete="off" placeholder="Enter your name:" />
                </form>
            </div>
        )
    }

}

export default UserSubmitScore;