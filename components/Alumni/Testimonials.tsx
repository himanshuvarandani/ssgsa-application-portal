import { useEffect, useRef, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import Image from 'next/image'
import { TestimonialType } from '../../types'
import { getTestimonials } from '../../pages/api/constants'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Array<TestimonialType>>([])
  const [error, setError] = useState<string>('')
  const carouselRef = useRef(null)
  let resetTimeout

  useEffect(() => {
    getTestimonials()
      .then((data) => setTestimonials(Object.values(data)))
      .catch(() => setError('Not able to get testimonials, Try again!'))
  }, [])

  return (
    <div id="Testimonials">
      <h1 className="my-8 mx-4 sm:mx-12 lg:mx-20 bg-blue-850 lg:text-2xl text-xl text-white text-center font-extrabold py-2 rounded-tl-3xl rounded-br-3xl">
        Testimonials
      </h1>

      {!error ? (
        <div className=" mx-4 sm:mx-12 lg:mx-20 my-8">
          <Carousel
            ref={carouselRef}
            itemsToShow={1}
            enableAutoPlay={true}
            autoPlaySpeed={30000}
            showArrows={false}
            onNextEnd={({ index }) => {
              clearTimeout(resetTimeout)
              if (index === Object.keys(testimonials).length - 1) {
                resetTimeout = setTimeout(() => {
                  if (carouselRef.current) carouselRef.current.goTo(0)
                }, 30000)
              }
            }}
            isRTL={false}
          >
            {testimonials.map((testimonial, index) => (
              <div
                className="flex flex-col md:flex-row items-center bg-red-850 rounded-tl-3xl rounded-br-3xl"
                key={index}
              >
                <div className="flex flex-col items-center justify-center text-center m-2 p-2 md:w-1/3 lg:w-1/4">
                  <div className="relative rounded-full border-4 border-white overflow-hidden p-0 w-40 h-40">
                    <Image
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      layout="fill"
                    />
                  </div>
                  <p className="font-bold text-white sm:text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-white text-xs lg:text-sm">
                    {testimonial.position}
                  </p>
                </div>
                <div className="flex items-center text-white text-xs sm:text-sm m-4 sm:m-8 md:w-2/3 lg:w-3/4">
                  <p>{testimonial.words}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <div>
          <h3 className="text-red-850 text-center text-lg lg:text-xl">
            <span className="font-bold">Error -</span> {error}
          </h3>
        </div>
      )}
    </div>
  )
}

export default Testimonials
