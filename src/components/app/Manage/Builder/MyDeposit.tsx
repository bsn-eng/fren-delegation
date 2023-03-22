import { useQuery } from '@apollo/client'
import { formatEther } from 'ethers/lib/utils'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import tw, { styled } from 'twin.macro'
import { useAccount, useBlockNumber } from 'wagmi'

import ArrowLeftSVG from '@/assets/images/arrow-left.svg'
import { ReactComponent as ArrowTopRightIcon } from '@/assets/images/icon-arrow-top-right.svg'
import { ReactComponent as EthIcon } from '@/assets/images/icon-eth.svg'
import { Button, Spinner } from '@/components/shared'
import { DEPOSIT_STATUS } from '@/constants'
import { BuilderDepositsQuery } from '@/graphql/queries/BuilderQuery'
import { useBuilderMethods, useNetworkBasedLinkFactories } from '@/hooks'

type MyDepositProps = {}

type IBuilderDeposit = {
  amount: string
  block: string
  transactionHash: string
}

const StatusWrapper: FC<{ status: DEPOSIT_STATUS }> = ({ status }) => {
  const navigate = useNavigate()

  switch (status) {
    case DEPOSIT_STATUS.WITHDRAW_COMPLETE:
    case DEPOSIT_STATUS.BUILDER_SLASHED:
    case DEPOSIT_STATUS.DEPOSITED:
    case DEPOSIT_STATUS.NONE:
      return <>{status}</>
    case DEPOSIT_STATUS.WITHDRAW_REQUEST:
      return <span className="text-status-waiting">{status}</span>
    case DEPOSIT_STATUS.READY_TO_WITHDRAW:
      return (
        <Button size="lg" onClick={() => navigate('/manage/builder/withdraw/exitBuilder')}>
          {status}
        </Button>
      )
    default:
      return <></>
  }
}

export const MyDeposit: FC<MyDepositProps> = () => {
  const navigate = useNavigate()
  const [topUpRequired, setTopUpRequired] = useState<string>('0')
  const { makeEtherscanLink } = useNetworkBasedLinkFactories()
  const { data: currentBlock } = useBlockNumber()

  const { data: account } = useAccount()
  const { getTopUpRequired, getBuilder } = useBuilderMethods()
  const [status, setStatus] = useState<DEPOSIT_STATUS>(DEPOSIT_STATUS.NONE)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const userAddress = account?.address || ''

  const { loading: queryLoading, data: { builderDeposits } = {} } = useQuery(BuilderDepositsQuery, {
    variables: { account: userAddress.toLowerCase() },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    skip: !userAddress.length
  })

  useEffect(() => {
    const init = async () => {
      setIsLoading(true)
      const topup = await getTopUpRequired(userAddress)
      const { status, exitBlock } = await getBuilder(userAddress)

      let depositStatus: DEPOSIT_STATUS = DEPOSIT_STATUS.NONE

      switch (status) {
        case 1:
          depositStatus = DEPOSIT_STATUS.DEPOSITED
          break
        case 2:
          depositStatus =
            Number(exitBlock) <= (currentBlock || 0)
              ? DEPOSIT_STATUS.READY_TO_WITHDRAW
              : DEPOSIT_STATUS.WITHDRAW_REQUEST
          break
        case 3:
          depositStatus = DEPOSIT_STATUS.WITHDRAW_COMPLETE
          break
        case 4:
          depositStatus = DEPOSIT_STATUS.BUILDER_SLASHED
          break
      }

      setStatus(depositStatus)

      setTopUpRequired(topup)
      setIsLoading(false)
    }

    if (currentBlock && account?.address) init()
  }, [account?.address, currentBlock])

  const loading = isLoading || queryLoading

  return (
    <div className="flex justify-center items-center flex-col gap-2">
      <Box>
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <img
              src={ArrowLeftSVG}
              className="w-6 h-6 cursor-pointer"
              onClick={() => navigate('/manage/builder')}
            />
            <Title>My Deposit</Title>
          </div>
        </div>
        <div className="mb-2 mt-4 rounded-lg border border-innerBorder overflow-hidden">
          <table className="w-full table-auto border-collapse">
            <TableHead>
              <tr>
                <TableHeadCell>Block</TableHeadCell>
                <TableHeadCell>
                  <Label>Amount</Label>
                </TableHeadCell>
                <TableHeadCell>
                  <Label className="justify-center">Status</Label>
                </TableHeadCell>
                <TableHeadCell>
                  <Label className="justify-center">Tx</Label>
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
              {!loading && builderDeposits.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    <div className="text-center py-4 text-grey25 text-sm">No deposits found</div>
                  </td>
                </tr>
              )}
              {!loading &&
                builderDeposits.length > 0 &&
                builderDeposits.map((deposit: IBuilderDeposit, index: number) => (
                  <tr key={index} className="border-t text-grey25 border-innerBorder text-sm">
                    <TableCell className="text-center font-medium">{deposit.block}</TableCell>
                    <TableCell>{formatEther(deposit.amount)} ETH</TableCell>
                    <TableCell className="text-center">
                      {/* <Status status={deposit.status} /> */}
                      <StatusWrapper status={status} />
                    </TableCell>
                    <TableCell className="text-center flex justify-center items-center text-primary">
                      <a
                        href={makeEtherscanLink(deposit.transactionHash)}
                        target="_blank"
                        rel="noreferrer">
                        <ArrowTopRightIcon />
                      </a>
                    </TableCell>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Box>
      <InlineCTA onClick={() => navigate('/manage/top-up')}>
        <Label>
          <EthIcon />
          Add to your Deposit
        </Label>
        <div className="flex items-center  text-primary text-sm gap-2 cursor-pointer">
          Required: {topUpRequired} ETH <ArrowTopRightIcon />
        </div>
      </InlineCTA>
      <div
        onClick={() => navigate('/manage/builder/withdraw/positionBuilderForExit')}
        className=" w-full max-w-xl text-white flex justify-between items-center text-sm font-medium bg-grey900 rounded-2xl py-4 px-8 cursor-pointer bg-opacity-30">
        <Label>
          <EthIcon />
          Withdraw ETH and lose future rewards
        </Label>
        <ArrowTopRightIcon />
      </div>
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
