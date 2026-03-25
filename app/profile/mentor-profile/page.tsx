'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from "next/navigation";


export default function ProfilePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [university, setUniversity] = useState('');
  const [universityCountry, setUniversityCountry] = useState('');
  const [nationality, setNationality] = useState('');
  const [major, setMajor] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [shortBio, setShortBio] = useState('');
  const [helpSchools, setHelpSchools] = useState('');
  const [helpMajors, setHelpMajors] = useState('');
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');

  const router = useRouter();


  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from('mentors')
        .select(`
          university,
          university_country,
          nationality,
          major,
          graduation_year,
          short_bio,
          help_schools,
          help_majors,
          profile_photo_url
        `)
        .eq('id', user.id)
        .single();

      if (error || !data) return;

      setUniversity(data.university ?? '');
      setUniversityCountry(data.university_country ?? '');
      setNationality(data.nationality ?? '');
      setMajor(data.major ?? '');
      setGraduationYear(data.graduation_year ?? '');
      setShortBio(data.short_bio ?? '');
      setHelpSchools((data.help_schools ?? []).join(', '));
      setHelpMajors((data.help_majors ?? []).join(', '));
      setProfilePhotoUrl(data.profile_photo_url ?? '');
    };

    loadProfile();
  }, []);

  const saveProfile = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { error } = await supabase.from('mentors').upsert({
      id: user.id,
      university,
      university_country: universityCountry,
      nationality,
      major,
      graduation_year: graduationYear,
      short_bio: shortBio,
      help_schools: helpSchools
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      help_majors: helpMajors
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      profile_photo_url: profilePhotoUrl,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert('Profile updated!');
    router.push('/mentor/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center py-12 px-4">
      <div className="w-full max-w-xl rounded-2xl border border-gray-300 bg-white p-8 shadow-md">
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-700">Step {step} of 3</p>
          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-gray-300">
            <div
              className="h-full rounded-full bg-black transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <h1 className="mb-2 text-3xl font-bold text-black">
          Complete your mentor profile
        </h1>
        <p className="mb-6 text-sm text-gray-600">
          Add your details so students can get to know you better.
        </p>

        {step === 1 && (
          <div className="space-y-4">
            <input
              placeholder="University"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 text-black placeholder-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-300"
            />

            <input
              placeholder="Country of University"
              value={universityCountry}
              onChange={(e) => setUniversityCountry(e.target.value)}
              className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 text-black placeholder-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-300"
            />

            <input
              placeholder="Nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 text-black placeholder-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-300"
            />

            <input
              placeholder="Course / Major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 text-black placeholder-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-300"
            />

            <input
              placeholder="Graduation Year"
              value={graduationYear}
              onChange={(e) => setGraduationYear(e.target.value)}
              className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 text-black placeholder-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-300"
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <textarea
              placeholder="Short bio"
              value={shortBio}
              onChange={(e) => setShortBio(e.target.value)}
              className="min-h-[120px] w-full rounded-xl border border-gray-400 bg-white px-4 py-3 text-black placeholder-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-300"
            />

            <input
              placeholder="What schools can you help with? (comma separated)"
              value={helpSchools}
              onChange={(e) => setHelpSchools(e.target.value)}
              className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 text-black placeholder-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-300"
            />

            <input
              placeholder="What majors can you help with? (comma separated)"
              value={helpMajors}
              onChange={(e) => setHelpMajors(e.target.value)}
              className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 text-black placeholder-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-300"
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <input
              placeholder="Profile photo URL"
              value={profilePhotoUrl}
              onChange={(e) => setProfilePhotoUrl(e.target.value)}
              className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 text-black placeholder-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-300"
            />

            {profilePhotoUrl && (
              <div className="flex items-center gap-4 rounded-xl border border-gray-300 bg-gray-50 p-4">
                <img
                  src={profilePhotoUrl}
                  alt="Profile preview"
                  className="h-24 w-24 rounded-full border border-gray-400 object-cover"
                />
                <div>
                  <p className="font-medium text-black">Profile preview</p>
                  <p className="text-sm text-gray-600">
                    Make sure your photo is clear and friendly.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 flex justify-between gap-3">
          <button
            onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
            disabled={step === 1}
            className="rounded-xl border border-gray-400 bg-white px-5 py-2.5 font-medium text-black transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Back
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep((prev) => Math.min(prev + 1, 3))}
              className="rounded-xl bg-black px-5 py-2.5 font-medium text-white transition hover:bg-gray-800"
            >
              Next
            </button>
          ) : (
            <button
              onClick={saveProfile}
              disabled={loading}
              className="rounded-xl bg-black px-5 py-2.5 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}