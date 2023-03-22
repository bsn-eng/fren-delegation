import './styles.scss'

import { FC } from 'react'

import LoadingIcon from '@/assets/images/loading-circle.png'

interface IProps {
  size?: number
}

const Spinner: FC<IProps> = ({ size = 58 }) => {
  return (
    <img src={LoadingIcon} className="spinner select-none" style={{ width: size, height: size }} />
  )
}

export default Spinner
