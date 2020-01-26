import React, { Component } from 'react';
import './TypingTest.css'
import ProgressBar from './Components/ProgressBar';

class TypingTest extends Component {

  constructor() {
    super()
    this.state = {
      currentString: "",
      nextString: "",
      typingString: "",
      classOfText: "good",
      stringArray: [],
      milliseconds: 0,
      startTyping: false,
      songCharLength: 19,
      typedChars: 0,
    }

  }

  componentDidMount() {
    let dups = []
    for (let i = 0; i < this.props.song.lyrics.length; i++) {
      dups.push(this.props.song.lyrics[i])
    }
    console.log(this.props.song.lyrics)
    let songLines = dups
    let newCurrent = songLines.shift()
    let newNext = songLines.shift()
    this.setState({
      currentString: newCurrent,
      nextString: newNext,
      stringArray: songLines,
      songCharLength: this.props.song.total_char,
    })
    console.log(this.props.song.lyrics)
  }

  checkRenderBad = () => {
    if (this.state.typingString !== this.state.currentString.substring(0, this.state.typingString.length))
      this.setState({ classOfText: "bad" })
    else this.setState({ classOfText: "good" })
  }

  goodLine = (ev) => {
    let newCurrentLine = ""
    let newNextLine = ""
    let currentStuff = ""
    if (this.state.nextString !== "") {
      newCurrentLine = this.state.nextString
      if (this.state.stringArray.length > 0) {
        currentStuff = this.state.stringArray
        newNextLine = currentStuff.shift()
        ev.preventDefault()
        this.setState({
          currentString: newCurrentLine,
          nextString: newNextLine,
          stringArray: currentStuff,
          typingString: "",
          classOfText: "good",
          typedChars: this.state.typedChars + 1,
        })
      } else {
        ev.preventDefault()
        this.setState({
          currentString: newCurrentLine,
          nextString: "", typingString: "", classOfText: "good", typedChars: this.state.typedChars + 1,
        })
      }
    } else {
      ev.preventDefault()
      clearInterval(this.timer)
      this.setState({ currentString: "", typingString: "", typedChars: this.state.typedChars + 1})
      this.props.testComplete(this.state.milliseconds)
    }
  }

  checkLine = (ev) => {
    if (this.state.nextString === "" && this.state.currentString.substring(0, this.state.currentString.length - 1) === this.state.typingString) {
      this.goodLine(ev)
    }
    else if (this.state.currentString === this.state.typingString || (this.state.typingString.charAt(this.state.typingString.length - 1) === " " && this.state.currentString === this.state.typingString.substring(0, this.state.typingString.length - 2))) {
      this.goodLine(ev)
    }
  }


  handleChangeTypingString = (ev) => {
    if (this.state.startTyping) {
      if (this.state.typingString.length >= ev.target.value.length) {
        this.setState({ typedChars: this.state.typedChars - 1 })
      } else {
        this.setState({ typedChars: this.state.typedChars + 1 })
      }
      this.setState({ typingString: ev.target.value }, this.checkRenderBad)
    }
    else {
      this.setState({startTime: Date.now()})
      this.timer = setInterval(() => { this.setState({ milliseconds: Date.now() - this.state.startTime}) }, 1)
      this.setState({ typingString: ev.target.value, startTyping: true, typedChars: 1 }, this.checkRenderBad)
    }
  }

  handleKeyPress = (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ' || ev.key === this.state.currentString.charAt(this.state.currentString.length - 1)) {
      this.checkLine(ev)
    }
  }

  render() {
    return (
      <div className="TypingTest">

        {(this.state.milliseconds / 1000).toFixed(1)}

        <input
          autoComplete="off"
          id="typingField"
          className={this.state.classOfText}
          onPaste={(e) => { e.preventDefault(); return false; }}
          type="text"
          name="typing"
          autoFocus
          placeholder="Type here..."
          value={this.state.typingString}
          onKeyPress={this.handleKeyPress}
          onChange={this.handleChangeTypingString}
        />

        <ProgressBar 
          id="progress-bar" 
          percentage={
            100 > this.state.typedChars / this.state.songCharLength * 100 
            ? this.state.typedChars / this.state.songCharLength * 100 
            : 100 } 
        />

        <div>
          <div id="top-line" className="displayText">
            {this.state.currentString}
          </div>
          <div id="bot-line" className="displayText">
            {this.state.nextString}
          </div>
        </div>

      </div>
    );
  }
}

export default TypingTest;

