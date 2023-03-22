import { Dialog } from '@headlessui/react'
import classNames from 'classnames'
import { FC, useContext, useEffect, useState } from 'react'
import { useAccount, useConnect, useSigner } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { ReactComponent as CloseCircleIcon } from '@/assets/images/close-circle.svg'
import { ReactComponent as BlueAlertIcon } from '@/assets/images/icon-alert-blue.svg'
import { Button, Modal, TextInput } from '@/components/shared'
import { BlockswapSDKContext } from '@/context/BlockswapSDKContext'
import { DepositObjectT, KeystoreT } from '@/types'
import { noty } from '@/utils/global'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

interface PasswordValidationT {
  required?: string | undefined
  length?: string | undefined
}

interface IProps {
  open: boolean
  depositObject: DepositObjectT | undefined
  uploadedKeyStore: KeystoreT | null
  onClose: () => void
  onApprove: (payload: any) => void
}

const ModalKeystorePassword: FC<IProps> = ({
  open,
  depositObject,
  uploadedKeyStore,
  onClose,
  onApprove
}) => {
  const { sdk } = useContext(BlockswapSDKContext)
  const { data: { address } = {} } = useAccount()
  const { activeConnector } = useConnect()
  const { data: signer } = useSigner()
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isApproving, setApproving] = useState(false)
  const [passwordValidationErr, setPasswordValidationErr] = useState<PasswordValidationT>()

  useEffect(() => {
    if (!confirmPassword) {
      return setPasswordValidationErr({ required: 'Password is required' })
    } else if (confirmPassword.length < 8) {
      return setPasswordValidationErr({ length: 'Your password must be 8 or more characters.' })
    } else {
      setPasswordValidationErr(undefined)
    }
  }, [confirmPassword])

  const handleApprove = async () => {
    setApproving(true)
    await handleSignKeystore(confirmPassword)
    setApproving(false)
  }

  const handleSignKeystore = async (password: string) => {
    if (!depositObject) {
      noty('Deposit object is null')
      return
    }
    if (!password) {
      noty('Cannot confirm, password is required')
      return
    }
    if (!uploadedKeyStore) {
      noty('Please upload file')
      return
    }

    if (!sdk || !address || !signer || !activeConnector) return

    const [deposit] = depositObject

    try {
      const provider = await activeConnector.getProvider()

      const depositor_signature_payload = await sdk.utils.getPersonalSignInitials(
        provider,
        sdk.utils.add0x(deposit.pubkey),
        sdk.utils.add0x(deposit.signature),
        address,
        activeConnector.name === 'WalletConnect'
      )

      const bls_authentication_response = await sdk.BLSAuthentication(
        password,
        uploadedKeyStore,
        depositObject,
        depositor_signature_payload
      )

      onApprove(bls_authentication_response)
    } catch (err) {
      console.log('upload keystore error: ', err)
    }
  }

  const handleClose = () => {
    setConfirmPassword('')
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Dialog.Panel className={styles.modalLayout}>
        <div className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          <CloseCircleIcon />
        </div>
        <div className={cx(styles.confirmPassword, 'w-full')}>
          <BlueAlertIcon />
          <h3 className={styles.confirmPasswordHeader}>Confirmation</h3>
          <div className="flex flex-col w-full gap-2">
            <TextInput
              label="Confirm Keystore Password"
              type="password"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordValidationErr?.required && (
              <span className={styles.inputErr}>{passwordValidationErr.required}</span>
            )}
            {passwordValidationErr?.length && (
              <span className={styles.inputErr}>{passwordValidationErr.length}</span>
            )}
          </div>
          <Button
            variant="primary"
            className="w-full h-12"
            disabled={!confirmPassword || isApproving || !!passwordValidationErr}
            onClick={handleApprove}>
            {isApproving ? 'Approving' : 'Approve Transaction'}
          </Button>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}

export default ModalKeystorePassword
