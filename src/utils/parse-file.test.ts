import { parseFile } from "./parse-file.ts";
import { assertArrayIncludes } from "../dev-deps.ts";

type ReadFileFn = Parameters<typeof parseFile>[1];

Deno.test("parseFile correctly converts the file to a grid", () => {
  const readFileFn: ReadFileFn = () => "0 0\n1 0";
  const grid = parseFile("foo", readFileFn);

  assertArrayIncludes(grid, [[0, 0], [1, 0]]);
});
