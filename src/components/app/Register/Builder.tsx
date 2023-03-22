import { FC, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import tw, { styled } from 'twin.macro'
import { useAccount, useBalance } from 'wagmi'

import ArrowLeftSVG from '@/assets/images/arrow-left.svg'
import { ModalBuilderConfirm } from '@/components/app/Modals'
import {
  Button,
  CompletedTxView,
  ErrorModal,
  LoadingModal,
  ModalDialog,
  ValidatorRegisterCard
} from '@/components/shared'
import { MAX_GAS_FEE } from '@/constants'
import { config } from '@/constants/environment'
import { useBuilderMethods, useNetworkBasedLinkFactories } from '@/hooks'

interface PasswordValidationT {
  required?: string | undefined
  length?: string | undefined
}

type BuilderProps = {
  handleGoBack: () => void
}

export const Builder: FC<BuilderProps> = ({ handleGoBack }) => {
  const navigate = useNavigate()
  const [step, setStep] = useState<number>(1)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [amount, setAmount] = useState<string>('')
  const [failed, setFailed] = useState(false)
  const [error, setError] = useState<string>()
  const [txResult, setTxResult] = useState<any>()

  const { data: account } = useAccount()
  const { makeEtherscanLink } = useNetworkBasedLinkFactories()
  const { minAmount, register, isLoading, setIsLoading } = useBuilderMethods()
  const { data: { formatted: MAX_AMOUNT } = {} } = useBalance({
    addressOrName: account?.address,
    formatUnits: 'ether',
    chainId: config.networkId
  })

  const errMessage = useMemo(() => {
    if (!MAX_AMOUNT || amount === '') return ''

    if (Number(MAX_AMOUNT) < 0.001 || Number(amount) > Number(MAX_AMOUNT)) {
      return 'Insufficient Balance'
    }

    if (Number(minAmount) > Number(amount)) return `Please deposit more than ${minAmount} ETH`

    return ''
  }, [MAX_AMOUNT, amount])

  const handleSetMaxAmount = async () => {
    setAmount(`${Number(minAmount)}`)
  }

  const handleConfirm = async () => {
    try {
      const txResult = await register(account?.address || '', amount)

      setTimeout(() => {
        setTxResult(txResult)
      }, 500)
    } catch (err: any) {
      console.log(err, err.message)
      setIsLoading(false)
      setTimeout(() => {
        setError(err.reason[0].toUpperCase() + err.reason.substr(1))
        setFailed(true)
      }, 500)
    }
  }

  const handleCloseSuccessModal = () => {
    setTxResult(undefined)
    handleGoBack()
  }

  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <Box>
        <div className="flex items-center mb-4">
          <img src={ArrowLeftSVG} className="w-6 h-6 cursor-pointer" onClick={handleGoBack} />
          <Label>Builder</Label>
        </div>
        <ValidatorRegisterCard
          active={step === 1}
          done={step === 2}
          stepNum={1}
          title="Register your wallet"
          tooltip="Register the wallet you will use to submit blocks to the PoN Relay..">
          <div className="w-full p-2 gap-4 flex flex-col">
            <div className="w-full text-white break-words">{account?.address}</div>
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                setIsOpen(true)
              }}>
              Confirm
            </Button>
          </div>
        </ValidatorRegisterCard>
        <ValidatorRegisterCard
          active={step === 2}
          done={step === 3}
          stepNum={2}
          title="Deposit Collateral"
          tooltip="This deposit acts as collateral in the event that any wrongful behavior occurs and grants access into the PoN relay.">
          <div className="flex flex-col gap-2 w-full text-white">
            <div className="text-base font-semibold">Deposit ETH</div>
            <InputWrapper>
              <Input
                value={amount}
                placeholder="Amount"
                onChange={(e) => {
                  if (!isNaN(Number(e.target.value))) {
                    setAmount(e.target.value)
                  }
                }}
                className="text-xl text-grey25 bg-black outline-none"
              />
              <MaxButtonWrapper>
                <span>ETH</span>
                {Number(minAmount) !== Number(amount) && (
                  <button onClick={handleSetMaxAmount}>
                    <p className="text-xs font-medium text-primary700">MIN</p>
                  </button>
                )}
              </MaxButtonWrapper>
            </InputWrapper>
            <div className="text-sm mb-1 flex flex-col">
              <div className="flex justify-between w-full">
                <span className="text-xs text-grey600">Minimum deposit is {minAmount} ETH</span>
                <span>
                  Balance:{' '}
                  {Number(MAX_AMOUNT).toLocaleString(undefined, { maximumFractionDigits: 4 })} ETH
                </span>
              </div>
              <div className="w-full text-error text-right">{errMessage}</div>
            </div>
            <Button
              size="lg"
              disabled={!amount || errMessage.length > 0}
              className="w-full"
              onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </ValidatorRegisterCard>
      </Box>
      <ModalBuilderConfirm
        open={isOpen}
        onConfirm={() => setStep(2)}
        onClose={() => setIsOpen(false)}
      />
      <LoadingModal open={isLoading} title="Confirmation Pending" onClose={() => {}} />
      <ErrorModal
        open={failed}
        onClose={() => setFailed(false)}
        title="Register Failed"
        message={error}
        actionButtonContent="Try Again"
        onAction={() => setFailed(false)}
      />
      <ModalDialog open={!!txResult} onClose={() => setTxResult(undefined)}>
        <CompletedTxView
          goToContent="Home"
          title="Success"
          txLink={makeEtherscanLink(txResult?.hash)}
          onGoToClick={handleCloseSuccessModal}
          message={
            <div className="flex flex-col items-center">
              <span className="text-sm text-grey300">{`You've successfully registered your wallet with the PoN Relay as Reporter.`}</span>
            </div>
          }
        />
      </ModalDialog>
    </div>
  )
}

const Box = styled.div`
  ${tw`w-full bg-grey850 mt-10 max-w-lg p-4 rounded-2xl flex flex-col gap-4`}
`
const Label = styled.div`
  ${tw`text-white font-semibold text-center w-full`}
  font-size: 32px;
`
const InputWrapper = tw.div`relative flex items-center`
const Input = styled.input`
  ${tw`w-full h-full pl-4 pr-28 text-base py-3 rounded-lg border border-solid border-grey500`}
  &::placeholder {
    color: #888d9b;
  }
`

const MaxButtonWrapper = styled.div`
  ${tw`absolute right-4 flex items-center gap-4`}

  button {
    @apply py-1 px-1.5 rounded-lg;
    background-color: rgba($color: #00ed7b, $alpha: 0.1);
  }
`
