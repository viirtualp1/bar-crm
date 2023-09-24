import { DiscountData, FoodData, ServiceData, SnackData } from '@/types/product'
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

// getters
export function getSnacks() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'snacks')))
}

export function getKitchenFood() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'food')))
}

export function getDiscountProducts() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'discount')))
}

export function getServices() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'services')))
}

// post
export function postSnack(data: SnackData) {
  const { $db: db } = useNuxtApp()

  return setDoc(doc(db, 'snacks', data.id), data)
}

export function postFood(data: FoodData) {
  const { $db: db } = useNuxtApp()

  return setDoc(doc(db, 'food', data.id), data)
}

export function postDiscountProduct(data: DiscountData) {
  const { $db: db } = useNuxtApp()

  return setDoc(doc(db, 'discount', data.id), data)
}

export function postService(data: ServiceData) {
  const { $db: db } = useNuxtApp()

  return setDoc(doc(db, 'services', data.id), data)
}

// delete
export function deleteSnack(id: string) {
  const { $db: db } = useNuxtApp()

  return deleteDoc(doc(db, 'snacks', id))
}

export function deleteFood(id: string) {
  const { $db: db } = useNuxtApp()

  return deleteDoc(doc(db, 'food', id))
}

export function deleteDiscount(id: string) {
  const { $db: db } = useNuxtApp()

  return deleteDoc(doc(db, 'discount', id))
}

export function deleteService(id: string) {
  const { $db: db } = useNuxtApp()

  return deleteDoc(doc(db, 'services', id))
}

// image

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
