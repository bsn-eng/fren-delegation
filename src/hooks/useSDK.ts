import { useContext } from 'react'

import { BlockswapSDKContext } from '@/context/BlockswapSDKContext'

export function useSDK() {
  const { sdk, ponSdk } = useContext(BlockswapSDKContext)

  return {
    sdk,
    ponSdk
  }
}
