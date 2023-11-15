import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { chain, useNetwork } from 'wagmi'

import MEVStaking from '@/components/app/Deposit/MEVStaking'
import ProtectedStaking from '@/components/app/Deposit/ProtectedStaking'
import { LayoutDashboard } from '@/components/layouts'
import { envConfigs } from '@/constants/environment'
import BlockswapSDKProvider from '@/context/BlockswapSDKContext'
import GraphqlProvider from '@/context/GraphqlContext'
import UserProvider from '@/context/UserContext'
import { Stake, ValidatorList, WalletConnect } from '@/views'

export default function App() {
  const { activeChain } = useNetwork()

  const GraphqlClient = new ApolloClient({
    link: new HttpLink({ uri: envConfigs[activeChain?.id ?? chain.goerli.id].LSD_GRAPHQL_URL }),
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={GraphqlClient}>
      <BlockswapSDKProvider>
        <UserProvider>
          <GraphqlProvider>
            <Router>
              <Routes>
                <Route path="/" element={<LayoutDashboard />}>
                  <Route path="sign-in" element={<WalletConnect />} />
                  <Route index element={<Stake />} />
                  <Route path="list" element={<ValidatorList />} />
                  <Route path="validator/:id" element={<Stake />} />
                  <Route path="protected-staking" element={<ProtectedStaking />} />
                  <Route path="mev-staking" element={<MEVStaking />} />
                </Route>
              </Routes>
            </Router>
          </GraphqlProvider>
        </UserProvider>
      </BlockswapSDKProvider>
    </ApolloProvider>
  )
}
