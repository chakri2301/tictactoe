import { useEffect, useState } from 'react';
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
function AiApp() {
  console.log("Ai Active");
  const [values, setValues] = useState(new Array(9).fill(0));
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [status, setStatus] = useState(1);
  //const [isHumanX, setIsHumanX] = useState(true);
  function iterateGame(idx: number) {
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
  useEffect(()=>{
    if(currentPlayer == 2){
      aiMove(values);
    }
  }, [currentPlayer]);
  function aiMove(values: Array<number>) {
  let emptyCells = new Array<number>()
  values.forEach(
    (e, idx) => {
      if (e == 0) {
        emptyCells.push(idx);
      }
    }
  );
  console.log(emptyCells);
  let bestMove = emptyCells[0];
  let min = 2;
  for(let i=0;i<emptyCells.length;i++){
    values[emptyCells[i]] = 2;
    let score = maxScore(values,emptyCells[i],emptyCells.length-1);
    values[emptyCells[i]] = 0;
    if(score < min){
      min = score;
      bestMove = emptyCells[i];
    }
  }
  console.log("Best ai move is" + bestMove);
  console.log(values);
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
        <p id="status">{statusText}</p>
        <div id="board" className={"board" + " " + "board" + currentPlayer}>{
          values.map((ele, index) => {
            return <Square idx={index} key={index} count={ele} onClick={iterateGame} />
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

function maxScore(values: Array<number>, lastPlaced: number, emptyCells: number):number {
  let maxScore = -1;
  if(CheckIfCompleted(values, lastPlaced, 2)){
    return -1;
  }
  if(emptyCells == 0){
    return 0;
  }
  for (let i = 0; i < 9; i++) {
    if (values[i] == 0) {
      values[i] = 1;
      let score = minScore(values, i, emptyCells-1);
      values[i] = 0;
      if (score == 1) return 1;
      if (score > maxScore) {
        score = maxScore;
      }
    }
  }
  return maxScore;
}
function minScore(values: Array<number>, lastPlaced: number, emptyCells: number): number {
  let minScore = 1;
  //console.log("Came here");
  if(CheckIfCompleted(values, lastPlaced, 1)){
    return 1;
  }
  if(emptyCells == 0){
    return 0;
  }
  for (let i = 0; i < 9; i++) {
    if (values[i] == 0) {
      values[i] = 2;
      let score = maxScore(values, i, emptyCells-1);
      values[i] = 0;
      if (score == -1) return -1;
      if (score < minScore) {
        score = minScore;
      }
    }
  }
  return minScore;
}
export default AiApp;
