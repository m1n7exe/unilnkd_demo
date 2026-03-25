export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-black">

      {/* INTRO */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            About
          </p>

          <h1 className="mt-4 text-5xl font-bold md:text-6xl">
            Who I Am
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-700">
            UNILNKD was built from a simple idea — students should not have to
            navigate the admissions process alone. I created this platform to
            make mentorship more accessible by connecting students with people
            who have already gone through the same journey.
          </p>

        </div>

        {/* FOUNDER CARD */}
        <div className="mx-auto mt-20 max-w-3xl">
          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-10 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="flex flex-col items-center text-center">

              {/* Profile Image */}
              <img
                src="/images/cto.jpg"
                alt="Your Name"
                className="h-40 w-40 rounded-full object-cover shadow-md"
              />

              {/* Name */}
              <h2 className="mt-6 text-3xl font-semibold">
                Zayn
              </h2>

              {/* Role */}
              <p className="mt-2 font-medium text-gray-600">
                Founder, CEO & CTO
              </p>

              {/* Bio */}
              <p className="mt-6 leading-relaxed text-gray-700">
                I am a student and builder passionate about creating solutions
                that solve real problems. After going through the challenges of
                applications myself, I realised how much of the process depends
                on access to the right people and guidance.
              </p>

              <p className="mt-4 leading-relaxed text-gray-700">
                UNILNKD is my attempt to level the playing field — making
                mentorship more accessible, structured, and personalised for
                every student, regardless of their background.
              </p>

              {/* Optional vision line */}
              <p className="mt-6 text-sm text-gray-500">
                Building the future of student mentorship.
              </p>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}