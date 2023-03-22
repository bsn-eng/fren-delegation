import { FC, ReactNode, useEffect, useRef, useState } from 'react'

import { ReactComponent as InfoFilledIcon } from '@/assets/images/info-filled.svg'

import Button from '../../Buttons'
import TextInput from '../../TextInput'
import { DefaultModalView } from '../DefaultModalView'
import { ErrorModalView } from '../ErrorModalView'
import { LoadingModalView } from '../LoadingModalView'
import { ModalDialog } from '../ModalDialog'
import styles from './styles.module.scss'

interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  loading?: boolean
  allowLoadingView?: boolean
  loadingViewTitle?: ReactNode
  requestPassword?: boolean
  matchPassword?: string
  icon?: ReactNode
  title?: ReactNode
  message?: ReactNode
  label?: ReactNode
  alertMessage?: ReactNode
  confirmButtonContent?: ReactNode
  loadingButtonContent?: ReactNode
  tooltip?: ReactNode
  comment?: ReactNode
  onConfirm?: (password: string, showError: () => void) => void
  errorTitle?: ReactNode
  errorActionContent?: ReactNode
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  open,
  onClose,
  loading = false,
  allowLoadingView = false,
  loadingViewTitle = 'Loading...',
  requestPassword = false,
  matchPassword = '',
  icon = <InfoFilledIcon />,
  title = 'Confirmation',
  message = '',
  label = 'Password',
  alertMessage = '',
  confirmButtonContent = 'Approve Transaction',
  loadingButtonContent = 'Approving Transaction...',
  tooltip,
  comment,
  onConfirm = () => {},
  errorTitle = 'Incorrect password',
  errorActionContent = 'Try Again'
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [confirmationPassword, setConfirmationPassword] = useState('')
  const [isConfirmationErrorVisible, setIsConfirmationErrorVisible] = useState(false)

  const isConfirmButtonDisabled = loading || (requestPassword && !confirmationPassword)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current?.focus()
    }
  }, [inputRef.current])

  const handleConfirm = () => {
    if (requestPassword && matchPassword && confirmationPassword !== matchPassword) {
      showError()
      return
    }

    onConfirm(confirmationPassword, showError)
  }

  const showError = () => {
    setIsConfirmationErrorVisible(true)
    setConfirmationPassword('')
  }

  function handleClose() {
    setConfirmationPassword('')
    setIsConfirmationErrorVisible(false)
    onClose()
  }

  return (
    <ModalDialog open={open} onClose={handleClose}>
      {loading && allowLoadingView ? (
        <LoadingModalView title={loadingViewTitle} />
      ) : (
        <>
          {isConfirmationErrorVisible ? (
            <ErrorModalView
              title={errorTitle}
              actionButtonContent={errorActionContent}
              onAction={() => setIsConfirmationErrorVisible(false)}
            />
          ) : (
            <DefaultModalView
              className="w-full"
              icon={icon}
              title={title !== 'NONE' ? title : ''}
              message={message}>
              {requestPassword && (
                <div className="mb-4">
                  <TextInput
                    label={label}
                    tooltip={tooltip}
                    ref={inputRef}
                    value={confirmationPassword}
                    type="password"
                    placeholder="••••••••"
                    disabled={loading}
                    autoComplete="autocomplete"
                    className={loading ? styles.passwordInputDisabled : styles.passwordInputActive}
                    onChange={(e) => setConfirmationPassword(e.target.value)}
                  />
                  {alertMessage && <div className={styles.warnMessage}>{alertMessage}</div>}
                </div>
              )}

              <Button
                size="lg"
                className="w-full"
                disabled={isConfirmButtonDisabled}
                onClick={handleConfirm}>
                {loading ? loadingButtonContent : confirmButtonContent}
              </Button>

              {comment && <div className={styles.comment}>{comment}</div>}
            </DefaultModalView>
          )}
        </>
      )}
    </ModalDialog>
  )
}

export default ConfirmModal
