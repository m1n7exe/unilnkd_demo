'use client';

import { motion } from 'framer-motion';

const offers = [
  {
    title: 'One-to-One Mentorship Matching',
    description:
      'Get matched with mentors from your target universities based on your goals, course preferences, and background.',
  },
  {
    title: 'University & Polytechnic Admissions Guidance',
    description:
      'Step-by-step guidance on applications, requirements, timelines, and decision-making.',
  },
  {
    title: 'Interview & Portfolio Coaching',
    description:
      'Prepare with mock interviews, portfolio reviews, and personalised mentor feedback.',
  },
  {
    title: 'Career & Pathway Insights',
    description:
      'Understand course pathways, career trajectories, and post-graduation outcomes.',
  },
];

export default function WhatWeOfferAnimated() {
  return (
    <section className="bg-gray-50 px-6 py-24">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          What We Offer
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Our platform connects aspiring students with successful mentors, providing personalized guidance across admissions, interviews, and career pathways.
        </p>
      </div>

      <div className="mx-auto max-w-6xl grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((offer, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: idx * 0.2, type: 'spring', stiffness: 100 }}
            className="bg-white rounded-2xl p-6 cursor-pointer transform transition-transform duration-300 
              shadow-[0_10px_25px_rgba(0,0,139,0.2)] hover:shadow-[0_25px_50px_rgba(0,0,139,0.35)] 
              hover:-translate-y-2 hover:scale-105"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {offer.title}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{offer.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}