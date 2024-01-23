import path from 'path'
import firebase, { firestore } from '../../firebase'
import { ReviewerInviteType } from '../../types'

export const addReviewerInvite = (email: string, name: string) => {
  firestore.collection('reviewer_invites').doc(email).set({
    name: name,
    reminder: 0,
    response: '',
    account_created: false,
  })
}

export const getReviewerInvite = async (email: string) => {
  let reviewerInvite: ReviewerInviteType = await firestore
    .doc(path.join('reviewer_invites', email))
    .get()
    .then((invite: firebase.firestore.DocumentSnapshot<ReviewerInviteType>) => {
      return invite.data()
    })

  return reviewerInvite
}

export const updateReviewerResponse = (email: string, response: string) => {
  return firestore
    .collection('reviewer_invites')
    .doc(email)
    .update({ response })
}

export const getAcceptedReviewers = async () => {
  return await firestore
    .collection('reviewer_invites')
    .where('response', '==', 'YES')
    .get()
    .then((invites: firebase.firestore.QuerySnapshot<ReviewerInviteType>) => {
      let reviewers = []
      invites.forEach(
        (document: firebase.firestore.DocumentSnapshot<ReviewerInviteType>) => {
          reviewers.push({
            ...document.data(),
            email: document.id,
          })
        },
      )
      return reviewers
    })
}

export const getRejetedReviewers = async () => {
  return await firestore
    .collection('reviewer_invites')
    .where('response', '==', 'NO')
    .get()
    .then((invites: firebase.firestore.QuerySnapshot<ReviewerInviteType>) => {
      let reviewers = []
      invites.forEach(
        (document: firebase.firestore.DocumentSnapshot<ReviewerInviteType>) => {
          reviewers.push({
            ...document.data(),
            email: document.id,
          })
        },
      )
      return reviewers
    })
}

export const getUnresponsiveReviewers = async () => {
  return await firestore
    .collection('reviewer_invites')
    .where('response', 'not-in', ['YES', 'NO'])
    .get()
    .then((invites: firebase.firestore.QuerySnapshot<ReviewerInviteType>) => {
      let reviewers = []
      invites.forEach(
        (document: firebase.firestore.DocumentSnapshot<ReviewerInviteType>) => {
          reviewers.push({
            ...document.data(),
            email: document.id,
          })
        },
      )
      return reviewers
    })
}

export const sendRevReminder = (email: string, reminderCount: number) => {
  return firestore
    .collection('reviewer_invites')
    .doc(email)
    .update({ reminder: reminderCount })
}
