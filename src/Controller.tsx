import { useState } from "react";
import AiApp, { GameAiValues } from "./AiApp";
import App, { GameValues } from "./App";
//import DifficultySelect from "./Difficulty";
import "./controller.css";
import PreviousGames from "./PreviousGames";

const screens = {
    mainScreen: 0,
    playWithComputer: 1,
    playWithHuman: 2,
    loadGame:3
}
function Controller() {
    const [screen, setScreen] = useState(screens.mainScreen);
    const [gameValues, setGameValues] = useState(new GameValues("",new Array(9).fill(0),1,1));
    const [gameAiValues, setGameAiValues] = useState(new GameAiValues("",new Array(9).fill(0),1, true, -1));

    function switchScreen(screen: number) {
        setScreen(screen);
    }
    switch (screen) {
        case screens.mainScreen: return <MainScreen switchScreen={switchScreen} />;
        case screens.playWithComputer: return <AiApp gameAiValues={gameAiValues}switchScreen={()=>{switchScreen(screens.mainScreen)}}/>;
        case screens.playWithHuman: return <App gameValues={gameValues} switchScreen={()=>{switchScreen(screens.mainScreen)}}/>;
        case screens.loadGame: return <PreviousGames 
                                        exitScreen={()=>{switchScreen(screens.mainScreen)}}
                                        switchGame={(e:GameValues)=>{setGameValues(e);switchScreen(screens.playWithHuman);}}
                                        switchAiGame={(e:GameAiValues)=>{setGameAiValues(e);switchScreen(screens.playWithComputer);}}/>
    }
}
function MainScreen({ switchScreen }: { switchScreen: (screen: number) => void }) {
    return (<div id="app">
        <span id="title">
            <span className="redDesign">Tic</span>
            <span className="blueDesign">Tac</span>
            <span className="redDesign">Toe</span>
        </span>
        <button className="button2" onClick={() => { switchScreen(screens.playWithComputer) }}>Play With Computer</button>
        <button className="button2" onClick={() => { switchScreen(screens.playWithHuman) }}>Play with a Friend</button>
        <button className="button2" onClick={() => { switchScreen(screens.loadGame) }}>Load Game</button>
    </div>
    )
}
export default Controller;