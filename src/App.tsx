import {
  // InformationCircleIcon,
  ChartBarIcon,
  SunIcon,
} from '@heroicons/react/outline'
import { useState, useEffect } from 'react'
import { Alert } from './components/alerts/Alert'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { AboutModal } from './components/modals/AboutModal'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import {
  // WORDLE_TITLE,
  WIN_MESSAGES,
  GAME_COPIED_MESSAGE,
  ABOUT_GAME_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  CORRECT_WORD_MESSAGE,
} from './constants/strings'
import { isWordInWordList, isWinningWord, solution } from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from './lib/localStorage'

import './App.css'
import * as Hangul from 'hangul-js'

const ALERT_TIME_MS = 2000

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false)
  const [isNotEnoughLetters, setIsNotEnoughLetters] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isShifted, setIsShifted] = useState(false)
  const [isWordNotFoundAlertOpen, setIsWordNotFoundAlertOpen] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [successAlert, setSuccessAlert] = useState('')
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === 6 && !gameWasWon) {
      setIsGameLost(true)
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      setSuccessAlert(
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      )
      setTimeout(() => {
        setSuccessAlert('')
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, ALERT_TIME_MS)
    }
  }, [isGameWon, isGameLost])

  const onChar = (value: string) => {
    // console.log(currentGuess)
    const h = Hangul.disassemble(`${currentGuess}${value}`)
    const asm = Hangul.assemble(h)
    if (
      (currentGuess.length < 3 || asm.length < 4) &&
      guesses.length < 6 &&
      !isGameWon
    ) {
      setCurrentGuess(asm)
    }
  }

  const onDelete = () => {
    const h = Hangul.disassemble(`${currentGuess}`).slice(0, -1)
    const asm = Hangul.assemble(h)
    setCurrentGuess(asm)
  }

  const onShift = () => {
    setIsShifted(!isShifted)
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    if (!(currentGuess.length === 3)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    if (!isWordInWordList(currentGuess)) {
      setIsWordNotFoundAlertOpen(true)
      return setTimeout(() => {
        setIsWordNotFoundAlertOpen(false)
      }, ALERT_TIME_MS)
    }
    // validguesses.ts, wordlist.ts를 검사하지 않는다.

    if (!Hangul.isCompleteAll(currentGuess)) {
      setIsNotEnoughLetters(true)
      return setTimeout(() => {
        setIsNotEnoughLetters(false)
      }, ALERT_TIME_MS)
    }

    const winningWord = isWinningWord(currentGuess)

    if (currentGuess.length === 3 && guesses.length < 6 && !isGameWon) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === 5) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  return (
    <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-xl grow font-bold dark:text-white">
          우리말 Wordle
        </h1>
        <button
          type="button"
          className="pr-2 dark:text-white"
          onClick={() => setIsInfoModalOpen(true)}
        >
          게임방법
        </button>
        <SunIcon
          className="h-6 w-6 pr-2 cursor-pointer dark:stroke-white"
          onClick={() => handleDarkMode(!isDarkMode)}
        />

        <ChartBarIcon
          className="h-6 w-6 cursor-pointer dark:stroke-white"
          onClick={() => setIsStatsModalOpen(true)}
        />
      </div>
      <Grid guesses={guesses} currentGuess={currentGuess} />
      {/* <ul className="flex divide-x divide-gray-200 shadow sm:flex dark:divide-gray-700 mb-2">
    <li className="w-full">
        <a href="#" className="inline-block relative py-2 px-2 w-full text-sm font-medium text-center text-gray-900 bg-gray-100 focus:ring-4 focus:ring-blue-300 focus:z-20 active dark:bg-gray-700 dark:text-white" aria-current="page">
          전체
          </a>
    </li>
    <li className="w-full">
        <a href="#" className="inline-block relative py-2 px-2 w-full text-sm font-medium text-center text-gray-500 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:z-20 dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
          1번
          </a>
    </li>
    <li className="w-full">
        <a href="#" className="inline-block relative py-2 px-2 w-full text-sm font-medium text-center text-gray-500 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:z-20 dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
          2번
          </a>
    </li>
    <li className="w-full">
        <a href="#" className="inline-block relative py-2 px-2 w-full text-sm font-medium text-center text-gray-500 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:z-20 dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
          3번
          </a>
    </li>
    <li className="w-full">
        <a href="#" className="inline-block relative py-2 px-2 w-full text-sm font-medium text-center text-gray-500 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:z-20 dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
          4번
          </a>
    </li>
    <li className="w-full">
        <a href="#" className="inline-block relative py-2 px-2 w-full text-sm font-medium text-center text-gray-500 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:z-20 dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
          5번
          </a>
    </li>
    <li className="w-full cursor-not-allowed inline-block relative py-2 px-2 w-full text-sm font-medium text-center text-gray-500 bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:z-20 dark:text-gray-400 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
        6번
    </li>
</ul> */}
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        onShift={onShift}
        guesses={guesses}
        isShifted={isShifted}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        handleShare={() => {
          setSuccessAlert(GAME_COPIED_MESSAGE)
          return setTimeout(() => setSuccessAlert(''), ALERT_TIME_MS)
        }}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        handleClose={() => setIsAboutModalOpen(false)}
      />

      <button
        type="button"
        className="mx-auto mt-8 flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 select-none"
        onClick={() => setIsAboutModalOpen(true)}
      >
        {ABOUT_GAME_MESSAGE}
      </button>
      <p className="flex   dark:text-white items-center mt-3 text-xs">
        <a
          href="https://link.coupang.com/a/bej9kV"
          target="_blank"
          className="mx-auto"
          rel="noreferrer"
        >
          쿠팡특가 골드박스 → 
        </a>
      </p>

      <Alert message={NOT_ENOUGH_LETTERS_MESSAGE} isOpen={isNotEnoughLetters} />
      <Alert
        message={WORD_NOT_FOUND_MESSAGE}
        isOpen={isWordNotFoundAlertOpen}
      />
      <Alert message={CORRECT_WORD_MESSAGE(solution)} isOpen={isGameLost} />
      <Alert
        message={successAlert}
        isOpen={successAlert !== ''}
        variant="success"
      />
    </div>
  )
}

export default App
