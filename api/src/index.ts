import { ApolloServer } from 'apollo-server'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'fs'
import resolvers from './resolvers'

const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')
const orm = new PrismaClient()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    orm,
  },
})

server.listen().then(({ url }) => console.log(`Server is running on ${url}`))
