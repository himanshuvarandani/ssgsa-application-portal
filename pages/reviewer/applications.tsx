import { useEffect, useState } from 'react'
import { AdminPortalData } from '../../classes/admin_portal_data'
import { ApplicationData } from '../../classes/application_data'
import requireAuth from '../../components/requireAuth'
import ApplicationRow from '../../components/Reviewer/ApplicationRow'
import { useAuth } from '../../context/AuthUserContext'
import ReviewerLayout from '../../layouts/reviewer/reviewer-layout'
import { getReviewerSetApplications } from '../api/getReviewerSetApplications'

type Applications = {
  [key: string]: {
    applicationData: ApplicationData
    adminPortalData: AdminPortalData
  }
}

function ReviewerApplications() {
  const { authUser } = useAuth()
  const [applications, setApplications] = useState<Applications>({})
  const [pageReady, setPageReady] = useState<boolean>(false)

  useEffect(() => {
    if (authUser.sets.length)
      getReviewerSetApplications(authUser.sets[0]).then((data) => {
        setApplications(data)
        setPageReady(true)
      })
    else setPageReady(true)
  }, [])

  return (
    <ReviewerLayout>
      {pageReady ? (
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
                    (Out of {process.env.NEXT_PUBLIC_REVIEW_INDEX_A_MAX_MARKS})
                  </th>
                  <th className="border border-blue-850 py-2 px-10">
                    {process.env.NEXT_PUBLIC_REVIEW_MARKS_INDEX_B}
                    <br />
                    (Out of {process.env.NEXT_PUBLIC_REVIEW_INDEX_B_MAX_MARKS})
                  </th>
                  <th className="border border-blue-850 py-2 px-10">
                    {process.env.NEXT_PUBLIC_REVIEW_MARKS_INDEX_C}
                    <br />
                    (Out of {process.env.NEXT_PUBLIC_REVIEW_INDEX_C_MAX_MARKS})
                  </th>
                  <th className="border border-blue-850 py-2 px-10">
                    {process.env.NEXT_PUBLIC_REVIEW_MARKS_INDEX_D}
                    <br />
                    (Out of {process.env.NEXT_PUBLIC_REVIEW_INDEX_D_MAX_MARKS})
                  </th>
                  <th className="border border-blue-850 py-2 px-10">
                    {process.env.NEXT_PUBLIC_REVIEW_MARKS_INDEX_E}
                    <br />
                    (Out of {process.env.NEXT_PUBLIC_REVIEW_INDEX_E_MAX_MARKS})
                  </th>
                  <th className="border border-blue-850 p-2">
                    Total
                    <br />
                    (Out of{' '}
                    {Number(process.env.NEXT_PUBLIC_REVIEW_INDEX_A_MAX_MARKS) +
                      Number(process.env.NEXT_PUBLIC_REVIEW_INDEX_B_MAX_MARKS) +
                      Number(process.env.NEXT_PUBLIC_REVIEW_INDEX_C_MAX_MARKS) +
                      Number(process.env.NEXT_PUBLIC_REVIEW_INDEX_D_MAX_MARKS) +
                      Number(process.env.NEXT_PUBLIC_REVIEW_INDEX_E_MAX_MARKS)}
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
      ) : (
        <div className="mt-96" />
      )}
    </ReviewerLayout>
  )
}

export default requireAuth(ReviewerApplications, 'reviewer')
