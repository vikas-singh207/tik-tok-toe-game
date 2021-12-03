import React, { useState, useEffect } from 'react';
import './game.css';
import ResultPopup from './ResultPopup';

function GameBoard() {
  const [boxIndex] = useState([
    { row: 0, column: 0 },
    { row: 0, column: 1 },
    { row: 0, column: 2 },
    { row: 1, column: 0 },
    { row: 1, column: 1 },
    { row: 1, column: 2 },
    { row: 2, column: 0 },
    { row: 2, column: 1 },
    { row: 2, column: 2 },
  ]);
  const emptyBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  const [gameBoard, setGameBoard] = useState(emptyBoard);
  const [counter, setCounter] = useState(0);
  const [showpopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('This is default title');
  const [activeplayer, setActivePlayer] = useState(true);

  const horizontalVerticalCheck = (row, column) => {
    let returnValue = false;
    let value = gameBoard[row][column];
    let newRow = row;
    let newColumn = 0;

    while (newColumn < 3) {
      if (value == gameBoard[newRow][newColumn]) {
        returnValue = true;
        newColumn++;
      } else {
        returnValue = false;
        break;
      }
    }
    if (!returnValue) {
      let newRow = 0;
      let newColumn = column;

      while (newRow < 3) {
        if (value == gameBoard[newRow][newColumn]) {
          returnValue = true;
          newRow++;
        } else {
          returnValue = false;
          break;
        }
      }
    }

    return returnValue;
  };

  const diagonalCheck = (row, column) => {
    let returnValue = false;
    let value = gameBoard[row][column];
    let rowOne = 0;
    let columnOne = 0;

    while (rowOne < 3) {
      if (value == gameBoard[rowOne][columnOne]) {
        rowOne++;
        columnOne++;
        returnValue = true;
      } else {
        returnValue = false;
        break;
      }
    }
    if (!returnValue) {
      let rowOne = 0;
      let columnOne = 2;
      while (rowOne < 3) {
        if (value == gameBoard[rowOne][columnOne]) {
          rowOne++;
          columnOne--;
          returnValue = true;
        } else {
          returnValue = false;
          break;
        }
      }
    }

    return returnValue;
  };
  const userInput = (row, column) => {
    if (gameBoard[row][column] == '') {
      let value = '';
      if (counter % 2 == 0) {
        value = 'x';
        setActivePlayer(false);
      } else {
        value = 'o';
        setActivePlayer(true);
      }
      let updateGameBoard = [...gameBoard];
      updateGameBoard[row][column] = value;
      setGameBoard(updateGameBoard);
      setCounter((counter) => {
        return (counter = counter + 1);
      });
      let result = false;
      result = diagonalCheck(row, column);
      if (result) {
        setShowPopup(true);
        setMessage('You Won the game');
      } else {
        result = horizontalVerticalCheck(row, column);
        if (result) {
          setShowPopup(true);
          setMessage('You Won the game');
        }
      }
      if (counter == 9) {
        setShowPopup(true);
        setMessage('Game Over');
      }
    }
  };

  const resetGame = () => {
    setGameBoard(emptyBoard);
    setCounter(0);
    setActivePlayer(true);
  };

  return (
    <>
      <div className="playground">
        <span className={`${activeplayer ? 'active' : ''} player`}>X</span>
        <div className="board">
          {boxIndex &&
            boxIndex.map((ele, index) => {
              return (
                <span
                  key={index}
                  row={ele.row}
                  column={ele.column}
                  className="box"
                  onClick={() => {
                    userInput(ele.row, ele.column);
                  }}
                >
                  {gameBoard[ele.row][ele.column]}
                </span>
              );
            })}
        </div>
        <span className={`${!activeplayer ? 'active' : ''} player`}>O</span>
      </div>
      <button className="btn" onClick={resetGame}>
        Reset Game
      </button>

      <ResultPopup
        show={showpopup}
        title={title}
        closeModal={() => {
          setShowPopup(false);
          resetGame();
        }}
        message={message}
        height="h-300"
        width="w-600"
        footerButton={false}
      />
    </>
  );
}

export default GameBoard;
