import { Dialog } from '@headlessui/react'
import { FC, useContext, useState } from 'react'
import { useAccount } from 'wagmi'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { ReactComponent as RedAlertIcon } from '@/assets/images/icon-alert-red.svg'
import { ReactComponent as CheckGreenIcon } from '@/assets/images/icon-check-green.svg'
import { ReactComponent as ConfirmIcon } from '@/assets/images/icon-confirm-deposit.svg'
import { Button, Modal, Tooltip } from '@/components/shared'
import { BlockswapSDKContext } from '@/context/BlockswapSDKContext'
import { StakingStoreContext } from '@/context/StakingStoreContext'
import { notifyHash } from '@/utils/global'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  pubkey: string
  blsAuthRes: any
  onClose: () => void
  onApprove: () => void
}

const ModalDepositConfirmEasy: FC<IProps> = ({ open, pubkey, blsAuthRes, onClose, onApprove }) => {
  const { sdk } = useContext(BlockswapSDKContext)
  const { setTxRegisterHash } = useContext(StakingStoreContext)
  const { data: { address } = {} } = useAccount()

  const [isApproving, setApproving] = useState(false)
  const [confirmedKey, setConfirmedKey] = useState(false)
  const [failed, setFailed] = useState(false)

  const handleClose = () => {
    setConfirmedKey(false)
    setFailed(false)
    onClose()
  }

  const handleApprove = async () => {
    if (confirmedKey || !sdk || isApproving) {
      return
    }

    setApproving(true)
    try {
      const tx = await sdk.registerValidator(address, blsAuthRes)
      setTxRegisterHash(tx.hash)
      notifyHash(tx.hash)
      await tx.wait()
      setConfirmedKey(true)
      onApprove()
    } catch (err) {
      setFailed(true)
    }
    setApproving(false)
  }

  if (failed) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Dialog.Panel className={styles.modalLayout}>
          <div className="absolute top-3 right-3 cursor-pointer" onClick={handleClose}>
            <CloseCircleIcon />
          </div>
          <div className={styles.confirmDepositFailed}>
            <RedAlertIcon />
            <p className={styles.modalTitle}>Deposit Failed</p>
            <p className={styles.confirmDepositDesc}>
              Please ensure your validator keystore password is correct, and that you have 32 ETH in
              your wallet.
            </p>
            <Button variant="primary" onClick={() => setFailed(false)}>
              Try Again
            </Button>
          </div>
        </Dialog.Panel>
      </Modal>
    )
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Dialog.Panel className={styles.modalLayoutBig}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={handleClose}>
          <CloseCircleIcon />
        </div>
        <div className={styles.confirmDeposit}>
          <div className="flex justify-center">
            <ConfirmIcon />
          </div>
          <p className={styles.modalTitle}>Stake 32 ETH</p>
          <p className={styles.confirmDepositDesc}>{`${pubkey}`}</p>
          <div className={styles.confirmDepositRow}>
            <div className="text-sm text-white font-medium flex items-center gap-4">
              Confirm Validator Key
              <Tooltip message="Confirm this is the validator key located in your deposit_data.json and keystore.json files." />
            </div>
            {confirmedKey ? (
              <div className="flex items-center gap-2 font-semibold text-primary700">
                Done <CheckGreenIcon />
              </div>
            ) : (
              <Button disabled={isApproving} variant="primary" onClick={handleApprove}>
                {isApproving ? 'Confirming' : 'Confirm'}
              </Button>
            )}
          </div>
          <p className="text-sm text-grey300 text-left">
            By approving the transaction you understand that you are depositing 32 ETH to stake a
            validator. The transfer of ETH to the Consensus layer is currently one-way and
            non-reversible. You are interacting directly with the Ethereum Deposit Contract. Please
            refer to the Ethereum Launchpad for{' '}
            <a
              href="https://launchpad.ethereum.org/en/faq"
              className="underline"
              target="_blank"
              rel="noreferrer">
              FAQ
            </a>
            .
          </p>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalDepositConfirmEasy
