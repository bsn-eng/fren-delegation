import { TStakehouseSDK } from '../types'

export const getFeesMevRewardsBalance = async (sdk: TStakehouseSDK | null, address: string) => {
  const giantFeesAndMevPool = (await sdk?.contractInstance).giantFeesAndMEV()
  const userGiantLPBalance = await sdk?.wizard.getUserGiantFeesAndMevLPBalance(address)

  const giantPooldETHBalance = await sdk?.wizard.getGiantPoolDETHBalance(
    giantFeesAndMevPool.address
  )

  return await sdk?.wizard.getMinimum(userGiantLPBalance, giantPooldETHBalance)
}

export const getProtectedStakingRewardsBalance = async (
  sdk: TStakehouseSDK | null,
  address: string
) => {
  const giantProtectedStakingPool = (await sdk?.contractInstance).giantSavETHPool()
  const userGiantLPBalance = await sdk?.wizard.getUserGiantProtectedStakingLPBalance(address)
  const giantPooldETHBalance = await sdk?.wizard.getGiantPoolDETHBalance(
    giantProtectedStakingPool.address
  )

  return await sdk?.wizard.getMinimum(userGiantLPBalance, giantPooldETHBalance)
}
