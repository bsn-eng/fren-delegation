import { Dialog } from '@headlessui/react'
import { FC, useState } from 'react'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import alertIcon from '@/assets/images/icon-alert-blue.svg'
import { Button, Modal } from '@/components/shared'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const ModalProposerConfirm: FC<IProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Dialog.Panel className={styles.modalLayoutBig}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          <CloseCircleIcon />
        </div>
        <div className="flex flex-col items-center justify-center text-white gap-4">
          <img src={alertIcon} alt="" />
          <div className="text-lg font-bold">Confirmation</div>
          <div>Register your validator to the PoN Relay as a Proposer.</div>
          <div>The PoN Relay does not hold your keys. You retain ownership of your keys.</div>
          <Button
            size="lg"
            onClick={() => {
              onConfirm()
              onClose()
            }}>
            Confirm
          </Button>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalProposerConfirm
