import { useCallback, useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export function useFlaggedWallet() {
  const [isFlagged, setIsFlagged] = useState(false)
  const { data: account } = useAccount()

  const fetchData = useCallback(async () => {
    if (account?.address !== undefined) {
      try {
        const response = await fetch('https://trm.joinstakehouse.com/risk', {
          method: 'POST',
          body: JSON.stringify({ address: account?.address })
        })
        const responseData = await response.json()
        const isAllowed: boolean = responseData.allowed
        setIsFlagged(!isAllowed)
      } catch (error) {
        console.log('Error useFlaggedWallet:', error)
        setIsFlagged(false)
      }
    }
  }, [account])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return isFlagged
}
