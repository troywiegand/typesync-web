import React, { Component } from 'react';
import './Leaderboard.css';

class Leaderboard extends Component {

    state = {
        persons: []
    }

    componentDidMount() {

        let id = this.props.song.genius_id;
        let url = "http://34.74.220.91:8080/leaderboards/" + id + "/limit/10"

        fetch(url, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => {
            return response.json()
        }).then((response) => {
            this.setState({persons: response["results"]})
        })
    }

    render() {

        let list = this.state.persons;
        console.log(this.state.persons)

        if (list.length === 0) {
            return <div id="empty">
                Be the first to complete this song!
            </div>
        } else {
            return <table id="leaderboard">
                <tbody>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Completed</th>
                    <th>Time</th>
                </tr>
                {list.map((value, index) => {
                    return <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{value.username}</td>
                        <td>{new Date(value.milliseconds).toDateString()}</td>
                        <td>{(value.time/1000).toFixed(2)}</td>
                    </tr>
                })}
                </tbody>
            </table>
        }
        
    }

}

export default Leaderboard