import {
  collection,
  query,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from 'firebase/firestore'
import { DrinkData } from '@/types/product'

export function getDrinks() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'drinks')))
}

export function postDrink(data: DrinkData) {
  const { $db: db } = useNuxtApp()

  return setDoc(doc(db, 'drinks', data.id), data)
}

export function deleteDrink(id: string) {
  const { $db: db } = useNuxtApp()

  return deleteDoc(doc(db, 'drinks', id))
}

export const locations = {
  1: 'Бар 1',
  2: 'Бар 2',
  3: 'Бар 3',
}

export const types = {
  draft: 'Разливное пиво',
  banned: 'Баночное пиво',
  butter: 'Сливочное пиво',
  'non-alcoholic': 'Безалкогольное пиво',
}

export function getPriceWithDiscount(price: number, discount: number) {
  return price - price * (discount / 100)
}
