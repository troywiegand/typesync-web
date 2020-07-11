import React, { Component } from 'react';

import SearchBars from '../Components/SearchBars';

class Home extends Component {

    render() {
        return <div>
            <SearchBars 
                discovery={this.props.discovery}
                api_url={this.props.api_url}
            />
        </div>
    }
}

export default Home
