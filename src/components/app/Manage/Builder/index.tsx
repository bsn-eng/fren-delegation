import { useQuery } from '@apollo/client'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import tw, { styled } from 'twin.macro'
import { useAccount } from 'wagmi'

import ArrowLeftSVG from '@/assets/images/arrow-left.svg'
import { ReactComponent as ArrowTopRightIcon } from '@/assets/images/icon-arrow-top-right.svg'
import { ReactComponent as EthIcon } from '@/assets/images/icon-eth.svg'
import { ReactComponent as ListCheckIcon } from '@/assets/images/icon-list-check.svg'
import { ClipboardCopy, Spinner } from '@/components/shared'
import { BuilderReportsQuery } from '@/graphql/queries/BuilderQuery'
import { useBuilderMethods, useSDK } from '@/hooks'
import { humanReadableAddress } from '@/utils/global'

type BuilderProps = {
  handleGoBack: () => void
}

export const Builder: FC<BuilderProps> = ({ handleGoBack }) => {
  const navigate = useNavigate()
  const { ponSdk: sdk } = useSDK()

  const [stakedBalance, setStakedBalance] = useState<string>('0')
  const [topUpRequired, setTopUpRequired] = useState<string>('0')
  const { data: account } = useAccount()

  const { getBuilder, getTopUpRequired } = useBuilderMethods()

  const userAddress = account?.address || ''

  const { loading, data: { reports } = {} } = useQuery(BuilderReportsQuery, {
    variables: { account: userAddress.toLowerCase() },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    skip: !userAddress.length
  })

  useEffect(() => {
    const init = async () => {
      const { staked: balance } = await getBuilder(account?.address || '')
      const topup = await getTopUpRequired(account?.address || '')
      setTopUpRequired(topup)
      setStakedBalance(balance)
    }

    if (account?.address && sdk) init()
  }, [account?.address, sdk])

  return (
    <div className="flex justify-center items-center flex-col gap-2">
      <Box>
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <img src={ArrowLeftSVG} className="w-6 h-6 cursor-pointer" onClick={handleGoBack} />
            <Title>Builder Dashboard</Title>
          </div>
        </div>
        <div className="w-full px-8 py-4 rounded-2xl bg-grey900 flex justify-between">
          <div className="flex items-center gap-2 text-white text-sm font-medium">
            <EthIcon />
            Top Up
          </div>
          <div
            className="text-primary flex items-center text-sm gap-2 cursor-pointer font-medium"
            onClick={() => navigate('/manage/top-up')}>
            Required: {topUpRequired} ETH <ArrowTopRightIcon />
          </div>
        </div>
        <div className="mb-2 rounded-lg border border-innerBorder overflow-hidden">
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
                  <Label className="justify-center">SLOT Request</Label>
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
              {!loading && reports.length === 0 && (
                <tr>
                  <td colSpan={4}>
                    <div className="text-center py-4 text-grey25 text-sm">No reports found</div>
                  </td>
                </tr>
              )}
              {!loading &&
                reports.length > 0 &&
                reports.map((report: any, index: number) => (
                  <tr
                    key={index}
                    className="border-t text-grey25 border-innerBorder text-sm font-medium">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <ClipboardCopy copyText={report.blsKey}>
                        {humanReadableAddress(report.blsKey, 9)}
                      </ClipboardCopy>
                    </TableCell>
                    <TableCell
                      className={`text-center ${
                        report.faultType == 1 ? 'text-grey700' : 'text-grey25'
                      }`}>
                      {report.faultType == 1 ? 'Failed' : 'Success'}
                    </TableCell>
                    <TableCell className="text-center flex justify-center items-center ">
                      {report.slot}
                    </TableCell>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Box>
      <InlineCTA onClick={() => navigate('/manage/my-deposit')}>
        <div className="flex items-center gap-2 text-white text-sm font-medium">
          <EthIcon />
          My Deposit
        </div>
        <div className="flex items-center text-grey700 text-sm gap-2 cursor-pointer">
          {stakedBalance} ETH <ArrowTopRightIcon />
        </div>
      </InlineCTA>
      <InlineCTA onClick={() => navigate('/activity')}>
        <Label>
          <ListCheckIcon />
          Check your Activity and Txs
        </Label>
        <ArrowTopRightIcon />
      </InlineCTA>
      <InlineCTA isRemove onClick={() => navigate('/more/remove-wallet/builder')}>
        <Label>
          <ListCheckIcon />
          Remove Wallet from PoN Relay
        </Label>
        <ArrowTopRightIcon />
      </InlineCTA>
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

const InlineCTA = styled.div<{ isRemove?: boolean }>`
  ${tw`w-full max-w-xl text-white flex justify-between items-center text-sm font-medium bg-[#202024] rounded-2xl py-4 px-8 cursor-pointer`}
  ${(props) => props.isRemove && tw`text-grey700 bg-opacity-30`}
`

const Label = tw.span`flex items-center gap-2`

const TableHead = tw.thead`text-xs font-medium text-grey300 bg-[#20202480]`
const TableHeadCell = tw.th`px-6 py-3 font-medium`
const TableCell = tw.td`px-6 content-center h-16`
