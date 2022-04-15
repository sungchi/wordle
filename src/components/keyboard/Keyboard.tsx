import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { ENTER_TEXT, DELETE_TEXT, SHIFT_TEXT } from '../../constants/strings'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  onShift: () => void
  guesses: string[]
  isShifted: boolean
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  onShift,
  guesses,
  isShifted,
}: Props) => {
  const charStatuses = getStatuses(guesses)

  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'SHIFT') {
      onShift()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
      if (isShifted) onShift()
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      } else {
        const key = e.key.toUpperCase()
        const korean = /[ㄱ-ㅎ|ㅏ-ㅣ]/
        if (key.length === 1 && korean.test(key)) {
          onChar(key)
        }
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  if (isShifted) {
    return (
      <div>
        <div className="flex justify-center mb-1">
          <Key value="ㅃ" onClick={onClick} status={charStatuses['ㅃ']} />
          <Key value="ㅉ" onClick={onClick} status={charStatuses['ㅉ']} />
          <Key value="ㄸ" onClick={onClick} status={charStatuses['ㄸ']} />
          <Key value="ㄲ" onClick={onClick} status={charStatuses['ㄲ']} />
          <Key value="ㅆ" onClick={onClick} status={charStatuses['ㅆ']} />
          <Key value="ㅛ" onClick={onClick} status={charStatuses['ㅛ']} />
          <Key value="ㅕ" onClick={onClick} status={charStatuses['ㅕ']} />
          <Key value="ㅑ" onClick={onClick} status={charStatuses['ㅑ']} />
          <Key value="ㅒ" onClick={onClick} status={charStatuses['ㅒ']} />
          <Key value="ㅖ" onClick={onClick} status={charStatuses['ㅖ']} />
        </div>
        <div className="flex justify-center mb-1">
          <Key value="ㅁ" onClick={onClick} status={charStatuses['ㅁ']} />
          <Key value="ㄴ" onClick={onClick} status={charStatuses['ㄴ']} />
          <Key value="ㅇ" onClick={onClick} status={charStatuses['ㅇ']} />
          <Key value="ㄹ" onClick={onClick} status={charStatuses['ㄹ']} />
          <Key value="ㅎ" onClick={onClick} status={charStatuses['ㅎ']} />
          <Key value="ㅗ" onClick={onClick} status={charStatuses['ㅗ']} />
          <Key value="ㅓ" onClick={onClick} status={charStatuses['ㅓ']} />
          <Key value="ㅏ" onClick={onClick} status={charStatuses['ㅏ']} />
          <Key value="ㅣ" onClick={onClick} status={charStatuses['ㅣ']} />
          <Key width={65.4} value="DELETE" onClick={onClick}>
            {DELETE_TEXT}
          </Key>
        </div>
        <div className="flex justify-center">
          <Key width={65.4} value="SHIFT" onClick={onClick} status="absent">
            {SHIFT_TEXT}
          </Key>
          <Key value="ㅋ" onClick={onClick} status={charStatuses['ㅋ']} />
          <Key value="ㅌ" onClick={onClick} status={charStatuses['ㅌ']} />
          <Key value="ㅊ" onClick={onClick} status={charStatuses['ㅊ']} />
          <Key value="ㅍ" onClick={onClick} status={charStatuses['ㅍ']} />
          <Key value="ㅠ" onClick={onClick} status={charStatuses['ㅠ']} />
          <Key value="ㅜ" onClick={onClick} status={charStatuses['ㅜ']} />
          <Key value="ㅡ" onClick={onClick} status={charStatuses['ㅡ']} />
          <Key width={65.4} value="ENTER" onClick={onClick}>
            {ENTER_TEXT}
          </Key>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className="flex justify-center mb-1">
          <Key value="ㅂ" onClick={onClick} status={charStatuses['ㅂ']} />
          <Key value="ㅈ" onClick={onClick} status={charStatuses['ㅈ']} />
          <Key value="ㄷ" onClick={onClick} status={charStatuses['ㄷ']} />
          <Key value="ㄱ" onClick={onClick} status={charStatuses['ㄱ']} />
          <Key value="ㅅ" onClick={onClick} status={charStatuses['ㅅ']} />
          <Key value="ㅛ" onClick={onClick} status={charStatuses['ㅛ']} />
          <Key value="ㅕ" onClick={onClick} status={charStatuses['ㅕ']} />
          <Key value="ㅑ" onClick={onClick} status={charStatuses['ㅑ']} />
          <Key value="ㅐ" onClick={onClick} status={charStatuses['ㅐ']} />
          <Key value="ㅔ" onClick={onClick} status={charStatuses['ㅔ']} />
        </div>
        <div className="flex justify-center mb-1">
          <Key value="ㅁ" onClick={onClick} status={charStatuses['ㅁ']} />
          <Key value="ㄴ" onClick={onClick} status={charStatuses['ㄴ']} />
          <Key value="ㅇ" onClick={onClick} status={charStatuses['ㅇ']} />
          <Key value="ㄹ" onClick={onClick} status={charStatuses['ㄹ']} />
          <Key value="ㅎ" onClick={onClick} status={charStatuses['ㅎ']} />
          <Key value="ㅗ" onClick={onClick} status={charStatuses['ㅗ']} />
          <Key value="ㅓ" onClick={onClick} status={charStatuses['ㅓ']} />
          <Key value="ㅏ" onClick={onClick} status={charStatuses['ㅏ']} />
          <Key value="ㅣ" onClick={onClick} status={charStatuses['ㅣ']} />
          <Key width={65.4} value="DELETE" onClick={onClick}>
            {DELETE_TEXT}
          </Key>
        </div>
        <div className="flex justify-center">
          <Key width={65.4} value="SHIFT" onClick={onClick}>
            {SHIFT_TEXT}
          </Key>
          <Key value="ㅋ" onClick={onClick} status={charStatuses['ㅋ']} />
          <Key value="ㅌ" onClick={onClick} status={charStatuses['ㅌ']} />
          <Key value="ㅊ" onClick={onClick} status={charStatuses['ㅊ']} />
          <Key value="ㅍ" onClick={onClick} status={charStatuses['ㅍ']} />
          <Key value="ㅠ" onClick={onClick} status={charStatuses['ㅠ']} />
          <Key value="ㅜ" onClick={onClick} status={charStatuses['ㅜ']} />
          <Key value="ㅡ" onClick={onClick} status={charStatuses['ㅡ']} />
          <Key width={65.4} value="ENTER" onClick={onClick}>
            {ENTER_TEXT}
          </Key>
        </div>
      </div>
    )
  }
}
