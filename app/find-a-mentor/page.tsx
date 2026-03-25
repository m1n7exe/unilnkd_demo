'use client';

import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';

type MentorDetails = {
  university: string | null;
  university_country: string | null;
  nationality: string | null;
  major: string | null;
  graduation_year: string | null;
  short_bio: string | null;
  help_schools: string[] | null;
  help_majors: string[] | null;
  profile_photo_url: string | null;
};

type MentorProfile = {
  id: string;
  full_name: string;
  role: string;
  mentors: MentorDetails | MentorDetails[] | null;
};

export default function FindAMentorPage() {
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [majorFilter, setMajorFilter] = useState('');

  useEffect(() => {
    const loadMentors = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          role,
          mentors!inner (
            university,
            university_country,
            nationality,
            major,
            graduation_year,
            short_bio,
            help_schools,
            help_majors,
            profile_photo_url
          )
        `)
        .eq('role', 'mentor');

      if (error) {
        console.error('Error loading mentors:', error.message);
        setLoading(false);
        return;
      }

      setMentors((data as MentorProfile[]) || []);
      setLoading(false);
    };

    loadMentors();
  }, []);

  const getMentorDetails = (mentor: MentorProfile): MentorDetails | null => {
    if (!mentor.mentors) return null;
    return Array.isArray(mentor.mentors) ? mentor.mentors[0] ?? null : mentor.mentors;
  };

  const schoolOptions = useMemo(() => {
    const schools = mentors
      .map((mentor) => getMentorDetails(mentor)?.university)
      .filter((value): value is string => Boolean(value));

    return [...new Set(schools)].sort();
  }, [mentors]);

  const majorOptions = useMemo(() => {
    const majors = mentors
      .map((mentor) => getMentorDetails(mentor)?.major)
      .filter((value): value is string => Boolean(value));

    return [...new Set(majors)].sort();
  }, [mentors]);

  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      const details = getMentorDetails(mentor);

      const name = mentor.full_name?.toLowerCase() || '';
      const university = details?.university?.toLowerCase() || '';
      const major = details?.major?.toLowerCase() || '';
      const bio = details?.short_bio?.toLowerCase() || '';

      const matchesSearch =
        !searchTerm ||
        name.includes(searchTerm.toLowerCase()) ||
        university.includes(searchTerm.toLowerCase()) ||
        major.includes(searchTerm.toLowerCase()) ||
        bio.includes(searchTerm.toLowerCase());

      const matchesSchool =
        !schoolFilter || details?.university === schoolFilter;

      const matchesMajor =
        !majorFilter || details?.major === majorFilter;

      return matchesSearch && matchesSchool && matchesMajor;
    });
  }, [mentors, searchTerm, schoolFilter, majorFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-3xl font-bold text-black">Find a Mentor</h1>
          <p className="text-gray-700">Loading mentors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">Find a Mentor</h1>
          <p className="mt-2 text-gray-700">
            Search and filter mentors by school or major.
          </p>
        </div>

        <div className="mb-8 grid gap-4 rounded-2xl border border-gray-300 bg-white p-4 shadow-sm md:grid-cols-3">
          <input
            type="text"
            placeholder="Search by name, school, major..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 text-black placeholder-gray-500 outline-none focus:border-black focus:ring-2 focus:ring-gray-300"
          />

          <select
            value={schoolFilter}
            onChange={(e) => setSchoolFilter(e.target.value)}
            className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 text-black outline-none focus:border-black focus:ring-2 focus:ring-gray-300"
          >
            <option value="">All Schools</option>
            {schoolOptions.map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
          </select>

          <select
            value={majorFilter}
            onChange={(e) => setMajorFilter(e.target.value)}
            className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 text-black outline-none focus:border-black focus:ring-2 focus:ring-gray-300"
          >
            <option value="">All Majors</option>
            {majorOptions.map((major) => (
              <option key={major} value={major}>
                {major}
              </option>
            ))}
          </select>
        </div>

        {filteredMentors.length === 0 ? (
          <div className="rounded-2xl border border-gray-300 bg-white p-8 text-center shadow-sm">
            <p className="text-gray-700">No mentors match your filters.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMentors.map((mentor) => {
              const details = getMentorDetails(mentor);

              return (
                <button
                  key={mentor.id}
                  type="button"
                  onClick={() => setSelectedMentor(mentor)}
                  className="group rounded-2xl border border-gray-300 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-black hover:shadow-xl"
                >
                  <div className="mb-4 flex items-center gap-4">
                    {details?.profile_photo_url ? (
                      <img
                        src={details.profile_photo_url}
                        alt={mentor.full_name}
                        className="h-16 w-16 rounded-full border border-gray-300 object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-300 bg-gray-200 text-lg font-semibold text-gray-700">
                        {mentor.full_name?.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div>
                      <h2 className="text-xl font-bold text-black">
                        {mentor.full_name}
                      </h2>
                      <p className="text-sm text-gray-700">
                        {details?.major || 'No major added'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold text-black">University:</span>{' '}
                      {details?.university || 'Not added'}
                    </p>
                    <p>
                      <span className="font-semibold text-black">Country:</span>{' '}
                      {details?.university_country || 'Not added'}
                    </p>
                    <p>
                      <span className="font-semibold text-black">Graduation Year:</span>{' '}
                      {details?.graduation_year || 'Not added'}
                    </p>
                  </div>

                  <div className="mt-4">
                    <span className="inline-block rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                      View full profile
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selectedMentor && (
        <MentorModal
          mentor={selectedMentor}
          onClose={() => setSelectedMentor(null)}
        />
      )}
    </div>
  );
}

function MentorModal({
  mentor,
  onClose,
}: {
  mentor: MentorProfile;
  onClose: () => void;
}) {
  const details = Array.isArray(mentor.mentors)
    ? mentor.mentors[0] ?? null
    : mentor.mentors;

  if (!details) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-black hover:bg-gray-100"
        >
          Close
        </button>

        <div className="mb-6 flex items-start gap-4">
          {details.profile_photo_url ? (
            <img
              src={details.profile_photo_url}
              alt={mentor.full_name}
              className="h-20 w-20 rounded-full border border-gray-300 object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gray-300 bg-gray-200 text-2xl font-bold text-gray-700">
              {mentor.full_name?.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="pr-12">
            <h2 className="text-2xl font-bold text-black">{mentor.full_name}</h2>
            <p className="mt-1 text-gray-700">{details.major || 'No major added'}</p>
            <p className="text-gray-600">{details.university || 'No university added'}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <InfoCard label="University" value={details.university} />
          <InfoCard label="Country of University" value={details.university_country} />
          <InfoCard label="Nationality" value={details.nationality} />
          <InfoCard label="Course / Major" value={details.major} />
          <InfoCard label="Graduation Year" value={details.graduation_year} />
        </div>

        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold text-black">Short Bio</h3>
          <div className="rounded-xl border border-gray-300 bg-gray-50 p-4 text-gray-800">
            {details.short_bio || 'No bio added yet.'}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold text-black">
            Schools They Can Help With
          </h3>
          <TagList items={details.help_schools} emptyText="No schools added." />
        </div>

        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold text-black">
            Majors They Can Help With
          </h3>
          <TagList items={details.help_majors} emptyText="No majors added." />
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) {
  return (
    <div className="rounded-xl border border-gray-300 bg-gray-50 p-4">
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="mt-1 text-black">{value || 'Not added'}</p>
    </div>
  );
}

function TagList({
  items,
  emptyText,
}: {
  items: string[] | null;
  emptyText: string;
}) {
  if (!items || items.length === 0) {
    return <p className="text-gray-700">{emptyText}</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-black"
        >
          {item}
        </span>
      ))}
    </div>
  );
} 