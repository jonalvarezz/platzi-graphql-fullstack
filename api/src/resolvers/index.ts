import type { Avocado } from '@prisma/client'
import * as avo from './avocado.resolver'
import * as scalars from './scalars'

export default {
  ...scalars,
  BaseModel: {
    __resolveType: (parent: Avocado) => {
      if (parent.name) {
        return 'Avocado'
      }
      return null // No more implementations
    },
  },
  Query: {
    avo: avo.findOne,
    avos: avo.findAll,
  },
  Mutation: {
    createAvo: avo.createAvo,
  },
  Avocado: avo.resolver,
}
