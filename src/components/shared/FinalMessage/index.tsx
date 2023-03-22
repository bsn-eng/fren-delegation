import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import Button from '../Buttons'
import styles from './styles.module.scss'

export interface FinalMessageProps {
  children: ReactNode
  icon?: ReactNode
  buttonContent?: ReactNode
  buttonLink?: string
  txLink?: string
}

export const FinalMessage: FC<FinalMessageProps> = ({
  children,
  icon,
  buttonContent,
  buttonLink,
  txLink
}) => {
  return (
    <div className={styles.wrapper}>
      {icon && <div className="flex justify-center">{icon}</div>}

      <div className={styles.message}>{children}</div>

      <div className={styles.actions}>
        {txLink && (
          <a href={txLink} target={'_blank'} rel={'noreferrer noopener'} className="w-full">
            <Button variant="secondary" className="w-full">
              Etherscan
            </Button>
          </a>
        )}

        {buttonContent && buttonLink && (
          <Link to={buttonLink} className="w-full">
            <Button className="w-full">{buttonContent}</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
