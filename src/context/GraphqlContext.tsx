import { createContext, FC, PropsWithChildren, useState } from 'react'

interface IContextProps {
  validatorId: string
  setValidatorId: (id: string) => void
}

export const GraphqlContext = createContext<IContextProps>({
  validatorId: '',
  setValidatorId: () => {}
})

const GraphqlProvider: FC<PropsWithChildren> = ({ children }) => {
  const [validatorId, setValidatorId] = useState('')

  return (
    <GraphqlContext.Provider
      value={{
        validatorId,
        setValidatorId
      }}>
      {children}
    </GraphqlContext.Provider>
  )
}

export default GraphqlProvider
