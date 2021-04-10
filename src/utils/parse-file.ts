import { Grid, stringToGrid } from "../core/grid.ts";

export function parseFile(
  filePath: string,
  readFileFn = Deno.readTextFileSync,
): Grid {
  const fileContent = readFileFn(filePath);
  const grid = stringToGrid(fileContent);

  return grid;
}
