import { FC, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import tw, { styled } from 'twin.macro'

import ArrowLeftSVG from '@/assets/images/arrow-left.svg'
import { Button, CompletedTxView, ErrorModal, LoadingModal, ModalDialog } from '@/components/shared'
import { useNetworkBasedLinkFactories, useProposerMethods } from '@/hooks'

export const MyRewards: FC = () => {
  const [amount, setAmount] = useState<string>('')

  const [failed, setFailed] = useState(false)
  const [error, setError] = useState<string>()
  const [txResult, setTxResult] = useState<any>()
  const { makeEtherscanLink } = useNetworkBasedLinkFactories()

  const navigate = useNavigate()

  const { rewardBalance: MAX_AMOUNT, claimRewards, isLoading, setIsLoading } = useProposerMethods()

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
      const txResult = await claimRewards()

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
        <div className="flex items-center mb-4">
          <img src={ArrowLeftSVG} className="w-6 h-6" onClick={() => navigate(-1)} />
          <Title>My Rewards</Title>
        </div>
        <div className="w-full flex flex-col gap-1.5 px-4 mb-4">
          <InputWrapper>
            <Input
              value={MAX_AMOUNT}
              disabled
              placeholder="Amount"
              onChange={(e) => {
                if (!isNaN(Number(e.target.value))) {
                  setAmount(e.target.value)
                }
              }}
              className="text-xl text-grey25 bg-black outline-none"
            />
            {/* <MaxButtonWrapper>
              <span>ETH</span>
              {Number(MAX_AMOUNT) !== Number(amount) && (
                <button onClick={handleSetMaxAmount}>
                  <p className="text-xs font-medium text-primary700">MAX</p>
                </button>
              )}
            </MaxButtonWrapper> */}
          </InputWrapper>
          <Balance>{MAX_AMOUNT} ETH</Balance>
          <Button size="lg" disabled={!Number(MAX_AMOUNT)} onClick={handleClaim}>
            Claim
          </Button>
        </div>
      </Box>
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

const Box = styled.div`
  ${tw`w-full bg-grey850 mt-10 max-w-xl p-4 rounded-2xl flex flex-col gap-8`}
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
