import React, { Component } from 'react';

import SongMini from '../Components/SongMini';
import Karaoke from '../Components/Karaoke';

class Test extends Component {

    render() {
        return <div>
            <SongMini
                song={this.props.song}
                mode={this.props.mode}
                milliseconds={this.props.milliseconds}
            />
            <Karaoke 
                testComplete={this.props.testComplete}
                song={this.props.song}
                mode={this.props.mode}
                startTimer={this.props.startTimer}
            />
        </div>
    }
}

export default Test 
