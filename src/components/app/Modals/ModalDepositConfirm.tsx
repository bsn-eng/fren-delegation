import { Dialog } from '@headlessui/react'
import { FC, useContext, useState } from 'react'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { ReactComponent as RedAlertIcon } from '@/assets/images/icon-alert-red.svg'
import { ReactComponent as CheckGreenIcon } from '@/assets/images/icon-check-green.svg'
import { ReactComponent as ConfirmIcon } from '@/assets/images/icon-confirm-deposit.svg'
import { Button, Modal, TextInput, Tooltip } from '@/components/shared'
import { StakingStoreContext } from '@/context/StakingStoreContext'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  pubkey: string
  onClose: () => void
  onApprove: () => void
}

const ModalDepositConfirm: FC<IProps> = ({ open, pubkey, onClose, onApprove }) => {
  const { password } = useContext(StakingStoreContext)
  const [confirmedKey, setConfirmedKey] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [failed, setFailed] = useState(false)

  const handleApprove = () => {
    if (password !== confirmPassword || !confirmPassword) {
      return setFailed(true)
    }

    onApprove()
  }

  const handleclose = () => {
    setConfirmedKey(false)
    setConfirmPassword('')
    setFailed(false)
    onClose()
  }

  if (failed) {
    return (
      <Modal open={open} onClose={handleclose}>
        <Dialog.Panel className={styles.modalLayout}>
          <div className="absolute top-3 right-3 cursor-pointer" onClick={handleclose}>
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
    <Modal open={open} onClose={handleclose}>
      <Dialog.Panel className={styles.modalLayoutBig}>
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
              <Button variant="primary" onClick={() => setConfirmedKey(true)}>
                Confirm
              </Button>
            )}
          </div>
          <TextInput
            label="Confirm Keystore Password"
            tooltip="Without this password, you will not be able to stake and run your validator."
            type="password"
            disabled={!confirmedKey}
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            disabled={!confirmedKey || !confirmPassword}
            onClick={handleApprove}
            variant="primary">
            Approve Transaction
          </Button>
          <p className="text-sm text-grey300 text-left">
            By approving the transaction you understand that you are depositing 32 ETH to stake a
            validator. The transfer of ETH to the consensus layer is currently one-way and
            non-reversible. You are interacting directly with the Ethereum Deposit Contract. Please
            refer to the Ethereum Launchpad for{' '}
            <a
              href="https://launchpad.ethereum.org/en/faq"
              className="underline text-primary"
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

export default ModalDepositConfirm
