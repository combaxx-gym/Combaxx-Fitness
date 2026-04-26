import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { category } from './category'
import { subCategory } from './subCategory'
import { inquiry } from './inquiry'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, subCategory, inquiry],
}
