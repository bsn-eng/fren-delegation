import { FC, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import tw, { styled } from 'twin.macro'
import { useAccount } from 'wagmi'

import ArrowLeftSVG from '@/assets/images/arrow-left.svg'
import EmptyCheckBoxIconSvg from '@/assets/images/icon-check-empty.svg'
import FullCheckBoxIconSvg from '@/assets/images/icon-check-full.svg'
import { Button, CompletedTxView, ErrorModal, LoadingModal, ModalDialog } from '@/components/shared'
import { useBuilderMethods, useNetworkBasedLinkFactories } from '@/hooks'

export const Withdraw: FC = () => {
  const [amount, setAmount] = useState<string>('')
  const [MAX_AMOUNT, setStakedBalance] = useState<string>('0')
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [failed, setFailed] = useState(false)
  const [error, setError] = useState<string>()
  const [txResult, setTxResult] = useState<any>()

  const navigate = useNavigate()
  const params = useParams()
  const { data: account } = useAccount()
  const { makeEtherscanLink } = useNetworkBasedLinkFactories()

  const { getBuilder, exitBuilder, positionBuilderForExit, isLoading, setIsLoading } =
    useBuilderMethods()

  useEffect(() => {
    const init = async () => {
      const { staked: balance } = await getBuilder(account?.address || '')

      setStakedBalance(balance)
    }

    init()
  }, [account?.address])

  const errMessage = useMemo(() => {
    if (!MAX_AMOUNT || amount === '') return ''

    if (Number(MAX_AMOUNT) < 0.001 || Number(amount) > Number(MAX_AMOUNT)) {
      return 'Insufficient Balance'
    }

    return ''
  }, [MAX_AMOUNT, amount])

  const handleSetMaxAmount = async () => {
    setAmount(MAX_AMOUNT ? `${Number(MAX_AMOUNT)}` : '')
  }

  const handleClaim = async () => {
    try {
      const txResult =
        params.mode === 'positionBuilderForExit'
          ? await positionBuilderForExit()
          : await exitBuilder()

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
    navigate('/')
  }

  return (
    <div className="flex justify-center items-center flex-col gap-2">
      <Box>
        <div className="flex items-center">
          <img src={ArrowLeftSVG} className="w-6 h-6 cursor-pointer" onClick={() => navigate(-1)} />
          <Title>Withdraw Deposit</Title>
        </div>
        {!isChecked && (
          <Confirmation isChecked={isChecked} onClick={() => setIsChecked(!isChecked)}>
            <img src={isChecked ? FullCheckBoxIconSvg : EmptyCheckBoxIconSvg} className="w-5 h-5" />{' '}
            I understand that by Withdrawing the ETH bonded to the contract I will loose my access
            to the Builder role and bla bla bla bla
          </Confirmation>
        )}
        {isChecked && (
          <div className="w-full flex flex-col gap-1.5 px-4 mb-4">
            <InputWrapper>
              <Input
                value={MAX_AMOUNT}
                placeholder="Amount"
                disabled
                onChange={(e) => {
                  if (!isNaN(Number(e.target.value))) {
                    setAmount(e.target.value)
                  }
                }}
                className="text-xl text-grey25 bg-black outline-none"
              />
              <MaxButtonWrapper>
                <span>ETH</span>
                {/* {Number(MAX_AMOUNT) !== Number(amount) && (
                  <button onClick={handleSetMaxAmount}>
                    <p className="text-xs font-medium text-primary700">MAX</p>
                  </button>
                )} */}
              </MaxButtonWrapper>
            </InputWrapper>
            <Balance>Available {MAX_AMOUNT} ETH</Balance>
            <Button size="lg" disabled={!Number(MAX_AMOUNT)} onClick={handleClaim}>
              Claim
            </Button>
          </div>
        )}
      </Box>
      {isChecked && (
        <ConfirmationWrapper>
          <Confirmation isChecked={isChecked} onClick={() => setIsChecked(!isChecked)}>
            <img src={isChecked ? FullCheckBoxIconSvg : EmptyCheckBoxIconSvg} className="w-5 h-5" />{' '}
            I understand that by Withdrawing the ETH bonded to the contract I will loose my access
            to the Builder role and bla bla bla bla
          </Confirmation>
        </ConfirmationWrapper>
      )}

      <LoadingModal open={isLoading} title="Confirmation Pending" onClose={() => {}} />
      <ErrorModal
        open={failed}
        onClose={() => setFailed(false)}
        title="Claim Failed"
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
              <span className="text-sm text-grey300">{`Your transaction has processed.`}</span>
            </div>
          }
        />
      </ModalDialog>
    </div>
  )
}
const ConfirmationWrapper = styled.div`
  ${tw`w-full bg-grey900  p-6 rounded-2xl`}
  max-width: 529px;
`
const Box = styled.div`
  ${tw`w-full bg-grey850 mt-10 p-4 rounded-2xl flex flex-col gap-8`}
  max-width: 529px;
`
const Title = styled.div`
  ${tw`text-white font-semibold text-center w-full`}
  font-size: 32px;
`
const InputWrapper = tw.div`relative flex items-center text-white`
const Input = styled.input`
  ${tw`w-full h-full pl-4 pr-28 text-base py-3 rounded-lg border border-solid border-grey500`}
  &::placeholder {
    color: #888d9b;
  }
  &:disabled {
    ${tw`cursor-not-allowed text-grey500 bg-grey200`}
  }
`

const MaxButtonWrapper = styled.div`
  ${tw`absolute right-4 flex items-center gap-4`}

  button {
    @apply py-1 px-1.5 rounded-lg;
    background-color: rgba($color: #00ed7b, $alpha: 0.1);
  }
`
const Balance = styled.div`
  ${tw`text-right text-sm px-2`}
  color: #888d9b;
`

const Confirmation = styled.div<{ isChecked: boolean }>`
  ${tw`flex gap-2 cursor-pointer text-sm mb-6`}
  color: #888D9B;
  ${(props) => props.isChecked && tw`text-white my-0`}
`
