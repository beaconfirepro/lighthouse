// apps/web/app/vendors/[id]/page.tsx
// Server component
import type { JSX } from 'react';

type VendorDetail = {
  name?: string;
  status?: string;
  [key: string]: unknown;
};

type PageProps = { params: Promise<{ id: string }> };

export default async function VendorPage({ params }: PageProps): Promise<JSX.Element> {
  const { id } = await params;

  try {
    const res = await fetch(`/vendors/${id}/overview`, { cache: 'no-store' });
    if (!res.ok) {
      return <div className="p-6">Failed to fetch vendor</div>;
    }

    const dataUnknown: unknown = await res.json();
    const data = dataUnknown as VendorDetail;

    return (
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-xl font-semibold mb-4">Vendor #{id}</h1>

        {/* If you have known fields, render them nicely; fallback to raw JSON */}
        <div className="space-y-4">
          {(data.name || data.status) ? (
            <table className="w-full text-sm">
              <tbody>
                {data.name ? (
                  <tr className="border-t">
                    <td className="py-2 pr-4 font-medium text-left">Name</td>
                    <td className="py-2">{String(data.name)}</td>
                  </tr>
                ) : null}
                {data.status ? (
                  <tr className="border-t">
                    <td className="py-2 pr-4 font-medium text-left">Status</td>
                    <td className="py-2">{String(data.status)}</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          ) : null}

          <section>
            <h2 className="text-sm font-medium mb-2">Raw data</h2>
            <pre className="text-xs bg-gray-50 p-3 rounded border overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </section>
        </div>
      </main>
    );
  } catch (err) {
    console.error(err);
    return <div className="p-6">Failed to load vendor</div>;
  }
}
