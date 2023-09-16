export type ProductType = 'Drink' | 'Snack'

export enum ProductEnum {
  DRINK = 'Drink',
  SNACK = 'Snack',
}

export interface DrinkData {
  id: string
  name: string
  images: string[]
  priceLittleSize: number
  priceBigSize: number
  location: number[]
  discount?: number
  description?: string
  density?: number
  strength?: number
  isFiltered: boolean
  types: string[]
  inStock: boolean
}

export interface SnackData {
  id: string
  name: string
  images: string[]
  description: string
  price: number
  location: number[]
  discount?: number
  types: string[]
  inStock: boolean
}
