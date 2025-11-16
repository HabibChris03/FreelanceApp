
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('/api/jobs');
        if (!res.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Available Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p className="text-gray-600">${job.budget}</p>
            <p className="mt-2">{job.description}</p>
            <Link href={`/jobs/${job.id}`} className="text-blue-500 hover:underline mt-4 inline-block">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
