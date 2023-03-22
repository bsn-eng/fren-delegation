import PON from '@blockswaplab/pon-sdk'
import { StakehouseSDK } from '@blockswaplab/stakehouse-sdk'
import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react'
import { chain, useNetwork, useSigner } from 'wagmi'

import { supportedChains } from '@/constants/chains'
import { config } from '@/constants/environment'
import { TPonSDK, TStakehouseSDK } from '@/types'

interface IContextProps {
  sdk: TStakehouseSDK | null
  ponSdk: TPonSDK | null
}

export const BlockswapSDKContext = createContext<IContextProps>({
  sdk: null,
  ponSdk: null
})

const BlockswapSDKProvider: FC<PropsWithChildren> = ({ children }) => {
  const [sdk, setSDK] = useState<TStakehouseSDK | null>(null)
  const [ponSdk, setPonSdk] = useState<TPonSDK | null>(null)
  const { data: signer } = useSigner()
  const { activeChain, chains, switchNetwork } = useNetwork()

  useEffect(() => {
    if (chains && activeChain) {
      let isSupprotedChain = false
      chains.forEach((chain) => {
        if (chain.id === activeChain.id) {
          isSupprotedChain = true
        }
      })
      if (!isSupprotedChain && switchNetwork) {
        switchNetwork(chains[0].id)
      }
    }
  }, [activeChain, chains, switchNetwork])

  useEffect(() => {
    if (signer && activeChain?.id === config.networkId) {
      try {
        const sdk = new StakehouseSDK(signer)
        const ponSdk = new PON(signer)

        setSDK(sdk)
        setPonSdk(ponSdk)
      } catch (err) {
        console.log('err: ', err)
      }
    }
  }, [signer, activeChain])

  return (
    <BlockswapSDKContext.Provider value={{ sdk, ponSdk }}>{children}</BlockswapSDKContext.Provider>
  )
}

export default BlockswapSDKProvider
