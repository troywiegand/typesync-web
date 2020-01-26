import React, { Component } from 'react';
import './SongConfirmationPage.css';

class SongConfirmationPage extends Component {

    state={formVisible:true}

    onConfirmationSubmit = (ev) => {
        ev.preventDefault()
        this.props.startTest()
    }

    getArt = () => {
        if (this.props.song.status === "not")
            return <img src="record.png"></img>
        else
            return <img src={this.props.song.album_art_url}></img>
    }

    getDetails = () => {
        if (this.props.song.status === "not")
            return <div>
                <h2>Song not found.</h2>
                <p>Try a different song or check your spelling!</p>
            </div>
        else
            return <div>
                <h1 id="song-title">{this.props.song.title}</h1>
                <h2 id="song-artist">{this.props.song.artist}</h2>
            </div>
    }

    getDifficultyRating = () => {
        if (this.props.song.status === "found") {
            let chars = this.props.song.total_char
            let levels = ['Novice', 'Apprentice', 'Adept', 'Expert', 'Master']
            let colors = ['#77eb34', '#dfeb34', '#eb9634', '#db2e2e', '#5c160b']
            chars = Math.min(5*1200-1, chars)
            let index = Math.floor(chars / 1200);
            let styles = {color: colors[index]}

            return <div id="rating" style={styles}>
                {levels[index]}
            </div> 
        }
    }

    getColor = () => {
        let chars = this.props.song.total_char
        let colors = ['#77eb34', '#dfeb34', '#eb9634', '#db2e2e', '#5c160b']
        chars = Math.min(5*1200-1, chars)
        let index = Math.floor(chars / 1200)
        return colors[index]
    }

    getChars = () => {
        if (this.props.song.status === "found")
            return <div id="chars">{this.props.song.total_char} chars</div>
    }

    goButton = () => {
        if (this.props.song.status === "found" && this.state.formVisible) {
            let color = this.getColor();
            let rect_style = {backgroundColor: color}
            let tri_style = {borderLeftColor: color}
            return <div>
                <div id="go-rectangle" onClick={this.onConfirmationSubmit} style={rect_style}>Start!</div>
                <div id="go-triangle" style={tri_style}></div>
            </div>
        }
    }

    render() {
        return (
            <div className="SongConfirmationPage">
                {this.getArt()}
                <div className="details">
                    {this.getDetails()}
                    <div>
                        {this.getDifficultyRating()}
                        {this.getChars()}
                    </div>
                    {this.goButton()}
                </div>
            </div>
        )
    }

}

export default SongConfirmationPage