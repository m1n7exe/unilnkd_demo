
'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Search a Mentor',
    description: 'Browse mentors by university, major, and experience to find the perfect match.',
  },
  {
    title: 'Book a Session',
    description: 'Pick a convenient time and confirm your session instantly.',
  },
  {
    title: 'Get Your Portfolio Ready',
    description: 'Receive personalized feedback to improve your applications and stand out.',
  },
];

export default function HowItWorksTimeline() {
  const circleSize = 96; // bigger, more impactful

  return (
    <section className="bg-gray-50 text-black px-6 py-24">
      <div className="mx-auto max-w-4xl text-center mb-16">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          This is How It Works
        </h2>
        <p className="mt-4 text-gray-700 text-lg leading-relaxed">
          Finding your mentor and getting started is easy. Just follow these simple steps to connect with experienced mentors and kickstart your university admissions journey.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between mx-auto max-w-4xl gap-12">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2, type: 'spring', stiffness: 120 }}
            className="flex flex-col items-center group"
          >
            {/* 3D Hover circle */}
            <div
              className="flex items-center justify-center rounded-full bg-blue-900 text-white font-bold mb-6 text-4xl
                         shadow-[0_8px_20px_rgba(0,0,139,0.25)] transition-transform duration-300
                         group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,139,0.35)]"
              style={{ width: circleSize, height: circleSize }}
            >
              {idx + 1}
            </div>

            {/* Step content */}
            <h3 className="text-xl font-semibold mb-2 text-center">{step.title}</h3>
            <p className="text-gray-700 text-sm text-center">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}