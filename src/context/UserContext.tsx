import { createContext, FC, PropsWithChildren, useState } from 'react'
import { useAccount } from 'wagmi'

export interface UserContextProps {
  userAddress: string
}

export const UserContext = createContext<UserContextProps>({
  userAddress: ''
})

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: account } = useAccount()

  const userAddress = account?.address || ''

  return <UserContext.Provider value={{ userAddress }}>{children}</UserContext.Provider>
}

export default UserProvider
