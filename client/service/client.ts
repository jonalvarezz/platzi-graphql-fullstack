import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { baseUrl } from './config'

const client = new ApolloClient({
  uri: `${baseUrl}/graphql`,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          avo: {
            read(_, { args, toReference }) {
              return toReference({
                __typename: 'Avocado',
                id: args?.id,
              })
            },
          },
        },
      },
    },
  }),
})

export default client
