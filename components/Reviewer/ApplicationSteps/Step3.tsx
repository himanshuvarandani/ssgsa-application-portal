import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AdminPortalData } from '../../../classes/admin_portal_data'
import { ApplicationData } from '../../../classes/application_data'
import { useAuth } from '../../../context/AuthUserContext'
import { step3 } from '../../../pages/api/updateReviewMarks'
import { ReviewerInstructionsType } from '../../../types'
import TextInput from '../../ApplicationSteps/TextInput'
import Step3 from '../../ReviewApplicationSteps/Step3'
import Step4 from '../../ReviewApplicationSteps/Step4'
import Step5 from '../../ReviewApplicationSteps/Step5'
import Step6 from '../../ReviewApplicationSteps/Step6'
import ProceedButtons from './ProceedButtons'

type Props = {
  applId: string
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
  formStatus: number
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
  instructions: ReviewerInstructionsType
}

const ReviewerStep3 = ({
  applId,
  applicationData,
  adminPortalData,
  formStatus,
  status,
  setStatus,
  instructions,
}: Props) => {
  const { authUser } = useAuth()
  const [curricularMarks, setCurricularMarks] = useState<number>(null)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (
      adminPortalData.review_marks &&
      adminPortalData.review_marks[authUser.id] &&
      adminPortalData.review_marks[authUser.id].curricularMarks !== null
    )
      setCurricularMarks(
        adminPortalData.review_marks[authUser.id].curricularMarks,
      )
  }, [adminPortalData])

  const validation = () => {
    if (curricularMarks == null) {
      setError('Please provide curricular marks.')
      return false
    }
    return true
  }

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Academic/Curricular Activities
        </h1>
        <div className="text-xs sm:text-sm md:text-base font-bold m-2">
          <p className="mb-5">{instructions.STEP3_INSTRUCTION}</p>
          <ul style={{ listStyle: 'disc' }} className="ml-2 p-2 pl-4">
            <li className="my-2">{instructions.STEP3_INSTRUCTION1}</li>
            <li className="my-2">{instructions.STEP3_INSTRUCTION2}</li>
            <li className="my-2">{instructions.STEP3_INSTRUCTION3}</li>
            <li className="my-2">{instructions.STEP3_INSTRUCTION4}</li>
          </ul>
          <p className="my-5">
            <span className="text-base md:text-lg text-blue-850 font-black">
              Note:
            </span>{' '}
            For updating total marks, Go to last step and click on complete
            button
          </p>
        </div>
      </div>

      <Step3 researchData={applicationData.research_experience} />
      <Step4 workExperiences={applicationData.work_experience} />
      <Step5 workshops={applicationData.poster_or_workshops} />
      <Step6 curricularActivities={applicationData.curricular_activities} />

      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10 my-5">
        <h1 className="text-xl sm:text-2xl text-center font-bold pb-5">
          Academic/Curricular Activities Marks
        </h1>
        <div className="md:w-1/2 text-blue-850 font-black">
          <TextInput
            name={`Enter Total Marks (out of ${instructions.CURRICULAR_MAX_MARKS})`}
            value={curricularMarks}
            type="number"
            onChange={(e) => {
              if (
                Number(e.target.value) <= instructions.CURRICULAR_MAX_MARKS &&
                Number(e.target.value) >= 0
              )
                setCurricularMarks(Number(e.target.value))
            }}
            required={true}
            step="0.01"
            minimum={0}
            maximum={instructions.CURRICULAR_MAX_MARKS}
          />
        </div>
      </div>

      <ProceedButtons
        formStatus={formStatus}
        status={status}
        setStatus={setStatus}
        validation={validation}
        updateReviewMarks={(newStatus: number) =>
          step3(applId, authUser.id, curricularMarks, newStatus)
        }
        error={error}
        setError={setError}
      />
    </div>
  )
}

export default ReviewerStep3
