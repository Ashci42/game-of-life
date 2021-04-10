import { Printer, runGameOfLife } from "./game.ts";
import { assertArrayIncludes, assertEquals } from "../dev-deps.ts";

Deno.test("runGameOfLife logs the correct generation information", () => {
  const generationPrint: string[] = [];

  const generationPrinter: Printer = (data) => {
    generationPrint.push(data);
  };

  const gridPrinter: Printer = () => undefined;

  runGameOfLife(3, [[1, 0], [0, 1]], { generationPrinter, gridPrinter });

  assertArrayIncludes(generationPrint, [
    "Generation 0",
    "Generation 1",
    "Generation 2",
    "Generation 3",
  ]);
});

Deno.test("runGameOfLife logs the correct final grid", () => {
  let finalGridPrint = "";

  const gridPrinter: Printer = (data) => {
    finalGridPrint = data;
  };
  
  const generationPrinter: Printer = () => undefined;

  runGameOfLife(3, [[1, 0], [0, 1]], { generationPrinter, gridPrinter });

  assertEquals(finalGridPrint, "0 0 \n0 0 \n");
});
