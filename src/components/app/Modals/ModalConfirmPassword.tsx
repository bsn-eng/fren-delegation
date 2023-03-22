import { Dialog } from '@headlessui/react'
import { FC } from 'react'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { ReactComponent as BlueAlertIcon } from '@/assets/images/icon-alert-blue.svg'
import { Button, Modal } from '@/components/shared'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  isLoading: boolean
  onClose: () => void
  onConfirm: () => void
}

const ModalConfirmPassword: FC<IProps> = ({ open, isLoading, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Dialog.Panel className={styles.modalLayoutBig}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          <CloseCircleIcon />
        </div>
        <div className={styles.confirmPassword}>
          <BlueAlertIcon />
          <h3 className={styles.confirmPasswordHeader}>Important</h3>
          <p className={styles.confirmPasswordDesc}>
            Keep this password safe. You will need it to access your validator in the future.{' '}
          </p>
          <Button variant="primary" disabled={isLoading} className="w-80 h-12" onClick={onConfirm}>
            {isLoading ? 'Confirming...' : 'Confirm'}
          </Button>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalConfirmPassword
