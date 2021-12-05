import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { retrieveToken } from '@service/auth'
import { baseUrl } from './config'

const apiLink = createHttpLink({
  uri: `${baseUrl}/graphql`,
})

const authLink = setContext(async (_, { headers }) => {
  let extraHeader: Record<string, string> = {}

  if (typeof window !== 'undefined') {
    const token = await retrieveToken()
    extraHeader = {
      Authorization: `Bearer ${token}`,
    }
  }

  return {
    headers: {
      ...headers,
      ...extraHeader,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(apiLink),
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
