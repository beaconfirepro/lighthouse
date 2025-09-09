'use client';
import { useEffect, useState } from 'react';
import type { Vendor } from '@shared';

export default function VendorDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const [data, setData] = useState<Vendor | null>(null);
  useEffect(() => {
    fetch(`/vendors/${id}`)
      .then((r) => r.json())
      .then((d: Vendor) => setData(d));
  }, [id]);
  if (!data) return <div className="p-6">Loading…</div>;
  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch(`/vendors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vendorName: data.vendor_name,
        vendorType: data.vendor_type,
        active: data.active,
      }),
    });
    alert('Saved');
  }
  async function pushQBO() {
    await fetch(`/vendors/${id}/push/qbo`, { method: 'POST' });
    alert('Queued');
  }
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Vendor #{id}</h1>
      <form onSubmit={save} className="space-y-2">
        <label className="block">
          Name
          <input
            className="border p-2 w-full"
            value={data.vendor_name || ''}
            onChange={(e) => setData({ ...data, vendor_name: e.target.value })}
          />
        </label>
        <label className="block">
          Type
          <input
            className="border p-2 w-full"
            value={data.vendor_type || ''}
            onChange={(e) => setData({ ...data, vendor_type: e.target.value })}
          />
        </label>
        <label className="block">
          <input
            type="checkbox"
            checked={!!data.active}
            onChange={(e) => setData({ ...data, active: e.target.checked })}
          />{' '}
          Active
        </label>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-blue-600 text-white rounded">Save</button>
          <button
            type="button"
            onClick={pushQBO}
            className="px-3 py-2 bg-emerald-600 text-white rounded"
          >
            Push to QBO
          </button>
        </div>
      </form>
    </main>
  );
}
