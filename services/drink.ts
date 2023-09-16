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

export function createDrink(data: DrinkData) {
  const { $db: db } = useNuxtApp()

  return setDoc(doc(db, 'drinks', data.id), data)
}

export function updateDrink(data: DrinkData) {}

export function deleteDrink(id: string) {
  const { $db: db } = useNuxtApp()

  return deleteDoc(doc(db, 'drinks', id))
}

export const locations = {
  1: 'Бар 1',
  2: 'Бар 2',
  3: 'Бар 3',
}

export function getPriceWithDiscount(price: number, discount) {
  return price - price * (discount / 100)
}
