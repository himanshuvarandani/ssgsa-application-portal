import emailjs from 'emailjs-com'
import { useState } from 'react'
import * as XLSX from 'xlsx'
import { Reviewer } from '../../classes/reviewer'
import requireAuth from '../../components/requireAuth'
import Roles from '../../constants/roles'
import firebase from '../../firebase'
import AdminLayout from '../../layouts/admin/admin-layout'
import { createReviewer } from '../api/createReviewer'

function AddReviewer() {
  const [file, setFile] = useState<File>()
  const [addedReviewers, setAddedReviewers] = useState<Reviewer[]>([])
  const [removedReviewers, setRemovedReviewers] = useState<Reviewer[]>([])

  const createAccount = async (
    secondaryFirebaseApp: firebase.app.App,
    reviewer: Array<string>,
    password: string,
  ) => {
    const email = reviewer[0]
    const name = reviewer[1]
    const sets = reviewer[2].split(',')

    await secondaryFirebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (result: firebase.auth.UserCredential) => {
        try {
          secondaryFirebaseApp.auth().signOut()
        } catch {
          console.log('Not able to sign out', email)
        }

        // add reviewer data to firestore database
        createReviewer(result.user.uid, email, name, sets)

        setAddedReviewers((prevAddedReviewers) => [
          ...prevAddedReviewers,
          new Reviewer(email, name, sets),
        ])

        let templateParams = {
          email: email,
          name: name,
          sets: sets.join(', '),
          password: password,
        }
        emailjs.send(
          process.env.EMAILJS_SERVICE_ID,
          process.env.EMAILJS_REVIEWER_TEMPLATE_ID,
          templateParams,
          process.env.EMAILJS_USER_ID,
        )
      })
      .catch(() => {
        setRemovedReviewers((prevRemovedReviewers) => [
          ...prevRemovedReviewers,
          new Reviewer(email, name, sets),
        ])
      })
  }

  const proceed = () => {
    const reader = new FileReader()
    reader.onload = (e) => {
      // Create a new firebase app for account creation
      const FirebaseCredentials = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      }
      let secondaryFirebaseApp = firebase.initializeApp(
        FirebaseCredentials,
        'Secondary',
      )

      // Read data from excel file as worksheets
      let data = e.target.result
      let readedData = XLSX.read(data, { type: 'binary' })

      // Get a specific worksheet from file data
      let sheetName = readedData.SheetNames[0]
      let sheet = readedData.Sheets[sheetName]

      // Get all reviewer details as array from worksheet
      let reviewers = XLSX.utils.sheet_to_json(sheet, { header: 1 })

      reviewers.forEach(async (reviewer: Array<string>, index) => {
        if (!index) return // leave first row
        if (!reviewer[0]) return

        // reviewer details
        // reviewer[0] represents email from which account is created
        // reviewer[1] represents name of reviewer
        // reviewer[2] represents reviewer sets

        // Generate a random password
        let charset =
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let password = ''
        for (let i = 0; i < 8; i++)
          password += charset.charAt(Math.floor(Math.random() * 62))
        reviewer.push(password)

        // Create account of reviewer using signup on new firebase app
        await createAccount(secondaryFirebaseApp, reviewer, password)

        if (index == reviewers.length - 1) {
          alert('Added all reviewers')
          // Delete firebase application created above
          secondaryFirebaseApp.delete()
        }
      })

      let newSheet = XLSX.utils.json_to_sheet(reviewers)
      XLSX.utils.book_append_sheet(readedData, newSheet, 'New Sheet')
      XLSX.writeFile(readedData, 'NewReviewers.xlsx')
    }

    reader.readAsBinaryString(file)
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
          Add New Reviewer
        </h1>
        <div className="flex justify-around mt-20 mb-10">
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-white text-base font-bold md:text-lg bg-gray-500 rounded-lg cursor-pointer w-max"
          />
          <input
            type="submit"
            onClick={proceed}
            className="text-white text-base md:text-lg bg-blue-850 ml-2 px-2 rounded-lg flex flex-row items-center cursor-pointer"
          />
        </div>
        <p className="text-red-850 text-center mb-40">
          Note: Provide the excel file containing the data in the specified
          format.
        </p>

        {!addedReviewers.length ? null : (
          <div className="my-10">
            <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
              Added Reviewers
            </h1>
            <div className="flex justify-center">
              <table className="border p-2">
                <thead>
                  <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Sets</th>
                  </tr>
                </thead>
                <tbody>
                  {addedReviewers.map((reviewer: Reviewer, index: number) => (
                    <tr key={index}>
                      <td className="border p-2">{reviewer.name}</td>
                      <td className="border p-2">{reviewer.email}</td>
                      <td className="border p-2">{reviewer.sets.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {!removedReviewers.length ? null : (
          <div className="my-10">
            <h1 className="text-sm sm:text-xl md:text-2xl bg-blue-850 my-10 text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
              Removed Reviewers
            </h1>
            <div className="flex justify-center">
              <table className="border p-2">
                <thead>
                  <tr>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Sets</th>
                  </tr>
                </thead>
                <tbody>
                  {removedReviewers.map((reviewer: Reviewer, index: number) => (
                    <tr key={index}>
                      <td className="border p-2">{reviewer.name}</td>
                      <td className="border p-2">{reviewer.email}</td>
                      <td className="border p-2">{reviewer.sets.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default requireAuth(AddReviewer, Roles.ADMIN)
