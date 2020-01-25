import React, { Component } from 'react';

class SongConfirmationPage extends Component {

    state={formVisible:true}

    onConfirmationSubmit = (ev) =>{
        ev.preventDefault()
        this.props.confirmSongForTest()
        this.setState({formVisible:false})
    }

    showForm = () => {
        if(this.state.formVisible)
        return(<div>
              <p>Is This Correct?</p>
                <input type="button" value="Yes" onClick={this.onConfirmationSubmit} />
                <input type="button" value="No" onClick={this.props.destroySongConfirmation} />
        </div>)
    }

    createMessage = () => {
        if (this.props.song.status === "not")
            return (<h2>
                Sorry, we couldn't find your song.
    </h2>)
        else return (<div>
            <h2>
                We found "{this.props.song.title}" by {this.props.song.artist}
            </h2>
              {this.showForm()}
        </div>

        )
    }

    render() {

        return (
            <div className="SongConfirmationPage">
                {this.createMessage()}
            </div>
        )
    }

}

export default SongConfirmationPage