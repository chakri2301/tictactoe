import type { GameAiValues } from "./AiApp";
import { GameValues } from "./App";
import "./previousGame.css";
export default function PreviousGames({ switchGame, exitScreen,switchAiGame }: { switchGame: (gameValues: GameValues) => void, exitScreen: () => void,switchAiGame:(gameAiValues:GameAiValues)=>void }) {
    function setGame(e: string) {
        let gvalues = JSON.parse(localStorage[e]);
        switchGame(gvalues);
    }
    function setAiGame(e: string) {
        let gvalues = JSON.parse(localStorage[e]);
        switchAiGame(gvalues);
    }
    
    return (
        <div id="screen">
            <div id="TopBar">
                <span className='textButton' style={{ color: "white" }} onClick={exitScreen}>&#x2190;</span>
                <span className='titleText'>Previous Games</span>
                <span className='textButton'>&#x2192;</span>
            </div>
            <div id="content">
                <div id="HvsH">
                    <span className="titleText2">Human vs Human Games</span>
                    {
                        Object.keys(localStorage).map(
                            (e, idx) => {
                                if (e[0] == '1') {
                                    return <span key={idx} className="gameNameText color1" onClick={() => { setGame(e) }}>{e.slice(1)}</span>
                                }
                            }
                        )
                    }
                </div>
                <div id="HvsC">
                    <span className="titleText2">Human vs Computer Games</span>
                    {
                        Object.keys(localStorage).map(
                            (e, idx) => {
                                if (e[0] == '2') {
                                    return <span key={idx} className="gameNameText color2" onClick={() => { setAiGame(e) }}>{e.slice(1)}</span>
                                }
                            }
                        )
                    }
                </div>
            </div>
        </div>
    )
}