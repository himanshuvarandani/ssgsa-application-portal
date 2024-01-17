import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import logo from '../../../public/logo.png'
import { useAuth } from '../../../context/AuthUserContext'

export default function ApplicationsHeader() {
  const [active, setActive] = useState(false)
  const router = useRouter()
  const { signOut } = useAuth()

  const handleClick = () => {
    setActive(!active)
  }
  return (
    <nav className="sticky top-0 z-50 bg-red-850">
      <div className="w-full flex flex-row bg-white items-center flex">
        <div className="flex-1 text-xl sm:text-2xl md:text-3xl justify-center px-4 my-6 lg:ml-24 flex items-center font-black text-red-850 ">
          <Link href="/">
            <a className="cursor-pointer">SIR SYED GLOBAL SCHOLAR AWARD</a>
          </Link>
        </div>
        <div className="mr-3 flex-2">
          <Link href="/">
            <Image
              width={110}
              height={110}
              src={logo}
              alt="SSGSA Logo"
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>
      <div className="mx-auto md:mx-0 px-4 md:px-1">
        <div className="md:hidden flex justify-between">
          <div className="text-white m-1 text-xl font-bold">SSGSA ADMIN</div>

          <div className="flex items-center">
            <button
              className="mobile-menu-button hover:bg-red-500 text-white"
              onClick={handleClick}
            >
              <div className="flex justify-end ...">
                <div>
                  <svg
                    className="w-7 h-7 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div
          className={`${
            active ? 'pt-1 pb-3 md:py-0' : 'hidden'
          } md:flex md:justify-between`}
        >
          <div className="flex flex-col w-full md:flex-row md:justify-center lg:ml-28">
            <div className="bg-white pt-0.5 md:pt-0 md:pl-0.5">
              <Link href="/admin/applications/partial">
                <a
                  className={`py-2 px-2 text-white flex md:flex-col md:items-center md:justify-center space-x-5 md:space-x-0 h-full w-full cursor-pointer text-sm md:text-base lg:text-lg ${
                    router.pathname == '/admin/applications/partial'
                      ? 'bg-blue-850'
                      : 'bg-red-850 hover:bg-blue-850'
                  }`}
                >
                  Partial Applications
                </a>
              </Link>
            </div>
            <div className="bg-white pt-0.5 md:pt-0 md:pl-0.5">
              <Link href="/admin/applications/completed">
                <a
                  className={`py-2 px-2 text-white flex md:flex-col md:items-center md:justify-center space-x-5 md:space-x-0 h-full w-full cursor-pointer text-sm md:text-base lg:text-lg ${
                    router.pathname == '/admin/applications/completed'
                      ? 'bg-blue-850'
                      : 'bg-red-850 hover:bg-blue-850'
                  }`}
                >
                  Completed Applications
                </a>
              </Link>
            </div>
            <div className="bg-white py-0.5 md:py-0 md:pl-0.5">
              <Link href={'/admin/applications/removed'}>
                <a
                  className={`py-2 px-2 text-white flex md:items-center md:justify-center space-x-5 md:space-x-0 h-full w-full cursor-pointer text-sm md:text-base lg:text-lg ${
                    router.pathname == '/admin/applications/removed'
                      ? 'bg-blue-850'
                      : 'bg-red-850 hover:bg-blue-850'
                  }`}
                >
                  Removed Applications
                </a>
              </Link>
            </div>
            <div className="bg-white pt-0.5 md:pt-0 md:pl-0.5">
              <Link href="/admin/applications/finalised-for-review">
                <a
                  className={`py-2 px-2 text-white flex md:flex-col md:items-center md:justify-center space-x-5 md:space-x-0 h-full w-full cursor-pointer text-sm md:text-base lg:text-lg ${
                    router.pathname ==
                    '/admin/applications/finalised-for-review'
                      ? 'bg-blue-850'
                      : 'bg-red-850 hover:bg-blue-850'
                  }`}
                >
                  Finalised Applications For Review
                </a>
              </Link>
            </div>
            <div className="bg-white py-0.5 md:py-0 md:pl-0.5">
              <Link href={'/admin/applications/reviewed'}>
                <a
                  className={`py-2 px-2 text-white flex md:items-center md:justify-center space-x-5 md:space-x-0 h-full w-full cursor-pointer text-sm md:text-base lg:text-lg ${
                    router.pathname == '/admin/applications/reviewed'
                      ? 'bg-blue-850'
                      : 'bg-red-850 hover:bg-blue-850'
                  }`}
                >
                  Reviewed Applications
                </a>
              </Link>
            </div>
            <div className="bg-white py-0.5 md:py-0 md:pl-0.5">
              <Link href={'/admin/applications/finalised-for-interview'}>
                <a
                  className={`py-2 px-2 text-white flex md:items-center md:justify-center space-x-5 md:space-x-0 h-full w-full cursor-pointer text-sm md:text-base lg:text-lg ${
                    router.pathname ==
                    '/admin/applications/finalised-for-interview'
                      ? 'bg-blue-850'
                      : 'bg-red-850 hover:bg-blue-850'
                  }`}
                >
                  Finalised Applications For Interview
                </a>
              </Link>
            </div>
          </div>
          <div className="bg-white py-0.5 md:py-0 md:px-0.5">
            <Link href={'/admin/applications/interviewed'}>
              <a
                className={`py-2 px-2 text-white flex md:items-center md:justify-center space-x-5 md:space-x-0 h-full w-full cursor-pointer text-sm md:text-base lg:text-lg ${
                  router.pathname == '/admin/applications/interviewed'
                    ? 'bg-blue-850'
                    : 'bg-red-850 hover:bg-blue-850'
                }`}
              >
                Interviewed Applications
              </a>
            </Link>
          </div>
          <div className="flex items-center justify-center mt-3 md:mt-0 ml-2 mr-3">
            <div className="bg-white py-0.5 px-0.5 my-2">
              <button
                className="py-2 px-2 bg-red-850 hover:bg-blue-850 text-white text-sm md:text-lg lg:text-xl w-max"
                onClick={signOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
