import gql from 'graphql-tag'

export const ProposersQuery = gql`
  query Proposers($account: String!) {
    proposers(where: { representative: $account }) {
      id
      activationBlock
      status
    }
  }
`
