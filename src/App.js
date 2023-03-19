import React, { useState, useEffect } from 'react';
import "./App.css";

const ROWS = 4;
const COLS = 4;

function App() {
  const [board, setBoard] = useState([]);
  const [emptyTile, setEmptyTile] = useState({ row: ROWS - 1, col: COLS - 1 });
  const [isFinished, setIsFinished] = useState(false);
  
  useEffect(() => {
    resetBoard();
  }, []);

  useEffect(() => {
    const isBoardFinished =
      board.flat().slice(0, -1).join() ===
      [...Array(ROWS * COLS - 1).keys()].map((i) => i + 1).join();
    setIsFinished(isBoardFinished);
  }, [board]);

  const resetBoard = () => {
    // Initialize the board with the numbers 1 through 15 in random order
    const numbers = [...Array(ROWS * COLS - 1).keys()].map(i => i + 1);
    numbers.sort(() => Math.random() - 0.5);
    const newBoard = [];
    for (let row = 0; row < ROWS; row++) {
      const newRow = [];
      for (let col = 0; col < COLS; col++) {
        if (row === ROWS - 1 && col === COLS - 1) {
          newRow.push(null);
        } else {
          newRow.push(numbers[row * COLS + col]);
        }
      }
      newBoard.push(newRow);
    }
    setBoard(newBoard);
    setEmptyTile({ row: ROWS - 1, col: COLS - 1 });
  };

  const moveTile = (row, col) => {
    if (
      (row === emptyTile.row && Math.abs(col - emptyTile.col) === 1) ||
      (col === emptyTile.col && Math.abs(row - emptyTile.row) === 1)
    ) {
      const newBoard = board.map(row => [...row]);
      newBoard[emptyTile.row][emptyTile.col] = newBoard[row][col];
      newBoard[row][col] = null;
      setBoard(newBoard);
      setEmptyTile({ row, col });
    }
  };

  return (
    <div>
      <h1>15 Puzzle</h1>
      <button onClick={resetBoard}>New Game</button>
      {isFinished && <p>Congratulations! You have solved the puzzle!</p>}
      <table>
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((number, colIndex) => (
                <td
                  key={colIndex}
                  onClick={() => moveTile(rowIndex, colIndex)}
                >
                  {number != null ? number : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;