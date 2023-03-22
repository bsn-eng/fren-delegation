import { Dialog } from '@headlessui/react'
import { FC, useState } from 'react'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { ReactComponent as BlueAlertIcon } from '@/assets/images/icon-alert-blue.svg'
import { Button, Modal } from '@/components/shared'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  depositError?: string
  onClose: () => void
  onApprove: () => Promise<void>
}

const ModalApproveKeyUploading: FC<IProps> = ({ open, depositError, onClose, onApprove }) => {
  const [isApproving, setApproving] = useState(false)

  const handleApproveDeposit = async () => {
    if (isApproving) return

    setApproving(true)
    await onApprove()
    setApproving(false)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Dialog.Panel className={styles.modalLayoutBig}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          <CloseCircleIcon />
        </div>
        <div className={styles.confirmDepositKey}>
          {depositError ? (
            <>
              <div className={styles.confirmDepositKeyTitle}>Transaction Error</div>
              <div className={styles.confirmDepositKeyDesc}>{depositError}</div>
              <Button variant="secondary" onClick={onClose}>
                Try Again
              </Button>
            </>
          ) : (
            <>
              <BlueAlertIcon />
              <h3 className={styles.confirmDepositKeyTitle}>Confirmation</h3>
              <p className={styles.confirmDepositKeyDesc}>
                Allow Stakehouse to track balance increases and decreases within your validator.
              </p>
              <p className={styles.confirmDepositKeyDesc}>
                Stakehouse does not hold your keys. You retain ownership of your keys.
              </p>
              <Button
                variant="primary"
                disabled={isApproving}
                onClick={handleApproveDeposit}
                className="w-52 h-12">
                {isApproving ? 'Approving' : 'Approve Transaction'}
              </Button>
            </>
          )}
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalApproveKeyUploading
