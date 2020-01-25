import React, { Component } from 'react';
class TypingTest extends Component {

  constructor() {
    super()
    this.state = {
      currentString: "abc def",
      typingString: "",
      victoryMessage: "You are a winner!",
    }

  }

  checkWin = () =>{
    if(this.state.currentString===this.state.typingString)
      alert(this.state.victoryMessage)
  }

  handleChangeTypingString = (ev) => {
    this.setState({ typingString: ev.target.value },this.checkWin)
  }


  render() {
    return (
      <div className="TypingTest">
        {this.state.currentString}
        <form>
          <input type="text" name="typing"
            autoFocus placeholder="Type Here... "
            value={this.state.typingString}
            onChange={this.handleChangeTypingString}
          />
        </form>
      </div>

    );
  }
}

export default TypingTest;
