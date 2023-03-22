import { Dialog } from '@headlessui/react'
import { FC, ReactNode } from 'react'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'

import Modal from '../index'
import styles from './styles.module.scss'

export interface ModalDialogProps {
  children: ReactNode
  open: boolean
  onClose: () => void
  controlsClosableOnly?: boolean
}

export const ModalDialog: FC<ModalDialogProps> = ({
  children,
  open,
  onClose,
  controlsClosableOnly = false
}) => {
  return (
    <Modal open={open} onClose={controlsClosableOnly ? () => {} : onClose}>
      <Dialog.Panel className={styles.modalDialog}>
        <CloseCircleIcon className={styles.closeIcon} onClick={onClose} />

        {children}
      </Dialog.Panel>
    </Modal>
  )
}
