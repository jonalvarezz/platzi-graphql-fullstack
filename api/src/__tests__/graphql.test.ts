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

test('should return a single avo', async () => {
  mockContext.orm.avocado.findUnique.mockResolvedValue(mockAvocadoDB[0])

  const query = gql`
    {
      avo(id: 1) {
        id
        name
      }
    }
  `

  const result = await tester.graphql(query, undefined, context)
  expect(result.data).toEqual({
    avo: {
      id: '1',
      name: 'Reed Avocado',
    },
  })
  expect(mockContext.orm.avocado.findUnique).toHaveBeenCalledTimes(1)
  expect(mockContext.orm.avocado.findUnique).toHaveBeenCalledWith({
    include: { attributes: true },
    where: { id: 1 },
  })
})

describe('mutation: createAvo', () => {
  const createAvoData = {
    data: {
      name: 'Lamb Hass Avocado',
      sku: 'N55229ZA',
      price: 1.34,
      image: '/images/lamb.jpg',
      description:
        'The Lamb Hass avocado is a cross between a Hass and Gwen avocado. The fruits are larger in size and later maturing than Hass. It is gaining in popularity as a commercial and backyard variety due to its exceptional flavor and easy peeling qualities. The tree has an upright, compact habit.',
      shape: 'Obovate',
      hardiness: '-2 °C',
      taste: 'Great, is an avocado',
    },
  }

  test('should fail if input data is incomplete', async () => {
    const query = gql`
      mutation AddAvo($data: AvoCreateInput!) {
        createAvo(data: $data) {
          id
          name
        }
      }
    `
    const result = await tester.graphql(query, undefined, context, {
      data: { name: 'Incomplete' },
    })

    expect(result).not.toHaveProperty('data')
    expect(result).toHaveProperty(['errors', 0, 'message'])
    expect(result.errors[0].message).toContain(
      'Field "price" of required type "Float!" was not provided' // second field missing
    )
  })

  test('should fail if not authenticated', async () => {
    const query = gql`
      mutation AddAvo($data: AvoCreateInput!) {
        createAvo(data: $data) {
          id
          name
        }
      }
    `
    const result = await tester.graphql(
      query,
      undefined,
      { ...context, user: undefined },
      createAvoData
    )
    expect(result.data).toBeNull()
    expect(result).toHaveProperty(['errors', 0, 'message'])
    expect(result.errors[0].message).toContain('Unauthenticated request')
  })

  test('should work if input data is complete and user is authenticated', async () => {
    mockContext.orm.avocado.create.mockResolvedValue({
      ...mockAvocadoDB[0],
      id: 3,
      name: createAvoData.data.name,
      sku: createAvoData.data.sku,
    })

    const query = gql`
      mutation AddAvo($data: AvoCreateInput!) {
        createAvo(data: $data) {
          id
          name
        }
      }
    `
    const result = await tester.graphql(
      query,
      undefined,
      { ...context, user: { id: 1, username: 'jonalvarezz' } },
      createAvoData
    )

    expect(result).not.toHaveProperty('errors')
    expect(result).toHaveProperty('data')
    expect(result).toEqual({
      data: {
        createAvo: {
          id: '3',
          name: 'Lamb Hass Avocado',
        },
      },
    })
  })
})
