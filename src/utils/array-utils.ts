export function stringsHaveSameLength(strs: string[]): boolean {
  if (strs.length === 0) {
    return true;
  }

  const length = strs[0].length;

  return strs.every((str) => str.length === length);
}
