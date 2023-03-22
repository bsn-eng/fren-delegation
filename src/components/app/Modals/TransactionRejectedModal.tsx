import { Dialog } from '@headlessui/react'
import { FC } from 'react'

import alertIcon from '@/assets/images/alert-circle.svg'
import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { Button, Modal } from '@/components/shared'

import styles from './styles.module.scss'
import customStyles from './TransactionRejectedModal.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
}

const TransactionRejectedModal: FC<IProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Dialog.Panel className={styles.customModalLayout}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          <CloseCircleIcon />
        </div>
        <div className={customStyles.content}>
          <img src={alertIcon} alt="" />
          <h1 className={customStyles.title}>Ooops - Transaction Rejected</h1>
          <p className={customStyles.description}>Wallet address is flagged as High risk.</p>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default TransactionRejectedModal
