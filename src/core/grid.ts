import { stringsHaveSameLength } from "../utils/array-utils.ts";
import {
  areValidCoordinates,
  CellPosition,
  getPositionType,
} from "../utils/coordinates-utils.ts";

export type Coordinates = {
  rowIndex: number;
  columnIndex: number;
};

export enum CellState {
  Dead = 0,
  Live = 1,
}

export type Grid = CellState[][];

export type GridLength = {
  height: number;
  width: number;
};

export function getNumberLiveNeighbours(
  coordinates: Readonly<Coordinates>,
  grid: Grid,
): number {
  const gridLength = getGridLength(grid);

  if (!areValidCoordinates(coordinates, gridLength)) {
    throw new Error(
      `Coordinates {${coordinates.rowIndex}, ${coordinates.columnIndex}} are not valid. Use numbers greater than 0 and less than the length of the grid`,
    );
  }

  const positionType = getPositionType(coordinates, gridLength);
  const cellNeighbours = getCellNeighbours(coordinates, grid, positionType);
  const numberOfLiveNeighbours =
    cellNeighbours.filter((cellNeighbour) => cellNeighbour === CellState.Live)
      .length;

  return numberOfLiveNeighbours;
}

export function printGrid(gird: Grid, gridPrinter = console.log): void {
  let printedGrid = "";

  gird.forEach((girdRow) => {
    girdRow.forEach((cellState) => {
      printedGrid += `${cellState} `;
    });
    printedGrid += "\n";
  });

  gridPrinter(printedGrid);
}

export function stringToGrid(strGrid: string): Grid {
  const lines = strGrid.split("\n");
  const trimmedLines = lines.map((line) => line.replaceAll(/\s/g, ""));

  if (!stringsHaveSameLength(trimmedLines)) {
    throw new Error(
      "The initial grid is malformed. Make sure all the rows have the same number of cells",
    );
  }

  const grid: Grid = [];

  trimmedLines.forEach((trimmedLine) => {
    const gridRow: CellState[] = [];

    for (let i = 0; i < trimmedLine.length; i++) {
      const cellValue = parseInt(trimmedLine[i]);

      if (cellValue !== CellState.Live && cellValue !== CellState.Dead) {
        throw new Error(
          `${cellValue} is not recognised as a valid cell state. Please use ${CellState.Dead} for dead cells and ${CellState.Live} for live cells`,
        );
      }

      gridRow.push(cellValue);
    }

    grid.push(gridRow);
  });

  return grid;
}

function getGridLength(grid: Grid): GridLength {
  if (grid === []) {
    return { height: 0, width: 0 };
  }

  return { height: grid.length, width: grid[0].length };
}

function getCellNeighbours(
  coordinates: Coordinates,
  grid: Grid,
  positionType: CellPosition,
): CellState[] {
  const { columnIndex, rowIndex } = coordinates;
  const nextColumnIndex = columnIndex + 1;
  const nextRowIndex = rowIndex + 1;
  const prevColumnIndex = columnIndex - 1;
  const prevRowIndex = rowIndex - 1;

  switch (positionType) {
    case "C":
      return [
        grid[prevRowIndex][prevColumnIndex],
        grid[prevRowIndex][columnIndex],
        grid[prevRowIndex][nextColumnIndex],
        grid[rowIndex][nextColumnIndex],
        grid[nextRowIndex][nextColumnIndex],
        grid[nextRowIndex][columnIndex],
        grid[nextRowIndex][prevColumnIndex],
        grid[rowIndex][prevColumnIndex],
      ];
    case "E":
      return [
        grid[prevRowIndex][prevColumnIndex],
        grid[prevRowIndex][columnIndex],
        grid[nextRowIndex][columnIndex],
        grid[nextRowIndex][prevColumnIndex],
        grid[rowIndex][prevColumnIndex],
      ];
    case "N":
      return [
        grid[rowIndex][nextColumnIndex],
        grid[nextRowIndex][nextColumnIndex],
        grid[nextRowIndex][columnIndex],
        grid[nextRowIndex][prevColumnIndex],
        grid[rowIndex][prevColumnIndex],
      ];
    case "NE":
      return [
        grid[nextRowIndex][columnIndex],
        grid[nextRowIndex][prevColumnIndex],
        grid[rowIndex][prevColumnIndex],
      ];
    case "NW":
      return [
        grid[rowIndex][nextColumnIndex],
        grid[nextRowIndex][nextColumnIndex],
        grid[nextRowIndex][columnIndex],
      ];
    case "S":
      return [
        grid[prevRowIndex][prevColumnIndex],
        grid[prevRowIndex][columnIndex],
        grid[prevRowIndex][nextColumnIndex],
        grid[rowIndex][nextColumnIndex],
        grid[rowIndex][prevColumnIndex],
      ];
    case "SE":
      return [
        grid[prevRowIndex][prevColumnIndex],
        grid[prevRowIndex][columnIndex],
        grid[rowIndex][prevColumnIndex],
      ];
    case "SW":
      return [
        grid[prevRowIndex][columnIndex],
        grid[prevRowIndex][nextColumnIndex],
        grid[rowIndex][nextColumnIndex],
      ];
    case "W":
      return [
        grid[prevRowIndex][columnIndex],
        grid[prevRowIndex][nextColumnIndex],
        grid[rowIndex][nextColumnIndex],
        grid[nextRowIndex][nextColumnIndex],
        grid[nextRowIndex][columnIndex],
      ];
  }
}
