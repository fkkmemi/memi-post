import onUser from './models/user'
import onPost from './models/post'
import onAttachment from './models/attachment'

export const userCreated = onUser.created
export const userDeleted = onUser.deleted

export const postDeleted = onPost.deleted

export const attachmentDeleted = onAttachment.deleted
