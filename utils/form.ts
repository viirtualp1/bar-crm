import { uuidv4 } from '@firebase/util'
import type { DrinkData, ProductData } from '@/types/product'

export function getPureFormData(): ProductData {
  return {
    id: uuidv4(),
    name: '',
    images: [],
    description: '',
    discount: {
      value: 0,
      selector: null,
    },
    locations: [],
    types: [],
    inStock: true,
    price: {
      default: null,
    },
  }
}

export function getDrinkFormData(): DrinkData {
  return {
    ...getPureFormData(),
    strength: 0,
    density: 0,
  }
}
