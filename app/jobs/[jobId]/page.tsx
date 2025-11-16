
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  skills: string[];
}

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const { data: session } = useSession();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [proposal, setProposal] = useState('');

  useEffect(() => {
    if (jobId) {
      async function fetchJob() {
        try {
          const res = await fetch(`/api/jobs/${jobId}`);
          if (!res.ok) {
            throw new Error('Failed to fetch job');
          }
          const data = await res.json();
          setJob(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      fetchJob();
    }
  }, [jobId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      alert('Please sign in to apply');
      return;
    }

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId,
          proposal,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit application');
      }

      alert('Application submitted successfully!');
      setProposal('');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-600">${job.budget}</p>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Skills</h2>
        <ul className="list-disc list-inside">
          {job.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
      <p className="mt-4">{job.description}</p>
      {session && (
        <form onSubmit={handleSubmit} className="mt-8">
          <h2 className="text-xl font-bold">Apply for this job</h2>
          <textarea
            className="w-full border rounded-lg p-2 mt-2"
            rows={5}
            placeholder="Write your proposal here..."
            value={proposal}
            onChange={(e) => setProposal(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Submit Application
          </button>
        </form>
      )}
    </div>
  );
}
