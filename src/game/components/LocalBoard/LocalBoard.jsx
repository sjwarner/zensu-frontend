import React, { useState } from "react";
import useSound from "use-sound";

import BoardSquares from "../BoardSquares/BoardSquares";
import LocalBoardCaption from "../LocalBoardCaption/LocalBoardCaption";
import BoardSidePane from "../SidePane/BoardSidePane/BoardSidePane";

import moveSfx from "../../../sounds/move.wav";

import Players from "../../logic/Players";
import Pieces from "../../logic/Pieces.js";
import {calculateValidMoves, isArrayInArray} from "../../logic/utils";

const LocalBoard = ({
  inProgress,
  setInProgress,
  gameState,
  setGameState,
  turn,
  setTurn,
  winner,
  setWinner,
}) => {
  const [originRank, setOriginRank] = useState(null);
  const [originFile, setOriginFile] = useState(null);
  const [playMoveSound] = useSound(moveSfx);
  const [validMoves, setValidMoves] = useState([]);

  const makeMove = (rank, file) => {
    playMoveSound();
    originRank === null && originFile === null
      ? selectCandidatePiece(rank, file)
      : originRank === rank && originFile === file
      ? clearCandidatePiece()
      : movePiece(rank, file);
  };

  const selectCandidatePiece = (rank, file) => {
    let candidatePiece = gameState[rank][file];
    if (
      (turn === Players.RED &&
        candidatePiece &&
        candidatePiece === candidatePiece.toUpperCase()) ||
      (turn === Players.BLUE &&
        candidatePiece &&
        candidatePiece === candidatePiece.toLowerCase())
    ) {
      setOriginRank(rank);
      setOriginFile(file);
      calculateValidMoves(
        rank,
        file,
        gameState,
        setValidMoves
      );
    }
  };

  const clearCandidatePiece = () => {
    setOriginRank(null);
    setOriginFile(null);
    setValidMoves([]);
  };

  const clearPiecesBetween = (
      originRank,
      originFile,
      destinationRank,
      destinationFile,
      gameState,
      currentPlayer
  ) => {
    const rowStep = Math.sign(destinationRank - originRank);
    const colStep = Math.sign(destinationFile - originFile);
    const distance = Math.max(
        Math.abs(destinationRank - originRank),
        Math.abs(destinationFile - originFile)
    );

    return gameState.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          for (let step = 1; step < distance; step++) {
            const currentRow = originRank + rowStep * step;
            const currentCol = originFile + colStep * step;

            const isOpponent =
                (currentPlayer === Players.RED && cell === cell.toLowerCase()) ||
                (currentPlayer === Players.BLUE && cell === cell.toUpperCase());

            if (rowIndex === currentRow && colIndex === currentCol && isOpponent) {
              return "";
            }
          }
          return cell;
        })
    );
  };

  const movePiece = (destinationRank, destinationFile) => {
    if (isArrayInArray(validMoves, [destinationRank, destinationFile])) {
      let newGameState = clearPiecesBetween(originRank, originFile, destinationRank, destinationFile, gameState, turn);

      newGameState = newGameState.map((row, r) =>
          row.map((cell, c) => {
            if (r === destinationRank && c === destinationFile) return gameState[originRank][originFile];
            if (r === originRank && c === originFile) return "";
            return cell;
          })
      );

      setGameState(newGameState);
      setOriginRank(null);
      setOriginFile(null);
      setValidMoves([]);

      checkWinCondition(newGameState);

      setTurn(turn === Players.RED ? Players.BLUE : Players.RED);
    }
  };

  const checkWinCondition = (board) => {
    const redPieces = new Set([Pieces.RED_FRONT_ROW, Pieces.RED_BACK_ROW]);
    const bluePieces = new Set([Pieces.BLUE_FRONT_ROW, Pieces.BLUE_BACK_ROW]);

    const firstRow = board[0];
    const redWins = firstRow.some(cell => redPieces.has(cell));

    const lastRow = board[board.length - 1];
    const blueWins = lastRow.some(cell => bluePieces.has(cell));

    if (redWins || blueWins) {
      setWinner(turn);
      setInProgress(false);
    }
  }

  return (
    <>
      <div className="board flex flex-row m-auto">
        <div className="content">
          <BoardSquares
            gameState={gameState}
            originRank={originRank}
            originFile={originFile}
            validMoves={validMoves}
            inProgress={inProgress}
            makeMove={makeMove}
          />
          <LocalBoardCaption
            inProgress={inProgress}
            setInProgress={setInProgress}
            winner={winner}
            setWinner={setWinner}
            setGameState={setGameState}
            turn={turn}
          />
        </div>
      </div>
      <BoardSidePane gameState={gameState} />
    </>
  );
};

export default LocalBoard;
