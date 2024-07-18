import {
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"

export const useAuth = () => {
  const auth = useFirebaseAuth()

  const signInWithGoogle = () => {
    if (!auth) return
    const googleAuthProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleAuthProvider)
  }

  const signOut = () => {
    if (!auth) return
    return firebaseSignOut(auth)
  }

  return {
    signInWithGoogle,
    signOut,
  }
}
