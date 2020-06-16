import React, { Component } from 'react';
import './SongMini.css';

class SongMini extends Component {

    state = {
        formVisible: true,
        difficultyColors: ['#77eb34', '#dfeb34', '#eb9634', '#db2e2e', '#5c160b'],
    }

    getArt = () => {
        return <img src={this.props.song.album_art_url}></img>
    }

    getDetails = () => {
        return <div>
            <h1 id="song-title">{this.props.song.title}</h1>
            <h2 id="song-artist">{this.props.song.artist}</h2>
        </div>
    }

    getDifficultyRating = (mode) => {
        let styles = {color: this.getColor(mode)}

        let level = this.props.song.standard.diff.level
        if (mode === "simple") {
            level = this.props.song.simple.diff.level
        }
            
        return <div id="rating" style={styles}>
            {level}
        </div> 
    }

    getColor = (mode) => {
        let index = this.props.song.standard.diff.index
        if (mode === "simple")
            index = this.props.song.simple.diff.index

        return this.state.difficultyColors[index]
    }

    formatTime = () => {
        return (this.props.milliseconds / 1000).toFixed(2)
    }

    render() {
        return <div className="SongMini">
            {this.getArt()}
            <div className="mini-details">
                <div>
                    {this.getDetails()}
                </div>
                <div>
                    <div>{this.props.mode.charAt(0).toUpperCase() + this.props.mode.slice(1)}</div>
                    {this.getDifficultyRating(this.props.mode)}
                </div>
                <h1 className="timer">
                    {this.formatTime()}
                </h1>
            </div>
        </div>
    }

}

export default SongMini
