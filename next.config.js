require('dotenv').config()

module.exports = {
  env: {
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
    EMAILJS_USER_ID: process.env.EMAILJS_USER_ID,
    EMAILJS_REVIEWER_TEMPLATE_ID: process.env.EMAILJS_REVIEWER_TEMPLATE_ID,
    EMAILJS_INTERVIEWER_TEMPLATE_ID:
      process.env.EMAILJS_INTERVIEWER_TEMPLATE_ID,
    NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY:
      process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_URL:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL,
    NEXT_PUBLIC_QUESTION_1: process.env.NEXT_PUBLIC_QUESTION_1,
    NEXT_PUBLIC_QUESTION_2: process.env.NEXT_PUBLIC_QUESTION_2,
    NEXT_PUBLIC_QUESTION_3: process.env.NEXT_PUBLIC_QUESTION_3,
    NEXT_PUBLIC_QUESTION_4: process.env.NEXT_PUBLIC_QUESTION_4,
    NEXT_PUBLIC_QUESTION_5: process.env.NEXT_PUBLIC_QUESTION_5,
    NEXT_PUBLIC_APPLICATION_START_DATE:
      process.env.NEXT_PUBLIC_APPLICATION_START_DATE,
    NEXT_PUBLIC_APPLICATION_END_DATE:
      process.env.NEXT_PUBLIC_APPLICATION_END_DATE,
    NEXT_PUBLIC_INTERVIEW_MARKS_INDEX_A:
      process.env.NEXT_PUBLIC_INTERVIEW_MARKS_INDEX_A,
    NEXT_PUBLIC_INTERVIEW_MARKS_INDEX_B:
      process.env.NEXT_PUBLIC_INTERVIEW_MARKS_INDEX_B,
    NEXT_PUBLIC_INTERVIEW_MARKS_INDEX_C:
      process.env.NEXT_PUBLIC_INTERVIEW_MARKS_INDEX_C,
    NEXT_PUBLIC_INTERVIEW_MARKS_INDEX_D:
      process.env.NEXT_PUBLIC_INTERVIEW_MARKS_INDEX_D,
    NEXT_PUBLIC_INTERVIEW_INDEX_A_MAX_MARKS:
      process.env.NEXT_PUBLIC_INTERVIEW_INDEX_A_MAX_MARKS,
    NEXT_PUBLIC_INTERVIEW_INDEX_B_MAX_MARKS:
      process.env.NEXT_PUBLIC_INTERVIEW_INDEX_B_MAX_MARKS,
    NEXT_PUBLIC_INTERVIEW_INDEX_C_MAX_MARKS:
      process.env.NEXT_PUBLIC_INTERVIEW_INDEX_C_MAX_MARKS,
    NEXT_PUBLIC_INTERVIEW_INDEX_D_MAX_MARKS:
      process.env.NEXT_PUBLIC_INTERVIEW_INDEX_D_MAX_MARKS,
  },
  reactStrictMode: true,
  generateBuildId: () => 'build',
}
