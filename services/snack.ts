import { FoodData, SnackData } from '@/types/product'
import {
  collection,
  getDocs,
  query,
  doc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore'
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage'

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

export function uploadSnackImage(id: string, file: File) {
  const { $storage: storage } = useNuxtApp()

  return uploadBytes(ref(storage, `snacks/${id}/${file.name}`), file)
}

export function removeSnackImage(id: string, file: string) {
  const { $storage: storage } = useNuxtApp()

  return deleteObject(ref(storage, `snacks/${id}/${file}`))
}

export function getSnackImage(id: string, fileName: string) {
  const { $storage: storage } = useNuxtApp()

  return getDownloadURL(ref(storage, `snacks/${id}/${fileName}`))
}
