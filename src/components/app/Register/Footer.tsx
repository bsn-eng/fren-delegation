import 'twin.macro'

import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as ArrowTopRightIcon } from '@/assets/images/icon-arrow-top-right.svg'
import { ReactComponent as DEthIcon } from '@/assets/images/icon-deth.svg'
import { ReactComponent as EthIcon } from '@/assets/images/icon-eth.svg'
import {
  useIsReporterRegistered,
  useProposerMethods,
  useProposerValidators,
  useReporterMethods
} from '@/hooks'

import { Tooltip } from '../../shared'

interface IRegisterFooter {
  from?: 'Node Runner' | 'Staking' | 'FeesMev' | 'Main'
}

export const RegisterFooter: FC<IRegisterFooter> = ({ from = 'Main' }) => {
  const navigate = useNavigate()

  const { rewardBalance: proposerRewards } = useProposerMethods()
  const { rewardBalance: reporterRewards } = useReporterMethods()

  const isReporterActive = useIsReporterRegistered()

  const { isRegistered: isProposerActive } = useProposerValidators()

  return (
    <div className="content__status">
      <div className="flex justify-between mb-2">
        <div className="content__status__label">
          Available to claim <Tooltip message="Rewards to claim." />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="content__status__label">
          <EthIcon />
          Proposer
        </div>
        <div
          onClick={() => isProposerActive && navigate('/manage/proposer/my-rewards')}
          className={` ${
            isProposerActive ? 'cursor-pointer' : 'cursor-not-allowed'
          } content__status__value ${Number(proposerRewards) > 0 && 'positive'}`}>
          {Number(proposerRewards)} ETH <ArrowTopRightIcon />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="content__status__label">
          <EthIcon />
          Reporter
        </div>
        <div
          onClick={() => isReporterActive && navigate('/manage/reporter/my-rewards')}
          className={`${
            isReporterActive ? 'cursor-pointer' : 'cursor-not-allowed'
          } content__status__value ${Number(reporterRewards) > 0 && 'positive'}`}>
          {Number(reporterRewards)} ETH <ArrowTopRightIcon />
        </div>
      </div>
    </div>
  )
}
