import React, { Component } from 'react';
import './App.scss';

import Title from './Components/Title';
import SearchBars from './Components/SearchBars';
import SongSummary from './Components/SongSummary';
import SongMini from './Components/SongMini';
import TypingTest from './TypingTest';
import Leaderboard from './Components/Leaderboard';
import UserSubmitScore from './UserSubmitScore';

const api_url = "http://localhost:8080"

const page = {
    HOME: "home",
    SONG: "song",
    TEST: "test",
    FINISH: "finish",
}

class App extends Component {
    constructor() {
        super()
        this.state = {
            page: page.HOME,
            song: {},
            mode: "standard",
            milliseconds: 0,
        }
    }

    startTimer = () => {
        this.setState({ startTime: Date.now() })
        this.timer = setInterval(() => { 
            this.setState({ 
                milliseconds: Date.now() - this.state.startTime
            }) 
        }, 1)
    }

    setMode = (mode) => {
        this.setState({ mode: mode })
    }

    createSearchBars = () => {
        if (this.pageIs([page.HOME, page.SONG])) {
            return <SearchBars 
                discovery={this.discovery}
                api_url={api_url}
            />
        }
    }

    // Returns if the current page matches any given pages
    pageIs = (pages) => {
        return pages
            .map(page => this.state.page === page) 
            .includes(true)
    }

    createSongSummary = () => {
        if (this.pageIs([page.SONG]))
            return <SongSummary
                startTest={this.startTest}
                song={this.state.song}
                mode={this.state.mode}
                setMode={this.setMode}
            />
    }

    createSongMini = () => {
        if (this.pageIs([page.TEST]))
            return <SongMini
                startTest={this.startTest}
                song={this.state.song}
                mode={this.state.mode}
                milliseconds={this.state.milliseconds}
            />
    }

    createTest = () => {
        if (this.pageIs([page.TEST]))
            return <TypingTest 
                testComplete={this.testComplete}
                song={this.state.song}
                mode={this.state.mode}
                startTimer={this.startTimer}
            />
    }

    createLeaderboard = (mode) => {
        if (this.pageIs([page.SONG]))
            return <Leaderboard 
                song={this.state.song}
                mode={mode}
                api_url={api_url}
            />
    }

    createUserSubmitScore = () => {
        if (this.pageIs([page.FINISH]))
            return <UserSubmitScore 
                research={this.research}
                scoreTime={this.state.testCompletionTime}
                song={this.state.song}
                mode={this.state.mode}
                api_url={api_url}
            />
    }

    // start to new song
    discovery = (song) => {
        this.setState({
            page: page.SONG,
            song: song,
            mode: null,
        })
    }

    updateTimer = (new_time) => {
        this.setState({
            time: new_time,
        })
    }

    // new song to test
    startTest = () => {
        this.setState({
            page: page.TEST,
        })
    }

    // test to user submit
    testComplete = () => {
        clearInterval(this.timer)
        this.setState({
            page: page.FINISH,
            testCompletionTime: this.state.milliseconds,
        })
    }

    // user submit to new song
    research = (json) => {
        this.setState({
            page: page.SONG,
            song: json, 
        })
    }

    backHome = () => {
        this.setState({
            page: page.HOME
        })
    }

    render = () => {
        return <div className="App">
            <Title backHome={this.backHome}/>

            {this.createSearchBars()}
            {this.createSongSummary()}
            {this.createSongMini()}
            {this.createLeaderboard("standard")}
            {this.createLeaderboard("simple")}
            {this.createTest()}
            {this.createUserSubmitScore()}
        </div>
    }

};

export default App;
