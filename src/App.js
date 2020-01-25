import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TypingTest from './TypingTest';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Lyric Typing Test</h2>
        </div>
        <TypingTest />
      </div>
    );
  }
}

export default App;
