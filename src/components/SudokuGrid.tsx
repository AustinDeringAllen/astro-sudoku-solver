import { useEffect, useState } from "react";

const SudokuGrid = ({
  grid,
  setSelectedSquare,
}: {
  grid: number[][];
  setSelectedSquare: (num: number, row: number, col: number) => void;
}) => {
  const renderedGrid = grid.map((row, rowIndex) => {
    return (
      <tr key={rowIndex} className="border border-black">
        {row.map((cell, colIndex) => (
          <SudokuCell
            cellValue={cell}
            cellIndex={{ row: rowIndex, col: colIndex }}
            setSelectedSquare={setSelectedSquare}
            key={colIndex}
          />
        ))}
      </tr>
    );
  });

  return (
    <table>
      <tbody className="border border-black border-collapse">
        {renderedGrid}
        {/* {grid.map((row, rowIndex) => {
          return (
            <tr key={rowIndex} className="border border-black">
              {row.map((cell, colIndex) => (
                <SudokuCell
                  key={colIndex}
                  cellValue={cell}
                  cellIndex={{ row: rowIndex, col: colIndex }}
                  setSelectedSquare={setSelectedSquare}
                />
              ))}
            </tr>
          );
        })} */}
      </tbody>
    </table>
  );
};

export default SudokuGrid;

const SudokuCell = ({
  cellValue,
  cellIndex,
  setSelectedSquare,
}: {
  cellValue: number;
  cellIndex: { row: number; col: number };
  setSelectedSquare: (num: number, row: number, col: number) => void;
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log("Cell Render");
    setValue(cellValue);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value);
    if (value > 9 || value < 0) {
      setValue(0);
      return;
    }
    setSelectedSquare(value, cellIndex.row, cellIndex.col);
    setValue(value);
  };

  return (
    <td className="border border-black w-8 h-8">
      <input
        type="number"
        min={0}
        max={9}
        className="w-8 h-8 text-center outline-none"
        value={value === 0 ? "" : value}
        onChange={handleChange}
      />
    </td>
  );
};
