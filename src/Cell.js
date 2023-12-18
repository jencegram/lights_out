import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ flipCellsAroundMe, isLit }) {
  // ***isLit: determines if cell is lit or not
  // ***flipCellsAroundMe: the mechanism by which the cell interacts with the game logic housed in the Board component
      // ***Where flipCellsAroundMe is Defined: Board Component 
            // In Board.js, the flipCellsAround function is the one that actually implements the logic you've described for flipCellsAroundMe. It's this function that gets passed down to each Cell component. 
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  return <td className={classes} onClick={flipCellsAroundMe} />;
}

export default Cell;
