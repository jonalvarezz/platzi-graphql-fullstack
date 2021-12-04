import Image from 'next/image'
import { Item, Label } from 'semantic-ui-react'

import { getImgUrl } from '@service/assets'
import type { AvocadoFragment } from '@service/graphql'
import AddToCart from './AddToCart'
import ProductAttributes from './ProductAttributes'

type ProductSummaryProps = {
  product: AvocadoFragment
}

const ProductSummary = ({ product }: ProductSummaryProps) => (
  <>
    <Item.Group as="section">
      <Item style={{ alignItems: 'center' }}>
        <Item.Image size="medium">
          <Image
            src={getImgUrl(product.image)}
            width={333}
            height={333}
            alt={product.name}
          />
        </Item.Image>
        <Item.Content>
          <Item.Header as="h1">{product.name}</Item.Header>
          <Item.Description>
            <p>{product.price}</p>
            <Label>{`SKU: ${product.sku}`}</Label>
          </Item.Description>
          <Item.Extra>
            <AddToCart product={product} />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
    <ProductAttributes {...product.attributes} />
  </>
)

export default ProductSummary
