import { useEffect, useState } from 'react'
import EvaluatorsTableHeader from '../../../components/Admin/Evaluators/TableHeader'
import EvaluatorTableRow from '../../../components/Admin/Evaluators/TableRow'
import Loading from '../../../components/Loading'
import requireAuth from '../../../components/requireAuth'
import Roles from '../../../constants/roles'
import AdminLayout from '../../../layouts/admin/AdminLayout'
import { ReviewerInviteType, Users } from '../../../types'
import { getUsersByRole } from '../../api/getUserDetails'
import {
  getAcceptedRevWithoutAccount,
  sendReviewerCredMail,
  updateAcceptedReviewSets,
} from '../../api/reviewerInvite'
import { updateReviewSets } from '../../api/updateUserSets'

function ReviewersList() {
  const [accReviewers, setAccReviewers] = useState<Array<ReviewerInviteType>>(
    [],
  )
  const [reviewers, setReviewers] = useState<Users>({})
  const [pageReady, setPageReady] = useState<boolean>(false)

  useEffect(() => {
    getAcceptedRevWithoutAccount()
      .then((data) => setAccReviewers(data))
      .catch(() => alert('Try again, network error!'))
      .finally(() => setPageReady(true))

    getUsersByRole(Roles.REVIEWER)
      .then((data) => setReviewers(data))
      .catch(() => alert('Try again, network error!'))
      .finally(() => setPageReady(true))
  }, [])

  const createReviewer = async (
    name: string,
    email: string,
    password: string,
    sets: Array<string>,
  ) => {
    try {
      const response = await fetch('/api/admin/reviewer/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, sets }),
      })

      try {
        if (response.status === 200)
          await sendReviewerCredMail(name, email, password, sets.join(' '))
      } catch (e) {
        console.log('Error while sending credential mail to', email)
      }
    } catch (e) {
      console.log('Error while creating user ', email)
    }
  }

  const generateRandomPassword = () => {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let password = ''
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      password += charset[randomIndex]
    }
    return password
  }

  const createAccounts = () => {
    accReviewers.slice(0, 10).map(async (reviewer, index) => {
      const password = generateRandomPassword()
      await createReviewer(
        reviewer.name,
        reviewer.email,
        password,
        reviewer.sets,
      )
      if (index === 9 || index == accReviewers.length - 1) {
        alert(
          'Credential mails are sent to 10 reviewers. Please check the mails first!',
        )
      }
    })
  }

  return (
    <AdminLayout>
      {pageReady ? (
        <>
          <div className="mt-10 bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
            <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
              Accepted Reviewers
            </h1>
            <div className="flex flex-col items-center">
              <div className="overflow-x-auto whitespace-nowrap pb-5 sm:pb-10">
                <table className="border-separate p-2">
                  <EvaluatorsTableHeader />
                  <tbody>
                    {accReviewers.map((reviewer, index) => (
                      <EvaluatorTableRow
                        key={reviewer.email}
                        index={index + 1}
                        name={reviewer.name}
                        email={reviewer.email}
                        sets={reviewer.sets}
                        updateSets={(selectedSets: Array<string>) => {
                          updateAcceptedReviewSets(reviewer.email, selectedSets)
                            .then(() =>
                              setAccReviewers((prev) => {
                                const newVal = [...prev]
                                newVal[index] = {
                                  ...newVal[index],
                                  sets: selectedSets,
                                }
                                return newVal
                              }),
                            )
                            .catch(() => alert('Try again, network error!'))
                        }}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                className="text-white text-medium md:text-lg py-1 px-3 rounded-lg bg-blue-850"
                onClick={createAccounts}
              >
                Create Accounts
              </button>
            </div>
          </div>

          <div className="mt-10 bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
            <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
              All Reviewers
            </h1>
            <div className="flex flex-col items-center">
              <div className="overflow-x-auto whitespace-nowrap pb-5 sm:pb-10">
                <table className="border-separate p-2">
                  <EvaluatorsTableHeader />
                  <tbody>
                    {Object.keys(reviewers).map((reviewerId, index) => (
                      <EvaluatorTableRow
                        key={reviewerId}
                        index={index + 1}
                        name={reviewers[reviewerId].name}
                        email={reviewers[reviewerId].email}
                        sets={reviewers[reviewerId].review_sets}
                        updateSets={(selectedSets: Array<string>) => {
                          updateReviewSets(reviewerId, selectedSets)
                            .then(() =>
                              setReviewers((prev) => ({
                                ...prev,
                                [reviewerId]: {
                                  ...prev[reviewerId],
                                  review_sets: selectedSets[reviewerId],
                                },
                              })),
                            )
                            .catch(() => alert('Try again, network error!'))
                        }}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loading message="Loading reviewers list!" />
      )}
    </AdminLayout>
  )
}

export default requireAuth(ReviewersList, Roles.ADMIN)
