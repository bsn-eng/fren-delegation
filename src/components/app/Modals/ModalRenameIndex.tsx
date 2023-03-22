import { Dialog } from '@headlessui/react'
import { ethers } from 'ethers'
import ProfitImage from 'public/icons/profit.png'
import { FC, useContext, useState } from 'react'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { Button, Modal, Spinner, TextInput, Tooltip } from '@/components/shared'
import { BlockswapSDKContext } from '@/context/BlockswapSDKContext'
import { notifyHash } from '@/utils/global'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
  indexId: string | undefined
}

const ModalRenameIndex: FC<IProps> = ({ open, onClose, indexId }) => {
  const { sdk } = useContext(BlockswapSDKContext)
  const [isSubmitting, setSubmitting] = useState(false)
  const [name, setName] = useState('')

  const handleConfirm = async () => {
    if (!sdk) return

    setSubmitting(true)
    try {
      const tx = await sdk.utils.updateSavETHIndexName(indexId, name)
      notifyHash(tx.hash)
      await tx.wait()
      onClose()
    } catch (e) {
      console.log('rename error: ', e)
    }
    setSubmitting(false)
  }

  const handleClose = () => {
    setName('')
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Dialog.Panel className={styles.modalLayoutBig}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          <CloseCircleIcon />
        </div>

        {isSubmitting ? (
          <div className="flex flex-col gap-4 items-center">
            <Spinner />
            <h3 className={styles.modalTitle}>Confirmation Pending</h3>
          </div>
        ) : (
          <div className={styles.confirmDeposit}>
            <div className={styles.modalTitle}>Rename Index</div>
            <TextInput
              title="Please enter a name for this index"
              tooltip="Rename index"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className="flex items-center gap-3">
              <Button variant="secondary" className="w-48" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" className="w-48" onClick={handleConfirm}>
                Confirm
              </Button>
            </div>
          </div>
        )}
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalRenameIndex
