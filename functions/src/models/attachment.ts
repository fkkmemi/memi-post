import { FirestoreDataConverter, DocumentData } from 'firebase-admin/firestore'
import {
  onDocumentDeleted,
  DocumentOptions,
} from 'firebase-functions/v2/firestore'
import { db, storage } from '../plugins/firebase'

export class Attachment {
  constructor(
    readonly uid: string,
    readonly targetId: string,
    readonly targetType: 'post' | 'comment',
  ) {}
}

export const attachmentCollectionName = 'userAttachments'

export const attachmentConverter: FirestoreDataConverter<Attachment> = {
  toFirestore(model: Attachment): DocumentData {
    return model
  },
  fromFirestore(snapshot): Attachment {
    const data = snapshot.data()
    return new Attachment(data.uid, data.targetId, data.targetType)
  },
}

export const attachmentCollection = db
  .collection(attachmentCollectionName)
  .withConverter(attachmentConverter)

export const getAttachmentDocument = (id: string) => {
  return attachmentCollection.doc(id)
}

export const deleteAttachmentsByTargetId = async (targetId: string) => {
  const qs = await attachmentCollection.where('targetId', '==', targetId).get()
  if (qs.empty) return
  const batch = db.batch()
  qs.forEach((d) => {
    batch.delete(d.ref)
  })
  await batch.commit()
}

export const deleteAttachmentsByUid = async (uid: string) => {
  const qs = await attachmentCollection.where('uid', '==', uid).get()
  if (qs.empty) return
  const batch = db.batch()
  qs.forEach((d) => {
    batch.delete(d.ref)
  })
  await batch.commit()
}

export const getAttachmentsByTargetId = (targetId: string) => {
  return attachmentCollection.where('targetId', '==', targetId).get()
}

export const deleteAttachmentFiles = (p: string) => {
  return storage.bucket().deleteFiles({ prefix: p, force: true })
}

const options: DocumentOptions = {
  region: 'asia-northeast3',
  document: `${attachmentCollectionName}/{id}`,
}

const deleted = onDocumentDeleted(options, async (e) => {
  const id = e.params.id
  const d = e.data
  if (!d) return
  const data = d.data()
  const path = `${attachmentCollectionName}/${data.uid}/${id}`
  await deleteAttachmentFiles(path)
})

export default {
  // created,
  deleted,
}
