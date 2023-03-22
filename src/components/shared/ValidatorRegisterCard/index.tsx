import classNames from 'classnames'
import { FC, PropsWithChildren, ReactNode } from 'react'

import { ReactComponent as CheckIcon } from '@/assets/images/icon-check-grey.svg'
import { Tooltip } from '@/components/shared'

import styles from './styles.module.scss'

interface IProps {
  title: string
  stepNum: number
  active: boolean
  done: boolean
  open?: boolean
  onClickHeader?: () => void
  inside?: boolean
  tooltip?: ReactNode
}

const cx = classNames.bind(styles)
export const ValidatorRegisterCard: FC<PropsWithChildren<IProps>> = ({
  title,
  stepNum,
  active,
  done,
  open = false,
  onClickHeader,
  inside,
  tooltip,
  children
}) => {
  return (
    <div className={cx(styles.registerCard, { [styles.registerCardActive]: active })}>
      <div className={styles.registerCardContent} onClick={onClickHeader}>
        <div className={styles.registerCardInfo}>
          <div className={styles.registerCardStepNum}>{stepNum.toString()}</div>
          <div className={styles.registerCardTitle}>{title}</div>

          {tooltip && <Tooltip message={tooltip} />}
        </div>
        {/*<Action state={state} />*/}
        {active
          ? inside && <div>{children}</div>
          : done && (
              <div className={styles.registerCardCheck}>
                Done
                <CheckIcon />
              </div>
            )}
      </div>
      {(active || open) && !inside && children}
    </div>
  )
}
