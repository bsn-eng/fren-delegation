import classNames from 'classnames'
import { FC, ReactNode } from 'react'

import { ReactComponent as TickIcon } from '@/assets/images/tick.svg'

import Button from '../Buttons'
import Spinner from '../Spinner'
import { Tooltip } from '../Tooltip'
import { UiSection } from '../UiSection/UiSection'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

export interface ActionableSectionProps {
  label: ReactNode
  children?: ReactNode
  disabled?: boolean
  loading?: boolean
  actionable?: boolean
  actionContent?: ReactNode
  onAction?: () => void
  done?: boolean
  doneContent?: ReactNode
  tooltip?: ReactNode
  className?: string
  style?: Record<string, string | number>
}

export const ActionableSection: FC<ActionableSectionProps> = ({
  label,
  children,
  disabled = false,
  loading = false,
  actionable = false,
  actionContent = 'Confirm',
  onAction = () => {},
  done = false,
  doneContent = 'Done',
  tooltip,
  className = '',
  style = {}
}) => {
  const isActionBtnDisabled = disabled

  return (
    <UiSection className={cx(styles.wrapper, className)} style={{ ...style }}>
      <div className={styles.label}>
        {label}
        <Tooltip message={tooltip} />
      </div>
      <div className={styles.content}>
        {loading ? (
          <Spinner size={36} />
        ) : done ? (
          <div className={styles.done}>
            <div>{doneContent}</div>
            <TickIcon />
          </div>
        ) : actionable ? (
          <Button className="w-full" borderless disabled={isActionBtnDisabled} onClick={onAction}>
            {actionContent}
          </Button>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </UiSection>
  )
}
