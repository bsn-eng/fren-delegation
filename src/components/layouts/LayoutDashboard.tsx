import './styles.scss'

import { FC, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { useFlaggedWallet } from '@/hooks/useFlaggedWallet'

import { NotSupportedMobile, Topbar } from './components'

const DashboardLayout: FC = () => {
  const isFlagged = useFlaggedWallet()
  const navigate = useNavigate()

  useEffect(() => {
    if (isFlagged) {
      navigate('/sign-in')
    }
  }, [isFlagged])

  return (
    <div className="layout">
      <Topbar />
      {isMobile ? <NotSupportedMobile /> : <Outlet />}
    </div>
  )
}

export default DashboardLayout
