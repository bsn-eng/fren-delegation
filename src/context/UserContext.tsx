import { createContext, FC, PropsWithChildren, useState } from 'react'
import { useAccount } from 'wagmi'

export interface UserContextProps {
  userAddress: string
  protectedMax: number
  mevMax: number
  blsKey: string
  setBlsKey: (blsKey: string) => void
  setMevMax: (value: number) => void
  setProtectedMax: (value: number) => void
}

export const UserContext = createContext<UserContextProps>({
  userAddress: '',
  protectedMax: 0,
  mevMax: 0,
  blsKey: '',
  setBlsKey: (blsKey: string) => {},
  setMevMax: (value: number) => {},
  setProtectedMax: (value: number) => {}
})

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: account } = useAccount()
  const [protectedMax, setProtectedMax] = useState<number>(0)
  const [mevMax, setMevMax] = useState<number>(0)
  const [blsKey, setBlsKey] = useState<string>('')

  const userAddress = account?.address || ''

  return (
    <UserContext.Provider
      value={{ userAddress, protectedMax, mevMax, blsKey, setBlsKey, setMevMax, setProtectedMax }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
