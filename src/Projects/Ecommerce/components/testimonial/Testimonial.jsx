import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'

function Testimonial() {
  const context = useContext(myContext)
  const { mode } = context

  const testimonials = [
    {
      name: "Ullas MP",
      role: "Founder & Developer – NovaCart",
      image: "https://ui-avatars.com/api/?name=Ullas+MP&background=ff4162&color=fff&size=200",
      review:
        "NovaCart was built with a vision to create a smooth, secure, and modern shopping experience. As both the founder and developer, I focused on performance, simplicity, and user satisfaction. Every feature is carefully crafted to deliver quality and trust.",
    },
    {
      name: "Ananya Rao",
      role: "Verified Customer",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      review:
        "Shopping on NovaCart was seamless. The interface is clean, the checkout is fast, and the products are exactly as described. Highly recommended!",
    },
    {
      name: "Karthik Menon",
      role: "Frequent Buyer",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      review:
        "What impressed me most is the smooth experience and fast loading speed. You can tell this platform was built with attention to detail.",
    },
  ]

  return (
    <section className="text-gray-600 body-font mb-16">
      <div className="container px-5 py-10 mx-auto">

        <h1
          className="text-center text-3xl font-bold"
          style={{ color: mode === 'dark' ? 'white' : 'black' }}
        >
          Testimonials
        </h1>

        <h2
          className="text-center text-2xl font-semibold mb-10"
          style={{ color: mode === 'dark' ? 'white' : 'black' }}
        >
          What people say about <span className="text-pink-500">NovaCart</span>
        </h2>

        <div className="flex flex-wrap -m-4">
          {testimonials.map((item, index) => (
            <div key={index} className="lg:w-1/3 mb-6 p-4">
              <div
                className="h-full text-center p-6 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                style={{
                  backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : 'white',
                  color: mode === 'dark' ? 'white' : '',
                }}
              >
                <img
                  alt="testimonial"
                  className="w-20 h-20 mb-6 object-cover object-center rounded-full inline-block border-2 border-pink-500"
                  src={item.image}
                />

                <p className="leading-relaxed mb-4 text-sm">
                  {item.review}
                </p>

                <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-4 mb-4" />

                <h2
                  className="font-semibold tracking-wider text-sm uppercase"
                  style={{ color: mode === 'dark' ? '#ff4162' : 'black' }}
                >
                  {item.name}
                </h2>

                <p className="text-gray-500 text-sm">{item.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Testimonial
