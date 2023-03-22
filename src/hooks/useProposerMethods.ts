import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

import { KeystoreT } from '@/types'
import { notifyHash } from '@/utils/global'

import { useProposerValidators } from './useProposerValidators'
import { useSDK } from './useSDK'

export const useProposerMethods = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [rewardBalance, setRewardBalance] = useState<string>('0')

  const { ponSdk: sdk, sdk: stakehouseSDK } = useSDK()
  const { data: account } = useAccount()

  const { blsKeys } = useProposerValidators()

  const register = async (keystore: KeystoreT, password: string) => {
    setIsLoading(true)
    const { publicKey, privateKey } = await stakehouseSDK?.cip.unlockBLSKeystore(keystore, password)

    const hexPrivateKey = Buffer.from(privateKey, 'hex')

    const tx = await sdk?.proposerRegistry.registerProposer(
      publicKey,
      account?.address,
      hexPrivateKey
    )

    notifyHash(tx.hash)
    await tx.wait()

    setIsLoading(false)

    return tx
  }

  const rageQuit = async (blskey: string) => {
    setIsLoading(true)
    console.log(blskey)
    const tx = await sdk?.proposerRegistry.ragequitProposer(blskey)

    notifyHash(tx.hash)
    await tx.wait()

    setIsLoading(false)

    return tx
  }

  const claimRewards = async () => {
    setIsLoading(true)

    const tx = await sdk?.payoutPool.repayDebtAndClaimMultipleProposers(blsKeys)

    notifyHash(tx.hash)
    await tx.wait()

    setIsLoading(false)

    return tx
  }

  useEffect(() => {
    const fetchData = async () => {
      const rewards = await Promise.all(
        blsKeys.map((key: string) => sdk?.payoutPool.getProposerRewards(key))
      )

      const totalRewardsWei = rewards.reduce(
        (sum: BigNumber, current: BigNumber) => sum.add(current),
        BigNumber.from(0)
      )

      setRewardBalance(formatEther(totalRewardsWei))
    }

    if (account?.address && sdk && blsKeys.length > 0) fetchData()
  }, [sdk, account?.address, blsKeys])

  return { isLoading, setIsLoading, register, rewardBalance, claimRewards, rageQuit }
}
