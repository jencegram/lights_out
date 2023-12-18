import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

// function Board({ nrows, ncols, chanceLightStartsOn }) {
function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = 0.25 }) {
  console.log("Rows:", nrows, "Cols:", ncols, "Chance:", chanceLightStartsOn);
  const [board, setBoard] = useState(createBoard());
  //  The useState hook is used to declare a state variable named board.
  // createBoard is a function that generates the initial layout of the board. It creates a grid (array of arrays) where each element is a boolean indicating whether a light is on (true) or off (false). This grid is used as the initial value of the board state.

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
    console.log("Initial board state:", initialBoard);
    return initialBoard;
  }

  function resetGame() {
    setBoard(createBoard());
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // Check every cell, if any cell is lit, return false
    for (let row of board) {
      for (let cell of row) {
        if (cell) return false; // Found a lit cell, so not won
      }
    }
    return true; // All cells are unlit
  }


  function flipCellsAround(coord) {
    console.log("Cell clicked:", coord);
    // ***Key Points in flipCellsAround Function:
    // ***Updating State: This function updates the board state using setBoard, which is the state updating function provided by the useState hook.
    // ***Determining Cells to Flip: The coord parameter represents the coordinates of the clicked cell. This is used to determine which cells to flip (the clicked cell and its adjacent cells).
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = oldBoard.map(row => [...row]);

      // Helperfunction to flip a cell (if within board boundaries)
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);     // Flip the clicked cell
      flipCell(y, x - 1, newBoard); // left
      flipCell(y, x + 1, newBoard); // right
      flipCell(y - 1, x, newBoard); // above
      flipCell(y + 1, x, newBoard); // below

      console.log("New board state:", newBoard);
      // TODO: return the copy
      return newBoard;
    });
  }


  // TODO
  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return (
        <>
            <div className="Winning-Message">Congratulations! You've won!</div>
            <button onClick={resetGame}>Restart Game</button>
        </>
    );
}


  // TODO
  // make table board
  return (
    <>
      <table className="Board">
        <tbody>
          {board.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((isLit, colIndex) => (
                <Cell
                  key={`${rowIndex}-${colIndex}`}
                  isLit={isLit}
                  flipCellsAroundMe={() => flipCellsAround(`${rowIndex}-${colIndex}`)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={resetGame}>Restart Game</button>
    </>
  );
}

export default Board;