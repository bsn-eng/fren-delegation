import { useContext } from 'react'

import { UserContext } from '@/context/UserContext'

export function useUser() {
  const data = useContext(UserContext)
  return data
}
