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

import { MyRewards as ProposerRewards } from '@/components/app/Manage/Proposer/MyRewards'
import { MyRewards as ReporterRewards } from '@/components/app/Manage/Reporter/MyRewards'
import { LayoutDashboard } from '@/components/layouts'
import { rpcUrls, supportedChains } from '@/constants/chains'
import BlockswapSDKProvider from '@/context/BlockswapSDKContext'
import GraphqlProvider from '@/context/GraphqlContext'
import StakingStoreProvider from '@/context/StakingStoreContext'
import UserProvider from '@/context/UserContext'
import GraphqlClient from '@/graphql/client'
import { Manage, More, Register, RemoveWallet, WalletConnect } from '@/views'
import Activity from '@/views/Activity'

import { MyDeposit } from './components/app/Manage/Builder/MyDeposit'
import { TopUp } from './components/app/Manage/Builder/TopUp'
import { Withdraw } from './components/app/Manage/Builder/Withdraw'
import { AddKey } from './components/app/Manage/Proposer/AddKey'

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
              <StakingStoreProvider>
                <GraphqlProvider>
                  <Router>
                    <Routes>
                      <Route path="/" element={<LayoutDashboard />}>
                        <Route path="sign-in" element={<WalletConnect />} />
                        <Route index element={<Register />} />
                        <Route path="activity" element={<Activity />} />
                        <Route path="more" element={<More />} />
                        <Route path="more/remove-wallet/:mode" element={<RemoveWallet />} />
                        <Route path="manage/:activeMode" element={<Manage />} />
                        <Route path="manage/proposer/add" element={<AddKey />} />
                        <Route path="manage/reporter/my-rewards" element={<ReporterRewards />} />
                        <Route path="manage/proposer/my-rewards" element={<ProposerRewards />} />
                        <Route path="manage/top-up" element={<TopUp />} />
                        <Route path="manage/my-deposit" element={<MyDeposit />} />
                        <Route path="manage/builder/withdraw/:mode" element={<Withdraw />} />
                      </Route>
                    </Routes>
                  </Router>
                </GraphqlProvider>
              </StakingStoreProvider>
            </UserProvider>
          </BlockswapSDKProvider>
        </ApolloProvider>
      </WagmiConfig>
    </IntercomProvider>
  )
}

export default App
