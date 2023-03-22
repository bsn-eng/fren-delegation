import './styles.scss'

import { FC } from 'react'

interface IProps {
  src: string
  size?: number
}

const Avatar: FC<IProps> = ({ src, size }) => {
  return (
    <div className="avatar" style={{ width: size, height: size }}>
      <img src={src} alt="av" />
    </div>
  )
}

export default Avatar
