import React, { Component } from 'react'
import './App.scss'

import Home from './Pages/Home'
import Song from './Pages/Song'
import Test from './Pages/Test'
import Finish from './Pages/Finish'

import Title from './Components/Title'

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

    // start to new song
    discovery = (song) => {
        clearInterval(this.timer)
        this.setState({
            page: page.SONG,
            song: song,
            mode: null,
        })
    }

    // new song to test
    startTest = () => {
        this.setState({
            page: page.TEST,
            milliseconds: 0,
        })
    }

    // test to user submit
    testComplete = () => {
        clearInterval(this.timer)
        this.setState(state => ({
            page: page.FINISH,
            testCompletionTime: state.milliseconds,
        }))
    }

    // user submit to new song
    research = (json) => {
        clearInterval(this.timer)
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
            <Title backHome={this.backHome} />
            {this.renderPage()}
        </div>
    }

    renderPage = () => {
        if (this.state.page === page.HOME) {
            return <Home 
                discovery={this.discovery}
                api_url={api_url}
            />
        } else if (this.state.page === page.SONG) {
            return <Song
                discovery={this.discovery}
                api_url={api_url}
                startTest={this.startTest}
                song={this.state.song}
                mode={this.state.mode}
                setMode={this.setMode}
            />
        } else if (this.state.page === page.TEST) {
            return <Test
                song={this.state.song}
                mode={this.state.mode}
                milliseconds={this.state.milliseconds}
                testComplete={this.testComplete}
                startTimer={this.startTimer}
            />
        } else if (this.state.page === page.FINISH) {
            return <Finish
                research={this.research}
                testCompletionTime={this.state.testCompletionTime}
                song={this.state.song}
                mode={this.state.mode}
                api_url={api_url}
            />
        } else {
            return <div />
        }
    }
}

export default App
