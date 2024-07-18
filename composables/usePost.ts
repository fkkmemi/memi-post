import {
  collection,
  setDoc,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore"
import type {
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
} from "firebase/firestore"
import { firestoreDefaultConverter } from "vuefire"

export interface Post {
  title: string
  body: string
}
export interface PostEx extends Post {
  id: string
}

export const usePost = () => {
  const db = useFirestore()
  const collectionName = "posts"

  const converter: FirestoreDataConverter<PostEx, DocumentData> = {
    toFirestore: firestoreDefaultConverter.toFirestore,
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options) as Post
      return {
        id: snapshot.id,
        ...data,
      }
    },
  }

  const postCollection = collection(db, collectionName).withConverter(converter)

  const add = (post: Post) => {
    const postRef = doc(postCollection)

    setDoc(postRef, post)
  }

  const read = (posts: Post[]) => {
    // posts.push({
    //   id: Math.random().toString(36).substr(2, 9),
    //   title: "Title " + Math.random().toString(36).substr(2, 9),
    //   body: "Body 1",
    // })
  }

  const update = (id: string, post: PartialWithFieldValue<Post>) => {
    return updateDoc(doc(postCollection, id), post)
  }

  const remove = (id: string) => {
    return deleteDoc(doc(postCollection, id))
  }

  return {
    add,
    postCollection,
    update,
    remove,
  }
}
