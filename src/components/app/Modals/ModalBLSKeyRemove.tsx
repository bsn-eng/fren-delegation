import { Dialog } from '@headlessui/react'
import { FC } from 'react'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import alertIcon from '@/assets/images/icon-alert-red.svg'
import { Button, Modal } from '@/components/shared'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const ModalBLSKeyRemove: FC<IProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Dialog.Panel className={styles.modalLayoutBig}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          <CloseCircleIcon />
        </div>
        <div className="flex flex-col items-center justify-center text-white gap-4">
          <img src={alertIcon} alt="" />
          <div className="text-lg font-bold">Remove Validator</div>
          <div>By removing your validator from the PoN you will lose out on future rewards.</div>
          <Button
            size="lg"
            onClick={() => {
              onConfirm()
            }}>
            Continue
          </Button>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalBLSKeyRemove
