import React, { useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

export default function App() {
  const initBoardState: string[] = new Array(9).fill('');
  const initPlayerState: boolean = true;
  
  let [boardState, setBoardState] = useState(initBoardState);
  let [playerTurnState, setTurnState] = useState(initPlayerState);

  function reset() {
    setBoardState(initBoardState);
    setTurnState(initPlayerState);
  }

  function addMove(index: number) {    
    if (boardState[index] === ''){
      setTurnState(!playerTurnState);

      if (playerTurnState) {
        setBoardState([...boardState.slice(0, index), 'X', ...boardState.slice(index+1)]);
      } else {
        setBoardState([...boardState.slice(0, index), 'O', ...boardState.slice(index+1)]);
      }
    }
  }

  function renderBoard() {
    const renderTiles = boardState.map((x, index) => 
        <div key={ index } className='tile' onClick={() => { addMove(index) } }>
          { x }
        </div>
      )
    
    return (
      <div className='board'>
        { renderTiles }
      </div>
    );
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>tic-tac-toe</h1>

        { renderBoard() }

        <Button variant="contained" style={{marginTop: "50px"}} onClick={() => { reset() }}>
          Reset Game
        </Button>
      </header>
    </div>
  );
}