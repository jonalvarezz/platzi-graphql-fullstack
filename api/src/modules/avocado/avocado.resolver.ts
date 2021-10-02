import { createHash } from 'crypto'
import type { PrismaClient, Avocado, Attributes } from '@prisma/client'

type ResolverParent = unknown
type ResolverContext = { orm: PrismaClient }

export async function findAll(
  parent: ResolverParent,
  args: undefined,
  context: ResolverContext
): Promise<Avocado[]> {
  return context.orm.avocado.findMany({ include: { attributes: true } })
}

export async function findOne(
  parent: ResolverParent,
  args: { id: number },
  context: ResolverContext
): Promise<Avocado | null> {
  return context.orm.avocado.findUnique({
    where: args,
    include: {
      attributes: true,
    },
  })
}

type AvocadoInput = Pick<Avocado, 'name' | 'price' | 'image'> &
  Omit<Attributes, 'id'>

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
    data: AvocadoInput
  },
  { orm }: { orm: PrismaClient }
): Promise<Avocado> {
  const { name, image, price, ...attributes } = data

  const sku = createHash('sha256')
    .update(`${name}-${price}`, 'utf8')
    .digest('base64')
    .slice(-6)

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
  })

  return avo
}
