'use client';
import { useEffect, useState } from 'react';

export default function ProjectDetail({ params }: any) {
  const id = Number(params.id);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch(`/projects/${id}/overview`)
      .then((r) => r.json())
      .then(setData);
  }, [id]);
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
          {(data.phases || []).map((p: any) => (
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
