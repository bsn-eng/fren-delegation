import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react'
import { useNetwork } from 'wagmi'

import { TWizard } from '@/types'

interface IContextProps {
  wizard: TWizard | null
  setWizard: (wizard: TWizard | null) => void
}

export const BlockswapSDKContext = createContext<IContextProps>({
  wizard: null,
  setWizard: (wizard: TWizard | null) => {}
})

const BlockswapSDKProvider: FC<PropsWithChildren> = ({ children }) => {
  const [wizard, setWizard] = useState<TWizard | null>(null)

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

  return (
    <BlockswapSDKContext.Provider value={{ setWizard, wizard }}>
      {children}
    </BlockswapSDKContext.Provider>
  )
}

export default BlockswapSDKProvider
