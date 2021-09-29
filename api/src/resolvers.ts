import * as avo from './modules/avocado/avocado.resolver'
import * as scalars from './modules/base/scalars.model'

export default {
  ...scalars,
  Query: {
    avo: avo.findOne,
    avos: avo.findAll,
  },
  Mutation: {
    createAvo: avo.createAvo,
  },
  Avocado: avo.resolver,
}
