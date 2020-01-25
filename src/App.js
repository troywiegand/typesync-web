import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TypingTest from './TypingTest';
import HomeScreen from './HomeScreen';

class App extends Component {
  constructor() {
    super()
    this.state = {
      songArray: [],
      searchVisible: true,
      testVisible: false,
    }
  }

  createSongNotFound = () => {

  }
  
  createTest = () => {
    if(this.state.testVisible){
      return(<TypingTest songArray={this.state.songArray} />)
    }else{return(<div/>)}
  }

  getSongArray = (myArray) => {
    this.setState({ songArray: myArray, searchVisible: false, testVisible:true})
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Lyric Typing Test</h2>
        </div>
        <div hidden={!this.state.searchVisible}>
          <HomeScreen getSongArray={this.getSongArray} />
        </div>
       { this.createTest()}
      </div>
    );
  }
}

export default App;