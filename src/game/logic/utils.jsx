import Pieces from "./Pieces";
import Cube from "../components/Pieces/Cube";
import Empty from "../components/Pieces/Empty";

const BOARD_WIDTH = 6;
const BOARD_HEIGHT = 9;

export const calculateValidMoves = (rank, file, gameState, setValidMoves) => {
  const piece = gameState[rank][file];
  const movement = movementSpeed(piece);
  let validMoves = [];

  const directions = [
    [-1, 0], // up
    [1, 0],  // down
    [0, -1], // left
    [0, 1],  // right
  ];

  for (let [dx, dy] of directions) {
    for (let i = 1; i <= movement; i++) {
      const newX = rank + dx * i;
      const newY = file + dy * i;

      if (newX < 0 || newX > 7 || newY < 0 || newY > 7) break;

      const target = gameState[newX][newY];

      if (target) {
        if (!isPlayerPiece(target, piece)) {
          validMoves.push([newX, newY]); // Can capture
        }
        break; // Stop after hitting any piece
      }

      validMoves.push([newX, newY]);
    }
  }

  setValidMoves(validMoves);
};

export const isArrayInArray = (arr, item) => {
  const item_as_string = JSON.stringify(item);

  return arr.some(function (ele) {
    return JSON.stringify(ele) === item_as_string;
  });
};

const movementSpeed = (piece) => {
  switch (piece) {
    case Pieces.WHITE:
    case Pieces.BLACK:
      return 4;
    default:
      return 0;
  }
};

const isUpper = (str) => {
  return !/[a-z]/.test(str) && /[A-Z]/.test(str);
};

const isPlayerPiece = (str1, str2) => {
  return isUpper(str1) === isUpper(str2);
};

export const renderPiece = (piece) => {
  switch (piece) {
    case Pieces.WHITE:
      return <Cube colour="white" />;
    case Pieces.BLACK:
      return <Cube colour="black" />;
    default:
      return <Empty />;
  }
};
