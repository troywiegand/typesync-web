import React, { Component } from 'react';
import './App.css';
import Title from './Components/Title';
import SearchBars from './Components/SearchBars';
import SongConfirmationPage from './Components/SongConfirmationPage';
import TypingTest from './TypingTest';
import Leaderboard from './Components/Leaderboard';
import UserSubmitScore from './UserSubmitScore';

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

  createSearchBars = () => {
    if (this.state.searchVisible) {
      return (<div>
        <SearchBars discovery={this.discovery} />
      </div>)
    }
  }

  createSongConfirmation = () => {
    if (this.state.songConfirmationVisible)
      return <SongConfirmationPage startTest={this.startTest} song={this.state.songInfo} />
  }

  createTest = () => {
    if (this.state.testVisible)
      return <TypingTest 
        song={this.state.songInfo} 
      />
  }

  createLeaderboard = () => {
    if (this.state.leaderboardVisible) {
      return <Leaderboard song={this.state.songInfo} />
    }
  }

    
  

  // start to new song
  discovery = (json) => {
    this.setState({songInfo: json, songConfirmationVisible: true, leaderboardVisible: true})
  }

  // new song to test
  startTest = () => {
    this.setState({ leaderboardVisible: false, testVisible: true})
  }

  // test to user submit
  testComplete = (time) => {
    this.setState({ testVisible: false, submissionVisible: true, testCompletionTime: time })
  }

  // user submit to new song
  research = () => {

  }

  createUserSubmitScore = () => {
    if (this.state.userSubmitScoreVisible)
      return <UserSubmitScore 
        scoreTime={this.state.milliseconds} 
        songUUID={this.props.songInfo.genius_id} 
        generateLeaderboard={this.props.generateLeaderboard} 
        destroyUserSubmitScore={this.destroyUserSubmitScore}
        generateSearchBars={this.props.generateSearchBars}
      />
  }
      
  render = () => {
    return (
      <div className="App">
        <Title />
        {this.createSearchBars()}
        {this.createSongConfirmation()}
        {this.createLeaderboard()}
        {this.createTest()}
        {this.createUserSubmitScore()}
      </div>
    );
  }

};

export default App;