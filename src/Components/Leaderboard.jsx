import React, { Component } from 'react';
import './Leaderboard.css';

class Leaderboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            id: 0,
        }
    }

    componentDidMount() {
        let id = this.props.song.genius_id
        let mode = this.props.mode
        let url = "http://127.0.0.1:8080/leaderboards/" + id + "/mode/" + mode + "/limit/10"

        fetch(url, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response["results"])
            this.setState({persons: response["results"]})
        })

     }

    render = () => {

        let list = this.state.persons;
        if (list.length === 0) {
            return <div id="empty">
                {/* Be the first to complete this song! */}
            </div>
        } else {
            return <table id="leaderboard">
                <tbody>
                <tr>
                    <th colspan="4" >{this.props.mode.charAt(0).toUpperCase() + this.props.mode.slice(1)}</th>
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
                        <td>{new Date(parseInt(value.milliseconds)).toDateString()}</td>
                        <td>{(value.time/1000).toFixed(2)}</td>
                    </tr>
                })}
                </tbody>
            </table>
        }
        
    }

}

export default Leaderboard
