import './App.css'

import { ApolloProvider } from '@apollo/client'
import { Buffer } from 'buffer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { IntercomProvider } from 'react-use-intercom'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { infuraProvider } from 'wagmi/providers/infura'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import { LayoutDashboard } from '@/components/layouts'
import { rpcUrls, supportedChains } from '@/constants/chains'
import BlockswapSDKProvider from '@/context/BlockswapSDKContext'
import GraphqlProvider from '@/context/GraphqlContext'
import UserProvider from '@/context/UserContext'
import GraphqlClient from '@/graphql/client'
import { Stake, WalletConnect } from '@/views'

import MEVStaking from './components/app/Deposit/MEVStaking'
import ProtectedStaking from './components/app/Deposit/ProtectedStaking'

if (!window.Buffer) {
  window.Buffer = Buffer
}

const { chains, provider } = configureChains(
  [chain.goerli],
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
        <ApolloProvider client={GraphqlClient}>
          <BlockswapSDKProvider>
            <UserProvider>
              <GraphqlProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<LayoutDashboard />}>
                      <Route path="sign-in" element={<WalletConnect />} />
                      <Route index element={<Stake />} />
                      <Route path="protected-staking" element={<ProtectedStaking />} />
                      <Route path="mev-staking" element={<MEVStaking />} />
                    </Route>
                  </Routes>
                </Router>
              </GraphqlProvider>
            </UserProvider>
          </BlockswapSDKProvider>
        </ApolloProvider>
      </WagmiConfig>
    </IntercomProvider>
  )
}

export default App
