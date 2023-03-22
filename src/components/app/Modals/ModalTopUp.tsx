import { Dialog } from '@headlessui/react'
import classNames from 'classnames'
import { BigNumber, ethers } from 'ethers'
import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { ReactComponent as BlueEthIcon } from '@/assets/images/icon-eth-bigs.svg'
import { Button, Modal, Spinner, Tooltip } from '@/components/shared'
import { BlockswapSDKContext } from '@/context/BlockswapSDKContext'
import { useNetworkBasedLinkFactories } from '@/hooks'
import { ValidatorT } from '@/types'
import { notifyHash, weiToEthNum } from '@/utils/global'

import styles from './styles.module.scss'

interface IProps {
  open: boolean
  onClose: () => void
  validator: ValidatorT | null | undefined
}

const cx = classNames.bind(styles)

const ModalTopUp: FC<IProps> = ({ open, onClose, validator }) => {
  const { data: { address } = {} } = useAccount()
  const { sdk } = useContext(BlockswapSDKContext)
  const { makeEtherscanLink } = useNetworkBasedLinkFactories()

  const [amount, setAmount] = useState('0')
  const [slashedAmount, setSlashedAmount] = useState(0)
  const [txHash, setTxHash] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchSlashAmount = async () => {
      if (sdk && validator) {
        const slashAmount = await sdk.utils.currentSlashedAmountOfSLOTForKnot(validator.id)
        setSlashedAmount(weiToEthNum(slashAmount))
      }
    }

    fetchSlashAmount()
  }, [sdk, validator])

  useEffect(() => {
    if (open) {
      setAmount(slashedAmount.toLocaleString(undefined, { maximumFractionDigits: 18 }))
    }
  }, [slashedAmount, open])

  const handleTopUp = async () => {
    if (!validator || !sdk) return

    try {
      setSubmitting(true)
      const tx = await sdk.utils.topUpSlashedSlot(
        validator.stakeHouseMetadata?.id,
        validator.id,
        address,
        ethers.utils.parseEther(amount),
        ethers.utils.parseEther(amount)
      )
      notifyHash(tx.hash)
      await tx.wait()
      setTxHash(tx.hash)
    } catch (err) {
      console.log('handleTopUp error: ', err)
    }
    setSubmitting(false)
  }

  const handleClose = () => {
    setAmount('0')
    setTxHash('')
    onClose()
  }

  const isGreaterThanMinimum = useMemo(() => {
    try {
      const weiAmount = ethers.utils.parseEther(amount)
      const isGreater = Number(ethers.utils.formatUnits(weiAmount, 'gwei'))
      if (isGreater !== 0 && Number.isInteger(isGreater)) {
        return true
      }
    } catch (err) {
      console.log('checking minimum error: ', err)
    }
    return false
  }, [amount])

  return (
    <Modal open={open} onClose={handleClose}>
      <Dialog.Panel className={styles.modalLayoutBig}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={handleClose}>
          <CloseCircleIcon />
        </div>
        {isSubmitting ? (
          <div className="flex flex-col gap-4 items-center">
            <Spinner />
            <h3 className={styles.modalTitle}>Confirmation Pending</h3>
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
          <div className={cx(styles.confirmDeposit, 'w-full')}>
            <div className={cx(styles.modalTitle, 'flex w-full items-center justify-center gap-2')}>
              Top Up{' '}
              <Tooltip message="If there aren't any SLOT tokens available, your transaction may fail." />
            </div>
            <div className="flex flex-col gap-2">
              <div className={styles.infoSection}>
                <input
                  value={amount}
                  onChange={(e) => {
                    if (!isNaN(Number(e.target.value))) {
                      setAmount(e.target.value)
                    }
                  }}
                  className="text-xl text-grey25 bg-black outline-none"
                />
                <span>ETH</span>
                <button
                  className={styles.maxButton}
                  onClick={() =>
                    setAmount(
                      slashedAmount.toLocaleString(undefined, { maximumFractionDigits: 18 })
                    )
                  }>
                  <p className="text-xs font-medium text-primary700">MAX</p>
                </button>
              </div>
            </div>
            <Button
              className="w-full h-12"
              disabled={
                Number(amount) === 0 ||
                Number(amount) > Number(slashedAmount) ||
                !isGreaterThanMinimum
              }
              onClick={handleTopUp}>
              Confirm
            </Button>
          </div>
        )}
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalTopUp
