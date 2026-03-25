'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function StudentProfilePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1 — Current Education
  const [school, setSchool] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [country, setCountry] = useState('');

  // Step 2 — Current Course
  const [primaryCourse, setPrimaryCourse] = useState('');
  const [primarySchool, setPrimarySchool] = useState('');

  // Step 3 — Targets
  const [targetCourses, setTargetCourses] = useState('');
  const [targetSchools, setTargetSchools] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from('student_profiles')
        .select(`
          school,
          education_level,
          country,
          primary_course,
          primary_school,
          target_courses,
          target_schools
        `)
        .eq('id', user.id)
        .single();

      if (error || !data) return;

      setSchool(data.school ?? '');
      setEducationLevel(data.education_level ?? '');
      setCountry(data.country ?? '');
      setPrimaryCourse(data.primary_course ?? '');
      setPrimarySchool(data.primary_school ?? '');
      setTargetCourses((data.target_courses ?? []).join(', '));
      setTargetSchools((data.target_schools ?? []).join(', '));
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

    const { error } = await supabase.from('students').upsert({
      id: user.id,
      school,
      education_level: educationLevel,
      country,
      primary_course: primaryCourse,
      primary_school: primarySchool,
      target_courses: targetCourses
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      target_schools: targetSchools
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert('Profile saved!');
    router.push('/student/dashboard');
  };

  const inputClass =
    'w-full rounded-xl border border-gray-400 bg-white px-4 py-3 text-black placeholder-gray-500 outline-none transition focus:border-black focus:ring-2 focus:ring-gray-300';

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center py-12 px-4">
      <div className="w-full max-w-xl rounded-2xl border border-gray-300 bg-white p-8 shadow-md">

        {/* Progress */}
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
          Complete your student profile
        </h1>
        <p className="mb-6 text-sm text-gray-600">
          Help us match you with the right mentors by sharing your background and goals.
        </p>

        {/* ── Step 1: Current Education ── */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Current School / Institution
              </label>
              <input
                placeholder="e.g. National University of Singapore"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Education Level
              </label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className={inputClass}
              >
                <option value="">Select level…</option>
                <option>High School</option>
                <option>Diploma / Foundation</option>
                <option>Undergraduate (Year 1)</option>
                <option>Undergraduate (Year 2)</option>
                <option>Undergraduate (Year 3)</option>
                <option>Undergraduate (Year 4+)</option>
                <option>Postgraduate (Masters)</option>
                <option>Postgraduate (PhD)</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Country
              </label>
              <input
                placeholder="e.g. Singapore"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        )}

        {/* ── Step 2: Current Course ── */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Current Course / Major
              </label>
              <input
                placeholder="e.g. Computer Science, Business Administration"
                value={primaryCourse}
                onChange={(e) => setPrimaryCourse(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Current / Most Recent School
              </label>
              <input
                placeholder="e.g. Nanyang Polytechnic"
                value={primarySchool}
                onChange={(e) => setPrimarySchool(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        )}

        {/* ── Step 3: Targets ── */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Target Courses
              </label>
              <input
                placeholder="e.g. MBA, Law, Medicine  (comma separated)"
                value={targetCourses}
                onChange={(e) => setTargetCourses(e.target.value)}
                className={inputClass}
              />
              <p className="mt-1.5 text-xs text-gray-400">
                Separate multiple courses with a comma.
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Target Schools
              </label>
              <input
                placeholder="e.g. Oxford, MIT, Harvard  (comma separated)"
                value={targetSchools}
                onChange={(e) => setTargetSchools(e.target.value)}
                className={inputClass}
              />
              <p className="mt-1.5 text-xs text-gray-400">
                Separate multiple schools with a comma.
              </p>
            </div>

            {/* Summary preview */}
            {(targetCourses || targetSchools) && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Your targets
                </p>
                {targetCourses && (
                  <div className="flex flex-wrap gap-2">
                    {targetCourses.split(',').map((c) => c.trim()).filter(Boolean).map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
                {targetSchools && (
                  <div className="flex flex-wrap gap-2">
                    {targetSchools.split(',').map((s) => s.trim()).filter(Boolean).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-black px-3 py-1 text-xs font-medium text-black"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
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