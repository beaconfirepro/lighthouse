'use client';
import { useEffect, useState } from 'react';

export default function AHJ() {
  const [rows, setRows] = useState<any[]>([]);
  const [name, setName] = useState('');
  useEffect(() => {
    fetch('/ahj')
      .then((r) => r.json())
      .then(setRows);
  }, []);
  async function create(e: any) {
    e.preventDefault();
    await fetch('/ahj', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    setName('');
    const r = await fetch('/ahj');
    setRows(await r.json());
  }
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold">AHJ Directory</h1>
      <form onSubmit={create} className="flex gap-2">
        <input
          className="border p-2 flex-1"
          placeholder="New AHJ name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
      </form>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.ahj_id} className="border rounded p-3 bg-white">
            {r.name}
          </li>
        ))}
      </ul>
    </main>
  );
}
