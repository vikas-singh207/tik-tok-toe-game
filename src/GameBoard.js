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
  const [showpopup, setShowPopup] = useState(true);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('This is default title');

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
      } else {
        value = 'o';
      }
      let updateGameBoard = [...gameBoard];
      updateGameBoard[row][column] = value;
      setGameBoard(updateGameBoard);
      setCounter((counter) => {
        return (counter = counter + 1);
      });
      let result = false;
      if (row - column == 2 || row - column == -2 || row - column == 0) {
        result = diagonalCheck(row, column);
        if (result) {
          //alert('You Won the game')
          setShowPopup(true);
          setMessage('You Won the game');
        }
      }
      if (!result) {
        if (row - column == -1 || row - column == 1) {
          result = horizontalVerticalCheck(row, column);
          if (result) {
            setShowPopup(true);
            setMessage('You Won the game');
          }
        }
      }
    }
  };

  const resetGame = () => {
    setGameBoard(emptyBoard);
  };

  return (
    <>
      <div className="playground">
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
      </div>
      <button onClick={resetGame}>Reset Game</button>

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
