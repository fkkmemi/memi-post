import { initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getStorage } from "firebase/storage"

const app = initializeApp()

const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
