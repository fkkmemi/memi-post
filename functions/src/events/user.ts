import * as functions from "firebase-functions"
import { createUser, deleteUser } from "../models/user"

const fn = functions.region("asia-northeast3").auth

const created = fn.user().onCreate((user) => {
  console.log("created", user)
  return createUser(user)
})

const deleted = fn.user().onDelete((user) => {
  console.log("deleted", user)
  return deleteUser(user)
})

export default { created, deleted }
