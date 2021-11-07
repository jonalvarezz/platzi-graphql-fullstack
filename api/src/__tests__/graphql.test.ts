import { PrismaClient, User, Avocado } from '@prisma/client'
import { mockDeep } from 'jest-mock-extended'
import { DeepMockProxy } from 'jest-mock-extended'
import { ResolverContext, findOne } from '../resolvers/avocado.resolver'

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

describe('findOne', () => {
  test('should return an Avo with attributes', async () => {
    mockContext.orm.avocado.findUnique.mockResolvedValue(mockAvocadoDB[0])

    const result = await findOne(undefined, { id: '0' }, context)
    expect(result).toEqual(mockAvocadoDB[0])
    expect(mockContext.orm.avocado.findUnique).toHaveBeenCalledTimes(1)
    expect(mockContext.orm.avocado.findUnique).toHaveBeenCalledWith({
      where: {
        id: 0,
      },
      include: {
        attributes: true,
      },
    })
  })
})
