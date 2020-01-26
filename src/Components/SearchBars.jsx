import React, { Component } from 'react';
import './SearchBars.css';

class SearchBars extends Component {

    constructor(props){
        super(props)
        this.state = {
            title: '',
            artist: '',
            URL: 'http://34.74.220.91:8080'
        }
    }
    

    handleSubmit = (ev) => {
        ev.preventDefault()

        let reqPath = "/lyrics/artist/" + this.state.artist.replace(/ /g, "|") + "/title/" + this.state.title.replace(/ /g, "|")
        fetch(this.state.URL + reqPath, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }).then((response) => {
            return response.json();
        }).then((myJson) => {
            if (myJson["status"] === "found") {
                this.props.discovery(myJson)
            }
            else this.props.discovery({ status: "not" })
        }).catch(() => {
            this.props.discovery({ status: "not" })
        })

    }

    handleChangeTitle = (ev) => {
        this.setState({ title: ev.target.value })
    }

    handleChangeArtist = (ev) => {
        this.setState({ artist: ev.target.value })
    }
    render() {
        return <div className="HomeScreen">
            <form onSubmit={this.handleSubmit}>
                <input className="flex-item" id="song-box" type="text" name="title"
                    autoFocus
                    placeholder="Song Title"
                    value={this.state.title}
                    onChange={this.handleChangeTitle}
                />
                <input className="flex-item" id="artist-box" type="text" name="rule"
                    placeholder="Artist Name"
                    value={this.state.body}
                    onChange={this.handleChangeArtist}
                />
                <button className="flex-item" id="search-button" type="submit" >Search!</button>
            </form>
        </div>
    }
}

export default SearchBars;