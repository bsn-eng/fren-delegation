import { useContext } from 'react'

import { BlockswapSDKContext } from '@/context/BlockswapSDKContext'

export function useSDK() {
  const { sdk, ponSdk, wizard, setWizard } = useContext(BlockswapSDKContext)

  return {
    sdk,
    ponSdk,
    wizard,
    setWizard
  }
}
