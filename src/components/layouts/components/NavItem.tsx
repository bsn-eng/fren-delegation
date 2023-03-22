import { FC, PropsWithChildren } from 'react'

interface IProps {
  active: boolean
}

const NavItem: FC<PropsWithChildren<IProps>> = ({ active, children }) => {
  return (
    <div className={active ? 'topbar__navMenu__item--active' : 'topbar__navMenu__item'}>
      {children}
    </div>
  )
}

export default NavItem
