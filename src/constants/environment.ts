import { chain } from 'wagmi'

const envConfigs = {
  [chain.mainnet.id]: {
    networkId: chain.mainnet.id,
    dethTokenAddress: process.env.REACT_APP_MAINNET_DETH_TOKEN_ADDRESS,
    GRAPHQL_URL: process.env.REACT_APP_MAINNET_URL,
    LSD_GRAPHQL_URL: process.env.REACT_APP_LSD_GRAPHQL_URL,
    WITHDRAWAL_CREDENTIALS: process.env.REACT_APP_MAINNET_WITHDRAWAL_CREDENTIALS
  },
  [chain.ropsten.id]: {
    networkId: chain.ropsten.id,
    dethTokenAddress: process.env.REACT_APP_ROPSTEN_DETH_TOKEN_ADDRESS,
    GRAPHQL_URL: process.env.REACT_APP_ROPSTEN_GRAPHQL_URL,
    LSD_GRAPHQL_URL: process.env.REACT_APP_LSD_GRAPHQL_URL,
    WITHDRAWAL_CREDENTIALS: process.env.REACT_APP_MAINNET_WITHDRAWAL_CREDENTIALS
  },
  [chain.goerli.id]: {
    networkId: chain.goerli.id,
    dethTokenAddress: process.env.REACT_APP_GOERLI_DETH_TOKEN_ADDRESS,
    GRAPHQL_URL: process.env.REACT_APP_GRAPHQL_URL,
    LSD_GRAPHQL_URL: process.env.REACT_APP_LSD_GRAPHQL_URL,
    WITHDRAWAL_CREDENTIALS: process.env.REACT_APP_GOERLI_WITHDRAWAL_CREDENTIALS
  }
}

export const config = envConfigs[Number(chain.goerli.id)]
