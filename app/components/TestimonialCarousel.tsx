'use client';

const testimonials = [
  { name: "Sarah Lim", role: "Student", text: "This platform helped me understand my career path better." },
  { name: "James Tan", role: "Student", text: "The mentors are experienced and guided me through university applications." },
  { name: "Maya Wong", role: "Student", text: "I was able to connect with a mentor who truly understood my challenges." },
];

export default function AutoScrollingFeed() {
  const items = [...testimonials, ...testimonials, ...testimonials]; // triple for smooth loop

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="relative w-full max-w-[95vw] mx-auto">
        <div
          className="flex gap-6 w-max animate-scroll"
          style={{ display: 'flex' }}
        >
          {items.map((t, idx) => (
            <div
              key={idx}
              className="min-w-[400px] md:min-w-[450px] bg-white text-black rounded-3xl p-8 flex-shrink-0 hover:scale-105 transition-transform"
            >
              <p className="text-base md:text-lg leading-relaxed">"{t.text}"</p>
              <h4 className="mt-4 text-xl md:text-2xl font-semibold">{t.name}</h4>
              <p className="mt-1 text-gray-600">{t.role}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-scroll {
          animation: scroll 15s linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); } /* scroll by one-third of all items (since we tripled the array) */
        }
      `}</style>
    </section>
  );
}