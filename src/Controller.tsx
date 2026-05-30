import { useState } from "react";
import AiApp from "./AiApp";
import App from "./App";
import "./controller.css";

const screens = {
    mainScreen: 0,
    playWithComputer: 1,
    playWithHuman: 2
}
function Controller() {
    const [screen, setScreen] = useState(screens.mainScreen);
    function switchScreen(screen: number) {
        setScreen(screen);
    }
    switch (screen) {
        case screens.mainScreen: return <MainScreen switchScreen={switchScreen} />;
        case screens.playWithComputer: return <AiApp switchScreen={()=>{switchScreen(screens.mainScreen)}}/>;
        case screens.playWithHuman: return <App switchScreen={()=>{switchScreen(screens.mainScreen)}} />;
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
    </div>
    )
}
export default Controller;