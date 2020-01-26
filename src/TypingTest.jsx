import React, { Component } from 'react';
import './TypingTest.css'
import UserSubmitScore from './UserSubmitScore';
import ProgressBar from './Components/ProgressBar';

class TypingTest extends Component {

  constructor() {
    super()
    this.state = {
      currentString: "",
      nextString: "",
      typingString: "",
      victoryMessage: "Enter Your Name Below to Earn Your Place on the Leaderboard!",
      classOfText: "good",
      stringArray: [],
      showVictory: false,
      showLines: true,
      milliseconds: 0,
      startTyping: false,
      userUserSubmitScoreVisible: false,
      songUUID: "fakeUUID",
      songCharLength: 19,
      typedChars: 0,
    }

  }

  componentDidMount() {
    let songLines = this.props.songArray
    let newCurrent = songLines.shift()
    let newNext = songLines.shift()
    this.setState({
      currentString: newCurrent,
      nextString: newNext,
      stringArray: songLines,
      songLineLength: this.props.songArray.length,
      songCharLength: this.props.songInfo.total_char
    })
  }

  checkRenderBad = () => {
    if (this.state.typingString !== this.state.currentString.substring(0, this.state.typingString.length))
      this.setState({ classOfText: "bad",})
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
          typedChars:this.state.typedChars+1,
        })
      } else {
        ev.preventDefault()
        this.setState({
          currentString: newCurrentLine,
          nextString: "", typingString: "", classOfText: "good",typedChars:this.state.typedChars+1,
        })
      }
    } else {
      ev.preventDefault()
      clearInterval(this.timer)
      this.setState({ currentString: "", typingString: "", showLines: false, showVictory: true, userSubmitScoreVisible: true,typedChars:this.state.typedChars+1 })
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
    if (this.state.startTyping){
      if(this.state.typingString.length>=ev.target.value.length){
        this.setState({typedChars:this.state.typedChars-1})
      }else{
        this.setState({typedChars:this.state.typedChars+1})
      }
      this.setState({ typingString: ev.target.value }, this.checkRenderBad)
    } 
    else {
      this.timer = setInterval(() => { this.setState({ milliseconds: (this.state.milliseconds + 1) }) }, 10)
      this.setState({ typingString: ev.target.value, startTyping: true,typedChars:1}, this.checkRenderBad)
    }
  }

  handleKeyPress = (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ' || ev.key === this.state.currentString.charAt(this.state.currentString.length - 1)) {
      this.checkLine(ev)
    }
  }

  createUserSubmitScore = () => {
    if (this.state.userSubmitScoreVisible)
      return (<UserSubmitScore scoreTime={this.state.milliseconds} songUUID={this.props.songInfo.genius_id} />)
    else return (<div />)
  }

  render() {
    return (
      <div className="TypingTest">

        {(this.state.milliseconds / 100).toFixed(1)} 

        <input 
          autoComplete="off" 
          id="typingField" 
          className={this.state.classOfText} 
          onPaste={(e)=> {e.preventDefault(); return false;}} 
          type="text" 
          name="typing"
          autoFocus 
          placeholder="Type here..."
          value={this.state.typingString}
          onKeyPress={this.handleKeyPress}
          onChange={this.handleChangeTypingString}
        />
        <ProgressBar id="progress-bar" percentage={100>this.state.typedChars / this.state.songCharLength * 100?this.state.typedChars / this.state.songCharLength * 100:100} />

        <div hidden={!this.state.showLines}>
          <div id="top-line" className="displayText">
            {this.state.currentString}
          </div>
          <div id="bot-line" className="displayText">
            {this.state.nextString}
          </div>
        </div>
        
        <div hidden={!this.state.showVictory} id="victoryText">
          {this.state.victoryMessage}
        </div>
        
        <div>
          {this.createUserSubmitScore()}
        </div>

      </div>

    );
  }
}

export default TypingTest;

