import React from "react";
import BoardSquare from "../BoardSquare/BoardSquare";
import { isArrayInArray } from "../../logic/utils";

const BoardSquares = ({
  gameState,
  originRank,
  originFile,
  lastMove,
  validMoves,
  inProgress,
  isPlayerTurn,
  makeMove,
}) => {
  return Array(9)
    .fill(1)
    .map((el, x) => {
      return (
        <div id={`rank-${x}`} className="board-row flex flex-row" key={x}>
          {Array(6)
            .fill(1)
            .map((el, y) => {
              return (
                <BoardSquare
                  colour={x === 0 || x === 8 ? "middle" : "home-row"}
                  piece={gameState[x][y]}
                  selected={x === originRank && y === originFile}
                  lastMove={lastMove ? lastMove[x][y] : null}
                  valid={isArrayInArray(validMoves, [x, y])}
                  onClick={() => {
                    // Online play, if in progress and is player turn - Offline play, if in progress and player turn undefined
                    if (
                      (inProgress && isPlayerTurn) ||
                      (inProgress && isPlayerTurn === undefined)
                    )
                      makeMove(x, y);
                  }}
                  key={y}
                />
              );
            })}
        </div>
      );
    });
};

export default BoardSquares;
