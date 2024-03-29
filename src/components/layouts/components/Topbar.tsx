import '../styles.scss'

import { FC, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAccount, useNetwork } from 'wagmi'

import { ReactComponent as ArrowTopRightIcon } from '@/assets/images/icon-arrow-top-right.svg'
import { ReactComponent as BookIcon } from '@/assets/images/icon-book.svg'
import { ReactComponent as DiscordIcon } from '@/assets/images/icon-discord.svg'
import { ReactComponent as ThreeDotIcon } from '@/assets/images/icon-dot-three.svg'
import { ReactComponent as HelperIcon } from '@/assets/images/icon-helper.svg'
import Logo from '@/assets/images/logo.png'
import { ButtonWalletConnect } from '@/components/app'
import { Dropdown } from '@/components/shared'
import { TMenu } from '@/types'

import Switch from '../../app/Switch'
import NavItem from './NavItem'

const Topbar: FC = () => {
  const navigate = useNavigate()
  const { data: account } = useAccount()
  const { pathname } = useLocation()
  const network = useNetwork()

  const options: TMenu[] = [
    {
      id: 1,
      label: 'Help Center',
      icon: <HelperIcon />,
      onClick: () => window.open('https://help.joinstakehouse.com/en', '_blank')
    },
    {
      id: 2,
      label: 'Docs',
      icon: <BookIcon />,
      onClick: () =>
        window.open('https://docs.joinstakehouse.com/protocol/learn/Stakehouse', '_blank')
    },
    {
      id: 3,
      label: 'Discord',
      icon: <DiscordIcon />,
      onClick: () => window.open('https://discord.gg/s8N9ekQuuj', '_blank')
    }
  ]

  return (
    <div className="topbar">
      <a onClick={() => navigate('/')} rel={'noopener noreferrer'}>
        <img src={Logo} alt="logo" width={50} />
      </a>

      <div className="topbar__navMenu">
        <Link to={'/'}>
          <NavItem active={pathname === '/' || pathname.includes('validator')}>
            Fren Staking
          </NavItem>
        </Link>
        <Link to="/list">
          <NavItem active={pathname.includes('list')}>Available Validators</NavItem>
        </Link>
      </div>

      {account ? (
        <div className="flex items-center gap-3">
          <ButtonWalletConnect />
          <Dropdown options={options}>
            <div className="topbar__menu-btn">
              <ThreeDotIcon />
            </div>
          </Dropdown>
        </div>
      ) : (
        <div />
      )}
    </div>
  )
}

export default Topbar
