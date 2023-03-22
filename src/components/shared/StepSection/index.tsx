import classNames from 'classnames'
import { FC, ReactNode } from 'react'

import { ReactComponent as CheckIcon } from '@/assets/images/icon-check-white.svg'

import { Tooltip } from '../Tooltip'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

export interface StepSectionProps {
  title: ReactNode
  number: number
  children: ReactNode
  state: 'normal' | 'active' | 'done'
  inside?: boolean
  tooltip?: ReactNode
}

export const StepSection: FC<StepSectionProps> = ({
  title,
  number,
  children,
  state,
  tooltip,
  inside = false
}) => {
  const active = state === 'active'
  const done = state === 'done'

  return (
    <div className={cx(styles.wrapper, { [styles.wrapperActive]: active })}>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className="flex items-center gap-6">
            <div className={styles.number}>{number.toString()}</div>
            <div className={styles.title}>{title}</div>
          </div>

          <Tooltip message={tooltip} />
        </div>
        {active
          ? inside && <div>{children}</div>
          : done && (
              <div className={styles.check}>
                Done
                <CheckIcon />
              </div>
            )}
      </div>
      {active && !inside && children}
    </div>
  )
}
