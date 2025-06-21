import React, { useState } from "react";
import "../../App.css";

import {InitialGameStateWhite} from "../../game/logic/InitialGameState.js";
import Players from "../../game/logic/Players.js";

import LocalBoard from "../../game/components/LocalBoard/LocalBoard";

const LocalMultiplayerPage = () => {
  const [inProgress, setInProgress] = useState(false);

  // Stringify hack to deep clone InitialGameState - avoids mutation.
  const [gameState, setGameState] = useState(
    JSON.parse(JSON.stringify(InitialGameStateWhite))
  );
  const [winner, setWinner] = useState(null);
  const [turn, setTurn] = useState(Players.RED);

  return (
    <div className="app p-8 px-12 flex flex-col lg:flex-row justify-center items-center w-full">
      <LocalBoard
        inProgress={inProgress}
        setInProgress={setInProgress}
        gameState={gameState}
        setGameState={setGameState}
        turn={turn}
        setTurn={setTurn}
        winner={winner}
        setWinner={setWinner}
      />
    </div>
  );
};

export default LocalMultiplayerPage;
