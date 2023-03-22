import classNames from 'classnames'
import { FC, PropsWithChildren } from 'react'

import styles from './styles.module.scss'

const cx = classNames.bind(styles)

export type ButtonTheme = 'primary' | 'secondary' | 'text-primary' | 'text-danger'
export type ButtonSize = 'md' | 'lg'
export type ButtonShape = 'smooth' | 'rounded'

interface IProps {
  variant?: ButtonTheme
  size?: ButtonSize
  shape?: ButtonShape
  disabled?: boolean
  borderless?: boolean
  className?: string
  style?: Record<string, string | number>
  onClick?: () => void
}

const Button: FC<PropsWithChildren<IProps>> = ({
  variant = 'primary',
  size = 'md',
  shape = 'smooth',
  borderless = false,
  disabled,
  className = '',
  onClick = () => {},
  style = {},
  children
}) => {
  const stateClassName = (() => {
    if (disabled) return styles.btnDisabled
    return styles.btnActive
  })()

  const themeClassName = (() => {
    const themesMap: Record<ButtonTheme, string> = {
      primary: styles.btnPrimary,
      secondary: styles.btnSecondary,
      'text-primary': styles.btnTextPrimary,
      'text-danger': styles.btnTextDanger
    }

    return themesMap[variant]
  })()

  const sizeClassName = (() => {
    const sizesMap: Record<ButtonSize, string> = {
      md: styles.btnMd,
      lg: styles.btnLg
    }

    return sizesMap[size]
  })()

  const shapeClassName = (() => {
    const shapesMap: Record<ButtonShape, string> = {
      smooth: styles.btnSmooth,
      rounded: styles.btnRounded
    }

    return shapesMap[shape]
  })()

  return (
    <button
      onClick={onClick}
      style={{ ...style }}
      disabled={disabled}
      type="button"
      className={cx(
        className,
        styles.btn,
        stateClassName,
        themeClassName,
        sizeClassName,
        shapeClassName,
        borderless ? styles.btnBorderless : ''
      )}>
      {children}
    </button>
  )
}

export default Button
