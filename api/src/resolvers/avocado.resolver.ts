import { AuthenticationError } from 'apollo-server-express'
import type { PrismaClient, Avocado, Attributes, Prisma } from '@prisma/client'
import type { User } from '@prisma/client'

export type ResolverParent = unknown
export type ResolverContext = { orm: PrismaClient; user: User | undefined }

export async function findAll(
  parent: ResolverParent,
  args: { where?: Prisma.AvocadoWhereInput; skip?: number; take?: number },
  context: ResolverContext
): Promise<Avocado[]> {
  return context.orm.avocado.findMany({
    include: { attributes: true },
    where: args.where,
    skip: args.skip,
    take: args.take,
  })
}

export async function findOne(
  parent: ResolverParent,
  args: { id: string },
  context: ResolverContext
): Promise<Avocado | null> {
  return context.orm.avocado.findUnique({
    where: {
      id: parseInt(args.id, 10),
    },
    include: {
      attributes: true,
    },
  })
}

export const resolver: Record<
  keyof (Avocado & { attributes: Attributes }),
  (parent: Avocado & { attributes: Attributes }) => unknown
> = {
  id: (parent) => parent.id,
  createdAt: (parent) => parent.createdAt,
  deletedAt: (parent) => parent.deletedAt,
  updatedAt: (parent) => parent.updatedAt,
  sku: (parent) => parent.sku,
  name: (parent) => parent.name,
  price: (parent) => parent.price,
  image: (parent) => parent.image,
  attributes: (parent) => ({
    description: parent.attributes.description,
    shape: parent.attributes.shape,
    hardiness: parent.attributes.hardiness,
    taste: parent.attributes.taste,
  }),
}

export async function createAvo(
  parent: unknown,
  {
    data,
  }: {
    data: Pick<Avocado, 'name' | 'price' | 'image' | 'sku'> &
      Omit<Attributes, 'id'>
  },
  { orm, user }: ResolverContext
): Promise<Avocado> {
  if (user == undefined) {
    throw new AuthenticationError('Unauthenticated request')
  }

  const { name, image, price, sku, ...attributes } = data
  const avo = await orm.avocado.create({
    data: {
      name,
      price,
      image,
      sku,
      attributes: {
        create: attributes,
      },
    },
    include: { attributes: true },
  })

  return avo
}
