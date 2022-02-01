import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="게임방법" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        우리말 Wordle은 세 음절로 된 우리말 명사를 여섯번의 시도 안에 맞추는 게임입니다. 키보드에 표시되는 색은 자음, 모음을 분리해 검사합니다. (주의: ㄳ,ㅚ 등 겹낱사는 키보드에서 ㄱ,ㅅ,ㅗ,ㅣ로 분리해 검사)
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="고" status="correct" />
        <Cell value="양" />
        <Cell value="이" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        '고'는 자음과 모음, 위치까지 모두 맞았습니다.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="강" />
        <Cell value="지" />
        <Cell value="아" status="present" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        '아'는 맞는 자모가 있으나 위치가 잘못되었습니다.
      </p>

      <div className="flex justify-center mb-1 mt-4">
        <Cell value="화" />
        <Cell value="분" status="absent" />
        <Cell value="실" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        '분'의 자모는 답이 되는 단어에 존재하지 않습니다.
      </p>
    </BaseModal>
  )
}
