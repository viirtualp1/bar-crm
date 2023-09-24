import {
  collection,
  query,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from 'firebase/firestore'
import { BottleDrink, BoulesDrink, DrinkData } from '@/types/product'
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage'

// get

export function getDrinks() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'drinks')))
}

export function getBottle() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'bottle')))
}

export function getBoules() {
  const { $db: db } = useNuxtApp()

  return getDocs(query(collection(db, 'boules')))
}

// post

export function postDrink(data: DrinkData) {
  const { $db: db } = useNuxtApp()

  return setDoc(doc(db, 'drinks', data.id), data)
}

export function postBottle(data: BottleDrink) {
  const { $db: db } = useNuxtApp()

  return setDoc(doc(db, 'bottle', data.id), data)
}

export function postBoules(data: BoulesDrink) {
  const { $db: db } = useNuxtApp()

  return setDoc(doc(db, 'boules', data.id), data)
}

// delete

export function deleteDrink(id: string) {
  const { $db: db } = useNuxtApp()

  return deleteDoc(doc(db, 'drinks', id))
}

export function deleteBottle(id: string) {
  const { $db: db } = useNuxtApp()

  return deleteDoc(doc(db, 'bottle', id))
}

export function deleteBoules(id: string) {
  const { $db: db } = useNuxtApp()

  return deleteDoc(doc(db, 'boules', id))
}

export function uploadDrinkImage(id: string, file: File) {
  const { $storage: storage } = useNuxtApp()

  return uploadBytes(ref(storage, `drinks/${id}/${file.name}`), file)
}

export function removeDrinkImage(id: string, file: string) {
  const { $storage: storage } = useNuxtApp()

  return deleteObject(ref(storage, `drinks/${id}/${file}`))
}

export function getDrinkImage(id: string, fileName: string) {
  const { $storage: storage } = useNuxtApp()

  return getDownloadURL(ref(storage, `drinks/${id}/${fileName}`))
}

export const locations = ['Бар', 'Доставка']

export const types = {
  draft: 'Разливное пиво',
  banned: 'Баночное пиво',
  butter: 'Сливочное пиво',
  'non-alcoholic': 'Безалкогольные напитки',
  filtered: 'Фильтрованное',
  light: 'Светлое',
  dark: 'Темное',
}

export function getPriceWithDiscount(price: number, discount: number) {
  return price - price * (discount / 100)
}
