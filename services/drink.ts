import {
  collection,
  query,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from 'firebase/firestore'
import { DrinkData } from '@/types/product'
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage'

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
