export function shortenStr(
  str: string,
  startSymbols = 3,
  endSymbols = 0,
  separation = '...'
): string {
  if (str.length <= startSymbols + endSymbols) return str

  const openingLetters = str.slice(0, startSymbols)
  const closingLetters = str.slice(-endSymbols)

  return `${openingLetters}${separation}${closingLetters}`
}
