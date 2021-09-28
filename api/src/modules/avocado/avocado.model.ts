import { BaseModel } from '../base/base.model'

export type Attributes = {
  description: string | null
  shape: string | null
  hardiness: string | null
  taste: string | null
}

export type Avocado = BaseModel & {
  id: string
  name: string
  sku: string
  price: number
  image: string
  attributes: Attributes
}
