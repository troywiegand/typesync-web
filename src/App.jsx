import React, { Component } from 'react';
import './App.css';
import Title from './Components/Title';
import SearchBars from './Components/SearchBars';
import SongSummary from './Components/SongSummary';
import SongMini from './Components/SongMini';
import TypingTest from './TypingTest';
import Leaderboard from './Components/Leaderboard';
import UserSubmitScore from './UserSubmitScore';

class App extends Component {
  constructor() {
    super()
    this.state = {
      searchVisible: true,
      testVisible: false,
      songSummaryVisible: false,
      songMiniVisible: false,
      leaderboardVisible: false,
      song: {},
      leaderboards: [], 
      tally: 0,
      mode: "standard",
    }
  }

  createSearchBars = () => {
    if (this.state.searchVisible) {
      return <SearchBars 
        discovery={this.discovery}
      />
    }
  }

  createSongSummary = () => {
    if (this.state.songSummaryVisible)
      return <SongSummary
        startTest={this.startTest}
        song={this.state.song}
      />
  }

  createSongMini = () => {
    if (this.state.songMiniVisible)
      return <SongMini
        startTest={this.startTest}
        song={this.state.song}
        mode={this.state.mode}
      />
  }

  createTest = () => {
    if (this.state.testVisible)
      return <TypingTest 
        testComplete={this.testComplete}
        song={this.state.song}
        mode={this.state.mode}
      />
  }

  createLeaderboard = () => {
    if (this.state.leaderboardVisible) {
      return <Leaderboard 
        song={this.state.song}
        mode={this.state.mode}
      />
      
    }
  }

  createUserSubmitScore = () => {
    if (this.state.submissionVisible)
      return <UserSubmitScore 
        research={this.research}
        scoreTime={this.state.testCompletionTime}
        song={this.state.song}
        mode={this.state.mode}
      />
  }

  // Hack to reset state on leaderboards
  power_nap_leaderboards = () => {
    this.setState({leaderboardVisible: false})
    console.log("gone")
    setTimeout(() => {
      this.setState({leaderboardVisible: true})
      console.log("back")
    }, 500)
  }
      
  // start to new song
  discovery = (song) => {
    this.power_nap_leaderboards()
    this.setState({
        song: song, 
        songSummaryVisible: true,
        leaderboardVisible: true
    })
  }

  // new song to test
  startTest = (mode) => {
    this.setState({
        leaderboardVisible: false,
        testVisible: true,
        searchVisible: false,
        songSummaryVisible: false,
        songMiniVisible: true,
        mode: mode,
    })
  }

  // test to user submit
  testComplete = (time) => {
    this.setState({
      testVisible: false,
      submissionVisible: true,
      songSummaryVisible: false,
      testCompletionTime: time,
      songMiniVisible: false,
    })
  }

  // user submit to new song
  research = (json) => {
    this.setState({
        song: json, 
        submissionVisible: false, 
        searchVisible: true, 
        songSummaryVisible: true, 
        leaderboardVisible: true
    })
  }

  render = () => {
    return (
      <div className="App">
        <Title />
        
        {this.createSearchBars()}
        {this.createSongSummary()}
        {this.createSongMini()}
        {this.createLeaderboard("standard")}
        {this.createLeaderboard("simple")}
        {this.createTest()}
        {this.createUserSubmitScore()}
      </div>
    );
  }

};

export default App;
