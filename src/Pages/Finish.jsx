import React, { Component } from 'react'

import Submit from '../Components/Submit'

class Finish extends Component {

    render() {
        return <div>
            <Submit
                research={this.props.research}
                scoreTime={this.props.testCompletionTime}
                song={this.props.song}
                mode={this.props.mode}
                api_url={this.props.api_url}
            />
        </div>
    }
}

export default Finish
