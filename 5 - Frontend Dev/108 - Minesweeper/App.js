import React from 'react';
import bombGif from './img/bomb.svg';
import './App.css';

let Cell = ({cellState}) => (
  <td className="cell"></td>
)

let Row = ({columns}) => {
    let cells = columns.map((cellState, columnIndex) =>
      <Cell key={columnIndex} cellState={cellState} />
    );
    return <tr>{cells}</tr>
}

function PlayingField({mineMap}) {
    let content = mineMap.map((row, rowIndex) =>
      <Row key={rowIndex} columns={row} />
    );
    return (
      <table className="playing-field">
        <tbody>{content}</tbody>
      </table>
    );
}

let ControlPanel = () => (
  <div className="control-panel">
    <div className="flag-counter">💣 10</div>
    <button className="reset-button" type="reset">🔄</button>
    <div className="timer">0:00</div>
  </div>
);

function App() {
  let mineMap = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ];

  return (
    <div className="App">
      <header className="App-header">
        <span>Minesweeper</span><img src={bombGif} className="App-logo" alt="logo" />
      </header>
      <ControlPanel />
      <PlayingField mineMap={mineMap} />
    </div>
  );
}

export default App;
