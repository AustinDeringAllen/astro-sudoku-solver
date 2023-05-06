import { useEffect, useState } from "react";
import SudokuGrid from "./SudokuGrid";
import { solve } from "../util/sudoku";

const DEFAULT_GRID = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const Game = () => {
  const [readyToBeSolved, setReadyToBeSolved] = useState(true);
  const [gameState, setGameState] = useState<number[][]>(
    JSON.parse(JSON.stringify(DEFAULT_GRID))
  );

  const setSelectedSquare = (num: number, row: number, col: number) => {
    setGameState((prev: number[][]) => {
      const previous = [...prev];
      previous[row][col] = num;
      return previous;
    });
  };

  const handleSolve = () => {
    setReadyToBeSolved(false);
    const solved = solve(gameState);
    setGameState(solved);
    console.log(solved);
  };

  const handleReset = () => {
    setGameState(JSON.parse(JSON.stringify(DEFAULT_GRID)));
    setReadyToBeSolved(true);
  };

  return (
    <>
      <SudokuGrid grid={gameState} setSelectedSquare={setSelectedSquare} />
      {readyToBeSolved && (
        <button onClick={handleSolve} disabled={!readyToBeSolved}>
          Solve Game
        </button>
      )}
      {!readyToBeSolved && <button onClick={handleReset}>Reset</button>}
    </>
  );
};

export default Game;
