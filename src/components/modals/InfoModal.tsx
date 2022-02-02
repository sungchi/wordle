import { Cell } from '../grid/Cell'
import { Key } from '../keyboard/Key'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="게임방법" isOpen={isOpen} handleClose={handleClose}>
      <p className="p-2 text-sm text-gray-500 dark:text-gray-300 text-left">
        세 음절로 된 우리말 명사를 입력해 맞추는 게임입니다. 6번의 기회가 주어지며 맞춰야 하는 단어에는 중복되는 자음, 모음이 없습니다. 
      </p>
      
      <h3 className='px-2 font-bold text-gray-500 dark:text-gray-300'>입력칸 컬러 예시 (답이 '떼죽음'일 때)</h3>

      <div className="flex justify-center">
        <Cell value="닭" status="present" />
        <Cell value="볶" status="absent" />
        <Cell value="음" status="correct" />
      </div>
      <p className="p-2 text-sm text-gray-500 dark:text-gray-300 text-left">
        '음'은 자음과 모음, 위치까지 모두 맞았습니다. '닭'은 일부 맞는 자모가 있으나 위치가 잘못되었습니다. '볶'의 모든 자모는 답이 되는 단어에 존재하지 않습니다.
      </p>
      <h3 className='px-2 font-bold text-gray-500 dark:text-gray-300'>키보드 컬러 예시</h3>
      <div className="flex justify-center">
        <Key value="ㄷ" onClick={() => void 0} status="absent" />
        <Key value="ㅏ" onClick={() => void 0} status="absent" />
        <Key value="ㄹ" onClick={() => void 0} status="absent" />
        <Key value="ㄱ" onClick={() => void 0} status="present" />
      </div>
      <div className="flex justify-center mt-1">
      <Key value="ㅂ" onClick={() => void 0} status="absent" />
        <Key value="ㅗ" onClick={() => void 0} status="absent" />
        <Key value="ㄲ" onClick={() => void 0} status="absent" />
        <Key value="ㅇ" onClick={() => void 0} status="correct" />
        <Key value="ㅡ" onClick={() => void 0} status="correct" />
        <Key value="ㅁ" onClick={() => void 0} status="correct" />
      </div> 
      <p className="p-2 text-sm text-gray-500 dark:text-gray-300 text-left">
        키보드에 표시되는 색은 입력된 단어의 자음, 모음을 분리해 검사한 결과입니다. 쌍자음과 달리 키보드에 없는 ㄳ,ㅚ 등 겹낱자는 ㄱ,ㅅ,ㅗ,ㅣ와 같이 분리해 검사합니다.
      </p>
    </BaseModal>
  )
}
