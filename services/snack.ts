import { SnackData } from '@/types/product'
import {
  addDoc,
  collection,
  getDocs,
  query,
  doc,
  deleteDoc,
} from 'firebase/firestore'

export function getSnacks() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'snacks')))
}

export function getSnack(id: number) {}

export function createSnack(data: SnackData) {
  const { $db: db } = useNuxtApp()

  return addDoc(collection(db, 'snacks'), data)
}

export function updateSnack(data: SnackData) {}

export function deleteSnack(id: string) {
  const { $db: db } = useNuxtApp()

  return deleteDoc(doc(db, 'snack', id))
}
