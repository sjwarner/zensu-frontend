import Pieces from "./Pieces";
import FrontRowPiece from "../components/Pieces/FrontRowPiece.jsx";
import BackRowPiece from "../components/Pieces/BackRowPiece.jsx";
import Empty from "../components/Pieces/Empty";

const BOARD_ROWS = 9;
const BOARD_COLS = 6;

export const calculateValidMoves = (rank, file, gameState, setValidMoves) => {
  const piece = gameState[rank][file];
  if (!piece) return;

  const moves = [];
  const move = (dx, dy, steps) => {
    const destRow = rank + dx * steps;
    const destCol = file + dy * steps;

    // Check if destination is on board
    if (destRow < 0 || destRow >= BOARD_ROWS || destCol < 0 || destCol >= BOARD_COLS) return;

    const destCell = gameState[destRow][destCol];

    // You can move if the destination is empty or occupied by an opponent
    if (!destCell || !isPlayerPiece(destCell, piece)) {
      moves.push([destRow, destCol]);
    }
  };

  const movement = movementSpeed(piece);

  move(-1, 0, movement.up);
  move(1, 0, movement.down);
  move(0, -1, movement.left);
  move(0, 1, movement.right);

  setValidMoves(moves);
};

export const isArrayInArray = (arr, item) => {
  const item_as_string = JSON.stringify(item);

  return arr.some(function (ele) {
    return JSON.stringify(ele) === item_as_string;
  });
};

export const movementSpeed = (piece) => {
  switch (piece) {
    case Pieces.RED_BACK_ROW:
      return { up: 2, down: 4, left: 1, right: 3 };
    case Pieces.BLUE_BACK_ROW:
      return { up: 4, down: 2, left: 3, right: 1 };
    case Pieces.RED_FRONT_ROW:
      return { up: 1, down: 3, left: 4, right: 2 };
    case Pieces.BLUE_FRONT_ROW:
      return { up: 3, down: 1, left: 2, right: 4 };
    default:
      return { up: 0, down: 0, left: 0, right: 0 };
  }
};

const isUpper = (str) => {
  return !/[a-z]/.test(str) && /[A-Z]/.test(str);
};

export const isPlayerPiece = (str1, str2) => {
  return isUpper(str1) === isUpper(str2);
};

export const renderPiece = (piece, forBoard = true) => {
  switch (piece) {
    case Pieces.RED_BACK_ROW:
      return <BackRowPiece colour="red" forBoard={forBoard} />;
    case Pieces.BLUE_BACK_ROW:
      return <BackRowPiece colour="blue" forBoard={forBoard} />;
    case Pieces.RED_FRONT_ROW:
      return <FrontRowPiece colour="red" forBoard={forBoard} />;
    case Pieces.BLUE_FRONT_ROW:
      return <FrontRowPiece colour="blue" forBoard={forBoard} />;
    default:
      return <Empty />;
  }
};
