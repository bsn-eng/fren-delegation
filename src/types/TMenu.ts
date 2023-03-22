import { ReactNode } from 'react'

export type TMenu = {
  id: number | string
  icon?: ReactNode
  label: ReactNode
  disabled?: boolean
  helper?: string
  onClick?: () => void
}
