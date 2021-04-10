import { getNumberLiveNeighbours, printGrid, stringToGrid } from "./grid.ts";
import {
  assertArrayIncludes,
  assertEquals,
  assertThrows,
} from "../dev-deps.ts";

type GridPrinter = Parameters<typeof printGrid>[1];

const grid = [
  [1, 0, 1],
  [0, 0, 0],
  [1, 1, 1],
];

Deno.test("getNumberLiveNeighbours throws if the coordinates are invalid", () => {
  assertThrows(
    () => {
      getNumberLiveNeighbours({ columnIndex: 2, rowIndex: 5 }, grid);
    },
    Error,
    "{5, 2}",
  );
});

Deno.test("getNumberLiveNeighbours returns the correct number of neighbours when cell is in the centre", () => {
  const numberOfLiveNeighbours = getNumberLiveNeighbours({
    columnIndex: 1,
    rowIndex: 1,
  }, grid);

  assertEquals(numberOfLiveNeighbours, 5);
});

Deno.test("getNumberLiveNeighbours returns the correct number of neighbours when cell is in the last column", () => {
  const numberOfLiveNeighbours = getNumberLiveNeighbours({
    columnIndex: 2,
    rowIndex: 1,
  }, grid);

  assertEquals(numberOfLiveNeighbours, 3);
});

Deno.test("getNumberLiveNeighbours returns the correct number of neighbours when cell is in the top row", () => {
  const numberOfLiveNeighbours = getNumberLiveNeighbours({
    columnIndex: 1,
    rowIndex: 0,
  }, grid);

  assertEquals(numberOfLiveNeighbours, 2);
});

Deno.test("getNumberLiveNeighbours returns the correct number of neighbours when cell is in the top-right corner", () => {
  const numberOfLiveNeighbours = getNumberLiveNeighbours({
    columnIndex: 2,
    rowIndex: 0,
  }, grid);

  assertEquals(numberOfLiveNeighbours, 0);
});

Deno.test("getNumberLiveNeighbours returns the correct number of neighbours when cell is in the top-left corner", () => {
  const numberOfLiveNeighbours = getNumberLiveNeighbours({
    columnIndex: 0,
    rowIndex: 0,
  }, grid);

  assertEquals(numberOfLiveNeighbours, 0);
});

Deno.test("getNumberLiveNeighbours returns the correct number of neighbours when cell is in the bottom row", () => {
  const numberOfLiveNeighbours = getNumberLiveNeighbours({
    columnIndex: 1,
    rowIndex: 2,
  }, grid);

  assertEquals(numberOfLiveNeighbours, 2);
});

Deno.test("getNumberLiveNeighbours returns the correct number of neighbours when cell is in the bottom-right corner", () => {
  const numberOfLiveNeighbours = getNumberLiveNeighbours({
    columnIndex: 2,
    rowIndex: 2,
  }, grid);

  assertEquals(numberOfLiveNeighbours, 1);
});

Deno.test("getNumberLiveNeighbours returns the correct number of neighbours when cell is in the bottom-left corner", () => {
  const numberOfLiveNeighbours = getNumberLiveNeighbours({
    columnIndex: 0,
    rowIndex: 2,
  }, grid);

  assertEquals(numberOfLiveNeighbours, 1);
});

Deno.test("getNumberLiveNeighbours returns the correct number of neighbours when cell is in the first column", () => {
  const numberOfLiveNeighbours = getNumberLiveNeighbours({
    columnIndex: 0,
    rowIndex: 1,
  }, grid);

  assertEquals(numberOfLiveNeighbours, 3);
});

Deno.test("printGrid correctly pritns the grid", () => {
  let printedGrid = "";
  const gridPrinter: GridPrinter = (data) => {
    printedGrid = data;
  };

  printGrid([[1, 0], [0, 1]], gridPrinter);

  assertEquals(printedGrid, "1 0 \n0 1 \n");
});

Deno.test("stringToGrid throws if the input is malformed", () => {
  assertThrows(() => {
    stringToGrid("0001\n001");
  }, Error);
});

Deno.test("stringToGrid throws if the input contains invalid cell states", () => {
  assertThrows(
    () => {
      stringToGrid("0211\n0101");
    },
    Error,
    "2",
  );
});

Deno.test("stringToGrid returns the correct grid", () => {
  const result = stringToGrid("01\n10");

  assertArrayIncludes(result, [[0, 1], [1, 0]]);
});
