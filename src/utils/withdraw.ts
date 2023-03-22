import { TStakehouseSDK } from '../types'

export const getProtectedStakingBalance = async (sdk: TStakehouseSDK | null, address: string) => {
  const giantProtectedStakingPool = (await sdk?.contractInstance).giantSavETHPool()
  const lpTokenETH = await giantProtectedStakingPool.lpTokenETH()
  const tokenInstance = (await sdk?.contractInstance).giantLPToken(lpTokenETH)
  return await tokenInstance.balanceOf(address)
}

export const getFeesMevBalance = async (sdk: TStakehouseSDK | null, address: string) => {
  const giantFeesAndMevPool = (await sdk?.contractInstance).giantFeesAndMEV()

  const lpTokenETH = await giantFeesAndMevPool.lpTokenETH()
  const tokenInstance = (await sdk?.contractInstance).giantLPToken(lpTokenETH)

  return await tokenInstance.balanceOf(address)
}
