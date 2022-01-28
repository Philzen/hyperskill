import React from 'react';
import loadingAnimationGif from './img/bomb.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={loadingAnimationGif} className="App-logo" alt="logo" />
        <span>Minesweeper is loading...</span>
      </header>
    </div>
  );
}

export default App;
