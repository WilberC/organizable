import {titleString} from './title_string.js'

const wordToRemove = '.html'.length

export function formatHtmlName(string, splitBy, joinAt) {
    const newStringFormatted = titleString(string, splitBy, joinAt)
    return newStringFormatted.slice(0, (newStringFormatted.length - wordToRemove))
}