import { useQuery } from '@apollo/client'
import { LsdValidatorsQuery } from '../graphql/queries/ValidatorQuery'
import { useEffect, useState } from 'react'
import { TFrenValidator } from '../types'

export const useValidators = () => {
  const [validators, setValidators] = useState<TFrenValidator[]>([])

  const { loading, data } = useQuery(LsdValidatorsQuery, {
    fetchPolicy: 'cache-and-network'
  })

  useEffect(() => {
    if (data && data.lsdvalidators) {
      const convertedData: TFrenValidator[] = data.lsdvalidators.map((validator: any) => ({
        id: validator.id,
        ticker: validator.smartWallet.liquidStakingNetwork.ticker,
        commission: Number(validator.smartWallet.liquidStakingNetwork.commission)
      }))
      setValidators(convertedData)
    } else {
      setValidators([])
    }
  }, [data])

  return { validators, loading }
}
