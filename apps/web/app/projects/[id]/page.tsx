'use client';
import { useEffect, useState } from 'react';
import type { ProjectDetail } from '@shared';

interface PageProps {
  params: { id: string };
}

export default function ProjectDetail({ params }: PageProps) {
  const id = Number(params.id);
  const [data, setData] = useState<ProjectDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/projects/${id}/overview`);
        if (!res.ok) throw new Error('Failed to fetch project');
        const json: ProjectDetail = await res.json();
        setData(json);
      } catch (err) {
        setError('Failed to load project');
        console.error(err);
      }
    }
    load();
  }, [id]);

  if (error) return <div className="p-6">{error}</div>;
  if (!data) return <div className="p-6">Loading…</div>;

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Project #{id}</h1>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Phase</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {(data.phases ?? []).map((p) => (
            <tr key={p.phase_id} className="border-t">
              <td className="py-2">{p.phase_name}</td>
              <td className="text-center">{p.status || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
