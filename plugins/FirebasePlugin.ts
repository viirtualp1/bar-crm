import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
import { getStorage } from '@firebase/storage'

export default defineNuxtPlugin(() => {
  const {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  } = useAppConfig()

  const app = initializeApp({
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  })

  const db = getFirestore(app)
  const storage = getStorage(app)
  const analytics = getAnalytics(app)

  return {
    provide: {
      app,
      db,
      analytics,
      storage,
    },
  }
})
