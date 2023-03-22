import { Dialog } from '@headlessui/react'
import classNames from 'classnames'
import { FC } from 'react'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { ReactComponent as RedAlertIcon } from '@/assets/images/icon-alert-red.svg'
import { Button, Modal } from '@/components/shared'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  description?: string
  okBtnTxt?: string
  cancelBtnTxt?: string
}

const ModalToggleMode: FC<IProps> = ({
  open,
  onClose,
  onConfirm,
  description,
  okBtnTxt,
  cancelBtnTxt
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Dialog.Panel className={styles.modalLayoutBig}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          <CloseCircleIcon />
        </div>
        <div className={styles.toggleMode}>
          <RedAlertIcon />
          <p className={styles.toggleModeDesc} style={{ wordBreak: 'normal' }}>
            {description ? description : 'Easy Mode is non-custodial and only takes 60 seconds.'}
          </p>
          <Button
            variant="primary"
            className="w-full"
            style={{ background: '#FD4040' }}
            onClick={onConfirm}>
            {okBtnTxt ? okBtnTxt : 'Turn on Expert Mode'}
          </Button>
          <Button variant="primary" className="w-full" onClick={onClose}>
            {cancelBtnTxt ? cancelBtnTxt : 'Back to Easy Mode'}
          </Button>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalToggleMode
