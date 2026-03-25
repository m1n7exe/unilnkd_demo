export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        

        {/* Social Links */}
        <div className="flex items-center gap-6 text-gray-600">
          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:text-black transition"
          >
            Instagram
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            className="hover:text-black transition"
          >
            Facebook
          </a>

          <a
            href="https://tiktok.com"
            target="_blank"
            className="hover:text-black transition"
          >
            TikTok
          </a>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} UNILNKD. All rights reserved.
        </div>

      </div>
    </footer>
  );
}