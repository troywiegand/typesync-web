import React, { Component } from 'react';
import './TypingTest.css'
class TypingTest extends Component {

  constructor() {
    super()
    this.state = {
      currentString: "abc def",
      nextString: "xyz",
      typingString: "",
      victoryMessage: "You are a winner!",
      classOfText: "good",
      stringArray: ["tuv"],
      showVictory: false,
      showLines: true,
    }

  }

  checkRenderBad = () => {
    if (this.state.typingString !== this.state.currentString.substring(0, this.state.typingString.length))
      this.setState({ classOfText: "bad" })
    else this.setState({ classOfText: "good" })
  }

  checkLine = (ev) => {
    if (this.state.currentString === this.state.typingString || (this.state.typingString.charAt(this.state.typingString.length - 1) === " " &&
      this.state.currentString === this.state.typingString.substring(0, this.state.typingString.length - 2))) {
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
            classOfText: "good"
          })
        } else {
          ev.preventDefault()
          this.setState({
            currentString: newCurrentLine,
            nextString: "", typingString: "", classOfText: "good"
          })
        }
      } else {
        this.setState({ currentString: "", typingString: "",showLines:false,showVictory:true})
        ev.preventDefault()
      }

    }
  }


  handleChangeTypingString = (ev) => {
    this.setState({ typingString: ev.target.value }, this.checkRenderBad)
  }

  handleKeyPress = (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      this.checkLine(ev)
    }
  }

  render() {
    return (
      <div className="TypingTest">
        <br />
        <div style={divStyle}>
          <input autoComplete="off" id="typingField" className={this.state.classOfText} type="text" name="typing"
            autoFocus placeholder="Type Here... "
            value={this.state.typingString}
            onKeyPress={this.handleKeyPress}
            onChange={this.handleChangeTypingString}

          />
          <br />
          <div hidden={!this.state.showVictory} className="victoryText">
            {this.state.victoryMessage}
          </div>
          <div hidden={!this.state.showLines}>
            <div className="displayText">
              {this.state.currentString}
            </div>
            <br />
            <div className="displayText">
              {this.state.nextString}
            </div>

          </div>

        </div>
      </div>

    );
  }
}

export default TypingTest;

var divStyle = {
  overflow: 'none',
  height: '0px',
  background: 'transparent',
}