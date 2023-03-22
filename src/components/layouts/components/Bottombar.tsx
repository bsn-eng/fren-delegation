import '../styles.scss'

import { FC } from 'react'
import { useBlockNumber } from 'wagmi'

const Bottombar: FC = () => {
  const { data: currentBlock } = useBlockNumber()

  return (
    <div className="bottombar">
      <p className="bottombar__left">
        Stakehouse is in beta.{' '}
        <a href="./RiskDisclaimer" target="_blank" rel="noreferrer">
          Protocol Disclaimer.
        </a>
      </p>
      <p className="bottombar__right">
        Block <span>{currentBlock}</span>
      </p>
    </div>
  )
}

export default Bottombar
