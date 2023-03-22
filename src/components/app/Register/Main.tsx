import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useConnect } from 'wagmi'

import { ReactComponent as ArrowTopRightIcon } from '@/assets/images/icon-arrow-top-right.svg'
import BuilderIcon from '@/assets/images/icon-builder.svg'
import FeesCheckIcon from '@/assets/images/icon-check-fees.svg'
import NodeCheckIcon from '@/assets/images/icon-check-node.svg'
import StakeCheckIcon from '@/assets/images/icon-check-stake.svg'
import ProposerIcon from '@/assets/images/icon-proposer.svg'
import ReporterIcon from '@/assets/images/icon-reporter.svg'
import { ModalWalletConnect } from '@/components/app/Modals'
import { Button } from '@/components/shared'
import { REGISTER_MODE } from '@/constants'
import { useIsBuilderRegistered, useIsReporterRegistered, useProposerValidators } from '@/hooks'

import { RegisterFooter } from './Footer'

type MainProps = {
  handleModeChange: (mode: REGISTER_MODE) => void
}

export const Main: FC<MainProps> = ({ handleModeChange }) => {
  const { isConnected } = useConnect()
  const navigate = useNavigate()

  const [openWalletModal, setOpenWalletModal] = useState(false)

  const handleOpenWalletModal = () => {
    setOpenWalletModal(true)
  }
  const handleCloseWalletModal = () => {
    setOpenWalletModal(false)
  }

  const isReporterActive = useIsReporterRegistered()
  const isBuilderActive = useIsBuilderRegistered()

  const { isRegistered: isProposerActive } = useProposerValidators()

  const RegisteredStatus: Record<REGISTER_MODE, boolean> = {
    [REGISTER_MODE.MAIN]: false,
    [REGISTER_MODE.PROPOSER]: isProposerActive,
    [REGISTER_MODE.REPORTER]: isReporterActive,
    [REGISTER_MODE.BUILDER]: isBuilderActive
  }

  const onModeClick = (mode: REGISTER_MODE) => {
    if (!RegisteredStatus[mode]) handleModeChange(mode)
    else navigate(`/manage/${mode}`)
  }

  return (
    <div className="content">
      <div className="w-full text-center text-4xl font-semibold">Proof of Neutrality Relay</div>
      {/* <div className="font-medium text-sm text-grey700">
        PoN Relay anonymise the content of ETH transaction by decentralising any existing relay.
      </div> */}
      <div className="earning">
        <div className="flex gap-2">
          <div className="flex-1 flex flex-col">
            <img src={ProposerIcon} alt="icon" className="mx-auto mb-6" />
            <div className="earning__mode">
              <div className="earning__mode__title">Proposer</div>
              <div className="earning__mode__item">
                <img src={StakeCheckIcon} alt="icon" />
                Supercharge Your Validator
              </div>
              <div className="earning__mode__item">
                <img src={StakeCheckIcon} alt="icon" />
                Rewards Every 7 Days
              </div>
            </div>
            {isConnected && (
              <>
                <div className="earning__deposit">
                  {RegisteredStatus[REGISTER_MODE.PROPOSER] ? (
                    <Button
                      className="stake-deposit manage"
                      size="lg"
                      onClick={() => onModeClick(REGISTER_MODE.PROPOSER)}>
                      <div className="flex gap-2 items-center">
                        Manage <ArrowTopRightIcon />
                      </div>
                    </Button>
                  ) : (
                    <Button
                      className="stake-deposit"
                      size="lg"
                      onClick={() => onModeClick(REGISTER_MODE.PROPOSER)}>
                      Register
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <img src={ReporterIcon} alt="icon" className="mx-auto mb-6" />
            <div className="earning__mode">
              <div className="earning__mode__title">Reporter</div>
              <div className="earning__mode__item">
                <img src={FeesCheckIcon} alt="icon" />
                PoN Watchdog
              </div>
              <div className="earning__mode__item">
                <img src={FeesCheckIcon} alt="icon" />
                Earn Rewards
              </div>
            </div>
            {isConnected && (
              <>
                <div className="earning__deposit">
                  {RegisteredStatus[REGISTER_MODE.REPORTER] ? (
                    <Button
                      className="fees-deposit manage"
                      size="lg"
                      onClick={() => onModeClick(REGISTER_MODE.REPORTER)}>
                      <div className="flex gap-2 items-center">
                        Manage <ArrowTopRightIcon />
                      </div>
                    </Button>
                  ) : (
                    <Button
                      className="fees-deposit"
                      size="lg"
                      onClick={() => onModeClick(REGISTER_MODE.REPORTER)}>
                      Register
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex-1 flex flex-col">
            <img src={BuilderIcon} alt="icon" className="mx-auto mb-6" />
            <div className="earning__mode">
              <div className="earning__mode__title">Builder</div>
              <div className="earning__mode__item">
                <img src={NodeCheckIcon} alt="icon" />
                Execute MEV Strategies
              </div>
              <div className="earning__mode__item">
                <img src={NodeCheckIcon} alt="icon" />
                Earn ETH
              </div>
            </div>
            {isConnected && (
              <>
                <div className="earning__deposit">
                  {RegisteredStatus[REGISTER_MODE.BUILDER] ? (
                    <Button
                      className="node-deposit manage"
                      size="lg"
                      onClick={() => onModeClick(REGISTER_MODE.BUILDER)}>
                      <div className="flex gap-2 items-center">
                        Manage <ArrowTopRightIcon />
                      </div>
                    </Button>
                  ) : (
                    <Button
                      className="node-deposit"
                      size="lg"
                      onClick={() => onModeClick(REGISTER_MODE.BUILDER)}>
                      Register
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        {!isConnected && (
          <Button size="lg" className="mx-auto" onClick={handleOpenWalletModal}>
            Connect Wallet
          </Button>
        )}
      </div>
      {!isConnected && <div className="content__comment">Connect a wallet for more options.</div>}
      {isConnected && <RegisterFooter />}
      <ModalWalletConnect open={openWalletModal} onClose={handleCloseWalletModal} />
    </div>
  )
}
