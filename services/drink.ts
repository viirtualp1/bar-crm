import axios from 'axios'
import { DrinkCreateData, DrinkData, SnackData } from '@/types/product'

export function getDrinks(): Promise<DrinkData[]> {
  const runtimeConfig = useRuntimeConfig()

  return axios
    .get(`${runtimeConfig.public.apiBase}/drink`)
    .then((data) => data.data)
}

export function getDrink(id: number): Promise<DrinkData> {
  const runtimeConfig = useRuntimeConfig()

  return axios
    .get(`${runtimeConfig.public.apiBase}/drink/${id}`)
    .then((data) => data.data)
}

export function createDrink(data: DrinkCreateData): Promise<DrinkData[]> {
  const runtimeConfig = useRuntimeConfig()

  return axios.post(`${runtimeConfig.public.apiBase}/drink/create`, data)
}

export function updateDrink(data: DrinkData): Promise<DrinkData[]> {
  const runtimeConfig = useRuntimeConfig()

  return axios.post(`${runtimeConfig.public.apiBase}/drink/update`, {
    id: data.id,
    data,
  })
}

export function deleteDrink(id: number): Promise<DrinkData[]> {
  const runtimeConfig = useRuntimeConfig()

  return axios.post(`${runtimeConfig.public.apiBase}/drink/delete`, {
    id,
  })
}

export const locations = {
  1: 'Бар 1',
  2: 'Бар 2',
  3: 'Бар 3',
}
