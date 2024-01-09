import gql from 'graphql-tag'

export const ValidatorQuery = gql`
  query Validator($blsKey: String!) {
    lsdvalidators(
      where: { id: $blsKey, status: "WAITING_FOR_ETH", totalETHFundedFromGiantPool: "0" }
    ) {
      id
      liquidStakingManager
      status
      totalETHFundedFromGiantPool
      smartWallet {
        nodeRunner {
          id
          name
        }
        liquidStakingNetwork {
          ticker
          savETHPool
          feesAndMevPool
        }
      }
    }
    lptokens(where: { blsPublicKey: $blsKey }) {
      tokenType
      minted
    }
  }
`

export const ProposersQuery = gql`
  query Proposers {
    proposers(first: 1000) {
      id
    }
  }
`

export const LsdValidatorsQuery = gql`
  query lsdValidators {
    lsdvalidators(where: { status: "WAITING_FOR_ETH", totalETHFundedFromGiantPool: "0" }) {
      id
      smartWallet {
        liquidStakingNetwork {
          ticker
          commission
        }
      }
    }
  }
`
