import React from "react";
import Pieces from "../../../logic/Pieces";
import MaterialCounter from "../MaterialCounter/MaterialCounter";
import DrawOrResignWidget from "../DrawOrResignPanel/DrawOrResignWidget";

const BoardSidePane = ({
  gameState,
  socket,
  hasResigned,
  setHasResigned,
  inProgress,
  setInProgress,
  hasOfferedDraw,
  setHasOfferedDraw,
  hasOpponentOfferedDraw,
  setHasOpponentOfferedDraw,
  setIsGameDrawn,
}) => {
  return (
    <div className="flex-flex-col">
      <div className="w-64 flex flex-row lg:flex-col justify-center items-center">
        <MaterialCounter gameState={gameState} piece={Pieces.RED_FRONT_ROW} />
        <MaterialCounter gameState={gameState} piece={Pieces.RED_BACK_ROW} />
        <MaterialCounter gameState={gameState} piece={Pieces.BLUE_FRONT_ROW} />
        <MaterialCounter gameState={gameState} piece={Pieces.BLUE_BACK_ROW} />
      </div>
      {socket && (
        <DrawOrResignWidget
          socket={socket}
          hasResigned={hasResigned}
          setHasResigned={setHasResigned}
          inProgress={inProgress}
          setInProgress={setInProgress}
          hasOfferedDraw={hasOfferedDraw}
          setHasOfferedDraw={setHasOfferedDraw}
          hasOpponentOfferedDraw={hasOpponentOfferedDraw}
          setHasOpponentOfferedDraw={setHasOpponentOfferedDraw}
          setIsGameDrawn={setIsGameDrawn}
        />
      )}
    </div>
  );
};

export default BoardSidePane;
