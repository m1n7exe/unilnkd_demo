export default function ForInvestorsPage() {
  return (
    <div className="min-h-screen w-full bg-white text-black py-20">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="mb-8 text-4xl font-bold">For Investors</h1>

        <p className="mb-4 leading-relaxed text-gray-700">
          UNILNKD is a mentorship and admissions-support platform designed to help
          students navigate one of the most important transitions in their academic
          journey. By connecting students with mentors who have successfully gone
          through the same admissions pathways, our platform provides guidance that
          is practical, credible, and experience-based.
        </p>

        <p className="mb-4 leading-relaxed text-gray-700">
          Today’s students often approach university and scholarship applications
          with limited information and unequal access to support networks. UNILNKD
          addresses this gap by offering a structured and scalable mentorship model,
          where verified mentors provide transparent, personalised guidance to help
          students make informed decisions.
        </p>

        <h2 className="mt-10 mb-3 text-2xl font-semibold">Our Mission</h2>
        <p className="mb-4 leading-relaxed text-gray-700">
          To make admissions guidance more accessible, affordable, and trustworthy
          for students navigating applications, scholarships, and early academic
          decisions.
        </p>

        <h2 className="mt-10 mb-3 text-2xl font-semibold">Our Vision</h2>
        <p className="mb-4 leading-relaxed text-gray-700">
          To become a leading mentorship platform in Singapore and Southeast Asia,
          helping students access the guidance they need to achieve their academic
          and professional aspirations.
        </p>

        <h2 className="mt-10 mb-3 text-2xl font-semibold">
          The Problem We Solve
        </h2>
        <p className="mb-4 leading-relaxed text-gray-700">
          Every year, thousands of students navigate university admissions and
          scholarship applications with insufficient support. Access to reliable
          mentorship often depends on personal networks, creating an uneven playing
          field for many students.
        </p>

        <p className="mb-4 leading-relaxed text-gray-700">
          Existing alternatives such as tuition centres, agencies, or generic
          online resources are frequently expensive, inconsistent in quality, or
          lack the personalised insights students truly need. UNILNKD bridges this
          gap by providing a platform where students can connect directly with
          mentors who have real, relevant experience.
        </p>

        {/* Contact Box */}
        <div className="mt-16 rounded-2xl border border-gray-200 bg-gray-50 p-10">
          <h2 className="text-2xl font-semibold text-center">Contact Us</h2>

          <p className="mt-4 text-center text-gray-700 leading-relaxed">
            We welcome conversations with investors and partners who share our
            vision of improving access to mentorship and admissions guidance.
          </p>

          <form
            action="mailto:mintharoffice@gmail.com"
            method="POST"
            encType="text/plain"
            className="mt-8 space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full rounded-lg border border-gray-300 p-3"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full rounded-lg border border-gray-300 p-3"
            />

            <input
              type="text"
              name="company"
              placeholder="Company / Firm (optional)"
              className="w-full rounded-lg border border-gray-300 p-3"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              required
              className="w-full rounded-lg border border-gray-300 p-3"
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-black px-6 py-3 text-white transition hover:opacity-90"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}