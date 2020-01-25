import React, { Component } from 'react';
import './App.css';
import TypingTest from './TypingTest';
import HomeScreen from './HomeScreen';
import SongNotFoundPage from './SongNotFoundPage';

class App extends Component {
  constructor() {
    super()
    this.state = {
      songArray: [],
      searchVisible: true,
      testVisible: false,
      songNotFoundVisible: false,
    }
  }

  createSongNotFound = () => {
    if(this.state.songNotFoundVisible){
      return(<SongNotFoundPage/>)
    }else{return(<div/>)}
  }

  createTest = () => {
    if(this.state.testVisible){
      return(<TypingTest songArray={this.state.songArray} />)
    }else{return(<div/>)}
  }

  getSongArray = (myArray) => {
    this.setState({ songArray: myArray, searchVisible: false, testVisible:true, songNotFoundVisible:false})
  }

  tellSongNotFound = () => {
    this.setState({songNotFoundVisible:true})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Lyric Typing Test</h2>
        </div>
        <div hidden={!this.state.searchVisible}>
          <HomeScreen tellSongNotFound={this.tellSongNotFound} getSongArray={this.getSongArray} />
        </div>
       {this.createTest()}
       {this.createSongNotFound()}
      </div>
    );
  }
}

export default App;