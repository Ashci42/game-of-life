import { stringsHaveSameLength } from "./array-utils.ts";
import { assert } from "../dev-deps.ts";

Deno.test("stringsHaveSameLength returns true when array is empty", () => {
  const haveSameLength = stringsHaveSameLength([]);

  assert(haveSameLength);
});

Deno.test("stringsHaveSameLength returns true when strings have same length", () => {
  const haveSameLength = stringsHaveSameLength(["abc", "def", "ghi"]);

  assert(haveSameLength);
});

Deno.test("stringsHaveSameLength returns false when strings have different length", () => {
  const haveSameLength = stringsHaveSameLength(["abc", "def", "ghij"]);

  assert(!haveSameLength);
});
