import { Dialog } from '@headlessui/react'
import { FC, useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { ReactComponent as RedAlertIcon } from '@/assets/images/icon-alert-red.svg'
import { ReactComponent as BlueEthIcon } from '@/assets/images/icon-eth-bigs.svg'
import { Button, Modal, Spinner } from '@/components/shared'
import { BEACON_NODE_URL } from '@/constants/chains'
import { BlockswapSDKContext } from '@/context/BlockswapSDKContext'
import { useNetworkBasedLinkFactories } from '@/hooks'
import { ValidatorT } from '@/types'
import { notifyHash } from '@/utils/global'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
  validator: ValidatorT | null | undefined
}

const ModalReportBalance: FC<IProps> = ({ open, onClose, validator }) => {
  const { sdk } = useContext(BlockswapSDKContext)
  const { makeEtherscanLink } = useNetworkBasedLinkFactories()

  const [isSubmitting, setSubmitting] = useState(false)
  const [failed, setfailed] = useState(false)
  const [txHash, setTxHash] = useState('')

  const handleReportBalance = useCallback(async () => {
    if (validator && open && sdk) {
      try {
        setSubmitting(true)
        const tx = await sdk.reportBalance(
          BEACON_NODE_URL,
          validator.id,
          validator.stakeHouseMetadata?.id
        )
        notifyHash(tx.hash)
        setTxHash(tx.hash)
        await tx.wait()
      } catch (err) {
        console.log('handleReport error: ', err)
        setfailed(true)
      }
      setSubmitting(false)
    }
  }, [validator, open, sdk])

  useEffect(() => {
    handleReportBalance()
  }, [handleReportBalance])

  const handleClose = () => {
    setSubmitting(false)
    setfailed(false)
    setTxHash('')
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Dialog.Panel className={styles.modalLayoutBig}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={handleClose}>
          <CloseCircleIcon />
        </div>
        {isSubmitting ? (
          <div className={styles.confirmPassword}>
            <Spinner />
            <h3 className={styles.modalTitle}>Confirmation Pending</h3>
          </div>
        ) : failed ? (
          <div className={styles.confirmPassword}>
            <RedAlertIcon />
            <h3 className={styles.modalTitle}>Something went wrong.</h3>
            <Button variant="secondary" className="w-32" onClick={handleReportBalance}>
              Please retry
            </Button>
          </div>
        ) : txHash ? (
          <div className={styles.confirmPassword}>
            <BlueEthIcon />
            <h3 className={styles.confirmPasswordHeader}>Success</h3>
            <div className="flex items-center gap-3">
              <a href={makeEtherscanLink(txHash)} target="_blank" rel="noreferrer">
                <Button variant="secondary" className="w-40">
                  Etherscan
                </Button>
              </a>
              <Link to="/">
                <Button variant="primary" className="w-40">
                  My Profile
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <></>
        )}
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalReportBalance
