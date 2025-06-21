import Pieces from "./Pieces";
import Cube from "../components/Pieces/Cube";
import Empty from "../components/Pieces/Empty";

const BOARD_ROWS = 9;     // height (Y)
const BOARD_COLS = 6;     // width (X)

export const calculateValidMoves = (rank, file, gameState, setValidMoves) => {
  const piece = gameState[rank][file];

  // Don't calculate anything for empty spaces
  if (!piece) return;

  const movement = movementSpeed(piece);

  const validMoves = []
  const directionMap = [
    { dx: -1, dy: 0, name: "up" },
    { dx: 1, dy: 0, name: "down" },
    { dx: 0, dy: -1, name: "left" },
    { dx: 0, dy: 1, name: "right" },
  ];

  for (let { dx, dy, name } of directionMap) {
    const maxSteps = movement[name];
    for (let i = 1; i <= maxSteps; i++) {
      const newRow = rank + dx * i;
      const newCol = file + dy * i;

      // If out of bounds, break loop
      if (newRow < 0 || newRow >= BOARD_ROWS || newCol < 0 || newCol >= BOARD_COLS) break;

      const target = gameState[newRow][newCol];

      if (target) {
        if (isPlayerPiece(target, piece)) {
          // Can hop over your own pieces
          continue;
        } else {
          // Can take opponent pieces
          validMoves.push([newRow, newCol]);
          continue;
        }
      }

      validMoves.push([newRow, newCol]);
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

export const movementSpeed = (piece) => {
  switch (piece) {
    case Pieces.WHITE:
      return { up: 2, down: 4, left: 1, right: 3 };
    case Pieces.BLACK:
      return { up: 4, down: 2, left: 3, right: 1 };
    default:
      return { up: 0, down: 0, left: 0, right: 0 };
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
