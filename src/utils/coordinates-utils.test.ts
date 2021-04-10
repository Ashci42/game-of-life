import { areValidCoordinates, getPositionType } from "./coordinates-utils.ts";
import { assert, assertEquals } from "../dev-deps.ts";
import { GridLength } from "../core/grid.ts";

const gridLength: GridLength = { height: 10, width: 10 };

Deno.test("areValidCoordinates returns false if columnIndex is smaller than 0", () => {
  const result = areValidCoordinates(
    { columnIndex: -1, rowIndex: 0 },
    gridLength,
  );

  assert(!result);
});

Deno.test("areValidCoordinates returns false if columnIndex is larger than the grid width", () => {
  const result = areValidCoordinates(
    { columnIndex: 13, rowIndex: 2 },
    gridLength,
  );

  assert(!result);
});

Deno.test("areValidCoordinates returns false if rowIndex is smaller than 0", () => {
  const result = areValidCoordinates(
    { columnIndex: 3, rowIndex: -3 },
    gridLength,
  );

  assert(!result);
});

Deno.test("areValidCoordinates returns false if rowIndex is larger than the grid height", () => {
  const result = areValidCoordinates(
    { columnIndex: 3, rowIndex: 12 },
    gridLength,
  );

  assert(!result);
});

Deno.test("getPositionType returns NW when cell is in top-left corner", () => {
  const position = getPositionType({ columnIndex: 0, rowIndex: 0 }, gridLength);

  assertEquals(position, "NW");
});

Deno.test("getPositionType returns NE when cell is in top-right corner", () => {
  const position = getPositionType({ columnIndex: 9, rowIndex: 0 }, gridLength);

  assertEquals(position, "NE");
});

Deno.test("getPositionType returns N when cell is on the top row", () => {
  const position = getPositionType({ columnIndex: 4, rowIndex: 0 }, gridLength);

  assertEquals(position, "N");
});

Deno.test("getPositionType returns SW when cell is in bottom-left corner", () => {
  const position = getPositionType({ columnIndex: 0, rowIndex: 9 }, gridLength);

  assertEquals(position, "SW");
});

Deno.test("getPositionType returns SE when cell is in bottom-right corner", () => {
  const position = getPositionType({ columnIndex: 9, rowIndex: 9 }, gridLength);

  assertEquals(position, "SE");
});

Deno.test("getPositionType returns S when cell is on bottom row", () => {
  const position = getPositionType({ columnIndex: 3, rowIndex: 9 }, gridLength);

  assertEquals(position, "S");
});

Deno.test("getPositionType returns W when cell is in the first column", () => {
  const position = getPositionType({ columnIndex: 0, rowIndex: 5 }, gridLength);

  assertEquals(position, "W");
});

Deno.test("getPositionType returns E when cell is in the last column", () => {
  const position = getPositionType({ columnIndex: 9, rowIndex: 5 }, gridLength);

  assertEquals(position, "E");
});

Deno.test("getPositionType returns C when cell is in the centre of the grid", () => {
  const position = getPositionType({ columnIndex: 8, rowIndex: 5 }, gridLength);

  assertEquals(position, "C");
});
