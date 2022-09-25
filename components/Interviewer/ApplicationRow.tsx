import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AdminPortalData } from '../../classes/admin_portal_data'
import { ApplicationData } from '../../classes/application_data'
import { auth } from '../../firebase'
import { updateInterviewMarks } from '../../pages/api/updateInterviewMarks'

type Application = {
  applicationData: ApplicationData
  adminPortalData: AdminPortalData
}

type Props = {
  applicationId: string
  application: Application
  index: number
}

export default function ApplicationRow({
  applicationId,
  application,
  index,
}: Props) {
  const [A, setA] = useState<number>(0)
  const [B, setB] = useState<number>(0)
  const [C, setC] = useState<number>(0)
  const [D, setD] = useState<number>(0)

  useEffect(() => {
    let interview_marks = application.adminPortalData.interview_marks
    if (interview_marks && interview_marks[auth.currentUser.uid]) {
      setA(interview_marks[auth.currentUser.uid].A)
      setB(interview_marks[auth.currentUser.uid].B)
      setC(interview_marks[auth.currentUser.uid].C)
      setD(interview_marks[auth.currentUser.uid].D)
    }
  }, [])

  return (
    <tr key={index}>
      <td className="border border-blue-850 p-2 text-center sticky left-0 z-10 bg-gray-200">
        {index + 1}
      </td>
      <td className="border border-blue-850 p-2 sticky left-12 z-10 bg-gray-200">
        {application.applicationData.name}
      </td>
      <td className="border border-blue-850 p-2">
        {application.applicationData.email}
      </td>
      <td className="border border-blue-850 p-2">
        {application.applicationData.contact}
      </td>
      <td className="border border-blue-850 p-2">
        {
          application.applicationData.academic_record["Bachelor's Degree"]
            .branch
        }
      </td>
      <td className="border border-blue-850 p-2">
        {application.applicationData.academic_record["Master's Degree"]
          ? application.applicationData.academic_record["Master's Degree"]
              .branch
          : '-'}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        <Link href={`/interviewer/view-application/${applicationId}`}>
          <a className="text-white text-base md:text-lg bg-blue-850 py-1 px-3 rounded-lg">
            View
          </a>
        </Link>
      </td>
      <td className="border border-blue-850 p-2 text-center">
        <input
          name="Name"
          type="number"
          value={A}
          min={0}
          max={Number(process.env.NEXT_PUBLIC_INTERVIEW_INDEX_A_MAX_MARKS)}
          onChange={(e) =>
            Number(e.target.value) >
            Number(process.env.NEXT_PUBLIC_INTERVIEW_INDEX_A_MAX_MARKS)
              ? null
              : setA(Number(e.target.value))
          }
          className="w-full rounded-xl p-2"
          onWheelCapture={(e) => e.currentTarget.blur()}
        />
      </td>
      <td className="border border-blue-850 p-2 text-center">
        <input
          name="Name"
          type="number"
          value={B}
          min={0}
          max={Number(process.env.NEXT_PUBLIC_INTERVIEW_INDEX_B_MAX_MARKS)}
          onChange={(e) =>
            Number(e.target.value) >
            Number(process.env.NEXT_PUBLIC_INTERVIEW_INDEX_B_MAX_MARKS)
              ? null
              : setB(Number(e.target.value))
          }
          className="w-full rounded-xl p-2"
          onWheelCapture={(e) => e.currentTarget.blur()}
        />
      </td>
      <td className="border border-blue-850 p-2 text-center">
        <input
          name="Name"
          type="number"
          value={C}
          min={0}
          max={Number(process.env.NEXT_PUBLIC_INTERVIEW_INDEX_C_MAX_MARKS)}
          onChange={(e) =>
            Number(e.target.value) >
            Number(process.env.NEXT_PUBLIC_INTERVIEW_INDEX_C_MAX_MARKS)
              ? null
              : setC(Number(e.target.value))
          }
          className="w-full rounded-xl p-2"
          onWheelCapture={(e) => e.currentTarget.blur()}
        />
      </td>
      <td className="border border-blue-850 p-2 text-center">
        <input
          name="Name"
          type="number"
          value={D}
          min={0}
          max={Number(process.env.NEXT_PUBLIC_INTERVIEW_INDEX_D_MAX_MARKS)}
          onChange={(e) =>
            Number(e.target.value) >
            Number(process.env.NEXT_PUBLIC_INTERVIEW_INDEX_D_MAX_MARKS)
              ? null
              : setD(Number(e.target.value))
          }
          className="w-full rounded-xl p-2"
          onWheelCapture={(e) => e.currentTarget.blur()}
        />
      </td>
      <td className="border border-blue-850 p-2 text-center">
        {A + B + C + D}
      </td>
      <td className="border border-blue-850 p-2 text-center">
        <button
          className={`text-white text-base md:text-lg py-1 px-3 rounded-lg ${
            application.adminPortalData.application_status >= 6 ||
            (!A && !B && !C && !D)
              ? 'bg-red-860 cursor-not-allowed'
              : 'bg-red-850'
          }`}
          onClick={() =>
            application.adminPortalData.application_status >= 6 ||
            (!A && !B && !C && !D)
              ? null
              : updateInterviewMarks(
                  applicationId,
                  auth.currentUser.uid,
                  A,
                  B,
                  C,
                  D,
                  5,
                )
                  .then(() => alert('Succesfully Updated'))
                  .catch(() => alert('Try again, network error!'))
          }
        >
          Update
        </button>
      </td>
    </tr>
  )
}
