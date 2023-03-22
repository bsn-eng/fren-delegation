import { FC, ReactNode } from 'react'

import Spinner from '../../Spinner'
import { Tooltip } from '../../Tooltip'

export interface DefaultModalViewProps {
  children?: ReactNode
  icon?: ReactNode
  title?: ReactNode
  message?: ReactNode
  tooltip?: ReactNode
  loading?: boolean
  className?: string
  style?: Record<string, string | number>
}

export const DefaultModalView: FC<DefaultModalViewProps> = ({
  children,
  icon,
  title,
  message,
  tooltip,
  loading = false,
  className = '',
  style = {}
}) => {
  return (
    <div className={className} style={{ ...style }}>
      {icon && <div className="flex items-center justify-center mb-4">{icon}</div>}

      {loading && (
        <div className="flex items-center justify-center mb-3.5">
          <Spinner size={64} />
        </div>
      )}

      {title && (
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="text-lg text-grey25 font-bold select-none">{title}</span>
          <Tooltip message={tooltip} />
        </div>
      )}

      {message && (
        <div className="mb-3.5">
          <span className="text-grey300">{message}</span>
        </div>
      )}

      {!loading && children && <div>{children}</div>}
    </div>
  )
}
