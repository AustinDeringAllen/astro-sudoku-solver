export const solve = (board: number[][]) => {
  const allEmptyPositions = findEmptyPositions(board);
  const impossibleNumbers = new Map();

  for (let i = 0; i < allEmptyPositions.length; i++)
    impossibleNumbers.set(i, new Set());

  let key = 0;
  while (true) {
    const currentPosition = allEmptyPositions[key];
    const nextMove = findValidMove(
      board,
      currentPosition,
      impossibleNumbers.get(key)
    );

    if (nextMove !== -1) {
      key++;
      board[currentPosition[0]][currentPosition[1]] = nextMove;
    } else {
      impossibleNumbers.get(key).clear();
      key--;
      const previousPosition = allEmptyPositions[key];
      impossibleNumbers
        .get(key)
        .add(board[previousPosition[0]][previousPosition[1]]);
      board[previousPosition[0]][previousPosition[1]] = 0;
    }

    if (key === allEmptyPositions.length) break;
  }

  return board;
};

const findEmptyPositions = (board: number[][]): number[][] => {
  const emptyPositions = [];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++)
      if (board[i][j] === 0) emptyPositions.push([i, j]);
  }

  return emptyPositions;
};

const findValidMove = (
  board: number[][],
  currentPosition: number[],
  impossibleNumbers: Set<number>
) => {
  for (let number = 1; number <= board.length; number++) {
    if (isValidMove(board, currentPosition, number, impossibleNumbers))
      return number;
  }
  return -1;
};

const isValidMove = (
  board: number[][],
  currentPosition: number[],
  number: number,
  impossibleNumbers: Set<number>
): boolean => {
  let row, column, grid;

  if (impossibleNumbers.has(number)) {
    return false;
  }

  row = checkRow(board, currentPosition, number);
  column = checkCol(board, currentPosition, number);
  grid = checkGrid(board, currentPosition, number);

  return row && grid && column;
};

const checkRow = (
  board: number[][],
  currentPosition: number[],
  number: number
): boolean => {
  for (let i = 0; i < board.length; i++) {
    if (board[currentPosition[0]][i] === number) return false;
  }

  return true;
};

const checkCol = (
  board: number[][],
  currentPosition: number[],
  number: number
): boolean => {
  for (let i = 0; i < board.length; i++) {
    if (board[i][currentPosition[1]] === number) return false;
  }
  return true;
};

const checkGrid = (
  board: number[][],
  currentPosition: number[],
  number: number
): boolean => {
  const newPosition = [currentPosition[0], currentPosition[1]];

  // I think this gets the middle;
  for (let i = 0; i < newPosition.length; i++) {
    switch (newPosition[i] % 3) {
      case 0:
        newPosition[i] += 1;
        break;
      case 2:
        newPosition[i] -= 1;
        break;
    }
  }

  for (let i = newPosition[0] - 1; i <= newPosition[0] + 1; i++) {
    for (let j = newPosition[1] - 1; j <= newPosition[1] + 1; j++) {
      if (board[i][j] === number) return false;
    }
  }

  return true;
};
