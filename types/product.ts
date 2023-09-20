export type ProductType = 'Drink' | 'Snack'

export enum ProductEnum {
  DRINK = 'Drink',
  SNACK = 'Snack',
}

export interface ProductData {
  id: string
  name: string
  images: string[]
  description?: string
  discount?: number
  location: number[]
  types: string[]
  inStock: boolean
}

export type DrinkData = ProductData & {
  type: ProductEnum.DRINK
  priceLittleSize: number
  priceBigSize: number
  density?: number
  strength?: number
  isFiltered: boolean
}

export type SnackData = ProductData & {
  type: ProductEnum.SNACK
  price: number
}
