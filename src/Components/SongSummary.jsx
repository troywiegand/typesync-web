import React, { Component } from 'react';
import './SongSummary.scss';

class SongSummary extends Component {

    state = {
        formVisible: true,
        mode: null,
        difficultyColors: ['#77eb34', '#dfeb34', '#eb9634', '#db2e2e', '#5c160b'],
    }

    onConfirmationSubmit = (ev) => {
        ev.preventDefault()
        this.setState({formVisible: false})
        this.props.startTest(this.state.mode)
    }

    getArt = () => {
        return <img alt="album art" src={this.props.song.album_art_url}></img>
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

    getChars = (mode) => {
        let total = this.props.song.standard.stats.total
        if (mode === "simple")
            total = this.props.song.simple.stats.total
        let diff = this.props.song.standard.diff.raw_level
        if (mode === "simple")
            diff = this.props.song.simple.diff.raw_level

        return <div className="stats">
            <div>{total} chars</div>
            <div>level {diff} song</div>
        </div>
    }

    goButton = () => {
        if (this.props.song.status === "found" && this.state.formVisible) {
            let color = this.getColor(this.state.mode)
            let rect_style = {backgroundColor: color}
            let tri_style = {borderLeftColor: color}
            let show = {visibility: this.state.mode === null ? "hidden" : "visible"}
            return <div style={show}>
                <div id="go-rectangle" onClick={this.onConfirmationSubmit} style={rect_style}>
                    Start!
                    <div id="go-triangle" style={tri_style}></div>
                </div>
            </div>
        }
    }

    onModeSelect = (ev) => {
        console.log(ev.target)
        this.setState({ mode: ev.target.value })

        let simple = ev.target.parentNode.parentNode.querySelector("input[value='simple']").parentNode
        let standard = ev.target.parentNode.parentNode.querySelector("input[value='standard']").parentNode

        if (ev.target.value === "standard") {
            simple.classList.remove("selected")
            standard.classList.add("selected")
            standard.style.borderColor = this.getColor("standard")
            simple.style.borderColor = "white"
        } else {
            simple.classList.add("selected")
            standard.classList.remove("selected")
            simple.style.borderColor = this.getColor("simple")
            standard.style.borderColor = "white"
        }
    }

    getModeOption = (modename) => {
        return <label className="mode">
            <input type="radio" name="mode" value={modename} />
            <div>{modename.charAt(0).toUpperCase() + modename.slice(1)}</div>
            {this.getDifficultyRating(modename)}
            {this.getChars(modename)}
        </label>
    }

    render() {
        if (this.props.song.status === "not") {
            return <div className="SongSummary">
                <img alt="not found!" src="record.png"></img>
                    <div className="details">
                        <h2>Song not found.</h2>
                        <p>Try a different song or check your spelling!</p>
                    </div>
                </div>
        } else {
            return <div className="SongSummary">
                {this.getArt()}
                <div className="details">
                    {this.getDetails()}
                    <form className="modes" onChange={this.onModeSelect}>
                        {this.getModeOption("standard")}
                        {this.getModeOption("simple")}
                    </form>
                </div>
                {this.goButton()}
            </div>
        }
    }

}

export default SongSummary
