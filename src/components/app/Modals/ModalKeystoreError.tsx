import { Dialog } from '@headlessui/react'
import { FC } from 'react'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { ReactComponent as AlertIcon } from '@/assets/images/icon-alert-red.svg'
import { Button, Modal } from '@/components/shared'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
}

const ModalKeystoreError: FC<IProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Dialog.Panel className={styles.modalLayout}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          <CloseCircleIcon />
        </div>
        <div className={styles.confirmDepositKey}>
          <AlertIcon />
          <h3 className={styles.confirmDepositKeyTitle}>Uploading Validator Failed</h3>
          <p className={styles.confirmDepositKeyDesc}>
            Please ensure you have uploaded the correct file.
          </p>
          <Button variant="secondary" onClick={onClose}>
            Try Again
          </Button>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalKeystoreError
