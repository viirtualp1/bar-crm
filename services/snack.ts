import { SnackCreateData, SnackData } from '@/types/product'
import axios from 'axios'

export function getSnacks(): Promise<SnackData[]> {
  const runtimeConfig = useRuntimeConfig()

  return axios
    .get(`${runtimeConfig.public.apiBase}/snack`)
    .then((data) => data.data)
}

export function getSnack(id: number): Promise<SnackData> {
  const runtimeConfig = useRuntimeConfig()

  return axios
    .get(`${runtimeConfig.public.apiBase}/snack/${id}`)
    .then((data) => data.data)
}

export function createSnack(data: SnackCreateData): Promise<SnackData[]> {
  const runtimeConfig = useRuntimeConfig()

  return axios.post(`${runtimeConfig.public.apiBase}/snack/create`, data)
}

export function updateSnack(data: SnackData): Promise<SnackData[]> {
  const runtimeConfig = useRuntimeConfig()

  return axios.post(`${runtimeConfig.public.apiBase}/snack/update`, {
    id: data.id,
    data,
  })
}

export function deleteSnack(id: number): Promise<SnackData[]> {
  const runtimeConfig = useRuntimeConfig()

  return axios.post(`${runtimeConfig.public.apiBase}/snack/delete`, {
    id,
  })
}
