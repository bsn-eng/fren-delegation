import classNames from 'classnames'
import { FC, ReactNode } from 'react'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

export interface UiSectionProps {
  children: ReactNode
  className?: string
  style?: Record<string, string | number>
}

export const UiSection: FC<UiSectionProps> = ({ children, className = '', style = {} }) => {
  return (
    <div className={cx(styles.wrapper, className)} style={{ ...style }}>
      {children}
    </div>
  )
}
