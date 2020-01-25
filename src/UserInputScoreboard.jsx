import React, { Component } from 'react';

class UserInputScoreboard extends Component {

    state = {
        showLeaderboard: false,
        showUserForm: true
    }

    submitUserScore = (ev) => {
        ev.preventDefault()
        alert("Do a POST: "+ev.target.userName.value + this.props.scoreTime+this.props.songUUID)
        this.setState({ showLeaderboard: true, showUserForm: false })
    }

    makeLeaderboard = () => {
        if (this.state.showLeaderboard) {
            return (<div>Here's the scores</div>)
        } else return (<div></div>)
    }

    makeForm = () => {
        if (this.state.showUserForm) {
            return (<form onSubmit={this.submitUserScore}>
                <input type="text" name="userName" autoComplete="off" autoFocus placeholder="Enter your name:" />
            </form>)
        } else { return (<div></div>) }
    }

    render() {
        return (
            <div className="UserInputScoreboard">
                {this.makeForm()}
                {this.makeLeaderboard()}
            </div>
        )
    }

}

export default UserInputScoreboard;