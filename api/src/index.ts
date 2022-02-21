import { ApolloServer } from 'apollo-server'
// 1 query
const typeDefs = `
    type Query {
        info: String!
    }
`
// 2 resolvers
const resolvers = {
    Query: {
        info: () => `This is the API of Platzi Node GraphQL`
    }
}
// 3 start server
const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => console.log(`Server is Runing on ${url}` ))