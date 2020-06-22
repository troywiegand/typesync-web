import React, { Component } from 'react';
import './Leaderboard.scss';

class Leaderboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            id: 0,
        }
    }

    fetchLeaderboards() {
        let id = this.props.song.genius_id
        let mode = this.props.mode
        let url = this.props.api_url + "/leaderboards/" + id + "/mode/" + mode + "/limit/10"

        fetch(url, {
            method: "GET",
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((response) => {
            return response.json()
        }).then((response) => {
            this.setState({
                id,
                persons: response["results"],
            })
        })
    }

    render = () => {
        if (this.state.id !== this.props.song.genius_id)
            this.fetchLeaderboards()

        let list = this.state.persons;
        if (list.length === 0) {
            return <table id="leaderboard">
                <tbody>
                    <tr>
                        <th colSpan="4">{this.props.mode.charAt(0).toUpperCase() + this.props.mode.slice(1)}</th>
                    </tr>
                    <tr>
                        <td colSpan="4">Be the first to complete this song in {this.props.mode} mode!</td>
                    </tr>
                </tbody>
            </table>
        } else {
            return <table id="leaderboard">
                <tbody>
                <tr>
                    <th colSpan="4">{this.props.mode.charAt(0).toUpperCase() + this.props.mode.slice(1)}</th>
                </tr>
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
                        <td>{new Date(parseInt(value.milliseconds, 10)).toDateString()}</td>
                        <td>{(value.time/1000).toFixed(2)}</td>
                    </tr>
                })}
                </tbody>
            </table>
        }
    }
}

export default Leaderboard
