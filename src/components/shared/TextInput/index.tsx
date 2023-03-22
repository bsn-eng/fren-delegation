import { FC, forwardRef, InputHTMLAttributes, LegacyRef, ReactNode } from 'react'

import { Tooltip } from '../Tooltip'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode
  tooltip?: ReactNode
}

const TextInput = ({ label, tooltip, ...otherProps }: IProps, ref: LegacyRef<HTMLInputElement>) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-grey100">{label}</label>
          {tooltip && <Tooltip message={tooltip} />}
        </div>
      )}
      <input {...otherProps} ref={ref} />
    </div>
  )
}

export default forwardRef(TextInput)
