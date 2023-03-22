import { FC, ReactNode } from 'react'

import { ReactComponent as AlertCircleIcon } from '@/assets/images/alert-circle.svg'

import Button from '../../Buttons'

export interface ErrorModalViewProps {
  title?: ReactNode
  message?: ReactNode
  actionButtonContent?: ReactNode
  onAction?: () => void
}

export const ErrorModalView: FC<ErrorModalViewProps> = ({
  title = '',
  message = '',
  actionButtonContent = '',
  onAction = () => {}
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <AlertCircleIcon className="mb-3" />

      {title && (
        <div className="mb-2 flex items-center justify-center">
          <span className="text-lg text-grey25 font-bold select-none">{title}</span>
        </div>
      )}

      {message && (
        <div className="mb-2.5">
          <span className="text-grey300">{message}</span>
        </div>
      )}

      {actionButtonContent && (
        <Button size="lg" className="mt-1" style={{ minWidth: '140px' }} onClick={onAction}>
          {actionButtonContent}
        </Button>
      )}
    </div>
  )
}
