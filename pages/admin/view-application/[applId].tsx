import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import AdminStep1 from '../../../components/Admin/ApplicationSteps/Step1'
import AdminStep2 from '../../../components/Admin/ApplicationSteps/Step2'
import AdminStep3 from '../../../components/Admin/ApplicationSteps/Step3'
import AdminStep4 from '../../../components/Admin/ApplicationSteps/Step4'
import AdminStep5 from '../../../components/Admin/ApplicationSteps/Step5'
import AdminStep6 from '../../../components/Admin/ApplicationSteps/Step6'
import AdminStep7 from '../../../components/Admin/ApplicationSteps/Step7'
import AdminStep8 from '../../../components/Admin/ApplicationSteps/Step8'
import requireAuth from '../../../components/requireAuth'
import Roles from '../../../constants/roles'
import ApplicationLayout from '../../../layouts/admin/ApplicationLayout'
import {
  InterviewerInstructionsType,
  ReviewerInstructionsType,
  Users,
} from '../../../types'
import { getAdminPortalData } from '../../api/getAdminPortalData'
import { getApplicationData } from '../../api/getApplicationData'
import { getUserDetailsByIds } from '../../api/getUserDetails'
import {
  getInterviewerInstructions,
  getReviewerInstructions,
} from '../../api/instructions'

function ViewApplication() {
  const [adminPortalData, setAdminPortalData] = useState<AdminPortalData>(
    new AdminPortalData(),
  )
  const [applicationData, setApplicationData] = useState<ApplicationData>()
  const [reviewers, setReviewers] = useState<Users>({})
  const [interviewers, setInterviewers] = useState<Users>({})
  const [status, setStatus] = useState<number>(1)
  const [formStatus, setFormStatus] = useState<number>(6)
  const [changeOccured, setChangeOccured] = useState<boolean>(false)
  const [pageReady, setPageReady] = useState<boolean>(false)
  const [revInstructions, setRevInstructions] =
    useState<ReviewerInstructionsType>({})
  const [intInstructions, setIntInstructions] =
    useState<InterviewerInstructionsType>({})
  const router = useRouter()
  const applId = String(router.query['applId'])

  const updateReviewerDetails = (data: AdminPortalData) => {
    getUserDetailsByIds(Object.keys(data.review_marks))
      .then((data) => setReviewers(data))
      .catch(() => alert('Not able to fetch reviewer details'))
  }

  const updateInterviewerDetails = (data: AdminPortalData) => {
    getUserDetailsByIds(Object.keys(data.interview_marks))
      .then((data) => setInterviewers(data))
      .catch(() => alert('Not able to fetch interviewer details'))
  }

  useEffect(() => {
    getReviewerInstructions()
      .then((data) => setRevInstructions(data))
      .catch(() =>
        alert('Not able to fetch reviewer instructions, Try reloading!'),
      )

    getInterviewerInstructions()
      .then((data) => setRevInstructions(data))
      .catch(() =>
        alert('Not able to fetch interviewer instructions, Try reloading!'),
      )
  }, [])

  useEffect(() => {
    if (applId)
      getApplicationData(applId)
        .then((data) => {
          setApplicationData(data)
          getAdminPortalData(applId)
            .then((data) => {
              if (data) {
                setAdminPortalData(data)
                if (data.review_marks) updateReviewerDetails(data)
                if (data.interview_marks) updateInterviewerDetails(data)

                if (data.application_status < 2) setFormStatus(6)
                else if (data.application_status < 4) {
                  setFormStatus(7)
                  setStatus(7)
                } else {
                  setFormStatus(8)
                  setStatus(8)
                }
              }
            })
            .catch(() => alert('Try again, network error!'))
        })
        .catch(() => alert('Try again, network error!'))
        .finally(() => setPageReady(true))
  }, [router.query])

  useEffect(() => {
    if (applId && applicationData && applicationData.email)
      getAdminPortalData(applId)
        .then((data) => {
          if (data) {
            setAdminPortalData(data)
            if (data.review_marks) updateReviewerDetails(data)
            if (data.interview_marks) updateInterviewerDetails(data)

            if (data.application_status < 2) setFormStatus(6)
            else if (data.application_status < 4) {
              setFormStatus(7)
            } else {
              setFormStatus(8)
            }
          }
        })
        .catch(() => alert('Try again, network error!'))
  }, [changeOccured])

  return (
    <ApplicationLayout
      status={status}
      formStatus={formStatus}
      setStatus={setStatus}
    >
      {pageReady ? (
        <div>
          {status === 1 ? (
            <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
              <AdminStep1
                applicationData={applicationData}
                status={status}
                setStatus={setStatus}
                formStatus={formStatus}
              />
            </div>
          ) : status === 2 ? (
            <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
              <AdminStep2
                applicationData={applicationData}
                adminPortalData={adminPortalData}
                reviewers={reviewers}
                revInstructions={revInstructions}
                status={status}
                setStatus={setStatus}
                formStatus={formStatus}
              />
            </div>
          ) : status === 3 ? (
            <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
              <AdminStep3
                applicationData={applicationData}
                adminPortalData={adminPortalData}
                reviewers={reviewers}
                revInstructions={revInstructions}
                status={status}
                setStatus={setStatus}
                formStatus={formStatus}
              />
            </div>
          ) : status === 4 ? (
            <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
              <AdminStep4
                applicationData={applicationData}
                adminPortalData={adminPortalData}
                reviewers={reviewers}
                revInstructions={revInstructions}
                status={status}
                setStatus={setStatus}
                formStatus={formStatus}
              />
            </div>
          ) : status === 5 ? (
            <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
              <AdminStep5
                applicationData={applicationData}
                adminPortalData={adminPortalData}
                reviewers={reviewers}
                revInstructions={revInstructions}
                status={status}
                setStatus={setStatus}
                formStatus={formStatus}
              />
            </div>
          ) : status === 6 ? (
            <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
              <AdminStep6
                applId={applId}
                applicationData={applicationData}
                adminPortalData={adminPortalData}
                status={status}
                setStatus={setStatus}
                formStatus={formStatus}
                changeOccured={changeOccured}
                setChangeOccured={setChangeOccured}
              />
            </div>
          ) : status === 7 ? (
            <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
              <AdminStep7
                applId={applId}
                adminPortalData={adminPortalData}
                reviewers={reviewers}
                revInstructions={revInstructions}
                status={status}
                setStatus={setStatus}
                formStatus={formStatus}
                changeOccured={changeOccured}
                setChangeOccured={setChangeOccured}
              />
            </div>
          ) : status === 8 ? (
            <div className="flex flex-col items-center mx-3 my-10 sm:m-10">
              <AdminStep8
                applId={applId}
                adminPortalData={adminPortalData}
                interviewers={interviewers}
                intInstructions={intInstructions}
                status={status}
                setStatus={setStatus}
                formStatus={formStatus}
                changeOccured={changeOccured}
                setChangeOccured={setChangeOccured}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-96" />
      )}
    </ApplicationLayout>
  )
}

export default requireAuth(ViewApplication, Roles.ADMIN)
