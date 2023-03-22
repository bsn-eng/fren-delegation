import { useQuery } from '@apollo/client'
import { useMemo } from 'react'
import { useAccount, useBlockNumber } from 'wagmi'

import { ProposersQuery } from '@/graphql/queries/ProposerQuery'

import { IProposer } from '../types'

const PROPOSER_STATUS: Record<number, string> = {
  0: '',
  1: 'Activation Pending',
  2: 'Bls Key Added',
  3: 'Exit Pending',
  4: 'Removed',
  5: 'Kicked',
  6: 'Activation Ready'
}

export const useProposerValidators = () => {
  const { data: account } = useAccount()
  const { data: currentBlock } = useBlockNumber()

  const address = account?.address || ''

  const { loading, data: { proposers } = {} } = useQuery(ProposersQuery, {
    variables: { account: address.toLowerCase() },
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    skip: !address.length
  })

  // const proposers = [
  //   {
  //     id: '0x4b662A900Bb72610A0062e5BA98a62846Ab609ca',
  //     status: 2,
  //     activationBlock: '3342352'
  //   },
  //   {
  //     id: '0x4b662A900Bb72610A0062e5BA98a62846Ab609ca',
  //     status: 5,
  //     activationBlock: '3342352'
  //   },
  //   {
  //     id: '0x4b662A900Bb72610A0062e5BA98a62846Ab609ca',
  //     status: 4,
  //     activationBlock: '3342352'
  //   },
  //   {
  //     id: '0x4b662A900Bb72610A0062e5BA98a62846Ab609ca',
  //     status: 0,
  //     activationBlock: '3342352'
  //   },
  //   {
  //     id: '0x4b662A900Bb72610A0062e5BA98a62846Ab609ca',
  //     status: 1,
  //     activationBlock: '33423532'
  //   },
  //   {
  //     id: '0x4b662A900Bb72610A0062e5BA98a62846Ab609ca',
  //     status: 1,
  //     activationBlock: '8491985'
  //   }
  // ]
  // const loading = false

  const blsKeys = useMemo(
    () => (proposers ? proposers.map((proposer: any) => proposer.id) : []),
    [proposers]
  )

  const formattedProposers: IProposer[] = useMemo(
    () =>
      currentBlock && proposers
        ? proposers.map((proposer: any) => {
            const status =
              Number(proposer.status) === 1
                ? Number(proposer.activationBlock) <= currentBlock
                  ? 6
                  : 1
                : proposer.status

            return {
              ...proposer,
              status: PROPOSER_STATUS[status]
            }
          })
        : [],
    [proposers, currentBlock]
  )

  return {
    proposers: formattedProposers,
    isRegistered: proposers && proposers.length > 0,
    blsKeys,
    loading
  }
}
