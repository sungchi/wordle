import { solution } from './words'
import * as Hangul from 'hangul-js'
export type CharStatus = 'absent' | 'present' | 'correct'

export type CharValue =
  | 'ㅂ'
  | 'ㅈ'
  | 'ㄷ'
  | 'ㄱ'
  | 'ㅅ'
  | 'ㅛ'
  | 'ㅕ'
  | 'ㅑ'
  | 'ㅐ'
  | 'ㅔ'
  | 'ㅁ'
  | 'ㄴ'
  | 'ㅇ'
  | 'ㄹ'
  | 'ㅎ'
  | 'ㅗ'
  | 'ㅓ'
  | 'ㅏ'
  | 'ㅣ'
  | 'ㅋ'
  | 'ㅌ'
  | 'ㅊ'
  | 'ㅍ'
  | 'ㅠ'
  | 'ㅜ'
  | 'ㅡ'
  | 'ㅃ'
  | 'ㅉ'
  | 'ㄸ'
  | 'ㄲ'
  | 'ㅆ'

  export const getStatuses = (
    guesses: string[]
  ): { [key: string]: CharStatus } => {
    const charObj: { [key: string]: CharStatus } = {}
  
    guesses.forEach((word) => {
      word.split('').forEach((letter, i) => {
        const l = Hangul.disassemble(letter) //입력 음절
        const s = Hangul.disassemble(solution[i]) //답 음절
        const sol = Hangul.disassemble(solution) // 전체 답
        l.map(function(a){
          return charObj[a] = 'absent'
        });

        l.filter(x => {
          if(sol.includes(x)){
            return charObj[x] = 'present'
          }
          return false
        })

        if (s.filter(x => l.includes(x)).length === s.length && s.length === l.length) {
          l.map(function(a){
            return charObj[a] = 'correct'
          }); 
        }
        if(s[0]===l[0]){
          charObj[s[0]] = 'correct' 
        }
        if(s[1]===l[1]){
          charObj[s[1]] = 'correct' 
        }

        if(s.length===3 && l.length===3){
          if(s[2]===l[2]){
            charObj[s[2]] = 'correct' 
          }
        }
        if(s.length===4 && l.length===4){
          if(s[2]===l[2]){
            charObj[s[2]] = 'correct' 
          }
          if(s[3]===l[3]){
            charObj[s[3]] = 'correct' 
          }
        }
        if(s.length===5 && l.length===5){
          if(s[1]===l[1]){
            charObj[s[1]] = 'correct' 
          }
          if(s[2]===l[2]){
            charObj[s[2]] = 'correct' 
          }
          if(s[3]===l[3]){
            charObj[s[3]] = 'correct' 
          }
          if(s[4]===l[4]){
            charObj[s[4]] = 'correct' 
          }
        }


        // if (sol.filter(x => l.includes(x)).length === 0) {
        //   // make status absent
        //   return (charObj[letter] = 'absent')
        // }
  
        // if (s.filter(x => l.includes(x)).length === s.length) {
        //   //make status correct
        //   return (charObj[letter] = 'correct')
        // }
  
        // //s.map(function (a) { console.log(a) });
        // // console.log(s.filter(x => l.includes(x)),l,s,charObj[letter] )
  
        // if (charObj[letter] !== 'correct') {
        //   //make status present
        //   return (charObj[letter] = 'present')
        // }

      })
    })
    return charObj
  }

export const getGuessStatuses = (guess: string): CharStatus[] => {

  const splitSolution = solution.split('')
  const splitGuess = guess.split('')

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // console.log(Array.from(Array(guess.length)))
  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    const l = Hangul.disassemble(letter)
    // const s = Hangul.disassemble(solution[i])
    const sol = Hangul.disassemble(solution)

    

    if(sol.filter(x => l.includes(x)).length === 0){
    // if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    } else {
      statuses[i] = 'present'
      solutionCharsTaken[i] = true
      return
    }
    // console.log(solutionCharsTaken)
    // now we are left with "present"s
    // const indexOfPresentChar = splitSolution.findIndex(
    //   (x, index) => x === letter && !solutionCharsTaken[index]
    // )

    // if (indexOfPresentChar > -1) {
    //   statuses[i] = 'present'
    //   solutionCharsTaken[indexOfPresentChar] = true
    //   return
    // } else {
    //   statuses[i] = 'absent'
    //   return
    // }
  })

  // console.log(statuses)
  return statuses
}
