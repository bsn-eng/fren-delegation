import { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Builder, Proposer, Reporter } from '@/components/app/Manage'
import { REGISTER_MODE } from '@/constants'

const Manage: FC = () => {
  const params = useParams()
  const navigate = useNavigate()
  const handleGoBack = () => navigate('/')

  return (
    <>
      {params.activeMode === REGISTER_MODE.REPORTER && <Reporter handleGoBack={handleGoBack} />}
      {params.activeMode === REGISTER_MODE.PROPOSER && <Proposer handleGoBack={handleGoBack} />}
      {params.activeMode === REGISTER_MODE.BUILDER && <Builder handleGoBack={handleGoBack} />}
    </>
  )
}

export default Manage
