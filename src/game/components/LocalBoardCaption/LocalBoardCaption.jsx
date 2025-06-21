import React, { useState } from "react";
import Caption from "../../../general/components/Caption/Caption";
import Button from "../../../general/components/Button/Button";

import Players from "../../logic/Players";
import { InitialGameStateWhite } from "../../logic/InitialGameState";
import GameModes from "../../logic/GameModes";

const LocalBoardCaption = ({
  inProgress,
  setInProgress,
  winner,
  setWinner,
  setGameState,
  turn,
}) => {
  const [previousGameMode, setPreviousGameMode] = useState(null);

  const resetGame = (gameMode) => {
    setInProgress(true);
    setPreviousGameMode(gameMode);
    setWinner(null);

    setGameState(JSON.parse(JSON.stringify(InitialGameStateWhite)));
  };

  return (
    <div className="mt-4 mb-4">
      {winner && (
        <Caption>
          🎉 {winner === Players.WHITE ? "Player One" : "Player Two"} won! 🎉
        </Caption>
      )}
      {inProgress && (
        <Caption>{turn === Players.WHITE ? "White" : "Black"}'s turn.</Caption>
      )}
      {!inProgress && (
        <div className="flex flex-row mb-4">
          <Button onClick={() => resetGame(GameModes.ORIGINAL)}>
            {winner && previousGameMode === GameModes.ORIGINAL
              ? "Play again?"
              : "Play!"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default LocalBoardCaption;
