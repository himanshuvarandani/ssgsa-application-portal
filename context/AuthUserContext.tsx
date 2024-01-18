import { createContext, useContext } from 'react'
import useFirebaseAuth from '../firebase/useFirebaseAuth'
import firebase, { auth } from '../firebase'

const authUserContext = createContext({
  authUser: {
    id: '',
    email: '',
    roles: [],
    review_sets: [],
    interview_sets: [],
    verificationEmailEpoch: null,
  },
  loading: true,
  signInWithEmailAndPassword: async (
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential> =>
    auth.signInWithEmailAndPassword(email, password),
  createUserWithEmailAndPassword: async (
    email: string,
    password: string,
  ): Promise<firebase.auth.UserCredential> =>
    auth.createUserWithEmailAndPassword(email, password),
  sendPasswordResetEmail: async (email: string): Promise<void> =>
    auth.sendPasswordResetEmail(email),
  signOut: async () => auth.signOut(),
})

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth()
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  )
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext)
