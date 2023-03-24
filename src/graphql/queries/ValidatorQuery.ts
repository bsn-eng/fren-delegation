import gql from 'graphql-tag'

export const ValidatorQuery = gql`
  query Validator($blsKey: String!) {
    lsdvalidator(id: $blsKey) {
      id
      liquidStakingManager
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
