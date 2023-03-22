import './styles.scss'

import { FC } from 'react'

import { Button } from '@/components/shared'

interface IProps {
  icon: string
  label: string
  isMore?: boolean
  onClick: () => void
}

const ButtonWallet: FC<IProps> = ({ icon, label, isMore, onClick }) => {
  if (isMore) {
    return (
      <Button onClick={onClick} variant="secondary" shape="rounded">
        <div className="btn-wallet--more">{label}</div>
      </Button>
    )
  }

  return (
    <Button onClick={onClick} variant="secondary" shape="rounded">
      <div className="btn-wallet">
        <img src={icon} alt="icon" />
        {label}
      </div>
    </Button>
  )
}

export default ButtonWallet
