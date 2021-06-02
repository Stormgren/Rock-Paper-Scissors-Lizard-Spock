import React, { useEffect, useState } from 'react';
import Rock from './icons/Rock';
import Paper from './icons/Paper';
import Scissors from './icons/Scissors';
import Lizard from './icons/Lizard';
import Spock from './icons/Spock';
import Rules from './icons/Rules';
import './App.css';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom';

//losesTo constains an array of ids selected element loses from
const choices = [
  {id: 1, name: 'scissors', icon: Scissors, losesTo: [3, 5]},
  {id: 2, name: 'paper', icon: Paper, losesTo: [1, 4]},
  {id: 3, name: 'rock', icon: Rock, losesTo: [2, 5]},
  {id: 4, name: 'lizard', icon: Lizard, losesTo: [1, 3]},
  {id: 5, name: 'spock', icon: Spock, losesTo: [2, 4]}
]

export default function App() {

  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [userChoice, setUserChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [gameState, setGameState] = useState(null)
  const [rules, setRules] = useState(null)

  const choice = (choiceId) => {
    let player = choices.find(c => c.id === choiceId)

    setUserChoice(player)
    
    if (player.losesTo.includes(computerChoice.id)){
      setLosses(losses => losses + 1)
      setGameState('lose')
    } else if (computerChoice.losesTo.includes(player.id)) {
      setWins(wins => wins + 1)
      setGameState('win')
    } else if (computerChoice.id === player.id) {
      setGameState('draw')
    }
  }

  useEffect(() => {
    restartGame()
  }, [])

  const restartGame = () => {
    setGameState(null)
    setUserChoice(null)

    const computer = choices[Math.floor(Math.random() * choices.length)]
    setComputerChoice(computer)
  }
  const renderIcon = (playerChoice) => {
    let Icon = playerChoice.icon
    return <Icon />
  }
  const renderRules = () => {
    return <Rules />
  }
  const showRules = () => {
    setRules(rules => !rules)
  }

  const closeRules = () => {
    setRules(null)
  }

  const resetBtn = () => {
    setWins(0)
    setLosses(0)
  }
  return (
    <div className="app">
      {/* information goes here */}
      
      <div className="info">
        {/* wins vs losses stats */}
        <div className="buttons">
        <button className="btn rules-btn" onClick={() => showRules()}>RULES</button>
        <button className="btn rules-btn" onClick={() => resetBtn()}>RESTART</button>
        </div>
        <div className="score">
          <div className="scorebox">
            <p className="text">{wins === 1 ? 'Win' : 'Wins' }</p>
            <h1 className="number won">{wins}</h1>
          </div>

          <div className="scorebox">
            <p className="text">{losses === 1 ? 'Loss' : 'Losses'}</p>
            <h1 className="number lost">{losses}</h1>
          </div>

        </div>
        
      </div>

 {/* the popup to show rules */}
 {rules  ? (
        <div className="popup">
          <div className="rules">
          <button className="btn close-btn" onClick={() => closeRules()}>CLOSE</button>
         {renderRules()}
         </div>
        </div>
      ) : <></>
      } 

      {/* the popup to show win/loss/draw */}
      {gameState && (
      <div className={`popup ${gameState}`}>
        <div>
          <div className="result">
            <p className="selected-choice">{renderIcon(userChoice)}</p>
            {gameState === 'win' && <p> You win!</p>}
            {gameState === 'lose' && <p>You lose!</p>}
            {gameState === 'draw' && <p>Draw!</p>}
            <p className="selected-choice">{renderIcon(computerChoice)}</p>
          </div>
          <button className="btn" onClick={() => restartGame()}>Play Again</button>
        </div>
      </div>
      )}

        <div className="container">
          
      <div className="choices">
       

        {/* buttons for my choice */}
          <button className="scissors choice" onClick={() => choice(1)}>
            <Scissors />
          </button>
          <button className="paper choice" onClick={() => choice(2)}>
            <Paper />
          </button>
          <button className="rock choice" onClick={() => choice(3)}>
            <Rock />
          </button>
          <button className="lizard choice " onClick={() => choice(4)}>
            <Lizard />
          </button>
          <button className="choice spock" onClick={() => choice(5)}>
            <Spock />
          </button>
        
        </div>

      </div>
      
     

    </div>
  );
}