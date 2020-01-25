import React, { Component } from 'react';

class HomeScreen extends Component {
    
    state={
        title: '',
        artist: '',
        URL: 'http://34.74.220.91:8080'
    }
    
    handleSubmit= (ev) => {
        ev.preventDefault()

        let reqPath="/lyrics/artist/"+this.state.artist.replace(/ /g, "|")+"/title/"+this.state.title.replace(/ /g, "|")
        console.log(this.state.URL+reqPath)
        fetch(this.state.URL+reqPath, {
            method: "GET",
            headers: {'Content-Type': 'application/json'},
        }).then((response) => {
            console.log(response)
            return response.json();
          }).then((myJson) => {
            if(myJson["status"]==="found")
            this.props.getSongArray(myJson["lyrics"])
            else this.props.tellSongNotFound()
          }).catch(()=>{
            this.props.tellSongNotFound()
          })
       
    }
    
    
    handleChangeTitle = (ev) => {
        this.setState({title: ev.target.value})
    }
    
    handleChangeArtist = (ev) => {
        this.setState({artist: ev.target.value})
    }
    render(){
        return (<div className="HomeScreen">
               <form onSubmit={this.handleSubmit}>
                <input type="text" name="title" 
                autoFocus
                placeholder="Song Title "
                value={this.state.title}
                onChange={this.handleChangeTitle}
                />
                <input type="text" name="rule" 
                placeholder="Artist Name.. "
                value={this.state.body}
                onChange={this.handleChangeArtist}
                />
                <button type="submit" >Find Your Song!</button>


            </form>
        </div>)
    }
}

export default HomeScreen;