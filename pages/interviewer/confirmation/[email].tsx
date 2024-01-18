import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Roles from '../../../constants/roles'
import { useAuth } from '../../../context/AuthUserContext'
import firebase from '../../../firebase'
import InterviewerLayout from '../../../layouts/interviewer'
import { createUser } from '../../api/createUser'
import {
  getInterviewerInvite,
  updateInterviewerResponse,
} from '../../api/interviewerInvite'

function InterviewerConfirmation() {
  const { createUserWithEmailAndPassword } = useAuth()
  const [password, setPassword] = useState<string>('')
  const [interviewerInvite, setInterviewerInvite] =
    useState<firebase.firestore.DocumentData>(null)
  const [error, setError] = useState<string>('')
  const router = useRouter()
  const email = String(router.query['email'])

  useEffect(() => {
    if (!router.query['email']) return

    setError('')
    getInterviewerInvite(email)
      .then((invite) => {
        if (!invite || !Object.keys(invite).length || !invite.name)
          setError(
            "Sorry, we don't have your data. Please contact at contact@ssgsa.us",
          )
        else if (invite.response === 'YES')
          setError("You have already responded to 'YES'.")
        else setInterviewerInvite(invite)
      })
      .catch(() => setError('Network issue, Try Again!'))
  }, [email])

  const proceedYes = () => {
    if (!interviewerInvite || !interviewerInvite.name) return

    setError('')
    if (!password) {
      setError('Please provide PASSWORD to create your account.')
      return
    }

    createUserWithEmailAndPassword(email, password)
      .then(async (result: firebase.auth.UserCredential) => {
        result.user
          .sendEmailVerification()
          .then(() =>
            alert(
              'An email verification mail is sent to you. Please follow the instructions to verify your email.',
            ),
          )
          .finally(() => {
            // Update interviewer response to 'YES'
            updateInterviewerResponse(email, 'YES')
              .then(() => {
                // add interviewer data to firestore database
                // Mobile not required for now so giving 0 for now
                createUser(
                  result.user.uid,
                  interviewerInvite.name,
                  email,
                  0,
                  new Date().getTime(),
                  [Roles.INTERVIEWER],
                )
              })
              .finally(() => {
                alert('Thanks for responding')
                router.push('/interviewer')
              })
          })
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          setError('The password is too weak.')
        } else {
          setError(error.message.replace('Firebase', ''))
        }
      })
  }

  const proceedNo = () => {
    if (!interviewerInvite || !interviewerInvite.name) return

    updateInterviewerResponse(email, 'NO').then(() => {
      alert('Response Updated, Thank you!')
      setError('')
      router.push('/')
    })
  }

  return (
    <InterviewerLayout>
      <div className="mx-5 sm:mx-10 md:mx-16 lg:mx-32">
        <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
          Interviewer Confirmation
        </h1>
        <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-10">
          <p className="my-5 text-sm sm:text-lg text-blue-850">
            To allot you the profile of the candidates,, please create a
            password for your login on the following link. Your email will be
            your USERNAME.
          </p>
          <p className="my-5 text-sm sm:text-lg text-blue-850">
            Note: If you were also a reviewer, you need not create another
            password. Please use the same one you have used before.
          </p>
          {error ? (
            <p className="text-red-850 text-center pt-1">
              <span className="font-bold">Error:</span> {error}
            </p>
          ) : null}
          {interviewerInvite && interviewerInvite.response === 'NO' ? (
            <p className="text-blue-850 text-center pt-1">
              You have already responded &apos;NO&apos;, still you can change
              your response if needed
            </p>
          ) : null}
          <div className="flex flex-col items-center my-10">
            <input
              name="Password"
              placeholder="Provide your PASSWORD"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl p-2 mt-1 md:w-3/4 lg:w-1/2"
            />
            <div className="flex mt-10">
              <button
                className={`text-white text-base md:text-lg rounded-lg ${
                  !interviewerInvite || !interviewerInvite.name
                    ? 'bg-red-860 cursor-not-allowed'
                    : 'bg-red-850'
                } py-2 px-5 order-1 sm:order-2
                `}
                onClick={proceedYes}
                disabled={!interviewerInvite || !interviewerInvite.name}
              >
                YES
              </button>
              <button
                className={`text-white text-base md:text-lg rounded-lg ${
                  !interviewerInvite || !interviewerInvite.name
                    ? 'bg-red-860 cursor-not-allowed'
                    : 'bg-red-850'
                } ml-5 py-2 px-5 order-1 sm:order-2
                `}
                onClick={proceedNo}
                disabled={!interviewerInvite || !interviewerInvite.name}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      </div>
    </InterviewerLayout>
  )
}

export default InterviewerConfirmation
