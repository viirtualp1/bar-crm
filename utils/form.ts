import { uuidv4 } from '@firebase/util'
import type { PriceData } from '@/types/product'
import type { DrinkType, LocationData } from '@/utils/drink'

interface FormData {
  id: string
  name: string
  price: PriceData
  locations: LocationData[]
  images: string[]
  discount: number
  description: string | null
  density: number
  strength: number
  types: DrinkType[]
  inStock: boolean
}

export function getPureFormData(): FormData {
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
    density: 0,
    strength: 0,
  }
}
