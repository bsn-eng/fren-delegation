import { FC, ReactNode } from 'react'

import Spinner from '../../Spinner'

export interface LoadingModalViewProps {
  title?: ReactNode
  message?: ReactNode
}

export const LoadingModalView: FC<LoadingModalViewProps> = ({ title = '', message = '' }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <Spinner size={76} />
      </div>

      {title && (
        <div className="mt-5 flex items-center justify-center">
          <span className="text-lg text-grey25 font-bold select-none">{title}</span>
        </div>
      )}

      {message && (
        <div className="mt-2">
          <span className="text-grey300">{message}</span>
        </div>
      )}
    </div>
  )
}
