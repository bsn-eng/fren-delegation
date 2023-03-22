import { getAccount } from '@wagmi/core'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import tw, { styled } from 'twin.macro'
import { useAccount } from 'wagmi'

import ArrowLeftSVG from '@/assets/images/arrow-left.svg'
import {
  Button,
  CompletedTxView,
  ErrorModal,
  LoadingModal,
  ModalDialog,
  Tooltip
} from '@/components/shared'
import { useNetworkBasedLinkFactories, useReporterMethods } from '@/hooks'

type ReporterProps = {
  handleGoBack: () => void
}

export const Reporter: FC<ReporterProps> = ({ handleGoBack }) => {
  const navigate = useNavigate()

  const [failed, setFailed] = useState(false)
  const [error, setError] = useState<string>()
  const [txResult, setTxResult] = useState<any>()
  const { makeEtherscanLink } = useNetworkBasedLinkFactories()
  const { data: account } = useAccount()

  const { register, isLoading, setIsLoading } = useReporterMethods()

  const handleConfirm = async () => {
    try {
      const txResult = await register()

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
          <Label>Reporter</Label>
        </div>

        <div className="w-full p-2 gap-4 flex flex-col">
          <div className="text-sm text-primary font-semibold flex items-center gap-2">
            Register your wallet{' '}
            <Tooltip message="Register the wallet you will be submitting reports from." />
          </div>
          <div className="w-full text-white break-words text-sm">{account?.address}</div>
          <Button className="w-full" size="lg" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
      </Box>
      <Comment>Earn ETH while helping maintain the integrity of the PoN relay.</Comment>
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
const Comment = tw.div`bg-grey900 text-grey700 text-sm font-medium max-w-lg px-8 py-6 rounded-2xl`
