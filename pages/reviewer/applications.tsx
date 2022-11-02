import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AdminPortalData } from '../../classes/admin_portal_data'
import { ApplicationData } from '../../classes/application_data'
import ApplicationRow from '../../components/Reviewer/ApplicationRow'
import { auth } from '../../firebase'
import { getReviewerDetails } from '../api/getReviewerDetails'
import { getReviewerSetApplications } from '../api/getReviewerSetApplications'
import { Reviewer } from '../../classes/reviewer'
import ReviewerLayout from '../../layouts/reviewer/reviewer-layout'

type Applications = {
  [key: string]: {
    applicationData: ApplicationData
    adminPortalData: AdminPortalData
  }
}

export default function ReviewerApplications() {
  const [applications, setApplications] = useState<Applications>()
  const [allSets, setAllSets] = useState<Array<string>>()
  const [selectedSet, setSelectedSet] = useState<string>()
  const [pageReady, setPageReady] = useState<boolean>(false)
  const router = useRouter()

  // Listen for changes on authUser, redirect if needed
  useEffect(() => {
    auth.onAuthStateChanged(() => {
      if (!auth.currentUser) router.push('/reviewer/signin')
      else {
        getReviewerDetails(auth.currentUser.email)
          .then((reviewerData: Reviewer) => {
            if (reviewerData) {
              setAllSets(reviewerData.sets)
              setSelectedSet(reviewerData.sets[0])
              getReviewerSetApplications(reviewerData.sets[0])
                .then((data) => {
                  setApplications(data)
                  setPageReady(true)
                })
                .catch((err) => console.log(err))
            } else router.push('/404')
          })
          .catch(() => alert('Try again, network error!'))
      }
    })
  }, [])

  useEffect(() => {
    if (!pageReady) return
    setPageReady(false)
    getReviewerSetApplications(selectedSet)
      .then((data) => {
        setApplications(data)
        setPageReady(true)
      })
      .catch((err) => console.log(err))
  }, [selectedSet])

  return (
    <ReviewerLayout>
      {pageReady ? (
        <div>
          <div className="flex justify-center items-center space-x-5 mt-10">
            <p className="font-bold text-lg md:text-xl">Select One Set</p>
            <select
              name="Sets"
              value={selectedSet}
              onChange={(e) => setSelectedSet(e.target.value)}
              className="border-2 border-gray-400 rounded-xl p-3"
            >
              {allSets.map((set, index) => (
                <option key={index} label={`Set ${set}`} value={set} />
              ))}
            </select>
          </div>
          <div className="mt-10 bg-gray-200 rounded-3xl pt-5 px-3 sm:pt-10 sm:px-10">
            <div className="overflow-x-auto whitespace-nowrap pb-5 sm:pb-10">
              <table className="border-separate p-2">
                <thead>
                  <tr>
                    <th
                      className="border border-blue-850 p-2 sticky left-0 z-10 bg-gray-200"
                      rowSpan={2}
                    >
                      S.No.
                    </th>
                    <th
                      className="border border-blue-850 p-2 sticky left-12 z-10 bg-gray-200"
                      rowSpan={2}
                    >
                      Name
                    </th>
                    <th className="border border-blue-850 p-2" rowSpan={2}>
                      Email Address
                    </th>
                    <th className="border border-blue-850 p-2" rowSpan={2}>
                      Phone Number
                    </th>
                    <th className="border border-blue-850 p-2" rowSpan={2}>
                      Bachelor&apos;s Major/Branch
                    </th>
                    <th className="border border-blue-850 p-2" rowSpan={2}>
                      Master&apos;s Major/Branch
                    </th>
                    <th className="border border-blue-850 p-2" rowSpan={2}>
                      View Completed Applications
                    </th>
                    <th className="border border-blue-850 p-2" colSpan={6}>
                      Review Marks
                    </th>
                    <th className="border border-blue-850 p-2" rowSpan={2}>
                      Update Marks
                    </th>
                  </tr>
                  <tr>
                    <th className="border border-blue-850 py-2 px-10">
                      {process.env.NEXT_PUBLIC_REVIEW_MARKS_INDEX_A}
                      <br />
                      (Out of {process.env.NEXT_PUBLIC_REVIEW_INDEX_A_MAX_MARKS}
                      )
                    </th>
                    <th className="border border-blue-850 py-2 px-10">
                      {process.env.NEXT_PUBLIC_REVIEW_MARKS_INDEX_B}
                      <br />
                      (Out of {process.env.NEXT_PUBLIC_REVIEW_INDEX_B_MAX_MARKS}
                      )
                    </th>
                    <th className="border border-blue-850 py-2 px-10">
                      {process.env.NEXT_PUBLIC_REVIEW_MARKS_INDEX_C}
                      <br />
                      (Out of {process.env.NEXT_PUBLIC_REVIEW_INDEX_C_MAX_MARKS}
                      )
                    </th>
                    <th className="border border-blue-850 py-2 px-10">
                      {process.env.NEXT_PUBLIC_REVIEW_MARKS_INDEX_D}
                      <br />
                      (Out of {process.env.NEXT_PUBLIC_REVIEW_INDEX_D_MAX_MARKS}
                      )
                    </th>
                    <th className="border border-blue-850 py-2 px-10">
                      {process.env.NEXT_PUBLIC_REVIEW_MARKS_INDEX_E}
                      <br />
                      (Out of {process.env.NEXT_PUBLIC_REVIEW_INDEX_E_MAX_MARKS}
                      )
                    </th>
                    <th className="border border-blue-850 p-2">
                      Total
                      <br />
                      (Out of{' '}
                      {Number(
                        process.env.NEXT_PUBLIC_REVIEW_INDEX_A_MAX_MARKS,
                      ) +
                        Number(
                          process.env.NEXT_PUBLIC_REVIEW_INDEX_B_MAX_MARKS,
                        ) +
                        Number(
                          process.env.NEXT_PUBLIC_REVIEW_INDEX_C_MAX_MARKS,
                        ) +
                        Number(
                          process.env.NEXT_PUBLIC_REVIEW_INDEX_D_MAX_MARKS,
                        ) +
                        Number(
                          process.env.NEXT_PUBLIC_REVIEW_INDEX_E_MAX_MARKS,
                        )}
                      )
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(applications).map(
                    (applId: string, index: number) => (
                      <ApplicationRow
                        applicationId={applId}
                        application={applications[applId]}
                        index={index}
                        key={index}
                      />
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-96" />
      )}
    </ReviewerLayout>
  )
}
