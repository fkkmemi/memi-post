import { collection, doc, setDoc } from "firebase/firestore"

import type { Timestamp } from "firebase/firestore"
import type {
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
} from "firebase/firestore"
import { firestoreDefaultConverter } from "vuefire"

export interface MemiUser {
  createdAt: Timestamp
  email: string
  displayName: string
  photoURL: string
  role: "admin" | "user"
  updatedAt: Timestamp
  visitedAt: Timestamp
}

export interface MemiUserEx extends MemiUser {
  id: string
}

export const useUser = () => {
  const db = useFirestore()
  const collectionName = "users"

  const converter: FirestoreDataConverter<MemiUserEx, DocumentData> = {
    toFirestore: firestoreDefaultConverter.toFirestore,
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options) as MemiUser
      return {
        ...data,
        id: snapshot.id,
      }
    },
  }

  const userCollection = collection(db, collectionName).withConverter(converter)
}
