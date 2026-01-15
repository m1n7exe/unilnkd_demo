export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <a href="/" className="text-xl font-bold text-black">
          UNILNK△0
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/seniors" className="text-gray-700 hover:text-black">
            About Us
          </a>
          <a href="/find-a-mentor" className="text-gray-700 hover:text-black">
            Find A Mentor
          </a>
          <a href="/for-investors" className="text-gray-700 hover:text-black">
            For Investors
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <a href="/login" className="text-gray-700 hover:text-black">
            Log in
          </a>
          <a
            href="/signup"
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Sign up
          </a>
        </div>

      </div>
    </nav>
  )
}
