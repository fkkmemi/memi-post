import {
  collection,
  setDoc,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore'
import type {
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
} from 'firebase/firestore'
import { firestoreDefaultConverter } from 'vuefire'
import { uploadString, ref } from 'firebase/storage'

export interface PostImage {
  src: string
  alt: string
  title: string
}
export interface Post {
  // user account
  uid: string
  displayName: string
  photoURL: string

  // post
  title: string
  summary: string

  // date
  createdAt: Timestamp
  updatedAt: Timestamp

  // extra
  category: string // '운동', '식사', '생활'
  tags: string[]
  type: string // '공지', '일반', '공지'
  count: {
    view: number
    like: number
    hate: number
    reject: number
    comment: number
    attachment: number
  }
  images: PostImage[]
}
export interface PostEx extends Post {
  id: string
}

export const usePost = () => {
  const db = useFirestore()
  const storage = useFirebaseStorage()
  const collectionName = 'userPosts'
  const user = useCurrentUser()

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

  const generateId = () => doc(postCollection).id

  const userUploadContent = (uid: string, id: string, content: string) => {
    const path = `userPosts/${uid}/${id}/content.json`
    const postRef = ref(storage, path)
    return uploadString(postRef, content)
  }

  const add = async (id: string, post: Post, content: string) => {
    const postRef = doc(postCollection, id)

    await userUploadContent(post.uid, id, content)

    await setDoc(postRef, post)
  }

  const update = (id: string, post: PartialWithFieldValue<Post>) => {
    return updateDoc(doc(postCollection, id), post)
  }

  const remove = (id: string) => {
    return deleteDoc(doc(postCollection, id))
  }

  return {
    generateId,
    add,
    postCollection,
    update,
    remove,
  }
}
