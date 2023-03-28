import { useContext } from 'react'

import { BlockswapSDKContext } from '@/context/BlockswapSDKContext'

export function useSDK() {
  const { wizard, setWizard } = useContext(BlockswapSDKContext)

  return {
    wizard,
    setWizard
  }
}
