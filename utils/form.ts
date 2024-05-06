import type { ProductData } from '@/types/product'
import { uuidv4 } from '@firebase/util'

export function getPureFormData(): ProductData {
  return {
    id: uuidv4(),
    name: '',
    images: [],
    description: '',
    discount: 0,
    locations: [],
    types: [],
    inStock: true,
    price: {
      default: null,
    },
  }
}
