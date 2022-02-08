import React, {useEffect, useState} from 'react';
import bombGif from './img/bomb.svg';
import './App.css';

function Cell ({index, sweepStatus, onSweep, onFlag}) {
  const [isFlagged, setIsFlagged] = React.useState(false)

  let handleRightClick = (event) => {
    event.preventDefault();
    if (isFlagged) return;
    setIsFlagged(onFlag());
  }

  return (
    <td className={"cell" +( isFlagged ? " flagged" : '')}
        onClick={() => !isFlagged ? onSweep(index) : ''}
        onContextMenu={handleRightClick}
        children={sweepStatus}
    />
  )
}

function Row ({columns, rowIndex, onCellClick, onFlag}) {

    let cells = columns.map((isMined, columnIndex) =>
      <Cell key={columnIndex} index={rowIndex * 8 + columnIndex}
            sweepStatus={isMined} onSweep={onCellClick} onFlag={onFlag}/>
    );

    return <tr>{cells}</tr>
}

function PlayingField({onFlagPlace}) {

    const [fieldMap, setFieldMap] = React.useState(initializeMineMap);
    function handleCellClick(fieldNo) {
      console.log(fieldNo);
      setFieldMap((map) => {
        console.log(map)
        map[1] = [1, false, 1, false, 1, false, 1, 0]
        return map
      });
    }

  const rows = fieldMap.map((columns, rowIndex) =>
    <Row key={rowIndex} columns={columns} rowIndex={rowIndex}
         onCellClick={handleCellClick} onFlag={onFlagPlace} />
  );

  return (
      <table className="playing-field">
        <tbody>{rows}</tbody>
      </table>
    );
}

let ControlPanel = ({elapsedSeconds, flagCount}) => {

  function renderTime() {
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    return minutes + ":" + (seconds < 10 ? "0" : '') + seconds;
  }

  return (
    <div className="control-panel">
    <div className="flag-counter">💣 {flagCount}</div>
    <button className="reset-button" type="reset">🔄</button>
    <div className="timer">{renderTime()}</div>
  </div>
  );
};

function App() {
  const [secondsSinceGameStart, updateTime] = useState(0);
  const [flagCount, setFlagCount] = useState(10);
  let updateTimer;


  useEffect(() => {
    console.log("setting interval")
    updateTimer = setInterval(() => {
      console.log("update " + secondsSinceGameStart)
      updateTime((currentTime) => ++currentTime)
    }, 1000);

    return () => clearInterval(updateTimer);
  }, [])

  function placeFlag() {
    if (flagCount === 0) {
      return false;
    }

    setFlagCount(flagCount - 1);
    return flagCount > 0;
  }

  return (
    <div className="App">
      <header className="App-header">
        <span>Minesweeper</span><img src={bombGif} className="App-logo" alt="logo" />
      </header>
      <ControlPanel elapsedSeconds={secondsSinceGameStart} flagCount={flagCount} />
      <PlayingField onGameOver={() => clearInterval(updateTimer)}
                    onFlagPlace={placeFlag} />
    </div>
  );
}

function initializeMineMap() {
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

  return mineMap;
}

export default App;
