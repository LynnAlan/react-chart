import React, { Component } from 'react';
import './App.css';
import './style/pubilc.scss'

import WriteData from './components/WriteData';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WriteData></WriteData>
      </div>
    );
  }
}

export default App;
