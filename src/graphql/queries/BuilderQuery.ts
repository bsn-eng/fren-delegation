import gql from 'graphql-tag'

export const BuilderDepositsQuery = gql`
  query Deposits($account: String!) {
    builderDeposits(where: { builder: $account }) {
      amount
      block
      transactionHash
    }
  }
`
export const BuilderReportsQuery = gql`
  query Reports($account: String!) {
    reports(first: 10, where: { builder: $account }) {
      id
      reporter
      builder
      blsKey
      slot
      faultType
    }
  }
`
