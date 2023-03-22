import { Dialog } from '@headlessui/react'
import { FC } from 'react'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { ReactComponent as BlueAlertIcon } from '@/assets/images/icon-alert-blue.svg'
import { Button, Modal } from '@/components/shared'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const ModalConfirmExpertGuide: FC<IProps> = ({ open, onClose, onConfirm }) => {
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
            Follow the{' '}
            <a
              href="https://intercom.help/stakehousetest/en/articles/6195235-how-do-i-stake-a-validator-using-the-ethereum-cli"
              target="_blank"
              rel="noreferrer"
              className="text-primary underline">
              Expert Mode Guide
            </a>
            <br />
            when setting your withdrawal credentials, or the transaction will fail.
          </p>
          <Button variant="primary" className="w-80 h-12" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalConfirmExpertGuide
