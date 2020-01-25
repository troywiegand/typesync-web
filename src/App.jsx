import React, { Component } from 'react';
import './App.css';
import Title from './Components/Title.jsx';
import SearchBars from './SearchBars.jsx';
import SongConfirmationPage from './SongConfirmationPage.jsx';
import TypingTest from './TypingTest.jsx';

class App extends Component {
  constructor() {
    super()
    this.state = {
      songArray: [],
      searchVisible: true,
      testVisible: false,
      songConfirmationVisible: false,
      songInfo: {},
    }
  }

  createSearchBars = () => {
    if (this.state.searchVisible) {
      return (<div>
        <SearchBars tellSongConfirmation={this.tellSongConfirmation} getSongArray={this.getSongArray} />
      </div>)
    }
  }

  createSongConfirmation = () => {
    if (this.state.songConfirmationVisible) {
      return (<SongConfirmationPage destroySongConfirmation={this.destroySongConfirmation}confirmSongForTest={this.confirmSongForTest} song={this.state.songInfo}/>)
    } else { return (<div />) }
  }

  createTest = () => {
    if (this.state.testVisible) {
      return (<TypingTest songArray={this.state.songArray} songInfo={this.state.songInfo} />)
    } else { return (<div />) }
  }

  confirmSongForTest = () => {
    this.setState({searchVisible: false, testVisible: true})
  }

  getSongArray = (myArray) => {
    this.setState({ songArray: myArray})
  }

  tellSongConfirmation = (myJSON) => {
    this.setState({ songConfirmationVisible: true, songInfo:myJSON })
  }

  destroySongConfirmation = () => {
    this.setState({songConfirmationVisible:false})
  }



  render() {
    return (
      <div className="App">
        <Title/>
        {this.createSearchBars()}
        {this.createSongConfirmation()}
        {this.createTest()}
      </div>
    );
  }
}

export default App;