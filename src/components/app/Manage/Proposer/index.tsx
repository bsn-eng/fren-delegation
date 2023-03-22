import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import tw, { styled } from 'twin.macro'

import ArrowLeftSVG from '@/assets/images/arrow-left.svg'
import { ReactComponent as ArrowTopRightIcon } from '@/assets/images/icon-arrow-top-right.svg'
import { ReactComponent as CutIcon } from '@/assets/images/icon-cut.svg'
import { ReactComponent as EthIcon } from '@/assets/images/icon-eth.svg'
import { ReactComponent as KeyIcon } from '@/assets/images/icon-key.svg'
import { ReactComponent as ListCheckIcon } from '@/assets/images/icon-list-check.svg'
import { ReactComponent as ActionIcon } from '@/assets/images/icon-vertical-dot-three.svg'
import ModalBLSKeyRemove from '@/components/app/Modals/ModalBLSKeyRemove'
import {
  ClipboardCopy,
  CompletedTxView,
  ErrorModal,
  LoadingModal,
  ModalDialog,
  Spinner
} from '@/components/shared'
import { useNetworkBasedLinkFactories, useProposerMethods, useProposerValidators } from '@/hooks'
import { IProposer } from '@/types'
import { humanReadableAddress } from '@/utils/global'

type ProposerProps = {
  handleGoBack: () => void
}

const ActionButton: FC<{ handleRemove: () => void; disabled: boolean }> = ({
  handleRemove,
  disabled
}) => {
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}>
      <ActionIcon className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`} />
      {visible && !disabled && (
        <div
          onClick={handleRemove}
          className="flex gap-1 justify-center py-2 items-center absolute -left-20 w-44 text-sm bg-black border text-grey100 border-grey500 border-solid rounded-lg cursor-pointer">
          <CutIcon />
          Remove from PoN
        </div>
      )}
    </div>
  )
}

export const Proposer: FC<ProposerProps> = ({ handleGoBack }) => {
  const navigate = useNavigate()
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false)

  const [failed, setFailed] = useState(false)
  const [error, setError] = useState<string>()
  const [txResult, setTxResult] = useState<any>()
  const { makeEtherscanLink } = useNetworkBasedLinkFactories()
  const [blsKey, setBlsKey] = useState<string>('')

  const { proposers, loading } = useProposerValidators()
  const { rewardBalance, setIsLoading, isLoading, rageQuit } = useProposerMethods()

  const handleRemove = (blskey: string) => {
    setShowRemoveModal(true)
    setBlsKey(blskey)
  }

  const handleContinueRemove = async () => {
    setShowRemoveModal(false)

    try {
      const txResult = await rageQuit(blsKey)

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
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <img src={ArrowLeftSVG} className="w-6 h-6 cursor-pointer" onClick={handleGoBack} />
            <Title>Proposer Dashboard</Title>
          </div>
        </div>
        <div
          onClick={() => navigate('/manage/proposer/add')}
          className="w-full mt-4 px-8 py-3 rounded-lg text-sm font-medium text-primary500 bg-grey900 border border-solid border-innerBorder flex justify-between cursor-pointer">
          <Label>
            <KeyIcon />
            Register new validator key
          </Label>
          <span className="text-2xl font-normal">+</span>
        </div>
        <div className="mb-2 rounded-lg border border-innerBorder overflow-visible">
          <table className="w-full table-auto border-collapse">
            <TableHead>
              <tr>
                <TableHeadCell>#</TableHeadCell>
                <TableHeadCell>
                  <Label>Validator Address</Label>
                </TableHeadCell>
                <TableHeadCell>
                  <Label className="justify-center">Status</Label>
                </TableHeadCell>
                <TableHeadCell>
                  <Label className="justify-center">Actions</Label>
                </TableHeadCell>
              </tr>
            </TableHead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={4}>
                    <div className="w-full flex items-center justify-center py-10">
                      <Spinner size={30} />
                    </div>
                  </td>
                </tr>
              )}
              {!loading &&
                proposers.map((validator: IProposer, index: number) => (
                  <tr
                    key={index}
                    className={`border-t ${
                      validator.status === 'Removed' ? 'text-grey700' : 'text-grey25'
                    } border-innerBorder text-sm font-medium`}>
                    <TableCell>{index}</TableCell>
                    <TableCell>
                      <ClipboardCopy copyText={validator.id}>
                        {humanReadableAddress(validator.id, 9)}
                      </ClipboardCopy>
                    </TableCell>
                    <TableCell className="text-center">{validator.status}</TableCell>
                    <TableCell className="text-center flex justify-center items-center">
                      <ActionButton
                        handleRemove={() => handleRemove(validator.id)}
                        disabled={validator.status === 'Removed'}
                      />
                    </TableCell>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Box>
      <InlineCTA onClick={() => navigate('/manage/proposer/my-rewards')}>
        <div className="flex items-center gap-2 text-white text-sm font-medium">
          <EthIcon />
          My Rewards
        </div>
        <div className="text-primary flex items-center text-sm gap-2 cursor-pointer">
          {rewardBalance} ETH <ArrowTopRightIcon />
        </div>
      </InlineCTA>
      <InlineCTA onClick={() => navigate('/activity')}>
        <Label>
          <ListCheckIcon />
          Check your Activity and Txs
        </Label>
        <ArrowTopRightIcon />
      </InlineCTA>
      <ModalBLSKeyRemove
        open={showRemoveModal}
        onConfirm={handleContinueRemove}
        onClose={() => setShowRemoveModal(false)}
      />

      <LoadingModal open={isLoading} title="Confirmation Pending" onClose={() => {}} />
      <ErrorModal
        open={failed}
        onClose={() => setFailed(false)}
        title="Remove Failed"
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
  ${tw`w-full bg-grey850 mt-10 max-w-xl p-4 rounded-2xl flex flex-col gap-4`}
`
const Title = styled.div`
  ${tw`text-white font-semibold text-center w-full`}
  font-size: 32px;
`

const InlineCTA = tw.div`w-full max-w-xl text-white flex justify-between items-center text-sm font-medium bg-[#202024] rounded-2xl py-4 px-8 cursor-pointer`
const Label = tw.span`flex items-center gap-2`

const TableHead = tw.thead`text-xs font-medium text-grey300 bg-[#20202480]`
const TableHeadCell = tw.th`px-6 py-3 font-medium`
const TableCell = tw.td`px-6 content-center h-16`
