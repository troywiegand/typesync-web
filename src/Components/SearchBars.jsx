import React, { Component } from 'react';
import './SearchBars.scss';

class SearchBars extends Component {

    constructor(props){
        super(props)
        this.state = {
            title: '',
            artist: '',
        }
    }
    

    handleSubmit = (ev) => {
        ev.preventDefault()

        let reqPath = "/lyrics/artist/" + this.state.artist.replace(/ /g, "|") + "/title/" + this.state.title.replace(/ /g, "|")
        fetch(this.props.api_url + reqPath, {
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
        return <form className="search-box" onSubmit={this.handleSubmit}>
            <input id="song-box" type="text" name="title"
                autoFocus
                placeholder="Song Title"
                value={this.state.title}
                onChange={this.handleChangeTitle}
            />
            <input id="artist-box" type="text" name="rule"
                placeholder="Artist Name"
                value={this.state.body}
                onChange={this.handleChangeArtist}
            />
            <button className="search-button" type="submit" >Search!</button>
        </form>
    }
}

export default SearchBars;
