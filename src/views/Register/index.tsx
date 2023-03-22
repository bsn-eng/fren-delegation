import './index.scss'

import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useConnect } from 'wagmi'

import { Builder, Main } from '@/components/app/Register'
import { Proposer, Reporter } from '@/components/app/Register'
import { REGISTER_MODE } from '@/constants'

const Register: FC = () => {
  // states
  const params = useParams()
  const navigate = useNavigate()
  const [activeMode, setActiveMode] = useState<REGISTER_MODE>(
    params.mode ? (params.mode as REGISTER_MODE) : REGISTER_MODE.MAIN
  )

  // wagmi hooks
  const { isConnected } = useConnect()

  useEffect(() => {
    if (!isConnected) setActiveMode(REGISTER_MODE.MAIN)
  }, [isConnected])

  const handleModeChange = (mode: REGISTER_MODE) => setActiveMode(mode)
  const handleGoBack = () => {
    setActiveMode(REGISTER_MODE.MAIN)
  }

  return (
    <div className="deposit">
      {activeMode === REGISTER_MODE.MAIN && <Main handleModeChange={handleModeChange} />}
      {activeMode === REGISTER_MODE.PROPOSER && <Proposer handleGoBack={handleGoBack} />}
      {activeMode === REGISTER_MODE.REPORTER && <Reporter handleGoBack={handleGoBack} />}
      {activeMode === REGISTER_MODE.BUILDER && <Builder handleGoBack={handleGoBack} />}
    </div>
  )
}
export default Register
