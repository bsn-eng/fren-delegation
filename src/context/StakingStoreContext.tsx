import { createContext, FC, PropsWithChildren, useState } from 'react'

import { DepositObjectT, EXPERT_REGISTER_STEP, KeystoreT, STAKING_MODE } from '@/types'

interface IContextProps {
  mode: STAKING_MODE
  step: number
  password: string
  depositObject: DepositObjectT | undefined
  keystore: KeystoreT | undefined
  expertRegisterStep: EXPERT_REGISTER_STEP
  easyRegisterStep: number
  txRegisterHash: string
  setMode: (mode: STAKING_MODE) => void
  setStep: (step: number) => void
  setPassword: (password: string) => void
  setDepositObject: (depositObject: DepositObjectT | undefined) => void
  setKeystore: (keystore: KeystoreT | undefined) => void
  setExpertRegisterStep: (step: EXPERT_REGISTER_STEP) => void
  setEasyRegisterStep: (step: number) => void
  setTxRegisterHash: (tx: string) => void
  clearAllData: () => void
}

export const StakingStoreContext = createContext<IContextProps>({
  mode: STAKING_MODE.EASY,
  step: 1,
  password: '',
  depositObject: undefined,
  keystore: undefined,
  expertRegisterStep: EXPERT_REGISTER_STEP.INIT,
  easyRegisterStep: 1,
  txRegisterHash: '',
  setMode: () => {},
  setStep: () => {},
  setPassword: () => {},
  setDepositObject: () => {},
  setKeystore: () => {},
  setExpertRegisterStep: () => {},
  setEasyRegisterStep: () => {},
  setTxRegisterHash: () => {},
  clearAllData: () => {}
})

const StakingStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const [step, setStep] = useState(1)
  const [mode, setMode] = useState<STAKING_MODE>(STAKING_MODE.EASY)
  const [password, setPassword] = useState('')
  const [depositObject, setDepositObject] = useState<DepositObjectT>()
  const [keystore, setKeystore] = useState<KeystoreT>()
  const [expertRegisterStep, setExpertRegisterStep] = useState<EXPERT_REGISTER_STEP>(
    EXPERT_REGISTER_STEP.INIT
  )
  const [txRegisterHash, setTxRegisterHash] = useState('')
  const [easyRegisterStep, setEasyRegisterStep] = useState(1)

  const clearAllData = () => {
    setStep(1)
    setMode(STAKING_MODE.EASY)
    setPassword('')
    setDepositObject(undefined)
    setKeystore(undefined)
    setExpertRegisterStep(EXPERT_REGISTER_STEP.INIT)
    setEasyRegisterStep(1)
    setTxRegisterHash('')
  }

  return (
    <StakingStoreContext.Provider
      value={{
        step,
        mode,
        password,
        depositObject,
        keystore,
        expertRegisterStep,
        easyRegisterStep,
        txRegisterHash,
        setStep,
        setMode,
        setPassword,
        setDepositObject,
        setKeystore,
        setExpertRegisterStep,
        setEasyRegisterStep,
        setTxRegisterHash,
        clearAllData
      }}>
      {children}
    </StakingStoreContext.Provider>
  )
}

export default StakingStoreProvider
