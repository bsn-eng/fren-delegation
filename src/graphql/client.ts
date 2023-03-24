import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

import { config } from '@/constants/environment'

const client = new ApolloClient({
  link: new HttpLink({ uri: config.LSD_GRAPHQL_URL }),
  cache: new InMemoryCache()
})

export default client
