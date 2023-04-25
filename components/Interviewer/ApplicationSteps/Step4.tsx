import { Dispatch, SetStateAction, useState } from 'react'
import { ApplicationData } from '../../../classes/application_data'
import { useAuth } from '../../../context/AuthUserContext'
import { updateIntFormStatus } from '../../../pages/api/updateInterviewMarks'
import { InterviewerInstructionsType } from '../../../types'
import Step7 from '../../ReviewApplicationSteps/Step7'
import ProceedButtons from './ProceedButtons'

type Props = {
  applId: string
  applicationData: ApplicationData
  instructions: InterviewerInstructionsType
  formStatus: number
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const InterviewerStep4 = ({
  applId,
  applicationData,
  instructions,
  formStatus,
  status,
  setStatus,
}: Props) => {
  const { authUser } = useAuth()
  const [error, setError] = useState<string>('')

  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Extracurricular Activities
        </h1>
        <div className="text-xs sm:text-sm md:text-base font-bold m-2">
          <p className="mb-5">{instructions.STEP4_INSTRUCTION}</p>
        </div>
      </div>

      <Step7 extraCurrActivities={applicationData.extra_curriculars} />

      <ProceedButtons
        formStatus={formStatus}
        status={status}
        setStatus={setStatus}
        validation={() => true}
        updateInterviewMarks={(newStatus: number) =>
          updateIntFormStatus(applId, authUser.id, newStatus)
        }
        error={error}
        setError={setError}
      />
    </div>
  )
}

export default InterviewerStep4
