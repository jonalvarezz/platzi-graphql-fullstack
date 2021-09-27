export type Attributes = {
  description: string | null
  shape: string | null
  hardiness: string | null
  taste: string | null
}

export type Avocado = {
  id: string
  name: string
  sku: string
  price: number
  image: string
  attributes: Attributes
}
