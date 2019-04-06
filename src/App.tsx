import React, { useState } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

export default function App() {
  const initBoardState: string[] = new Array(9).fill('');
  const initPlayerState: boolean = true;
  
  let [boardState, setBoardState] = useState(initBoardState);
  let [playerTurnState, setTurnState] = useState(initPlayerState);
  let [lastMoveIndex, setLastMoveIndex] = useState(0);

  function reset() {
    setBoardState(initBoardState);
    setTurnState(initPlayerState);
    setLastMoveIndex(0);
  }

  function addMove(index: number) {    
    setLastMoveIndex(index);

    if (boardState[index] === ''){
      setTurnState(!playerTurnState);

      if (playerTurnState) {
        setBoardState([...boardState.slice(0, index), 'X', ...boardState.slice(index+1)]);
      } else {
        setBoardState([...boardState.slice(0, index), 'O', ...boardState.slice(index+1)]);
      }
    }
  }

  function checkIfPlayerWon() {
    if (boardState.includes('X' || 'O')) {
      if (performCheck()) {
        const winner = playerTurnState ? 'Player 2 Wins!' : 'Player 1 Wins!'

        return (
          <div className='backdrop'>
            <div className='modal'>
              <h2> { winner } </h2>

              <Button 
                variant="contained" 
                style={{marginBottom: "20px"}} 
                onClick={() => { reset() }}
              >
                Reset Game
              </Button>
            </div>
          </div>
        );
      }
    }
  }

  function performCheck() {
    const getRow = (index: number) => {
      if (index < 3) return 0;
      if (index < 6) return 3;
      return 6;
    };

    const getColumn = (index: number) => {
      if (index === 0 || index === 3 || index === 6) return 0;
      if (index === 1 || index === 4 || index === 7) return 1;
      return 2;
    };

    const row = getRow(lastMoveIndex);
    const column = getColumn(lastMoveIndex);

    const allEqual = (arr: string[]) => arr.every((v: string) => v === arr[0]);

    // check row
    if (allEqual(boardState.slice(row, row+3))) {
      return true;
    }

    // check column    
    if (allEqual([boardState[column], boardState[column+3], boardState[column+6]])) {
      return true;
    }

    // check diagonals
    if (lastMoveIndex === 0 || lastMoveIndex % 2 === 0) {
      if (lastMoveIndex === 4) {
        if (allEqual([boardState[0], boardState[4], boardState[8]])) {
          return true;
        } else if (allEqual([boardState[2], boardState[4], boardState[6]])) {
          return true;
        }
      } else if (lastMoveIndex === 0 || lastMoveIndex === 8) {
        if (allEqual([boardState[0], boardState[4], boardState[8]])) {
          return true;
        }
      } else if (allEqual([boardState[2], boardState[4], boardState[6]])) {
          return true;
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
        { checkIfPlayerWon() }

        <Button 
          variant="contained" 
          style={{marginTop: "50px"}} 
          onClick={() => { reset() }}
        >
          Reset Game
        </Button>
      </header>
    </div>
  );
}