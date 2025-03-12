import type { FormData } from '@/types/product'
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
  ref,
  uploadBytes,
} from 'firebase/storage'

export function getProducts(name: string) {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, name)))
}

export function createProduct(name: string, data: FormData) {
  const { $db: db } = useNuxtApp()

  return setDoc(doc(db, name, data.id), data)
}

export function deleteProduct(name: string, id: string) {
  const { $db: db } = useNuxtApp()

  return deleteDoc(doc(db, name, id))
}

// Images

export function getProductImage(name: string, id: string, fileName: string) {
  const { $storage: storage } = useNuxtApp()

  return getDownloadURL(ref(storage, `${name}/${id}/${fileName}`))
}

export function uploadProductImage(name: string, id: string, file: File) {
  const { $storage: storage } = useNuxtApp()

  return uploadBytes(ref(storage, `${name}/${id}/${file.name}`), file)
}

export function removeProductImage(name: string, id: string, file: string) {
  const { $storage: storage } = useNuxtApp()

  return deleteObject(ref(storage, `${name}/${id}/${file}`))
}
