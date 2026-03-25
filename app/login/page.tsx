'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const { data: userData } = await supabase.auth.getUser();

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userData.user?.id)
      .single();

    if (profile?.role === 'mentor') {
      router.push('/mentor/dashboard');
    } else if (profile?.role === 'mentee') {
      router.push('/student/dashboard');
    } else {
      router.push('/find-a-mentor');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md border border-black/10 rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-center text-black">Log In</h1>
        <p className="text-sm text-gray-500 text-center mt-2">Sign in with your email</p>

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-black/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black text-black"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-black/20 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-black text-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? '◎' : '◉'}
            </button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 rounded-xl py-3 bg-blue-900 text-white font-medium hover:opacity-90 transition disabled:opacity-40"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          Don’t have an account?{' '}
          <span
            onClick={() => router.push('/signup')}
            className="underline cursor-pointer text-blue-900"
          >
            Sign up
          </span>
        </p>
      </div>
    </main>
  );
}