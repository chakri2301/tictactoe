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
export class GameAiValues {
	public name: string;
	public val: Array<number>;
	public currentPlayer: number;
	public currentStatus:number;
	public isHumanX: Boolean;
	constructor(gameName: string, val: Array<number>, currentPlayer: number, isHumanX: Boolean,currentStatus:number) {
		this.val = val;
		this.name = gameName;
		this.currentPlayer = currentPlayer;
		this.isHumanX = isHumanX;
		this.currentStatus = currentStatus;
	}
}
function AiApp({ switchScreen, gameAiValues }: { gameAiValues: GameAiValues, switchScreen: () => void }) {
	const [name, setName] = useState(gameAiValues.name);
	const [values, setValues] = useState(gameAiValues.val);
	const [currentPlayer, setCurrentPlayer] = useState(gameAiValues.currentPlayer);
	const [status, setStatus] = useState(gameAiValues.currentStatus);
	console.log(status);
	const [isHumanX, setIsHumanX] = useState(gameAiValues.isHumanX);
	const [disabled, setDisabled] = useState(false);
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
	useEffect(() => {
		console.log("Player is " + currentPlayer);
		if (currentPlayer == 2 && isHumanX) {
			aiOMove(values);
		} else if (currentPlayer == 1 && (!isHumanX)) {
			aiXMove(values);
		}
	}, [currentPlayer]);

	function aiXMove(values: Array<number>) {
		let emptyCells = new Array<number>()
		values.forEach(
			(e, idx) => {
				if (e == 0) {
					emptyCells.push(idx);
				}
			}
		);
		//console.log(emptyCells);
		let bestMove = emptyCells[0];
		let max = -2;
		for (let i = 0; i < emptyCells.length; i++) {
			values[emptyCells[i]] = 1;
			let score = minScore(values, emptyCells[i], emptyCells.length - 1);
			values[emptyCells[i]] = 0;
			if (score > max) {
				max = score;
				bestMove = emptyCells[i];
			}
		}
		//console.log("Best ai move is" + bestMove);
		//console.log(values);
		setDisabled(true);
		setTimeout(() => {
			iterateGame(bestMove)
			setDisabled(false);
		}, 1000);
	}
	function aiOMove(values: Array<number>) {
		let emptyCells = new Array<number>()
		values.forEach(
			(e, idx) => {
				if (e == 0) {
					emptyCells.push(idx);
				}
			}
		);
		//console.log(emptyCells);
		let bestMove = emptyCells[0];
		let min = 2;
		for (let i = 0; i < emptyCells.length; i++) {
			values[emptyCells[i]] = 2;
			let score = maxScore(values, emptyCells[i], emptyCells.length - 1);
			values[emptyCells[i]] = 0;
			if (score < min) {
				min = score;
				bestMove = emptyCells[i];
			}
		}
		console.log(values);
		//console.log("Best ai move is" + bestMove + " with score " + max);
		setDisabled(true);
		setTimeout(() => {
			iterateGame(bestMove)
			setDisabled(false);
		}, 1000);
	}
	function resetValues() {
		setStatus(-1);
		setValues(new Array(9).fill(0));
		setCurrentPlayer(1);
		setIsHumanX(true);
		setName("");
	}
	function DeleteAndExit() {
		localStorage.removeItem("2" + name);
		switchScreen();
	}
	function setAiX() {
		setStatus(2);
		setIsHumanX(false);
		aiXMove(values);
	}
	let statusText = "";
	switch (status) {
		case -1: statusText = "You are X"; break;
		case 0: statusText = "Tie"; break;
		case 1: statusText = "X turn"; break;
		case 2: statusText = "O turn"; break;
		case 3: statusText = "X won"; break;
		case 4: statusText = "O won"; break;
		default: break;
	}
	function SaveAndExit() {
		let saved = Object.keys(localStorage);
		let name = window.prompt("Game name ?");
		while (name == null || name == "" || saved.includes("2" + name)) {
			name = window.prompt("Please enter a new name ?");
		}
		localStorage.setItem("2" + name, JSON.stringify(new GameAiValues(name, values, currentPlayer, isHumanX, status)));
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
				<button className='button1' onClick={setAiX} style={{ display: (status == -1) ? "block" : "none" }}>Click To play as O</button>
				<div id='AiLoading' style={{ display: (disabled) ? "flex" : "none" }}>
					<div className="loadbox"></div>
					<div className="loadbox" style={{ animationDelay: "0.1s" }}></div>
					<div className="loadbox" style={{ animationDelay: "0.2s" }}></div>
					<div className="loadbox" style={{ animationDelay: "0.3s" }}></div>
					<div className="loadbox" style={{ animationDelay: "0.4s" }}></div>
				</div>
				<div id="board" className={"board" + " " + "board" + currentPlayer}>{
					values.map((ele, index) => {
						return <Square idx={index} key={index} count={ele} disabled={disabled} onClick={iterateGame} />
					}
					)
				}
				</div>
				<div id="Controls">
					{(name == "") ?<button className="button1" onClick={SaveAndExit}>Save And Exit</button>:""}
					<button className="button1" onClick={resetValues}>Reset</button>
					{(name != "") ? <button className="button1" onClick={DeleteAndExit}>Delete and Exit</button> : ""}
				</div>
			</div>
		</div>
	)
}
function Square({ idx, count, disabled, onClick }: { idx: number, count: number, disabled: boolean, onClick: (idx: number) => void }) {
	return <div className="wrapper"><button disabled={disabled} className={"tile" + " " + "tile" + count} onClick={() => { onClick(idx); }}>{
		(count == 0) ? " " : (count == 1) ? "X" : "O"
	}</button></div>
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

function maxScore(values: Array<number>, lastPlaced: number, emptyCells: number): number {
	let maxScore = -1;
	if (CheckIfCompleted(values, lastPlaced, 2)) {
		return -1;
	}
	if (emptyCells == 0) {
		return 0;
	}
	for (let i = 0; i < 9; i++) {
		if (values[i] == 0) {
			values[i] = 1;
			let score = minScore(values, i, emptyCells - 1);
			values[i] = 0;
			if (score == 1) return 1;
			if (score > maxScore) {
				maxScore = score;
			}
		}
	}
	return maxScore;
}
function minScore(values: Array<number>, lastPlaced: number, emptyCells: number): number {
	let minScore = 1;
	if (CheckIfCompleted(values, lastPlaced, 1)) {
		return 1;
	}
	if (emptyCells == 0) {
		return 0;
	}
	for (let i = 0; i < 9; i++) {
		if (values[i] == 0) {
			values[i] = 2;
			let score = maxScore(values, i, emptyCells - 1);
			values[i] = 0;
			if (score == -1) return -1;
			if (score < minScore) {
				minScore = score;
			}
		}
	}
	return minScore;
}
export default AiApp;
