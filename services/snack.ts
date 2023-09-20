import { FoodData, SnackData } from '@/types/product'
import {
  collection,
  getDocs,
  query,
  doc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore'

export function getSnacks() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'snacks')))
}

export function getKitchenFood() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'food')))
}

export function postSnack(data: SnackData) {
  const { $db: db } = useNuxtApp()

  return setDoc(doc(db, 'snacks', data.id), data)
}

export function postFood(data: FoodData) {
  const { $db: db } = useNuxtApp()

  return setDoc(doc(db, 'food', data.id), data)
}

export function deleteSnack(id: string) {
  const { $db: db } = useNuxtApp()

  return deleteDoc(doc(db, 'snacks', id))
}
