'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'mentor' | 'mentee' | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
  if (!fullName || !email || !password || !role) return;

  setLoading(true);
  setError('');

  try {
    // 1️⃣ Create auth user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;

    const user = data.user;

    if (!user) throw new Error('User not created');

    // 2️⃣ Insert into profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        full_name: fullName,
        role: role,
      });

    if (profileError) throw profileError;

    // 3️⃣ Redirect based on role

      if (role === 'mentee') {
      router.push('/profile/student-profile'); // → StudentProfilePage
    } else {
      router.push('/profile/mentor-profile'); // → Mentor profile setup
    }


  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="w-full max-w-md border border-black/10 rounded-2xl p-8">
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-center">Create an account</h1>
        <p className="text-sm text-gray-500 text-center mt-2">Sign up with your email</p>

        {/* Input Fields */}
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-black/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black text-black"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-black/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black text-black"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-black/20 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-black text-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? "◎" : "◉"}
            </button>
          </div>
        </div>

        {/* Role Selection */}
        <div className="mt-6">
          <p className="text-sm font-medium mb-2">I want to sign up as</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setRole("mentor")}
              className={`rounded-xl py-2 border transition ${
                role === "mentor"
                  ? "bg-blue-900 text-white border-blue-900"
                  : "border-black/20 hover:border-black"
              }`}
            >
              Mentor
            </button>
            <button
              onClick={() => setRole("mentee")}
              className={`rounded-xl py-2 border transition ${
                role === "mentee"
                  ? "bg-blue-900 text-white border-blue-900"
                  : "border-black/20 hover:border-black"
              }`}
            >
              Mentee
            </button>
          </div>
        </div>

        {/* Signup Button */}
        <button
          disabled={!role || !email || !password || !fullName || loading}
          onClick={handleSignUp}
          className="w-full mt-8 rounded-xl py-3 bg-blue-900 text-white font-medium hover:opacity-90 transition disabled:opacity-40"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Link to login */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/login')}
            className="underline cursor-pointer text-blue-900"
          >
            Log in
          </span>
        </p>

        {/* Error Message */}
        {error && <p className="text-sm text-red-500 text-center mt-4">{error}</p>}
      </div>
    </main>
  );
}

