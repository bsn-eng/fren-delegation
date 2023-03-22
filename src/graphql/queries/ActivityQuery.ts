import gql from 'graphql-tag'

export const ActivityQuery = gql`
  query Activity($account: String!) {
    events(where: { from: $account }) {
      id
      blockNumber
      blockTimestamp
      key
      value
    }
  }
`
