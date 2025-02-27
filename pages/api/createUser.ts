import path from 'path'
import { User, userController } from '../../classes/user'
import Roles from '../../constants/roles'
import firebase, { firestore } from '../../firebase'

export const createUser = (
  userUID: string,
  name: string,
  email: string,
  mobile: Number,
  verificationEmailEpoch: number,
  roles: Array<string> = [Roles.APPLICANT],
  review_sets: Array<string> = [],
  interview_sets: Array<string> = [],
) => {
  const user: User = new User(
    name,
    email,
    mobile,
    roles,
    review_sets,
    interview_sets,
    verificationEmailEpoch,
  )

  return firestore
    .doc(path.join('users', userUID))
    .withConverter(userController)
    .set(user)
}

export const addNewUserRole = (userId: string, newRole: string) => {
  firestore.doc(path.join('users', userId)).update({
    roles: firebase.firestore.FieldValue.arrayUnion[newRole],
  })
}
