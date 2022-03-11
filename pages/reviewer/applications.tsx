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
              getReviewerSetApplications(reviewerData.set).then((data) => {
                setApplications(data)
                setPageReady(true)
              })
            } else router.push('/404')
          })
          .catch(() => alert('Try again, network error!'))
      }
    })
  }, [])

  return (
    <ReviewerLayout>
      {pageReady ? (
        <div className="mt-10 bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 overflow-x-auto whitespace-nowrap">
          <table className="border border-blue-850 border-seperate p-2">
            <thead>
              <tr>
                <th
                  className="border border-blue-850 border-seperate p-2"
                  rowSpan={2}
                >
                  S.No.
                </th>
                <th
                  className="border border-blue-850 border-seperate p-2"
                  rowSpan={2}
                >
                  Name
                </th>
                <th
                  className="border border-blue-850 border-seperate p-2"
                  rowSpan={2}
                >
                  Email Address
                </th>
                <th
                  className="border border-blue-850 border-seperate p-2"
                  rowSpan={2}
                >
                  Phone Number
                </th>
                <th
                  className="border border-blue-850 border-seperate p-2"
                  rowSpan={2}
                >
                  Bachelor&apos;s Major/Branch
                </th>
                <th
                  className="border border-blue-850 border-seperate p-2"
                  rowSpan={2}
                >
                  Master&apos;s Major/Branch
                </th>
                <th
                  className="border border-blue-850 border-seperate p-2"
                  rowSpan={2}
                >
                  View Completed Applications
                </th>
                <th
                  className="border border-blue-850 border-seperate p-2"
                  colSpan={6}
                >
                  Review Marks
                </th>
                <th
                  className="border border-blue-850 border-seperate p-2"
                  rowSpan={2}
                >
                  Update Status to Reviewed
                </th>
              </tr>
              <tr>
                <th className="border border-blue-850 border-seperate py-2 px-10">
                  A
                </th>
                <th className="border border-blue-850 border-seperate py-2 px-10">
                  B
                </th>
                <th className="border border-blue-850 border-seperate py-2 px-10">
                  C
                </th>
                <th className="border border-blue-850 border-seperate py-2 px-10">
                  D
                </th>
                <th className="border border-blue-850 border-seperate py-2 px-10">
                  E
                </th>
                <th className="border border-blue-850 border-seperate p-2">
                  Total
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
                  />
                ),
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-96" />
      )}
    </ReviewerLayout>
  )
}
