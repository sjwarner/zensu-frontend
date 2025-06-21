import React, { useState } from "react";
import useSound from "use-sound";

import BoardSquares from "../BoardSquares/BoardSquares";
import LocalBoardCaption from "../LocalBoardCaption/LocalBoardCaption";
import BoardSidePane from "../SidePane/BoardSidePane/BoardSidePane";

import moveSfx from "../../../sounds/move.wav";

import Pieces from "../../logic/Pieces";
import Players from "../../logic/Players";
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
      (turn === Players.WHITE &&
        candidatePiece &&
        candidatePiece === candidatePiece.toUpperCase()) ||
      (turn === Players.BLACK &&
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

  const clearPiecesBetween = (originRank, originFile, destinationRank, destinationFile, gameState) => {
    const stepRow = Math.sign(destinationRank - originRank);
    const stepCol = Math.sign(destinationFile - originFile);
    const distance = Math.max(
        Math.abs(destinationRank - originRank),
        Math.abs(destinationFile - originFile)
    );

    const positionsToClear = new Set();
    for (let i = 1; i < distance; i++) {
      positionsToClear.add(`${originRank + stepRow * i},${originFile + stepCol * i}`);
    }

    return gameState.map((row, r) =>
        row.map((cell, c) => (positionsToClear.has(`${r},${c}`) ? "" : cell))
    );
  };

  const movePiece = (destinationRank, destinationFile) => {
    if (isArrayInArray(validMoves, [destinationRank, destinationFile])) {
      let newGameState = clearPiecesBetween(originRank, originFile, destinationRank, destinationFile, gameState);

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
      setTurn(turn === Players.WHITE ? Players.BLACK : Players.WHITE);
    }
  };


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
