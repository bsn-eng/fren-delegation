import { formatEther } from 'ethers/lib/utils'
import { FC } from 'react'

import { ACTIVITY_TYPE } from '@/constants/activity'
import { useNetworkBasedLinkFactories } from '@/hooks'

const Description: FC<{ activity: any; blsKeyToTxHashes: any }> = ({
  activity,
  blsKeyToTxHashes
}) => {
  const { makeEtherscanLink } = useNetworkBasedLinkFactories()

  switch (activity.key) {
    case ACTIVITY_TYPE.BUILDER_TOPUP:
      return (
        <span className="description">
          Bonded {formatEther(activity.value)} ETH as Builder{' '}
          <a
            href={makeEtherscanLink(activity.id)}
            target="_blank"
            rel="noreferrer"
            className={'text-primary'}>
            (check TX here)
          </a>
        </span>
      )

    case ACTIVITY_TYPE.PROPOSER_REGISTRATION:
      return (
        <span className="description">
          Registered ECDSA wallet as Proposer{' '}
          <a
            href={makeEtherscanLink(activity.id)}
            target="_blank"
            rel="noreferrer"
            className={'text-primary'}>
            (check TX here)
          </a>
        </span>
      )
    case ACTIVITY_TYPE.BUILDER_REGISTRATION:
      return (
        <span className="description">
          Registered ECDSA wallet and as Builder{' '}
          <a
            href={makeEtherscanLink(activity.id)}
            target="_blank"
            rel="noreferrer"
            className={'text-primary'}>
            (check TX here)
          </a>
        </span>
      )
    case ACTIVITY_TYPE.REPORTER_REGISTRATION:
      return (
        <span className="description">
          Registered ECDSA wallet and as Reporter{' '}
          <a
            href={makeEtherscanLink(activity.id)}
            target="_blank"
            rel="noreferrer"
            className={'text-primary'}>
            (check TX here)
          </a>
        </span>
      )

    default:
      return <></>
  }
}

export default Description
