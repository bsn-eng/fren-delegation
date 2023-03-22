import { formatEther, parseEther } from 'ethers/lib/utils'
import { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { notifyHash } from '@/utils/global'

import { useSDK } from './useSDK'

export const useBuilderMethods = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { ponSdk: sdk } = useSDK()

  const [minAmount, setMinAmount] = useState<string>()

  const register = useCallback(
    async (address: string, amount: string) => {
      setIsLoading(true)

      const tx = await sdk?.builderRegistry.registerBuilder(address, parseEther(amount))

      notifyHash(tx.hash)
      await tx.wait()

      setIsLoading(false)

      return tx
    },
    [sdk]
  )

  const exitBuilder = useCallback(async () => {
    setIsLoading(true)

    const tx = await sdk?.builderRegistry.exitBuilder()

    notifyHash(tx.hash)
    await tx.wait()

    setIsLoading(false)

    return tx
  }, [sdk])

  const positionBuilderForExit = useCallback(async () => {
    setIsLoading(true)

    const tx = await sdk?.builderRegistry.positionBuilderForExit()

    notifyHash(tx.hash)
    await tx.wait()

    setIsLoading(false)

    return tx
  }, [sdk])

  const topUp = useCallback(
    async (address: string, amount: string) => {
      setIsLoading(true)

      const tx = await sdk?.builderRegistry.topUp(address, parseEther(amount))

      notifyHash(tx.hash)
      await tx.wait()

      setIsLoading(false)

      return tx
    },
    [sdk]
  )

  const getBuilder = async (address: string) => {
    const builder = await sdk?.builderRegistry.getBuilder(address)

    return {
      staked: formatEther(builder.balanceStaked ?? 0),
      status: builder.status,
      exitBlock: builder.exitBlock
    }
  }

  const getTopUpRequired = useCallback(
    async (address: string) => {
      const topup = await sdk?.builderRegistry.getRequiredTopUp(address)

      return formatEther(topup)
    },
    [sdk]
  )

  useEffect(() => {
    const fetchData = async () => {
      const _minAmount = await sdk?.builderRegistry.getMinimalStakeAmount()

      setMinAmount(formatEther(_minAmount))
    }

    if (sdk) fetchData()
  }, [sdk])

  return {
    register,
    isLoading,
    setIsLoading,
    minAmount,
    getBuilder,
    getTopUpRequired,
    topUp,
    positionBuilderForExit,
    exitBuilder
  }
}

export const useIsBuilderRegistered = () => {
  const { ponSdk: sdk } = useSDK()
  const { data: account } = useAccount()
  const [isRegistered, setIsRegistered] = useState<boolean>(false)

  useEffect(() => {
    const init = async () => {
      const _isRegistered = await sdk?.builderRegistry.isBuilderRegistered(account?.address)
      setIsRegistered(_isRegistered)
    }

    if (sdk && account?.address) init()
  }, [sdk, account?.address])

  return isRegistered
}
