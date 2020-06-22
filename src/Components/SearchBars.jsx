import React, { Component } from 'react';
import './SearchBars.scss';

class SearchBars extends Component {

    constructor(props){
        super(props)
        this.state = {
            title: '',
            artist: '',
            searching: false,
        }
    }
    

    handleSubmit = (ev) => {
        ev.preventDefault()

        this.setState({ searching: true })

        let reqPath = "/lyrics/artist/" + this.state.artist.replace(/ /g, "|") + "/title/" + this.state.title.replace(/ /g, "|")
        fetch(this.props.api_url + reqPath, {
            method: "GET",
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then((response) => {
            this.setState({ searching: false })
            return response.json();
        }).then((myJson) => {
            if (myJson["status"] === "found") {
                let radios = document.querySelectorAll("input[type=radio]")
                let array = Array.prototype.slice.call(radios)
                array.forEach(radio => radio.checked = false)
                this.props.discovery(myJson)
            }
            else this.props.discovery({ status: "not" })
        }).catch(() => {
            this.setState({ searching: false })
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
            <button className="search-button" type="submit" >
                { this.state.searching ? "Searching..." : "Search!" }
            </button>
        </form>
    }
}

export default SearchBars;
