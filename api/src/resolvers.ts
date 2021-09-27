import * as avo from './modules/avocado/avocado.resolver'

export default {
  Query: {
    avo: avo.findOne,
    avos: avo.findAll,
  },
  Avocado: avo.resolver,
}
