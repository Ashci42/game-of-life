import { Coordinates, GridLength } from "../core/grid.ts";

export type CellPosition =
  | "N"
  | "NE"
  | "E"
  | "SE"
  | "S"
  | "SW"
  | "W"
  | "NW"
  | "C";

export function areValidCoordinates(
  coordinates: Readonly<Coordinates>,
  gridLength: Readonly<GridLength>,
): boolean {
  const { columnIndex, rowIndex } = coordinates;
  const { height, width } = gridLength;

  return columnIndex >= 0 && columnIndex < width && rowIndex >= 0 &&
    rowIndex < height;
}

export function getPositionType(
  coordinates: Readonly<Coordinates>,
  gridLength: Readonly<GridLength>,
): CellPosition {
  const { columnIndex, rowIndex } = coordinates;
  const { height, width } = gridLength;

  if (rowIndex === 0) {
    if (columnIndex === 0) {
      return "NW";
    } else if (columnIndex === width - 1) {
      return "NE";
    }

    return "N";
  } else if (rowIndex === height - 1) {
    if (columnIndex === 0) {
      return "SW";
    } else if (columnIndex === width - 1) {
      return "SE";
    }

    return "S";
  } else if (columnIndex === 0) {
    return "W";
  } else if (columnIndex === width - 1) {
    return "E";
  }

  return "C";
}
