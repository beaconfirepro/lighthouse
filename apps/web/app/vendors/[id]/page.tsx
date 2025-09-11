// Server component version
import type { VendorDetail } from '@shared'; // if you have it; otherwise remove

type PageProps = { params: Promise<{ id: string }> };

export default async function VendorPage({ params }: PageProps) {
  const { id } = await params;

  // Adjust the fetch URL to match your API
  try {
    const res = await fetch(`/vendors/${id}/overview`, { cache: 'no-store' });
    if (!res.ok) {
      return <div className="p-6">Failed to fetch vendor</div>;
    }
    const data = (await res.json()) as VendorDetail | any;

    return (
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-xl font-semibold mb-4">Vendor #{id}</h1>
        {/* Render whatever fields you have */}
        <pre className="text-xs bg-gray-50 p-3 rounded border overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      </main>
    );
  } catch (err) {
    console.error(err);
    return <div className="p-6">Failed to load vendor</div>;
  }
}
