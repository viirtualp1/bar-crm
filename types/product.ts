export type ProductType = 'Drink' | 'Snack' | 'Food'

export enum ProductEnum {
  DRINK = 'Drink',
  SNACK = 'Snack',
  FOOD = 'Food',
}

export interface ProductData {
  id: string
  name: string
  images: string[]
  description?: string
  discount?: number
  locations: number[]
  types: string[]
  inStock: boolean
}

export type DrinkData = ProductData & {
  type: ProductEnum.DRINK
  priceLittleSize: number
  priceBigSize: number
  density?: number
  strength?: number
}

export type SnackData = ProductData & {
  type: ProductEnum.SNACK
  price: number
}

export type FoodData = ProductData & {
  type: ProductEnum.FOOD
  price: number
}
