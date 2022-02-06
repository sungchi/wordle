import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="이 게임에 대하여" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        이 게임은 오픈소스 wordle의 <a
          href="https://github.com/sungchi/wordle"
          className="underline font-bold"
        >
          fork 버전
        </a>입니다.
        {' '}
        오리지널 게임은 {' '}
        <a
          href="https://www.powerlanguage.co.uk/wordle/"
          className="underline font-bold"
        >
          여기
        </a>에서 플레이할 수 있습니다. 게임에서 사용하는 단어는 {' '} 
        <a
          href="https://opendict.korean.go.kr/"
          className="underline font-bold"
        >국립국어원 우리말샘</a>
        의 전문가 감수 단어를 내려받아 사용합니다. 우리말 단어로 플레이하는 wordle에 대한 여러 아이디어로 큰 도움을 준 아내에게 깊은 감사를 드립니다.
    
        
      </p>
      <p></p>
      <p className="pt-1 text-sm text-gray-500 dark:text-gray-300">
      피드백: sungchi@plan9.kr
      </p>
    </BaseModal>
  )
}
