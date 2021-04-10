import { parse } from './deps.ts';
import { runGameOfLife } from "./core/game.ts";
import { parseFile } from "./utils/parse-file.ts";

function main(): void {
  const helpMessage = `
    -f file
      File that contains the initial setup
    -h
      Display help message
    -i
      Number of iterations
  `;
  const args = parse(Deno.args);

  if (args.h !== undefined && args.h === true) {
    console.log(helpMessage);
  } else if (args.f !== undefined) {
    const filePath: string = args.f.toString();
    const initialGrid = parseFile(filePath);

    if (args.i !== undefined) {
      const iterations = parseInt(args.i);

      if (iterations <= 0) {
        throw new Error(
          "Iterations needs to be a positive integer greater than 0",
        );
      }

      runGameOfLife(iterations, initialGrid);
    } else {
      runGameOfLife(10, initialGrid);
    }
  } else {
    throw new Error("No suitable arguments provided. Use -h for help.");
  }
}

main();
