import React, { Component } from 'react';
import './App.css';
import Title from './Components/Title';
import SearchBars from './Components/SearchBars';
import SongConfirmationPage from './Components/SongConfirmationPage';
import TypingTest from './TypingTest';
import Leaderboard from './Components/Leaderboard';
import UserSubmitScore from './UserSubmitScore';
import { Route, Switch, Redirect } from 'react-router-dom'


class App extends Component {
  constructor() {
    super()
    this.state = {
      searchVisible: true,
      testVisible: false,
      songConfirmationVisible: false,
      leaderboardVisible: false,
      song: {},
      leaderboards: [],
      tally: 0,
      songID: -1,
    }
  }

  createSearchBars = () => {
    if (this.state.searchVisible) {
      return <SearchBars
        discovery={this.discovery}
      />
    }
  }

  createSongConfirmation = () => {
    if (this.state.songConfirmationVisible)
      return <SongConfirmationPage
        startTest={this.startTest}
        song={this.state.song}
      />
  }

  createTest = () => {
    if (this.state.testVisible)
      return <TypingTest
        testComplete={this.testComplete}
        song={this.state.song}
      />
  }

  createLeaderboard = () => {
    if (this.state.leaderboardVisible) {
      return <Leaderboard
        song={this.state.song}
      />

    }
  }

  createUserSubmitScore = () => {
    if (this.state.submissionVisible)
      return <UserSubmitScore
        research={this.research}
        scoreTime={this.state.testCompletionTime}
        song={this.state.song}
      />
  }

  // Hack to reset state on leaderboards
  power_nap_leaderboards = () => {
    this.setState({ leaderboardVisible: false })
    console.log("gone")
    setTimeout(() => {
      this.setState({ leaderboardVisible: true })
      console.log("back")
    }, 500)
  }

  // start to new song
  discovery = (json) => {
    this.power_nap_leaderboards()
    this.setState({ song: json, songConfirmationVisible: true, leaderboardVisible: true, songID: json['genius_id'] })
  }

  // new song to test
  startTest = () => {
    this.setState({ leaderboardVisible: false, testVisible: true, searchVisible: false })
  }

  // test to user submit
  testComplete = (time) => {
    this.setState({ testVisible: false, submissionVisible: true, songConfirmationVisible: false, testCompletionTime: time })
  }

  // user submit to new song
  research = (json) => {
    this.setState({ song: json, submissionVisible: false, searchVisible: true, songConfirmationVisible: true, leaderboardVisible: true })
  }

  render = () => {
    if (this.state.songID > 0) {
      return <Redirect to={`/song/${this.state.songID}`} />
    }
    return (
      <div className="App">
        <Title />
        <Switch>
          <Route path="/home">
            {this.createSearchBars()}
          </Route>
          <Route path="/song/:songID">
            {this.createSearchBars()}
            {this.createSongConfirmation()}
            {this.createLeaderboard()}
          </Route>
          <Route path="/ugh">
            {this.createSearchBars()}
            {this.createSongConfirmation()}
            {this.createLeaderboard()}
            {this.createTest()}
            {this.createUserSubmitScore()}
          </Route>

        </Switch>

      </div>
    );
  }

};

export default App;