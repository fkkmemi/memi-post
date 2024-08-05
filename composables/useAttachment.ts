import {
  Timestamp,
  collection,
  doc,
  setDoc,
  where,
  query,
  deleteDoc,
} from 'firebase/firestore'
import type {
  FirestoreDataConverter,
  DocumentData,
  PartialWithFieldValue,
  QueryConstraint,
} from 'firebase/firestore'
import { firestoreDefaultConverter } from 'vuefire'
import { ref as stRef, uploadBytes, getDownloadURL } from 'firebase/storage'

export interface Attachment {
  uid: string
  targetId: string
  targetType: string
  description: string
  createdAt: Timestamp
  title: string
  name: string
  size: number
  type: string
  url: string
  thumnail?: string
}

export interface AttachmentEx extends Attachment {
  id: string
}

export const useAttachment = () => {
  const db = useFirestore()
  const storage = useFirebaseStorage()

  const collectionName = 'userAttachments'

  const conveter: FirestoreDataConverter<AttachmentEx, DocumentData> = {
    toFirestore: firestoreDefaultConverter.toFirestore,
    fromFirestore(snapshot) {
      const data = snapshot.data() as Attachment
      return {
        ...data,
        id: snapshot.id,
      }
    },
  }

  const collectionWithConverter = collection(db, collectionName).withConverter(
    conveter,
  )

  const attachmentPath = (
    uid: string,
    attachmentId: string,
    filename: string,
  ) => {
    return `userAttachments/${uid}/${attachmentId}/${filename}`
  }

  const uploadFile = (path: string, file: File) => {
    const r = stRef(storage, path)
    return uploadBytes(r, file)
  }

  const setAttachment = async (
    targetId: string,
    targetType: string,
    description: string,
    title: string,
    file: File,
  ) => {
    const user = useCurrentUser()
    if (!user.value) throw new Error('User is not signed in')
    const uid = user.value.uid
    const docRef = doc(collectionWithConverter)

    const p = attachmentPath(uid, docRef.id, file.name)

    const sn = await uploadFile(p, file)
    const url = await getDownloadURL(sn.ref)

    const attachment: Attachment = {
      uid,
      targetId,
      targetType,
      description,
      createdAt: Timestamp.now(),
      title,
      name: file.name,
      size: file.size,
      type: file.type,
      url,
      // thumnail: ''
    }

    await setDoc(docRef, attachment)

    return {
      src: url,
      alt: docRef.id,
    }
  }

  const queryAttachmentsByTargetId = (targetId: string) => {
    const qs: QueryConstraint[] = []
    qs.push(
      where('targetId', '==', targetId),
      // orderBy('createdAt', 'desc'),
    )
    const q = query(collectionWithConverter, ...qs)
    return q
  }

  const deleteAttachment = (id: string) => {
    return deleteDoc(doc(collectionWithConverter, id))
  }

  return {
    setAttachment,
    queryAttachmentsByTargetId,
    deleteAttachment,
  }
}
