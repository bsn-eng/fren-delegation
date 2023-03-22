import { Dialog } from '@headlessui/react'
import { FC, useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { ReactComponent as RedAlertIcon } from '@/assets/images/icon-alert-red.svg'
import { Button, Modal, Spinner } from '@/components/shared'
import { BEACON_NODE_URL } from '@/constants/chains'
// import { BlockswapSDKContext } from '@/context/BlockswapSDKContext'
import { ValidatorT } from '@/types'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  validator: ValidatorT | undefined
  onClose: () => void
}

const ModalApproveMint: FC<IProps> = ({ open, validator, onClose }) => {
  // const { sdk } = useContext(BlockswapSDKContext)
  const navigate = useNavigate()

  const [isApproving, setApproving] = useState(false)
  const [eligible, setEligible] = useState(false)

  const handleApprove = useCallback(async () => {
    // if (sdk && validator) {
    //   setApproving(true)
    //   try {
    //     const blsPublicKey = validator.id
    //     const finalisedEpochReport = await sdk.balanceReport.getFinalisedEpochReport(
    //       BEACON_NODE_URL,
    //       blsPublicKey
    //     )
    //     const { activationEpoch, currentCheckpointEpoch, activeBalance } = finalisedEpochReport
    //     if (
    //       Number(activationEpoch) < Number(currentCheckpointEpoch) &&
    //       Number(activeBalance) >= Number('32000000000')
    //     ) {
    //       setEligible(true)
    //     }
    //   } catch (err) {
    //     console.log('err: ', err)
    //   }
    //   setApproving(false)
    // }
  }, [validator])

  useEffect(() => {
    if (open) {
      handleApprove()
    }
  }, [open, handleApprove])

  useEffect(() => {
    if (eligible) {
      navigate(`/mint/${validator?.id}`)
    }
  }, [eligible])

  const handleClose = () => {
    setEligible(false)
    setApproving(true)
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Dialog.Panel className={styles.modalLayoutBig}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={handleClose}>
          <CloseCircleIcon />
        </div>
        {isApproving && (
          <div className={styles.confirmDepositFailed}>
            <Spinner size={58} />
            <p className={styles.modalTitle}>{`Verifying your validator's eligibility`}</p>
          </div>
        )}
        {!isApproving && !eligible && (
          <div className={styles.confirmDepositFailed}>
            <RedAlertIcon />
            <p className={styles.modalTitle}>Validator Not Eligible</p>
            <p className={styles.confirmDepositDesc}>
              Please ensure your validator is active on the <a>consensus layer</a> and has a balance
              of 32+ ETH.
            </p>
          </div>
        )}
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalApproveMint
