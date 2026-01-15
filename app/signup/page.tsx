"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [role, setRole] = useState<"mentor" | "mentee" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

const handleSignUp = async () => {
  if (!role || !email || !password || !fullName) return;
  setLoading(true);

  try {
    // 1️⃣ Create auth user + session
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (authError) throw authError;

    const userId = authData.user?.id;
    if (!userId) throw new Error("Failed to get user ID.");

    // 2️⃣ Immediately insert profile
    const { error: profileError } = await supabase.from("profiles").insert({
      id: userId,
      full_name: fullName,
      role: role,
    });
    if (profileError) throw profileError;

    alert("Sign up successful!");
  } catch (err: any) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <div className="w-full max-w-md border border-black/10 rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-center">Create an account</h1>
        <p className="text-sm text-gray-500 text-center mt-2">Sign up with your email</p>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-black/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-black/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-black/20 rounded-xl px-4 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-black"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? "◎" : "◉"}
            </button>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium mb-2">I want to sign up as</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setRole("mentor")}
              className={`rounded-xl py-2 border transition ${
                role === "mentor"
                  ? "bg-black text-white border-black"
                  : "border-black/20 hover:border-black"
              }`}
            >
              Mentor
            </button>
            <button
              onClick={() => setRole("mentee")}
              className={`rounded-xl py-2 border transition ${
                role === "mentee"
                  ? "bg-black text-white border-black"
                  : "border-black/20 hover:border-black"
              }`}
            >
              Mentee
            </button>
          </div>
        </div>

        <button
          disabled={!role || !email || !password || !fullName || loading}
          onClick={handleSignUp}
          className="w-full mt-8 rounded-xl py-2 bg-black text-white disabled:opacity-40"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="text-xs text-gray-500 text-center mt-6">
          Already have an account? <span className="underline cursor-pointer">Log in</span>
        </p>
      </div>
    </main>
  );
}
