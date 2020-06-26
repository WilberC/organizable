export function titleString(string, splitBy, joinAt) {
    const splitter = splitBy ? splitBy : ' '
    const joiner = joinAt ? joinAt : ' '
    const wordSplit = string.split(splitter)
    const mapFunction = (e) => e.charAt(0).toUpperCase() + e.slice(1)
    return wordSplit.map(mapFunction).join(joiner)
}
