import { Dialog } from '@headlessui/react'
import { FC } from 'react'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { ReactComponent as RedAlertIcon } from '@/assets/images/icon-alert-red.svg'
import { Button, Modal } from '@/components/shared'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
  maxLimit: number
}

const ModalInvalidDeposit: FC<IProps> = ({ open, onClose, maxLimit }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Dialog.Panel className={styles.modalLayoutBig}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          <CloseCircleIcon />
        </div>
        <div className={styles.confirmDepositFailed}>
          <RedAlertIcon />
          <p className={styles.modalTitle}>Ooops...</p>
          <p className="text-grey300">
            There are {maxLimit.toLocaleString(undefined, { maximumFractionDigits: 3 })} ETH
            available to stake for this validator. <br />
            It looks like you are trying to stake more.
          </p>
          <Button variant="primary" size="lg" onClick={onClose}>
            Try again
          </Button>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalInvalidDeposit
