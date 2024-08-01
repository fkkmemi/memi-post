import { FirestoreDataConverter, DocumentData } from 'firebase-admin/firestore'
import {
  onDocumentDeleted,
  DocumentOptions,
} from 'firebase-functions/v2/firestore'
import { db, storage } from '../plugins/firebase'

export class Post {
  constructor(readonly uid: string) {}

  toJSON() {
    return {
      uid: this.uid,
    }
  }
}

export const postCollectionName = 'userPosts'

export const postConverter: FirestoreDataConverter<Post> = {
  toFirestore(model: Post): DocumentData {
    return model
  },
  fromFirestore(snapshot): Post {
    const data = snapshot.data()
    return new Post(data.uid)
  },
}

export const postCollection = db
  .collection(postCollectionName)
  .withConverter(postConverter)

export const getPostsByUid = (uid: string) => {
  return postCollection.where('uid', '==', uid).get()
}

export const deletePostsByUid = async (uid: string) => {
  const querySnapshot = await getPostsByUid(uid)

  if (querySnapshot.empty) return
  const batch = db.batch()

  querySnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref)
  })
  await batch.commit()

  const storagePath = `userPosts/${uid}`
  await storage.bucket().deleteFiles({ prefix: storagePath, force: true })
}

// export const deletePost = (id: string) => {
//   return postCollection.doc(id).delete()
// }

export const deletePostFiles = (p: string) => {
  return storage.bucket().deleteFiles({ prefix: p, force: true })
}

const options: DocumentOptions = {
  region: 'asia-northeast3',
  document: `${postCollectionName}/{id}`,
}

const deleted = onDocumentDeleted(options, async (e) => {
  const id = e.params.id
  const d = e.data
  if (!d) return
  const data = d.data()
  const p = `userPosts/${data.uid}/${id}`

  await deletePostFiles(p)
})

export default {
  deleted,
}
