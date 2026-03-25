'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type StudentProfile = {
  school: string | null;
  education_level: string | null;
  country: string | null;
  primary_course: string | null;
  primary_school: string | null;
  target_courses: string[];
  target_schools: string[];
};

type Booking = {
  id: string;
  mentor_id: string | null;
  scheduled_at: string | null;
  duration_minutes: number | null;
  status: string | null;
  tag: string | null;
  meeting_link: string | null;
  mentor_name?: string | null;
};

export default function StudentDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const [{ data: profileData }, { data: nameData }, { data: bookingData }] = await Promise.all([
        supabase
          .from('students')
          .select('school, education_level, country, primary_course, primary_school, target_courses, target_schools')
          .eq('id', user.id)
          .single(),
        supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single(),
        supabase
          .from('bookings')
          .select('id, mentor_id, scheduled_at, duration_minutes, status, tag, meeting_link')
          .eq('student_id', user.id)
          .order('scheduled_at', { ascending: true }),
      ]);

      if (profileData) setProfile(profileData);
      if (nameData) setFullName(nameData.full_name);

      if (bookingData && bookingData.length > 0) {
        // Fetch mentor names from profiles
        const mentorIds = [...new Set(bookingData.map((b: Booking) => b.mentor_id).filter(Boolean))];
        const { data: mentorNames } = await supabase
          .from('profiles')
          .select('id, full_name')
          .in('id', mentorIds);

        const nameMap: Record<string, string> = {};
        (mentorNames ?? []).forEach((m: { id: string; full_name: string }) => {
          nameMap[m.id] = m.full_name;
        });

        setBookings(
          bookingData.map((b: Booking) => ({
            ...b,
            mentor_name: b.mentor_id ? (nameMap[b.mentor_id] ?? null) : null,
          }))
        );
      }

      setLoading(false);
    };

    loadData();
  }, []);

  const cancelBooking = async (id: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString(),
        cancelled_by: 'student',
      })
      .eq('id', id);

    if (!error) {
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  const targetCourses = profile?.target_courses ?? [];
  const targetSchools = profile?.target_schools ?? [];

  const pending = bookings.filter((b) => b.status === 'pending');
  const confirmed = bookings.filter((b) => b.status === 'confirmed');
  const completed = bookings.filter((b) => b.status === 'completed');

  const formatDate = (iso: string | null) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-SG', {
      weekday: 'short', day: 'numeric', month: 'short',
      year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  const statusPill = (status: string | null) => {
    const map: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-gray-100 text-gray-600',
    };
    return map[status ?? ''] ?? 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-200 px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Student Dashboard</p>
            <h1 className="mt-1 text-3xl font-bold text-black">{fullName ?? 'Your Dashboard'}</h1>
            <p className="mt-0.5 text-sm text-gray-500">
              {profile?.primary_course ?? ''}
              {profile?.school ? ` · ${profile.school}` : ''}
            </p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-lg font-bold text-white flex-shrink-0">
            {fullName?.charAt(0) ?? '?'}
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Pending Requests', value: pending.length },
            { label: 'Confirmed Sessions', value: confirmed.length },
            { label: 'Completed Sessions', value: completed.length },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl border border-gray-300 bg-white p-5 shadow-sm text-center">
              <p className="text-3xl font-bold text-black">{value}</p>
              <p className="mt-1 text-xs font-medium text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        {/* Pending Bookings */}
        <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
          <p className="mb-5 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Pending Requests
          </p>
          {pending.length === 0 ? (
            <p className="text-sm text-gray-400">No pending requests.</p>
          ) : (
            <div className="space-y-3">
              {pending.map((b) => (
                <div key={b.id} className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-black">{b.mentor_name ?? '—'}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(b.scheduled_at)}
                      {b.duration_minutes ? ` · ${b.duration_minutes} min` : ''}
                      {b.tag ? ` · ${b.tag}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusPill(b.status)}`}>
                      {b.status}
                    </span>
                    <button
                      onClick={() => cancelBooking(b.id)}
                      className="rounded-xl border border-gray-400 bg-white px-4 py-2 text-xs font-medium text-black transition hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Confirmed Sessions */}
        <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
          <p className="mb-5 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Upcoming Sessions
          </p>
          {confirmed.length === 0 ? (
            <p className="text-sm text-gray-400">No upcoming sessions.</p>
          ) : (
            <div className="space-y-3">
              {confirmed.map((b) => (
                <div key={b.id} className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-black">{b.mentor_name ?? '—'}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(b.scheduled_at)}
                      {b.duration_minutes ? ` · ${b.duration_minutes} min` : ''}
                      {b.tag ? ` · ${b.tag}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {b.meeting_link && (
                      <a
                        href={b.meeting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl bg-black px-4 py-2 text-xs font-medium text-white transition hover:bg-gray-800"
                      >
                        Join
                      </a>
                    )}
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusPill(b.status)}`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Summary */}
        <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Your Profile</p>
            <button
              onClick={() => router.push('/mentee/profile')}
              className="rounded-xl border border-gray-400 bg-white px-4 py-1.5 text-xs font-medium text-black transition hover:bg-gray-100"
            >
              Edit
            </button>
          </div>
          <div className="space-y-3">
            {[
              ['School', profile?.school],
              ['Education Level', profile?.education_level],
              ['Country', profile?.country],
              ['Course / Major', profile?.primary_course],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">{label}</span>
                <span className="text-sm font-medium text-black">{value || '—'}</span>
              </div>
            ))}
          </div>

          {(targetCourses.length > 0 || targetSchools.length > 0) && (
            <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
              {targetCourses.length > 0 && (
                <div>
                  <p className="mb-2 text-xs text-gray-400">Target Courses</p>
                  <div className="flex flex-wrap gap-2">
                    {targetCourses.map((c) => (
                      <span key={c} className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {targetSchools.length > 0 && (
                <div>
                  <p className="mb-2 text-xs text-gray-400">Target Schools</p>
                  <div className="flex flex-wrap gap-2">
                    {targetSchools.map((s) => (
                      <span key={s} className="rounded-full border border-black px-3 py-1 text-xs font-medium text-black">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}