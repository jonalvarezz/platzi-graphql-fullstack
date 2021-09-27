import { Avocado } from './avocado.model'

const avo: Avocado = {
  name: 'Pinkerton Avocado',
  id: 'fpr72m9k',
  sku: 'B4HZ42TM',
  price: 1.27,
  image: '/images/pinkerton.jpg',
  attributes: {
    description:
      "First grown on the Pinkerton Ranch in Saticoy, California, in the early 1970s, 'Pinkerton' is a seedling of 'Hass' x 'Rincon'. The large fruit has a small seed, and its green skin deepens in color as it ripens. The thick flesh has a smooth, creamy texture, pale green color, good flavor, and high oil content. It shows some cold tolerance, to −1 °C (30 °F) and bears consistently heavy crops. A hybrid Guatemalan type, it has excellent peeling characteristics",
    shape: 'Long pear',
    hardiness: '−1 °C',
    taste: 'Marvelous, is an avocado',
  },
}

export function findAll(): Avocado[] {
  return [avo]
}

export function findOne(id: string): Avocado | null {
  return avo
}

export const resolver: Record<keyof Avocado, (parent: Avocado) => unknown> = {
  id: (parent) => parent.id,
  name: (parent) => parent.name,
  sku: (parent) => parent.sku,
  price: (parent) => parent.price,
  image: (parent) => parent.image,
  attributes: (parent) => ({
    description: parent.attributes.description,
    shape: parent.attributes.shape,
    hardiness: parent.attributes.hardiness,
    taste: parent.attributes.taste,
  }),
}
