import React, { Component } from 'react';
import './App.css';
import Title from './Components/Title.jsx';
import SearchBars from './SearchBars.jsx';
import SongConfirmationPage from './SongConfirmationPage.jsx';
import TypingTest from './TypingTest.jsx';
import Leaderboard from './Components/Leaderboard.jsx';

class App extends Component {
  constructor() {
    super()
    this.state = {
      songArray: [],
      searchVisible: true,
      testVisible: false,
      songConfirmationVisible: false,
      leaderboardVisible: false,
      songInfo: {},
    }
  }

  generateSearchBars = () => {
    this.setState({ searchVisible: true })
  }
  createSearchBars = () => {
    if (this.state.searchVisible) {
      return (<div>
        <SearchBars tellSongConfirmation={this.tellSongConfirmation} getSongArray={this.getSongArray} resetConfirmationLeaderboard={this.resetConfirmationLeaderboard} />
      </div>)
    }
  }

  resetConfirmationLeaderboard = () => {
    this.setState({ leaderboardVisible: false, songConfirmationVisible: false })
  }

  createSongConfirmation = () => {
    if (this.state.songConfirmationVisible) {
      return (<SongConfirmationPage destroyLeaderboard={this.destroyLeaderboard} destroySongConfirmation={this.destroySongConfirmation} confirmSongForTest={this.confirmSongForTest} song={this.state.songInfo} />)
    } else { return (<div />) }
  }

  createTest = () => {
    if (this.state.testVisible) {
      return (<TypingTest generateSearchBars={this.generateSearchBars} generateLeaderboard={this.generateLeaderboard} songArray={this.state.songArray} songInfo={this.state.songInfo} />)
    } else { return (<div />) }
  }

  confirmSongForTest = () => {
    this.setState({ searchVisible: false, testVisible: true })
  }

  getSongArray = (myArray) => {
    this.setState({ songArray: myArray })
  }

  tellSongConfirmation = (myJSON) => {
    this.setState({ leaderboardVisible: true, songConfirmationVisible: true, songInfo: myJSON })
  }

  destroySongConfirmation = () => {
    this.setState({ songConfirmationVisible: false })
  }

  generateLeaderboard = () => {
    this.setState({ leaderboardVisible: true })
  }

  createLeaderboard = () => {
    if (this.state.leaderboardVisible) {
      return <Leaderboard song={this.state.songInfo} />
    }
  }

  destroyLeaderboard = () => {
    this.setState({ leaderboardVisible: false })
  }


  render() {
    return (
      <div className="App">
        <Title />
        {this.createSearchBars()}
        {this.createSongConfirmation()}
        {this.createLeaderboard()}
        {this.createTest()}
      </div>
    );
  }
}

export default App;