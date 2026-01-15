import TestimonialCarousel from "@/app/components/TestimonialCarousel"

import Navbar from "@/app/components/common/Navbar"; // import your navbar
const testimonials = [
  { name: "Sarah Lim", role: "Student", text: "This platform helped me understand my career path better." },
  { name: "James Tan", role: "Student", text: "The mentors are experienced and guided me through university applications." },
  { name: "Maya Wong", role: "Student", text: "I was able to connect with a mentor who truly understood my challenges." },
];

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
<main
  className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 text-white"
  style={{
    backgroundImage: "url('/images/background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Optional overlay for better readability */}
  <div className="absolute inset-0 bg-black opacity-50"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center" >
    <h1 className="text-5xl font-bold">
      Connect with Mentors from your Dream University
    </h1>

    <p className="mt-6 max-w-xl text-lg text-center ">
      Get real application advice, personal statement feedback,
      and honest insights from students who’ve already made it.
    </p>

    <div className="mt-8 flex gap-4 justify-center">
      <a
        href="/signup"
        className="px-6 py-3 bg-white text-black rounded-lg"
      >
        Get Started
      </a>

      <a
        href="/seniors"
        className="px-6 py-3 border border-white rounded-lg text-white"
      >
        Browse Mentors
      </a>
    </div>
  </div>
</main>


   <section className="bg-white text-black px-6 py-24">
  <div className="mx-auto max-w-3xl text-center">
    <h2 className="text-6xl font-bold">What We Offer</h2>
    <p className="mt-4 text-gray-700 text-lg leading-relaxed">
      Our mentorship platform provides personalised support across admissions, interviews, and career guidance to help students make informed decisions and achieve their goals.
    </p>
  </div>

  <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

    {/* Card 1 */}
    <div className="rounded-xl border-2 border-black p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <h3 className="text-xl font-semibold">One-to-One Mentorship Matching</h3>
      <p className="mt-4 text-gray-700 text-sm leading-relaxed">
        Get matched with mentors from your target universities based on your goals, course preferences, and background.
      </p>
    </div>

    {/* Card 2 */}
    <div className="rounded-xl border-2 border-black p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <h3 className="text-xl font-semibold">University & Polytechnic Admissions Guidance</h3>
      <p className="mt-4 text-gray-700 text-sm leading-relaxed">
        Receive clear, step-by-step guidance on applications, requirements, timelines, and decision-making.
      </p>
    </div>

    {/* Card 3 */}
    <div className="rounded-xl border-2 border-black p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <h3 className="text-xl font-semibold">Interview & Portfolio Coaching</h3>
      <p className="mt-4 text-gray-700 text-sm leading-relaxed">
        Prepare confidently with mock interviews, portfolio reviews, and personalised feedback from experienced mentors.
      </p>
    </div>

    {/* Card 4 */}
    <div className="rounded-xl border-2 border-black p-8 text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <h3 className="text-xl font-semibold">Career & Pathway Insights</h3>
      <p className="mt-4 text-gray-700 text-sm leading-relaxed">
        Understand course pathways, career trajectories, and post-graduation outcomes before making major decisions.
      </p>
    </div>

  </div>
</section>



{/* WHO WE ARE / TEAM SECTION */}
<section className="bg-white text-black px-6 py-24">
  <div className="mx-auto max-w-5xl text-center">
    <h2 className="text-6xl font-bold">Who We Are</h2>
    <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
      Meet the people behind our mission,  passionate educators and tech innovators dedicated to making mentorship accessible for all students.
    </p>
  </div>

<div className="mt-16 max-w-5xl mx-auto grid gap-16">

  {/* CEO */}
  <div className="grid md:grid-cols-2 items-center text-center md:text-left gap-8">
    <img
      src="/images/ceo.jpg"
      alt="CEO"
      className="w-48 h-48 object-cover rounded-full mx-auto"
    />
    <div>
      <h3 className="text-2xl font-semibold">Ngo Zun Yin</h3>
      <p className="mt-2 text-gray-700 font-medium">CEO & Co-Founder</p>
      <p className="mt-4 text-gray-700 leading-relaxed">
        A graduate of Raffles Institution and incoming Master’s student in Mechanical Engineering at Imperial College London, Zun Yin is passionate about physics and education. He founded a community project to raise awareness of social anxiety among youth in Singapore and understands firsthand the challenges students face in accessing guidance. In his free time, he enjoys chess and reading, aiming to become a candidate master.
      </p>
    </div>
  </div>

  {/* CTO */}
  <div className="grid md:grid-cols-2 items-center text-center md:text-left gap-8">
    <img
      src="/images/cto.jpg"
      alt="CTO"
      className="w-48 h-48 object-cover rounded-full mx-auto"
    />
    <div>
      <h3 className="text-2xl font-semibold">Min Zayn Thar</h3>
      <p className="mt-2 text-gray-700 font-medium">CTO & Co-Founder</p>
      <p className="mt-4 text-gray-700 leading-relaxed">
        Zayn is a software developer and cybersecurity professional who recently graduated from Ngee Ann Polytechnic with a Diploma in Information Technology, he is currently pursuing his Bachelors in Computer Science (Cybersecurity). His notable accomplishment is developing an Internal Payment Software for a previous company which reduced the entire payment processing time by 50 percent. He is also an avid CTF player and is Captain of his own CTF Team, RedFlags. In his free time, he loves playing rugby and watching F1, and aims to be an amateur racer one day.
      </p>
    </div>
  </div>

</div>


</section>

<section
  id="testimonials"
  className="px-6 py-16 bg-gray-50"
  aria-labelledby="testimonials-heading"
>
  <div className="max-w-5xl mx-auto">
    <h2
      id="testimonials-heading"
      className="text-3xl font-bold text-center mb-12"
    >
      What Our Mentees Say
    </h2>

    <div className="relative">
      <TestimonialCarousel testimonials={testimonials} />
    </div>
  </div>3
</section>




    </>
  )
}
