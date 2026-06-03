import { useState } from 'react';
import './App.css'
//import { GameType, GameSaveData } from './SaveStorage';
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
const gameState = {
  Tie: 0,
  Xturn: 1,
  Oturn: 2,
  Xwon: 3,
  Owon: 4
}
export class GameValues {
  public name:string;
  public status:number;
  public val: Array<number>;
  public currentPlayer: number;
  constructor(name:string,val: Array<number>, currentPlayer: number,status:number) {
    this.val = val;
    this.name= name;
    this.currentPlayer = currentPlayer;
    this.status = status;
  }
}
//let startValues = new GameValues(new Array(9).fill(0), 1);

function App({gameValues, switchScreen }: {gameValues:GameValues, switchScreen: () => void }) {
  const [name, setName] = useState(gameValues.name);
  const [values, setValues] = useState(gameValues.val);
  const [currentPlayer, setCurrentPlayer] = useState(gameValues.currentPlayer);
  const [status, setStatus] = useState(gameValues.status);

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
    const nextPlayer = (currentPlayer == gameState.Xturn) ? gameState.Oturn : gameState.Xturn
    setCurrentPlayer(nextPlayer);
    setStatus(nextPlayer);
    if (CheckIfCompleted(values, idx, currentPlayer)) {
      setStatus(currentPlayer + 2);
    } else if (filled == 8) {
      setStatus(gameState.Tie);
    }
  }
  function resetValues() {
    setStatus(gameState.Xturn);
    setValues(new Array(9).fill(0));
    setCurrentPlayer(1);
    setName("");
  }
  let statusText = "";
  switch (status) {
    case gameState.Tie: statusText = "Tie"; break;
    case gameState.Xturn: statusText = "X turn"; break;
    case gameState.Oturn: statusText = "O turn"; break;
    case gameState.Xwon: statusText = "X won"; break;
    case gameState.Owon: statusText = "O won"; break;
    default: break;
  }
  function SaveAndExit() {
    let saved = Object.keys(localStorage);
    let name = window.prompt("Game name ?");
    while (name == null || name == "" || saved.includes("1" + name)) {
      name = window.prompt("Please enter a new name ?");
    }
    localStorage.setItem("1" + name, JSON.stringify(new GameValues(name, values, currentPlayer, status)));
    switchScreen();
  }
  function DeleteAndExit(){
    localStorage.removeItem("1"+name);
    switchScreen();
  }
  return (
    <div id="app">
      <div id="gameArea">
        <span className='titleText3'>{name}</span>
        <div id="TopBar">
          <span className='textButton' style={{ color: "white" }} onClick={switchScreen}>&#x2190;</span>
          <span className='titleText'>{statusText}</span>
          <span className='textButton'>&#x2192;</span>
        </div>
        <div id="board" className={"board" + " " + "board" + currentPlayer}>{
          values.map((ele, index) => {
            return <Square idx={index} key={index} count={ele} onClick={handleClick} />
          })}
        </div>
        <div id="Controls">
					{(name=="")?<button className="button1" onClick={SaveAndExit}>Save And Exit</button>:""}
          <button className="button1" onClick={resetValues}>Reset</button>
          {(name!="")?<button className="button1" onClick={DeleteAndExit}>Delete and Exit</button>:""}
				</div>
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
