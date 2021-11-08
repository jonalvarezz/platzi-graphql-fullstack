import path from 'path'
import { readFileSync } from 'fs'
import { PrismaClient, User, Avocado } from '@prisma/client'
import { mockDeep } from 'jest-mock-extended'
import { DeepMockProxy } from 'jest-mock-extended'
import gql from 'graphql-tag'
import EasyGraphQLTester from 'easygraphql-tester'

import { ResolverContext } from '../resolvers/avocado.resolver'
import resolvers from '../resolvers'

const schema = readFileSync(path.join(__dirname, '../schema.graphql'), 'utf8')

const tester = new EasyGraphQLTester(schema, resolvers)

export type MockResolverContext = {
  orm: DeepMockProxy<PrismaClient>
  user: User | undefined
}
export const createMockContext = (): MockResolverContext => {
  return {
    orm: mockDeep<PrismaClient>(),
    user: undefined,
  }
}

let mockContext: MockResolverContext
let context: ResolverContext

beforeEach(() => {
  mockContext = createMockContext()
  context = mockContext as unknown as ResolverContext
})

const mockAvocadoDB: Avocado[] = [
  {
    id: 1,
    image: '/images/reed.jpg',
    name: 'Reed Avocado',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    sku: 'ZDIRg=',
    price: 1.18,
  },
]

test('should return a list of avos', async () => {
  mockContext.orm.avocado.findMany.mockResolvedValue(mockAvocadoDB)

  const query = gql`
    {
      avos {
        id
        name
        price
      }
    }
  `

  const result = await tester.graphql(query, undefined, context)
  expect(mockContext.orm.avocado.findMany).toHaveBeenCalledTimes(1)
  expect(result.data).toEqual({
    avos: [
      {
        id: '1',
        name: 'Reed Avocado',
        price: 1.18,
      },
    ],
  })
  expect(mockContext.orm.avocado.findMany).toHaveBeenCalledWith({
    include: { attributes: true },
    where: undefined,
    take: undefined,
    skip: undefined,
  })
})

test('should filter a list of avos', async () => {
  mockContext.orm.avocado.findMany.mockResolvedValue([])

  const query = gql`
    {
      avos(where: { name: { contains: "Hass" } }, skip: 1) {
        id
      }
    }
  `

  const result = await tester.graphql(query, undefined, context)
  expect(result.data).toEqual({
    avos: [],
  })
  expect(mockContext.orm.avocado.findMany).toHaveBeenCalledTimes(1)
  expect(mockContext.orm.avocado.findMany).toHaveBeenCalledWith({
    include: { attributes: true },
    where: { name: { contains: 'Hass' } },
    take: undefined,
    skip: 1,
  })
})
