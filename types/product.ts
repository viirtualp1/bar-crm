export type ProductType =
  | 'Drink'
  | 'Snack'
  | 'Food'
  | 'Discount'
  | 'Services'
  | 'Boules'
  | 'Bottle'

export enum ProductEnum {
  DRINK = 'Drink',
  SNACK = 'Snack',
  FOOD = 'Food',
  DISCOUNT = 'Discount',
  SERVICES = 'Services',
  BOULES = 'Boules',
  BOTTLE = 'Bottle',
}

export interface PriceData {
  default: number | null
  small?: number
  big?: number
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
  price: PriceData
}

export type DrinkData = ProductData & {
  type: ProductEnum.DRINK
  density?: number
  strength?: number
}

export type SnackData = ProductData & {
  type: ProductEnum.SNACK
}

export type FoodData = ProductData & {
  type: ProductEnum.FOOD
}

export type DiscountData = ProductData & {
  type: ProductEnum.DISCOUNT
}

export type ServiceData = ProductData & {
  type: ProductEnum.SERVICES
}
