import { Dialog } from '@headlessui/react'
import { FC } from 'react'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { ReactComponent as RedAlertIcon } from '@/assets/images/icon-alert-red.svg'
import { Button, Modal } from '@/components/shared'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
}

const ModalNameInvalid: FC<IProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Dialog.Panel className={styles.modalLayoutBig}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          <CloseCircleIcon />
        </div>
        <div className={styles.confirmDepositFailed}>
          <RedAlertIcon />
          <p className={styles.modalTitle}>Name unavailable</p>
          <p className={styles.confirmDepositDesc}>
            Please select a different name for your Stakehouse.
          </p>
          <Button variant="secondary" className="w-64 h-12" onClick={onClose}>
            Go Back
          </Button>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalNameInvalid
