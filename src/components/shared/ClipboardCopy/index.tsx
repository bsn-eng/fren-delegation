import './styles.scss'

import { FC, PropsWithChildren, useState } from 'react'

import { ReactComponent as CheckIcon } from '@/assets/images/check.svg'
import { ReactComponent as CopyIcon } from '@/assets/images/copy.svg'

interface IProps {
  copyText: string
  inline?: boolean
}

const ClipboardCopy: FC<PropsWithChildren<IProps>> = ({ copyText, inline = false, children }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(copyText)

    setTimeout(() => {
      setCopied((c) => !c)
    }, 3000)
  }

  return (
    <span className={`clipboard ${!inline ? 'flex' : 'inline-block ml-1'}`} onClick={handleCopy}>
      {children}
      {copied ? <CheckIcon width={20} height={20} /> : <CopyIcon width={16} height={16} />}
    </span>
  )
}

export default ClipboardCopy
