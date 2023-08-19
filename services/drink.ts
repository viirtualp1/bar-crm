import axios from 'axios'
import { DrinkCreateData, DrinkData } from '@/types/product'

export function getDrinks(): Promise<DrinkData[]> {
  const runtimeConfig = useRuntimeConfig()

  return axios
    .get(`${runtimeConfig.public.apiBase}/drink`)
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
