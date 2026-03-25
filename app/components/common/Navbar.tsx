'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Animate in
    setShow(true);

    // Get initial user
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b border-white/10 
      bg-blue-950/90 backdrop-blur transition-all duration-700 ease-out
      ${show ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}
    >
      <div className="mx-auto flex max-w-7xl items-center px-6 py-4">
        
        {/* Left */}
        <div className="flex flex-1">
          <a href="/" className="text-xl font-semibold tracking-tight text-white">
            unilnkd
          </a>
        </div>

        {/* Center */}
        <div className="hidden md:flex flex-1 items-center justify-center gap-10">
          <a href="/about-us" className="text-gray-300 hover:text-white transition">
            About Us
          </a>
          <a href="/find-a-mentor" className="text-gray-300 hover:text-white transition">
            Find a Mentor
          </a>
          <a href="/for-investors" className="text-gray-300 hover:text-white transition">
            For Investors
          </a>
        </div>

        {/* Right */}
        <div className="flex flex-1 items-center justify-end gap-4">
          {!user ? (
            <>
              <a
                href="/signup"
                className="text-gray-300 hover:text-white transition"
              >
                Become a Mentor
              </a>

              <a
                href="/login"
                className="rounded-lg border border-white/20 px-4 py-2 text-white hover:bg-white/10 transition"
              >
                Log in
              </a>

              <a
                href="/signup"
                className="rounded-lg bg-white px-4 py-2 text-blue-950 font-medium hover:opacity-90 transition"
              >
                Sign up
              </a>
            </>
          ) : (
            <>
              <a
                href="/mentor/dashboard"
                className="text-gray-300 hover:text-white transition"
              >
                Dashboard
              </a>

              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = '/';
                }}
                className="rounded-lg border border-white/20 px-4 py-2 text-white hover:bg-white/10 transition"
              >
                Sign out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}