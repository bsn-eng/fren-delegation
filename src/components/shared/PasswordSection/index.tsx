import { FC, ReactNode, useEffect, useRef } from 'react'

import { ReactComponent as CheckIcon } from '@/assets/images/icon-check-white.svg'

import Button from '../Buttons'
import { Tooltip } from '../Tooltip'
import styles from './styles.module.scss'

interface PasswordSectionProps {
  value: string
  label?: ReactNode
  disabled?: boolean
  tooltip?: ReactNode
  buttonContent?: ReactNode
  error?: ReactNode
  borderless?: boolean
  isDone?: boolean
  doneContent?: ReactNode
  loading?: boolean
  loadingContent?: ReactNode
  onChange?: (value: string) => void
  onConfirm?: () => void
}

export const PasswordSection: FC<PasswordSectionProps> = ({
  value,
  label,
  disabled = false,
  tooltip,
  buttonContent = 'Confirm',
  error,
  borderless = false,
  isDone = false,
  doneContent = 'Done',
  loading = false,
  loadingContent = 'Wait...',
  onChange = () => {},
  onConfirm = () => {}
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const isConfirmButtonDisabled = !value || disabled || loading

  const isInputDisabled = disabled || isDone || loading

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus()
    }
  }, [disabled])

  const handleChange = (e: any) => {
    const newValue = e.target.value || ''
    onChange(newValue)
  }

  return (
    <div className={borderless ? styles.wrapper : styles.borderedWrapper}>
      <div className={styles.content}>
        <div>
          {(label || tooltip) && (
            <div className={disabled ? styles.labelDisabled : styles.labelActive}>
              <div>{label}</div>
              <Tooltip message={tooltip} />
            </div>
          )}
          <form>
            <input
              ref={inputRef}
              value={value}
              type="password"
              autoComplete="autocomplete"
              placeholder={'••••••••'}
              disabled={isInputDisabled}
              className={
                isInputDisabled ? styles.passwordInputDisabled : styles.passwordInputActive
              }
              onChange={handleChange}
            />
          </form>
        </div>
        <div>
          {isDone ? (
            <div className={styles.done}>
              {doneContent}
              <CheckIcon />
            </div>
          ) : (
            <Button
              disabled={isConfirmButtonDisabled}
              onClick={onConfirm}
              borderless
              style={{ height: '44px' }}>
              {loading ? loadingContent : buttonContent}
            </Button>
          )}
        </div>
      </div>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  )
}
