import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import tw, { styled } from 'twin.macro'
import { useAccount } from 'wagmi'

import ArrowLeftSVG from '@/assets/images/arrow-left.svg'
import { ModalProposerConfirm } from '@/components/app/Modals'
import styles from '@/components/app/Modals/styles.module.scss'
import {
  Button,
  CompletedTxView,
  ErrorModal,
  LoadingModal,
  ModalDialog,
  TextInput,
  UploadKeyStoreFile,
  ValidatorRegisterCard
} from '@/components/shared'
import { useNetworkBasedLinkFactories, useProposerMethods } from '@/hooks'
import { KeystoreT } from '@/types'

interface PasswordValidationT {
  required?: string | undefined
  length?: string | undefined
}

type ProposerProps = {
  handleGoBack: () => void
}

export const Proposer: FC<ProposerProps> = ({ handleGoBack }) => {
  const navigate = useNavigate()
  const [step, setStep] = useState<number>(1)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [keystoreObject, setKeystoreObject] = useState<KeystoreT>()
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordValidationErr, setPasswordValidationErr] = useState<PasswordValidationT>()

  const [failed, setFailed] = useState(false)
  const [error, setError] = useState<string>()
  const [txResult, setTxResult] = useState<any>()

  const { data: account } = useAccount()
  const { makeEtherscanLink } = useNetworkBasedLinkFactories()
  const { register, setIsLoading, isLoading } = useProposerMethods()

  useEffect(() => {
    if (!confirmPassword) {
      return setPasswordValidationErr({ required: 'Password is required' })
    } else if (confirmPassword.length < 8) {
      return setPasswordValidationErr({ length: 'Your password must be 8 or more characters.' })
    } else {
      setPasswordValidationErr(undefined)
    }
  }, [confirmPassword])

  const handleGoNextStep = (keystoreObject: KeystoreT) => {
    setKeystoreObject(keystoreObject)
  }

  const handleApprove = async () => {
    try {
      const txResult = await register(keystoreObject!, confirmPassword)

      setTimeout(() => {
        setTxResult(txResult)
      }, 500)
    } catch (err: any) {
      console.log(err, err.message)
      setIsLoading(false)
      setTimeout(() => {
        if ('reason' in err) setError(err.reason[0].toUpperCase() + err.reason.substr(1))
        else setError(err.message)
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
          <Label>Proposer</Label>
        </div>
        <ValidatorRegisterCard
          active={step === 1}
          done={step === 2}
          stepNum={1}
          title="Register as a Proposer"
          tooltip="This wallet will collect the rewards earned from proposing blocks.">
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
          title="Register your validator key"
          tooltip="This will connect your validator's BLS key to the PoN Relay as a Proposer.">
          <UploadKeyStoreFile
            onUploaded={handleGoNextStep}
            onClear={() => setKeystoreObject(undefined)}
          />
          <div className="flex flex-col w-full gap-2">
            <TextInput
              label="Confirm your validator password"
              type="password"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordValidationErr?.required && (
              <span className={styles.inputErr}>{passwordValidationErr.required}</span>
            )}
            {passwordValidationErr?.length && (
              <span className={styles.inputErr}>{passwordValidationErr.length}</span>
            )}
          </div>
          <Button
            size="lg"
            disabled={!keystoreObject || !confirmPassword}
            className="w-full"
            onClick={handleApprove}>
            Approve Transaction
          </Button>
        </ValidatorRegisterCard>
      </Box>
      <Comment>
        By becoming a Proposer in the PoN Relay, you will earn ETH by outsourcing your blockspace.
      </Comment>
      <ModalProposerConfirm
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
const Comment = tw.div`bg-grey900 text-grey700 text-sm font-medium max-w-lg px-8 py-6 rounded-2xl`
