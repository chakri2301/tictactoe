import { useState } from 'react';
import './App.css'
//1 stands for X player
//2 stands for O player
const completedLocations = [
  [[1, 2], [3, 6], [4, 8]],//for 0
  [[0, 2], [4, 7]],//for 1
  [[0, 1], [4, 6], [5, 8]],//for 2
  [[0, 6], [4, 5]],//for 3
  [[0, 8], [2, 6], [3, 5], [1, 7]],//for 4
  [[2, 8], [3, 4]],//for 5
  [[0, 3], [2, 4], [7, 8]],//for 6
  [[1, 4], [6, 8]],//for 7
  [[6, 7], [2, 5], [0, 4]],//for 8
]
function App({switchScreen}:{switchScreen:()=>void}) {
  const [values, setValues] = useState(new Array(9).fill(0));
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [status, setStatus] = useState(1);
  function handleClick(idx: number) {
    if (values[idx] != 0 || status == 0 || status == 3 || status == 4) return;
    let filled = 0;
    let newValues = new Array(9).fill(0);
    values.forEach(
      (e, idx) => {
        if (e != 0) filled++;
        newValues[idx] = e;
      }
    )
    newValues[idx] = currentPlayer;
    setValues(newValues);
    const nextPlayer = (currentPlayer == 1) ? 2 : 1
    setCurrentPlayer(nextPlayer);
    setStatus(nextPlayer);
    if (CheckIfCompleted(values, idx, currentPlayer)) {
      setStatus(currentPlayer + 2);
    } else if (filled == 8) {
      setStatus(0);
    }
  }
  function resetValues() {
    setStatus(1);
    setValues(new Array(9).fill(0));
    setCurrentPlayer(1);
  }
  let statusText = "";
  switch (status) {
    case 0: statusText = "Tie"; break;
    case 1: statusText = "X turn"; break;
    case 2: statusText = "O turn"; break;
    case 3: statusText = "X won"; break;
    case 4: statusText = "O won"; break;
    default: break;
  }

  return (
    <div id="app">
      <div id="gameArea">
        <div id="TopBar">
          <span className='textButton' style={{color:"white"}} onClick={switchScreen}>&#x2190;</span>
          <span id="status">{statusText}</span>
          <span className='textButton'>&#x2192;</span>
        </div>
        <div id="board" className={"board" + " " + "board" + currentPlayer}>{
          values.map((ele, index) => {
            return <Square idx={index} key={index} count={ele} onClick={handleClick} />
          })}
        </div>
        <button className="button1" onClick={resetValues}>Reset</button>
      </div>
    </div>
  )
}
function Square({ idx, count, onClick }: { idx: number, count: number, onClick: (idx: number) => void }) {
  return <div className="wrapper"><span className={"tile" + " " + "tile" + count} onClick={() => { onClick(idx); }}>{
    (count == 0) ? " " : (count == 1) ? "X" : "O"
  }</span></div>
}
function CheckIfCompleted(values: Array<number>, currentPlaced: number, currentPlayer: number) {
  let completed = false;
  completedLocations[currentPlaced].forEach(
    (locations) => {
      let isFilledSame = true;
      locations.forEach(
        (location) => {
          if (values[location] != currentPlayer) {
            isFilledSame = false;
          }
        }
      )
      if (isFilledSame) { completed = true; }
    }
  )
  return completed;
}
export default App
