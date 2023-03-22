import './index.scss'

import { useQuery } from '@apollo/client'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import tw, { styled } from 'twin.macro'
import { useAccount } from 'wagmi'

import ArrowLeftSVG from '@/assets/images/arrow-left.svg'
import { Spinner, Tooltip } from '@/components/shared'
import { ActivityQuery } from '@/graphql/queries/ActivityQuery'
import { useNetworkBasedLinkFactories } from '@/hooks'

import Description from './Description'

const Activity: FC = () => {
  const navigate = useNavigate()
  const { data: account } = useAccount()

  const userAddress = account?.address || ''

  const handleBack = () => {
    navigate(-1)
  }
  const {
    loading,
    data: { events: transactions } = {},
    refetch
  } = useQuery(ActivityQuery, {
    variables: { account: userAddress.toLowerCase() },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true
  })

  const blsKeyToTxHashes: any = {}

  // const filteredEvents = transactions
  //   ? transactions
  //       .map((event: any) => {
  //         if (!blsKeyToTxHashes[event.blsPubKeyForKnot]) {
  //           blsKeyToTxHashes[event.blsPubKeyForKnot] = {}
  //         }

  //         if (event.key === 'INITIALS_REGISTERED') {
  //           blsKeyToTxHashes[event.blsPubKeyForKnot]['INITIALS_REGISTERED'] = event.id
  //         } else if (event.key === 'DEPOSIT_REGISTERED') {
  //           blsKeyToTxHashes[event.blsPubKeyForKnot]['DEPOSIT_REGISTERED'] = event.id
  //         }

  //         return event
  //       })
  //       .filter((event: any) => event.key !== 'DEPOSIT_REGISTERED')
  //   : []

  return (
    <div className="activity">
      <div className="content">
        <div className="content__box">
          <div className="content__box__title">
            <img src={ArrowLeftSVG} className="icon-left-arrow" onClick={handleBack} />
            My Activity
          </div>
          <div className="w-full rounded-lg border-innerBorder border">
            <HeaderRow>
              <HeaderItem
                className="border-r-2 border-opacity-50 border-innerBorder"
                isBlockCell={true}>
                <Label className="justify-center">
                  Block <Tooltip message="Block where the transaction took place." />
                </Label>
              </HeaderItem>
              <HeaderItem className="flex-grow">
                <Label>
                  Description <Tooltip message="Description of the transaction." />
                </Label>
              </HeaderItem>
            </HeaderRow>
            {loading && (
              <div className="w-full flex items-center justify-center py-20">
                <Spinner size={30} />
              </div>
            )}
            {!loading && transactions.length === 0 && (
              <div className="text-center py-4">No activity found</div>
            )}
            {!loading &&
              transactions.length > 0 &&
              transactions.map((activity: any) => (
                <Row key={activity.id}>
                  <ColItem className="font-medium" isBlockCell={true}>
                    {activity.blockNumber}
                  </ColItem>
                  <ColItem className="flex-grow">
                    <Description activity={activity} blsKeyToTxHashes={blsKeyToTxHashes} />
                  </ColItem>
                </Row>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Label = tw.span`flex items-center gap-1`

const ColItem = styled.div<{ isBlockCell?: boolean }>`
  ${tw`p-5 border-t border-innerBorder`}
  ${(props) => props.isBlockCell && tw`w-[101px] text-center`}
`
const Row = tw.div`w-full flex gap-0.5 text-sm`

const HeaderItem = styled.div<{ isBlockCell?: boolean }>`
  ${tw`py-3 font-medium text-xs px-5`}
  ${(props) => props.isBlockCell && tw`w-[103px]`}
`
const HeaderRow = tw.div`w-full flex bg-[#202024] rounded-t-lg`

export default Activity
