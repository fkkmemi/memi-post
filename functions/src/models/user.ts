import { FirestoreDataConverter, FieldValue } from "firebase-admin/firestore"
import { UserRecord } from "firebase-admin/auth"
import { createHash } from "crypto"
import { db } from "../plugins/firebase"

export class User {
  constructor(
    readonly email: string,
    readonly displayName: string,
    readonly photoURL: string,
    readonly role: string,
  ) {}
}

const collectionName = "users"

const converter: FirestoreDataConverter<User> = {
  toFirestore(model) {
    return model
  },
  fromFirestore(snapshot): User {
    const data = snapshot.data()
    return new User(data.email, data.displayName, data.photoURL, data.role)
  },
}
const collection = db.collection(collectionName).withConverter(converter)
export const createUser = (userRecord: UserRecord) => {
  if (!userRecord.email) throw Error("invalid email")
  const hash = createHash("md5").update(userRecord.uid).digest("hex")
  const photoURL =
    userRecord.photoURL || `https://www.gravatar.com/avatar/${hash}`
  // const user = new User(
  //   userRecord.email,
  //   userRecord.displayName || '',
  //   photoURL,
  //   'user',
  // )
  const user = {
    createdAt: FieldValue.serverTimestamp(),
    email: userRecord.email,
    displayName: userRecord.displayName || "",
    photoURL: photoURL,
    role: "user",
    updatedAt: FieldValue.serverTimestamp(),
    visitedAt: FieldValue.serverTimestamp(),
  }
  return collection.doc(userRecord.uid).set(user)
}

export const deleteUser = (userRecord: UserRecord) => {
  return collection.doc(userRecord.uid).delete()
}
