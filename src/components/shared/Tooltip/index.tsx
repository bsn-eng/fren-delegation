import Tippy, { TippyProps } from '@tippyjs/react/headless'
import { FC, ReactElement, ReactNode } from 'react'

import { ReactComponent as HelpIcon } from '@/assets/images/help.svg'

import styles from './styles.module.scss'

export interface TooltipProps extends Omit<TippyProps, 'render' | 'children' | 'maxWidth'> {
  children?: ReactElement<any>
  message?: ReactNode
}

export const Tooltip: FC<TooltipProps> = ({
  children,
  message,
  interactive = true,
  placement = 'top',
  ...tippyProps
}) => {
  return (
    <>
      {message && (
        <Tippy
          placement={placement}
          interactive={interactive}
          {...tippyProps}
          render={(attrs) => (
            <div className={styles.tooltipPopup} {...attrs}>
              {message}
            </div>
          )}>
          {children ? children : <HelpIcon className="cursor-pointer" />}
        </Tippy>
      )}
    </>
  )
}
