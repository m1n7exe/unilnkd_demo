import TestimonialCarousel from "@/app/components/TestimonialCarousel"
import WhyBecomeMentor from "@/app/components/WhyBecomeMentor";
import Footer from "./components/Footer";


import Navbar from "@/app/components/common/Navbar"; // import your navbar
import WhatWeOffer from "./components/WhatWeOffer";
import HowItWorksTimeline from "./components/HowItWorksTimeline";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
<main className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 text-white overflow-hidden"
  style={{
    backgroundImage: "url('/images/background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-950/70 to-black/80 backdrop-blur-sm"></div>

  {/* Glow */}
  <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full top-[-100px] left-[-100px]"></div>

  <div className="relative z-10 flex flex-col items-center max-w-4xl">
    <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight opacity-0 translate-y-6 animate-[fadeUp_0.8s_ease-out_forwards]">
      Connect with Mentors from your <span className="text-white">Dream School</span>
    </h1>
    <p className="mt-6 text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl opacity-0 translate-y-6 animate-[fadeUp_0.8s_ease-out_0.2s_forwards]">
      Get real application advice, personal statement feedback, and honest insights from students who’ve already made it.
    </p>
    <div className="mt-10 flex gap-4 justify-center opacity-0 translate-y-6 animate-[fadeUp_0.8s_ease-out_0.4s_forwards]">
      <a href="/signup" className="px-6 py-3 bg-white text-blue-950 rounded-lg font-medium hover:opacity-90 transition shadow-lg">
        Get Started
      </a>
      <a href="/find-a-mentor" className="px-6 py-3 border border-white/30 rounded-lg text-white hover:bg-white/10 transition backdrop-blur">
        Browse Mentors
      </a>
    </div>
  </div>
</main>

<TestimonialCarousel />

<WhatWeOffer />

<HowItWorksTimeline />

<WhyBecomeMentor />



 <Footer />



    </>
  )
}
