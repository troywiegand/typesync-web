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
      stringArray: ["tuv"]
    }

  }

  checkRenderBad = () => {
    if (this.state.typingString !== this.state.currentString.substring(0, this.state.typingString.length))
      this.setState({ classOfText: "bad" })
    else this.setState({ classOfText: "good" })
  }

  checkLine = () => {
    if (this.state.currentString === this.state.typingString) {
      let newCurrentLine=""
      let newNextLine=""
      let currentStuff=""
      if (this.state.nextString!==""){
        newCurrentLine = this.state.nextString
        if(this.state.stringArray.length>0){
          currentStuff=this.state.stringArray
          newNextLine=currentStuff.shift()
          this.setState({currentString: newCurrentLine, 
                        nextString:newNextLine,
                        stringArray:currentStuff,
                        typingString: ""})
        }else{
          this.setState({currentString: newCurrentLine, 
            nextString:"", typingString: ""})
        }
      }else{
        alert(this.state.victoryMessage)
      }
      
    }
  }

  checkAllTheThings = () => {
    this.checkLine()
    this.checkRenderBad()
  }

  handleChangeTypingString = (ev) => {
    this.setState({ typingString: ev.target.value }, this.checkAllTheThings)
  }


  render() {
    return (
      <div className="TypingTest">
        <br />
        <div style={divStyle}>
          <input autoComplete="off" id="typingField" className={this.state.classOfText} type="text" name="typing"
            autoFocus placeholder="Type Here... "
            value={this.state.typingString}
            onChange={this.handleChangeTypingString}
          />
          <br />
          <div className="displayText">
            {this.state.currentString}
          </div>
          <br />
          <div className="displayText">
            {this.state.nextString}
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