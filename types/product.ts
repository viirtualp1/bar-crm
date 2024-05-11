export type ProductType = 'drink' | 'snack' | 'food' | 'discount' | 'services'

export enum ProductEnum {
  DRINK = 'drink',
  SNACK = 'snack',
  FOOD = 'food',
  DISCOUNT = 'discount',
  SERVICES = 'services',
}

export interface PriceData {
  default: number | null
  small?: number
  big?: number
}

export enum DiscountSelectorType {
  BIG = 0,
  SMALL = 1,
}

export interface ProductDiscountData {
  value: number | null
  selector: DiscountSelectorType | null
}

export interface ProductData {
  id: string
  name: string
  images: string[]
  description?: string
  locations: number[]
  types: string[]
  inStock: boolean
  price: PriceData
  discount?: ProductDiscountData | null
}

export type FormData = ProductData & { type: ProductType }

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
