import './App.css';
import React from 'react';
import Stopwatch from './components/Stopwatch'
class App extends React.Component {

  render() {
    return (
      <div className="stopwatch">
        <h1>Stopwatch</h1>
        <Stopwatch />
      </div>
    );
  }
}

export default App;
