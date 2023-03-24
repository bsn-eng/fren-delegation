import { BigNumber } from 'ethers'
import { useCallback, useState } from 'react'

import { notifyHash } from '@/utils/global'

import { useSDK } from './useSDK'

export const useDeposit = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { wizard } = useSDK()

  const protectedDeposit = useCallback(
    async (blsKey: string, amount: string, ethValue: BigNumber) => {
      setIsLoading(true)

      console.log(wizard)

      const tx = await wizard?.savETHPool.depositETHForStaking(blsKey, amount, ethValue)

      notifyHash(tx.hash)
      await tx.wait()

      setIsLoading(false)

      return tx
    },
    [wizard]
  )

  const mevDeposit = useCallback(
    async (blsKey: string, amount: string, ethValue: BigNumber) => {
      setIsLoading(true)

      const tx = await wizard?.feesAndMevPool.depositETHForStaking(blsKey, amount, ethValue)

      notifyHash(tx.hash)
      await tx.wait()

      setIsLoading(false)

      return tx
    },
    [wizard]
  )

  return {
    isLoading,
    setIsLoading,
    protectedDeposit,
    mevDeposit
  }
}
