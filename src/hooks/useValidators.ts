import { useQuery } from '@apollo/client'
import { LsdValidatorsQuery } from '../graphql/queries/ValidatorQuery'
import { useCallback, useEffect, useState } from 'react'
import { TFrenValidator } from '../types'
import { useSDK } from './useSDK'
import { BEACON_NODE_URL } from '@/constants/chains'

export const useValidators = async () => {
  const { wizard } = useSDK()
  const [validators, setValidators] = useState<TFrenValidator[]>([])

  const { loading, data } = useQuery(LsdValidatorsQuery, {
    fetchPolicy: 'cache-and-network'
  })

  const filterValidators = useCallback(async () => {
    const blsPublicKeys = validators.map((validator: any) => validator.id)
    if (wizard != null) {
      const reports = await wizard?.helper.getFinalisedEpochReportForMultipleBlsKeys(
        BEACON_NODE_URL,
        blsPublicKeys,
        ['active', 'exited', 'withdrawal']
      )
      if (reports.length != 0) {
        const blsKeysToRemove = reports.map(
          (report: any) => '0x' + report.blsPublicKey.toLowerCase()
        )
        const filteredData: TFrenValidator[] = validators.map((validator: any) => {
          if (!blsKeysToRemove.includes(validator.id)) return validator
        })
        setValidators(filteredData)
      }
    }
  }, [validators, wizard])

  useEffect(() => {
    if (data && data.lsdvalidators) {
      const convertedData: TFrenValidator[] = data.lsdvalidators.map((validator: any) => ({
        id: validator.id,
        ticker: validator.smartWallet.liquidStakingNetwork.ticker,
        commission: Number(validator.smartWallet.liquidStakingNetwork.commission)
      }))
      setValidators(convertedData)
      filterValidators()
    } else {
      setValidators([])
    }
  }, [data, wizard, filterValidators])

  return { validators, loading }
}
