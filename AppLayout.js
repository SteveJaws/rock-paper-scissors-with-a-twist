import React, { useState } from 'react';
import './GameLogic.js';
import { UserInput } from './GameLogic.js';
// import { rock } from './assets/rock2.jpg';
// import { paper } from './assets/paper2.jpeg';
// import { scissors } from './assets/scissor2.jpeg';

function GameLayout(){
    const [state, setState] = useState("mainMenu");

    if(state === "mainMenu"){
        return(
            <div className="App">
                <div className="bg">
                    <div className="container" style={{width: "100%", height: "100%"}}>
                        <div className="title">
                            Rock Paper Scissors but with a Twist
                        </div>
                        <div className="buttons">
                            <button id='StartGameButton' onClick={() => {setState("game")}}>START</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else if(state === "game"){
        return(
            <div className="App">
                <div className="bg" id='bg'>
                    <div className="container" style={{width: "100%", height: "100%"}}>
                        <div className="top">
                            <div className="enemy-face-cam">
                                <img className='enemy-face' id='enemyFace'></img>
                            </div>
                            <div className="enemy-health">
                                <div className="health-bar" id='healthBar'></div>
                            </div>
                        </div>
                        <div className="middle">
                            <div id='powerUpTable' className="power-up-table"></div>
                        </div>
                        <div className="bottom">
                            <button onClick={() => UserInput("rock")} className="cards" id='rock'></button>
                            <button onClick={() => UserInput("paper")} className="cards" id='paper'></button>
                            <button onClick={() => UserInput("scissors")} className="cards" id='scissors'></button>

                            <div className="player-health">
                                <div className="player-health-bar" id='playerHealthBar'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="animation-background" id='animationBackground'>
                    <div className='animation-starter' id='animationStarterWin'>
                        <div className='enemy-card enter-to-right' id='enemyCard'></div>
                        <div className='player-card enter-to-left' id='playerCard'></div>
                    </div>

                    <div className='animation-starter-lose' id='animationStarterLose'>
                        <div className='enemy-card enter-to-right-lose' id='enemyCardLose'></div>
                        <div className='player-card enter-to-left-lose' id='playerCardLose'></div>
                    </div>

                    <div className='animation-starter-shield' id='animationStarterShield'>
                        <div className='enemy-card enter-to-right-shield' id='enemyCardShield'></div>
                        <div className='player-card enter-to-left-shield' id='playerCardShield'></div>
                    </div>
                </div>
            </div>
        )
    }

}

export default GameLayout;