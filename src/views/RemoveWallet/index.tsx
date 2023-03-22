import { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import tw, { styled } from 'twin.macro'

import ArrowLeftSVG from '@/assets/images/arrow-left.svg'
import EmptyCheckBoxIconSvg from '@/assets/images/icon-check-empty.svg'
import FullCheckBoxIconSvg from '@/assets/images/icon-check-full.svg'
import { ModalRemoveWallet } from '@/components/app'
import { Button, CompletedTxView, ErrorModal, LoadingModal, ModalDialog } from '@/components/shared'
import { useBuilderMethods, useNetworkBasedLinkFactories, useReporterMethods } from '@/hooks'

const RemoveWallet: FC = () => {
  const navigate = useNavigate()

  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const params = useParams()

  const [failed, setFailed] = useState(false)
  const [error, setError] = useState<string>()
  const [txResult, setTxResult] = useState<any>()
  const { makeEtherscanLink } = useNetworkBasedLinkFactories()

  const {
    exitBuilder,
    setIsLoading: setBuilderLoading,
    isLoading: isBuilderLoading
  } = useBuilderMethods()

  const {
    exitReporter,
    setIsLoading: setReporterLoading,
    isLoading: isReporterLoading
  } = useReporterMethods()

  const isLoading = isBuilderLoading || isReporterLoading

  const setIsLoading = (loading: boolean) => {
    setBuilderLoading(loading)
    setReporterLoading(loading)
  }

  const handleClaim = async () => {
    setIsOpen(false)
    try {
      let txResult: any

      if (params.mode === 'builder') {
        txResult = await exitBuilder()
      }

      if (params.mode === 'reporter') {
        txResult = await exitReporter()
      }

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
          <img src={ArrowLeftSVG} className="w-6 h-6" onClick={() => navigate('/more')} />
          <Label>Remove Wallet</Label>
        </div>
        {isChecked && (
          <div className="p-4 w-full mt-4">
            <Button className="w-full" size="lg" onClick={() => setIsOpen(true)}>
              Confirm
            </Button>
          </div>
        )}
        {!isChecked && (
          <Confirmation isChecked={isChecked} onClick={() => setIsChecked(!isChecked)}>
            <img src={isChecked ? FullCheckBoxIconSvg : EmptyCheckBoxIconSvg} className="w-5 h-5" />{' '}
            I understand I am removing my wallet from the PoN relay. I understand I will lose all
            future rewards will contribute to the censorship of transactions because of block
            proposals through centralized relays and that I will lose future rewards by removing my
            staked ETH
          </Confirmation>
        )}
      </Box>
      {isChecked && (
        <div className="w-full bg-grey900 max-w-lg p-6 rounded-2xl">
          <Confirmation isChecked={isChecked} onClick={() => setIsChecked(!isChecked)}>
            <img src={isChecked ? FullCheckBoxIconSvg : EmptyCheckBoxIconSvg} className="w-5 h-5" />{' '}
            I understand I am removing my wallet from the PoN relay. I understand I will lose all
            future rewards will contribute to the censorship of transactions because of block
            proposals through centralized relays and that I will lose future rewards by removing my
            staked ETH
          </Confirmation>
        </div>
      )}
      <ModalRemoveWallet handleClaim={handleClaim} open={isOpen} onClose={() => setIsOpen(false)} />

      <LoadingModal open={isLoading} title="Confirmation Pending" onClose={() => {}} />
      <ErrorModal
        open={failed}
        onClose={() => setFailed(false)}
        title="Exit Failed"
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

export default RemoveWallet

const Box = styled.div`
  ${tw`w-full bg-grey850 mt-10 max-w-lg p-4 rounded-2xl flex flex-col`}
`
const Label = styled.div`
  ${tw`text-white font-semibold text-center w-full`}
  font-size: 32px;
`
const Confirmation = styled.div<{ isChecked: boolean }>`
  ${tw`flex gap-2 cursor-pointer text-sm my-9`}
  color: #888D9B;
  ${(props) => props.isChecked && tw`text-white my-0`}
`
