import React, { Component } from 'react';
import './Karaoke.scss'
import ProgressBar from './ProgressBar';

class Karaoke extends Component {

    constructor(props) {
        super(props)

        let lyrics = []
        let totalChar = 0
        if (props.mode === "standard") {
            lyrics = Array.from(props.song.standard.lyrics)
            totalChar = props.song.standard.stats.total
        } else {
            lyrics = Array.from(props.song.simple.lyrics)
            totalChar = props.song.simple.stats.total
        }
        
        let totalLyrics = lyrics.length
        let currentLyric = lyrics.shift()
        let nextLyric = lyrics.shift()

        this.state = {
            currentLyric,
            nextLyric,
            lyrics,
            totalChar,
            totalLyrics,

            typingBuffer: "",
            accurate: true,
            hasStarted: false,
            keyPressCount: 0,
        }
    }

    accuracyCheck = () => {
        let expected = this.state.currentLyric.substring(
            0, this.state.typingBuffer.length)
        this.setState({ 
            accurate: this.state.typingBuffer === expected,
        })
    }

    // Advances the lyrics or calls callback for test completion
    advanceLyric = () => {
        // Reset buffer
        this.setState(state => ({
            typingBuffer: "",
            accurate: true,
            keyPressCount: state.keyPressCount + state.typingBuffer.length + 1,
        }))

        let lyrics = this.state.lyrics
        if (lyrics.length === 0) {
            // No lyrics left in buffer
            if (this.state.nextLyric === "") {
                // No more lyrics to type, test over!
                this.props.testComplete()
            } else {
                // One lyric left
                this.setState(state => ({
                    lyrics,
                    currentLyric: state.nextLyric,
                    nextLyric: "",
                }))
            }
        } else {
            // Lyrics still left in buffer
            let nextLyric = lyrics.shift()
            this.setState(state => ({
                lyrics,
                currentLyric: state.nextLyric,
                nextLyric,
            }))
        }
    }

    // Updates typing buffer, calls accuracy check, starts timer
    readInput = (ev) => {
        if (!this.state.hasStarted) {
            this.props.startTimer()
            this.setState({ 
                hasStarted: true, 
            })
        }
        this.setState({ 
            typingBuffer: ev.target.value 
        }, this.accuracyCheck)
    }

    // Calls advance lyrics if the lyric is finished and the user
    // pressed space or enter at the end of the line, the exception
    // is the final line in the test
    onKeyPress = (ev) => {
        let ready = this.lyricFinished(ev.key)
        if (ready && (
            ev.key === ' ' 
                || ev.key === 'Enter' 
                || this.state.nextLyric === "")) {
            ev.preventDefault()
            this.advanceLyric()
        }
    }

    // Returns if the lyric is finished and accurate
    // A lyric is "done" when the typing buffer equals the current lyrics
    // and the user presses enter or space. The exception to this
    // is when its the final lyric, where the lyric is done without needing
    // a space or enter
    lyricFinished = (key) => {
        let lastFinished = this.state.nextLyric === "" 
            && this.state.typingBuffer.concat(key) === this.state.currentLyric
        let finished = this.state.typingBuffer === this.state.currentLyric
        return lastFinished || finished
    }

    currentKeyPress = () => {
        return this.state.keyPressCount + this.state.typingBuffer.length
    }

    totalKeyPress = () => {
        return this.state.totalChar + this.state.totalLyrics - 2
    }

    render() {
        return <div className="Karaoke">

            <input
                autoComplete="off"
                id="typingField"
                className={this.state.accurate ? "good" : "bad"}
                onPaste={e => { e.preventDefault(); return false; }}
                type="text"
                name="typing"
                autoFocus
                placeholder="Type to begin..."
                value={this.state.typingBuffer}
                onKeyPress={this.onKeyPress}
                onChange={this.readInput}
            />

            <ProgressBar 
                id="progress-bar" 
                total={this.totalKeyPress()}
                current={this.currentKeyPress()}
            />

            <div>
                <div id="top-line" className="displayText">
                    {this.state.currentLyric}
                </div>
                <div id="bot-line" className="displayText">
                    {this.state.nextLyric}
                </div>
            </div>

        </div>
    }
}

export default Karaoke

