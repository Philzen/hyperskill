import React from 'react';
import bombGif from './img/bomb.svg';
import './App.css';

function Cell ({mined}) {
  const [state, setState] = React.useState('')

  let handleRightClick = (event) => {
    event.preventDefault();
    setState("flagged");
  }

  return (
    <td className={("cell " + state).trim()}
       onClick={() => setState(mined ? "boom" : "revealed")}
       onContextMenu={handleRightClick}
    />
  )
}

let Row = ({columns}) => {
    let cells = columns.map((isMined, columnIndex) =>
      <Cell key={columnIndex} mined={isMined} />
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

  let randomMinePositions = [];
  while (randomMinePositions.length < 10) {
    let diceRoll = Math.round(Math.random() * 71);
    if (!randomMinePositions.includes(diceRoll)) {
      randomMinePositions.push(diceRoll);
    }
  }

  let mineMap = [];
  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    mineMap.push([]);
    for (let colIndex = 0; colIndex < 8; colIndex++) {
      mineMap[rowIndex].push(randomMinePositions.includes(rowIndex * 8 + colIndex));
    }
  }

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
