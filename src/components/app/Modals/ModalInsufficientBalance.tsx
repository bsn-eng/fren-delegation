import { Dialog } from '@headlessui/react'
import { FC } from 'react'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { ReactComponent as RedEthIcon } from '@/assets/images/icon-eth-big-red.svg'
import { Button, Modal } from '@/components/shared'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
}

const ModalInsufficientBalance: FC<IProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Dialog.Panel className={styles.modalLayoutBig}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          <CloseCircleIcon />
        </div>
        <RedEthIcon width={48} height={48} />
        <p className={styles.modalTitle}>Not enough ETH</p>
        <p className={styles.insufficientDesc}>
          It requires 32 ETH to stake a validator.
          <br />
          <br />
          Liquid staked ETH (dETH) is available with up to 74% greater yield than liquid staking
          tokens.
        </p>
        {/* <a href="https://joinstakehouse.com/swap" target="_blank" rel="noreferrer">
          <Button variant="primary" className="mt-4 w-80">
            Get dETH
          </Button>
        </a> */}
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalInsufficientBalance
