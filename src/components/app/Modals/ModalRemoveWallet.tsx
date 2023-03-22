import { Dialog } from '@headlessui/react'
import { FC, useState } from 'react'

import alertIcon from '@/assets/images/alert-circle.svg'
import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import EmptyCheckBoxIconSvg from '@/assets/images/icon-check-empty.svg'
import FullCheckBoxIconSvg from '@/assets/images/icon-check-full.svg'
import { Button, Modal } from '@/components/shared'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
  handleClaim: () => void
}

const checkList = [
  'I understand I am removing my wallet from the PoN relay. ',
  'I understand I will lose all future rewards.'
]

const ModalRemoveWallet: FC<IProps> = ({ open, onClose, handleClaim }) => {
  const [isChecked, setIsChecked] = useState<number[]>([])

  const handleCheckItem = (index: number) => {
    if (!isChecked.includes(index)) setIsChecked([...isChecked, index])
    else setIsChecked(isChecked.filter((item: number) => item !== index))
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Dialog.Panel className={styles.modalLayout}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          <CloseCircleIcon />
        </div>
        <div className="flex flex-col items-center justify-center text-white gap-4">
          <img src={alertIcon} alt="" />
          <div className="text-lg font-bold">Remove Wallet</div>
        </div>
        <div className="flex flex-col mt-4 gap-4 items-center">
          {checkList.map((description: string, index: number) => (
            <div
              key={index}
              className="flex gap-2 w-full text-grey300 items-start text-left cursor-pointer"
              onClick={() => handleCheckItem(index)}>
              <img src={isChecked.includes(index) ? FullCheckBoxIconSvg : EmptyCheckBoxIconSvg} />
              {description}
            </div>
          ))}
          {isChecked.length === 2 && (
            <Button size="lg" onClick={handleClaim}>
              Continue
            </Button>
          )}
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalRemoveWallet
