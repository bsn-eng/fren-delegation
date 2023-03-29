import './App.css'

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { Buffer } from 'buffer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { IntercomProvider } from 'react-use-intercom'
import { chain, configureChains, createClient, useNetwork, WagmiConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import SubApp from '@/components/app/App'
import { rpcUrls, supportedChains } from '@/constants/chains'

if (!window.Buffer) {
  window.Buffer = Buffer
}

const { chains, provider } = configureChains(
  [chain.goerli, chain.mainnet],
  [
    infuraProvider({ infuraId: '915a003951aa43ecb073a92a70e9e445' }),
    jsonRpcProvider({
      rpc: (chain) => {
        return { http: rpcUrls[chain.id] }
      }
    })
  ]
)

const client = createClient({
  autoConnect: true,
  connectors({ chainId }) {
    const currentChain = supportedChains.find((chain) => chain.id === chainId) ?? chain.goerli
    const rpcUrl = rpcUrls[currentChain.id]

    return [
      new InjectedConnector({ chains: supportedChains }),
      new WalletConnectConnector({
        chains: supportedChains,
        options: {
          qrcode: true,
          rpc: { [currentChain.id]: rpcUrl }
        }
      })
    ]
  },
  provider
})

function App() {
  return (
    <IntercomProvider appId="xg5qffph" apiBase="https://api-iam.intercom.io" autoBoot>
      <WagmiConfig client={client}>
        <SubApp />
      </WagmiConfig>
    </IntercomProvider>
  )
}

export default App
