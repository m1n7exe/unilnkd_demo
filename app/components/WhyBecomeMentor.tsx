"use client";

import { motion } from "framer-motion";
import { HeartHandshake, Wallet, BadgeCheck } from "lucide-react";

const mentorBenefits = [
  {
    icon: HeartHandshake,
    title: "Give Back",
    description:
      "Help students applying to the same course you once worked hard to get into. Your experience can genuinely make their journey easier.",
  },
  {
    icon: Wallet,
    title: "Earn While Mentoring",
    description:
      "Turn your experience into value. Offer mentoring sessions, portfolio reviews, and interview support while earning on your own schedule.",
  },
  {
    icon: BadgeCheck,
    title: "Build Your Profile",
    description:
      "Develop communication and leadership skills, strengthen your resume, and build credibility through meaningful mentoring experience.",
  },
];

export default function WhyBecomeMentor() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white px-6 py-24 text-black">
      <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-blue-100 blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-indigo-100 blur-3xl opacity-50" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold"
        >
          Why Become a Mentor?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-lg leading-relaxed text-gray-700"
        >
          Share your experience, support students through their admissions
          journey, and grow your own profile while earning along the way.
        </motion.p>
      </div>

      <div className="relative mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {mentorBenefits.map((benefit, index) => {
          const Icon = benefit.icon;

          return (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm transition duration-300 hover:border-blue-200 hover:shadow-2xl"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 transition duration-300 group-hover:scale-110 group-hover:bg-blue-100">
                <Icon className="h-8 w-8 text-blue-900 transition duration-300 group-hover:rotate-3" />
              </div>

              <h3 className="mt-6 text-xl font-semibold">{benefit.title}</h3>

              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                {benefit.description}
              </p>

              <div className="mt-6 text-sm font-medium text-blue-900 opacity-0 transition duration-300 group-hover:opacity-100">
                Learn more →
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative mt-16 text-center"
      >
        <a
          href="/mentor-onboarding"
          className="inline-flex items-center rounded-xl bg-blue-900 px-8 py-3 text-lg text-white transition duration-300 hover:scale-105 hover:bg-blue-800 hover:shadow-lg"
        >
          Become a Mentor
        </a>
      </motion.div>
    </section>
  );
}