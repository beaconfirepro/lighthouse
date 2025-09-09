'use client';
import { useEffect, useState } from 'react';
import type { Vendor } from '@shared';

export default function Vendors() {
  const [rows, setRows] = useState<Vendor[]>([]);
  useEffect(() => {
    fetch('/vendors')
      .then((r) => r.json())
      .then((data: Vendor[]) => setRows(data));
  }, []);
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Vendors</h1>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th>Type</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.vendor_id} className="border-t">
              <td className="py-2">{r.vendor_name}</td>
              <td className="text-center">{r.vendor_type}</td>
              <td className="text-center">{r.active ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
