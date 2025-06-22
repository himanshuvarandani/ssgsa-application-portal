import Link from 'next/link'

const Banner = ({ message, link }) => {
  return (
    <div className="bg-gray-350 text-red-850 font-black w-screen -ml-2 sm:-ml-5 md:-ml-10 lg:-ml-20 xl:-ml-40 mt-4 lg:mr-2 lg:p-3 p-2">
      <marquee className="flex items-center">
        {link != '' ? (
          <Link href={link}>
            <a>{message}</a>
          </Link>
        ) : (
          message
        )}
      </marquee>
    </div>
  )
}

export default Banner
