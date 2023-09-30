import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ProceedButtons from './ProceedButtons'
import { useAuth } from '../../context/AuthUserContext'
import { AnswerType } from '../../types'
import { updateApplicationData } from '../../pages/api/applications/step8'
import { ApplicationData } from '../../classes/application_data'

type Props = {
  applicationData: ApplicationData
  status: number
  setStatus: Dispatch<SetStateAction<Number>>
}

const Step8 = ({ applicationData, status, setStatus }: Props) => {
  const { authUser } = useAuth()
  const [answers, setAnswers] = useState<AnswerType>({})
  const [error, setError] = useState<string>('')

  const questionComponent = (index, question) => (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <p className="font-bold md:text-lg">
          {String.fromCharCode(index + 96)}) {question}
          <span className="text-red-850 font-black">*</span>
        </p>
        <span className="text-red-850 font-black">
          {answers[`SOP${index}`]
            ? answers[`SOP${index}`].split(' ').length
            : 0}
          /200
        </span>
      </div>
      <textarea
        name={`SOP${index}`}
        rows={4}
        cols={10}
        value={answers[`SOP${index}`]}
        onChange={(e) => {
          if (e.target.value.split(' ').length <= 200)
            setAnswers((prevAnswers: AnswerType) => {
              return {
                ...prevAnswers,
                [`SOP${index}`]: e.target.value,
              }
            })
        }}
        className="w-full rounded-xl p-2 mt-1"
      />
    </div>
  )

  useEffect(() => {
    setAnswers(applicationData.sop_answers || {})
  }, [applicationData])

  const validation = () => {
    setError('')
    if (
      answers['SOP1'] &&
      answers['SOP1'].split(' ').length >= 1 &&
      answers['SOP1'].split(' ').length <= 200
    ) {
      if (
        answers['SOP2'] &&
        answers['SOP2'].split(' ').length >= 1 &&
        answers['SOP2'].split(' ').length <= 200
      ) {
        if (
          answers['SOP3'] &&
          answers['SOP3'].split(' ').length >= 1 &&
          answers['SOP3'].split(' ').length <= 200
        ) {
          if (
            answers['SOP4'] &&
            answers['SOP4'].split(' ').length >= 1 &&
            answers['SOP4'].split(' ').length <= 200
          ) {
            if (
              answers['SOP5'] &&
              answers['SOP5'].split(' ').length >= 1 &&
              answers['SOP5'].split(' ').length <= 200
            ) {
              return true
            }
            setError(
              'For Question e, your response must be between 1 word and 200 words',
            )
            return false
          }
          setError(
            'For Question d, your response must be between 1 word and 200 words',
          )
          return false
        }
        setError(
          'For Question c, your response must be between 1 word and 200 words',
        )
        return false
      }
      setError(
        'For Question b, your response must be between 1 word and 200 words',
      )
      return false
    }
    setError(
      'For Question a, your response must be between 1 word and 200 words',
    )
    return false
  }

  // Used in next step and save information
  // Call updateApplicationData with required fields and a dynamic status (newStatus)
  // newStatus will be provided depends upon the formStatus and the current status
  // if both are equal newStatus will be status+1 otherwise formStatus
  const updateData = (newStatus: number) => {
    return updateApplicationData(authUser.id, answers, newStatus)
  }

  return (
    <div>
      <div className="bg-gray-200 rounded-3xl py-5 px-3 sm:py-10 sm:px-10">
        <h1 className="text-3xl text-red-850 text-center font-bold pb-5">
          Essay-Type Questions
        </h1>
        <p className="text-xs sm:text-sm md:text-base font-bold pl-2 pt-2">
          Please answer the following questions. Each has a limit of 200 words.
          The answers should be your original. Obtaining them from others,
          whether from current or past SSGSA applicants, or from the internet
          will constitute plagiarism and may lead to disqualification of the
          application.
        </p>
        <p className="text-xs sm:text-sm md:text-base text-red-850 pl-2 py-2">
          Note: Remember to save your information at frequent intervals.
          <br />
          Your response must be between 1 word and 200 words for each question.
        </p>
        <br />
        {questionComponent(1, process.env.NEXT_PUBLIC_QUESTION_1)}
        {questionComponent(2, process.env.NEXT_PUBLIC_QUESTION_2)}
        {questionComponent(3, process.env.NEXT_PUBLIC_QUESTION_3)}
        {questionComponent(4, process.env.NEXT_PUBLIC_QUESTION_4)}
        {questionComponent(5, process.env.NEXT_PUBLIC_QUESTION_5)}
      </div>
      <ProceedButtons
        formStatus={applicationData.form_status}
        status={status}
        setStatus={setStatus}
        validation={validation}
        updateApplicationData={updateData}
        error={error}
        setError={setError}
      />
    </div>
  )
}

export default Step8
