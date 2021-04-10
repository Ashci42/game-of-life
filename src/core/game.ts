import { CellState, getNumberLiveNeighbours, Grid, printGrid } from "./grid.ts";

export type Printer = typeof console.log;

export type Printers = {
  generationPrinter?: Printer;
  gridPrinter?: Printer;
};

export function runGameOfLife(
  iterations: number,
  initialGrid: Grid,
  printers?: Printers,
): void {
  const { generationPrinter, gridPrinter } = {
    generationPrinter: console.log,
    gridPrinter: console.log,
    ...printers,
  };
  
  let nextGrid: Grid = initialGrid;

  generationPrinter("Generation 0");
  printGrid(nextGrid, gridPrinter);

  for (let i = 1; i <= iterations; i++) {
    nextGrid = getNextGrid(nextGrid);
    generationPrinter(`Generation ${i}`);
    printGrid(nextGrid, gridPrinter);
  }
}

function getNextGrid(grid: Grid): Grid {
  const nextGrid: Grid = [];

  grid.forEach((gridRow, rowIndex) => {
    const nextGridRow: CellState[] = [];

    gridRow.forEach((cellState, columnIndex) => {
      const numberOfNeighbours = getNumberLiveNeighbours({
        rowIndex,
        columnIndex,
      }, grid);

      const nextCellState = getNextCellState(cellState, numberOfNeighbours);

      nextGridRow.push(nextCellState);
    });

    nextGrid.push(nextGridRow);
  });

  return nextGrid;
}

function getNextCellState(
  cellState: CellState,
  numberOfLiveNeighbours: number,
): CellState {
  if (cellState === CellState.Live) {
    return numberOfLiveNeighbours < 2 || numberOfLiveNeighbours > 3
      ? CellState.Dead
      : CellState.Live;
  }

  return numberOfLiveNeighbours === 3 ? CellState.Live : CellState.Dead;
}
