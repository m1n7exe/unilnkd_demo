'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type MentorProfile = {
  university: string | null;
  university_country: string | null;
  nationality: string | null;
  major: string | null;
  graduation_year: string | null;
  short_bio: string | null;
  help_schools: string[];
  help_majors: string[];
  profile_photo_url: string | null;
};

type Booking = {
  id: string;
  student_id: string | null;
  scheduled_at: string | null;
  duration_minutes: number | null;
  status: string | null;
  tag: string | null;
  student_notes: string | null;
  meeting_link: string | null;
};

type Review = {
  id: string;
  session_id: string | null;
  rating: number | null;
  comment: string | null;
  created_at: string | null;
};

export default function MentorDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<MentorProfile | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }

      const [
        { data: profileData },
        { data: nameData },
        { data: bookingData },
      ] = await Promise.all([
        supabase
          .from('mentors')
          .select(`university, university_country, nationality, major, graduation_year, short_bio, help_schools, help_majors, profile_photo_url`)
          .eq('id', user.id)
          .single(),
        supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single(),
        supabase
          .from('bookings')
          .select(`id, student_id, scheduled_at, duration_minutes, status, tag, student_notes, meeting_link`)
          .eq('mentor_id', user.id)
          .order('scheduled_at', { ascending: true }),
      ]);

      if (profileData) setProfile(profileData);
      if (nameData) setFullName(nameData.full_name);
      if (bookingData) {
        setBookings(bookingData);

        // Fetch reviews for all this mentor's sessions
        const sessionIds = bookingData
          .filter((b: Booking) => b.status === 'completed')
          .map((b: Booking) => b.id);

        if (sessionIds.length > 0) {
          const { data: reviewData } = await supabase
            .from('reviews')
            .select('id, session_id, rating, comment, created_at')
            .in('session_id', sessionIds)
            .order('created_at', { ascending: false });

          if (reviewData) setReviews(reviewData);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const updateStatus = async (id: string, status: 'confirmed' | 'cancelled') => {
    const { error } = await supabase
      .from('bookings')
      .update({
        status,
        ...(status === 'confirmed' ? { confirmed_at: new Date().toISOString() } : {}),
        ...(status === 'cancelled' ? { cancelled_at: new Date().toISOString(), cancelled_by: 'mentor' } : {}),
      })
      .eq('id', id);

    if (!error) {
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  const pending = bookings.filter((b) => b.status === 'pending');
  const confirmed = bookings.filter((b) => b.status === 'confirmed');
  const completed = bookings.filter((b) => b.status === 'completed');

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0) / reviews.length).toFixed(1)
    : null;

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

  const stars = (rating: number | null) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < (rating ?? 0) ? 'text-black' : 'text-gray-300'}>★</span>
    ));

  return (
    <div className="min-h-screen bg-gray-200 px-4 py-12">
      <div className="mx-auto max-w-4xl space-y-6">

        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Mentor Dashboard</p>
            <h1 className="mt-1 text-3xl font-bold text-black">{fullName ?? '—'}</h1>
            <p className="mt-0.5 text-sm text-gray-500">
              {profile?.university ?? ''}
              {profile?.major ? ` · ${profile.major}` : ''}
              {profile?.graduation_year ? ` · Class of ${profile.graduation_year}` : ''}
            </p>
          </div>
          {profile?.profile_photo_url ? (
            <img
              src={profile.profile_photo_url}
              alt="Profile"
              className="h-14 w-14 rounded-full border border-gray-300 object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
              {fullName?.charAt(0) ?? '?'}
            </div>
          )}
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Pending Requests', value: pending.length },
            { label: 'Confirmed Sessions', value: confirmed.length },
            { label: 'Avg Rating', value: avgRating ? `${avgRating} ★` : '—' },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl border border-gray-300 bg-white p-5 shadow-sm text-center">
              <p className="text-3xl font-bold text-black">{value}</p>
              <p className="mt-1 text-xs font-medium text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Booking Requests ── */}
        <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
          <p className="mb-5 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Booking Requests
          </p>
          {pending.length === 0 ? (
            <p className="text-sm text-gray-400">No pending requests.</p>
          ) : (
            <div className="space-y-4">
              {pending.map((b) => (
                <div key={b.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-black">{formatDate(b.scheduled_at)}</p>
                      <p className="text-xs text-gray-500">
                        {b.duration_minutes ? `${b.duration_minutes} min` : '—'}
                        {b.tag ? ` · ${b.tag}` : ''}
                      </p>
                      {b.student_notes && (
                        <p className="mt-1 text-xs italic text-gray-600">"{b.student_notes}"</p>
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => updateStatus(b.id, 'confirmed')}
                        className="rounded-xl bg-black px-4 py-2 text-xs font-medium text-white transition hover:bg-gray-800"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateStatus(b.id, 'cancelled')}
                        className="rounded-xl border border-gray-400 bg-white px-4 py-2 text-xs font-medium text-black transition hover:bg-gray-100"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Upcoming Sessions ── */}
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
                    <p className="text-sm font-semibold text-black">{formatDate(b.scheduled_at)}</p>
                    <p className="text-xs text-gray-500">
                      {b.duration_minutes ? `${b.duration_minutes} min` : '—'}
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

        {/* ── Reviews ── */}
        <div className="rounded-2xl border border-gray-300 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Reviews</p>
            {avgRating && (
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-black">{avgRating}</span>
                <div className="flex text-sm">{stars(Math.round(Number(avgRating)))}</div>
                <span className="text-xs text-gray-400">({reviews.length})</span>
              </div>
            )}
          </div>
          {reviews.length === 0 ? (
            <p className="text-sm text-gray-400">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex text-sm">{stars(r.rating)}</div>
                    <span className="text-xs text-gray-400">{formatDate(r.created_at)}</span>
                  </div>
                  {r.comment && <p className="text-sm text-gray-700">{r.comment}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Edit Profile ── */}
        <button
          onClick={() => router.push('/mentor/profile')}
          className="w-full rounded-xl border border-gray-400 bg-white px-5 py-3 font-medium text-black transition hover:bg-gray-100"
        >
          Edit Profile
        </button>

      </div>
    </div>
  );
}