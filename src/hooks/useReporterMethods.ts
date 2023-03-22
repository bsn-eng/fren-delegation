import { formatEther } from 'ethers/lib/utils'
import { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { notifyHash } from '@/utils/global'

import { useSDK } from './useSDK'

export const useReporterMethods = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { ponSdk: sdk } = useSDK()
  const { data: account } = useAccount()

  const [rewardBalance, setRewardBalance] = useState<string>()

  const claimRewards = useCallback(async () => {
    setIsLoading(true)

    const tx = await sdk?.payoutPool.claimReporterReward()

    notifyHash(tx.hash)
    await tx.wait()

    setIsLoading(false)

    return tx
  }, [sdk])

  const exitReporter = useCallback(async () => {
    setIsLoading(true)

    const tx = await sdk?.reporterRegistry.ragequitReporter()

    notifyHash(tx.hash)
    await tx.wait()

    setIsLoading(false)

    return tx
  }, [sdk])

  const register = useCallback(async () => {
    setIsLoading(true)

    const tx = await sdk?.reporterRegistry.registerReporter()

    notifyHash(tx.hash)
    await tx.wait()

    setIsLoading(false)

    return tx
  }, [sdk])

  useEffect(() => {
    const fetchData = async () => {
      if (sdk) {
        const _rewards = await sdk.payoutPool.getReporterRewards(account?.address)

        setRewardBalance(formatEther(_rewards))
      }
    }

    if (account?.address) fetchData()
  }, [sdk, account?.address])

  return { register, isLoading, setIsLoading, rewardBalance, claimRewards, exitReporter }
}

export const useIsReporterRegistered = () => {
  const { ponSdk: sdk } = useSDK()
  const { data: account } = useAccount()
  const [isRegistered, setIsRegistered] = useState<boolean>(false)

  useEffect(() => {
    const init = async () => {
      const _isRegistered = await sdk?.reporterRegistry.isReporterRegistered(account?.address)
      setIsRegistered(_isRegistered)
    }

    if (sdk && account?.address) init()
  }, [sdk, account?.address])

  return isRegistered
}
