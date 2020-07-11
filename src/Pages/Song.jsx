import React, { Component } from 'react';

import SearchBars from '../Components/SearchBars';
import SongSummary from '../Components/SongSummary';
import Leaderboard from '../Components/Leaderboard';

class Song extends Component {

    render() {
        return <div>
            <SearchBars 
                discovery={this.props.discovery}
                api_url={this.props.api_url}
            />
            <SongSummary
                startTest={this.props.startTest}
                song={this.props.song}
                mode={this.props.mode}
                setMode={this.props.setMode}
            />
            <Leaderboard 
                song={this.props.song}
                mode={"standard"}
                api_url={this.props.api_url}
            />
            <Leaderboard 
                song={this.props.song}
                mode={"simple"}
                api_url={this.props.api_url}
            />
        </div>
    }
}

export default Song
