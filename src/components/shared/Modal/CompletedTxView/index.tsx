import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import EthProfitIcon from '@/assets/images/profit.png'

import Button from '../../Buttons'
import { DefaultModalView, DefaultModalViewProps } from '../DefaultModalView'

export interface CompletedTxViewProps
  extends Omit<DefaultModalViewProps, 'children' | 'tooltip' | 'loading'> {
  txLink?: string
  goToLink?: string
  goToContent?: ReactNode
  onGoToClick?: () => void
}

export const CompletedTxView: FC<CompletedTxViewProps> = ({
  txLink = '',
  goToLink = '/',
  goToContent = 'My Profile',
  onGoToClick = () => {},
  icon,
  title = 'Transaction Confirmed',
  message = '',
  className = '',
  style = {}
}) => {
  return (
    <DefaultModalView
      icon={icon || <img src={EthProfitIcon} className="select-none" style={{ height: '64px' }} />}
      title={title ? <span className="text-primary">{title}</span> : title}
      message={message}
      className={className}
      style={style}>
      <div className="flex gap-3" style={{ minWidth: '300px' }}>
        {onGoToClick && (
          <Button variant="secondary" className="w-full" onClick={onGoToClick}>
            {goToContent}
          </Button>
        )}
        {txLink && (
          <a href={txLink} className="w-full" target="_blank" rel="noreferrer">
            <Button className="w-full">LSD dApp</Button>
          </a>
        )}
      </div>
    </DefaultModalView>
  )
}
