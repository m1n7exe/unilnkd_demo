"use client";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

// Define a type for each testimonial
type Testimonial = {
  name: string;
  role: string;
  text: string;
};

// Define the props for the component
type Props = {
  testimonials: Testimonial[];
};

export default function TestimonialCarousel({ testimonials }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevTestimonial = () =>
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const nextTestimonial = () =>
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <div className="text-center">
        <p className="text-gray-700 text-lg">{testimonials[currentIndex].text}</p>
        <h4 className="mt-4 text-xl font-semibold">{testimonials[currentIndex].name}</h4>
        <p className="text-gray-500">{testimonials[currentIndex].role}</p>
      </div>

      <button
        onClick={prevTestimonial}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full hover:bg-gray-200"
      >
        <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
      </button>
      <button
        onClick={nextTestimonial}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full hover:bg-gray-200"
      >
        <ChevronRightIcon className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
}
