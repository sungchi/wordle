import { WORDS } from '../constants/wordlist'
import { VALIDGUESSES } from '../constants/validGuesses'
import * as Hangul from 'hangul-js';

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(word.toLowerCase()) ||
    VALIDGUESSES.includes(word.toLowerCase())
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

export const getWordOfDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date('January 1, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs
  const solution = WORDS[index % WORDS.length].toUpperCase()
  const h = Hangul.disassemble(solution,true)

  return {
    solution: solution,
    solutionIndex: index,
    tomorrow: nextday,
    consonant: h.map(function(value,index) { return value[0]; }),
  }
}

export const { solution, solutionIndex, tomorrow,consonant } = getWordOfDay()
