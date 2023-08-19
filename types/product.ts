export type ProductType = 'Drink' | 'Snack'

export enum ProductEnum {
  DRINK = 'Drink',
  SNACK = 'Snack',
}

export interface DrinkData {
  id: number
  name: string
  image?: string
  price: number
  location: number[]
  discount?: number
  description?: string
  density?: number
  strength?: number
}

export interface SnackData {
  id: number
  name: string
  image?: string
  description: string
  price: number
  location: number[]
  discount?: number
}

export type DrinkCreateData = Omit<DrinkData, 'id'>
export type SnackCreateData = Omit<SnackData, 'id'>
