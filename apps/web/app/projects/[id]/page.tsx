// Server component version (no "use client")
import type { ProjectDetail } from '@shared';

type PageProps = { params: Promise<{ id: string }> };

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch on the server. No caching so you always get fresh data.
  let data: ProjectDetail | null = null;
  try {
    const res = await fetch(`/projects/${id}/overview`, { cache: 'no-store' });
    if (!res.ok) {
      return <div className="p-6">Failed to fetch project</div>;
    }
    data = (await res.json()) as ProjectDetail;
  } catch (err) {
    console.error(err);
    return <div className="p-6">Failed to load project</div>;
  }

  if (!data) {
    return <div className="p-6">No project found</div>;
  }

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
