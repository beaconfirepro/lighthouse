'use client';
import { useEffect, useState, type FormEvent } from 'react';
import type { AHJ } from '@shared';

export default function AHJ() {
  const [rows, setRows] = useState<AHJ[]>([]);
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/ahj');
        if (!res.ok) throw new Error('Failed to fetch AHJs');
        const data: AHJ[] = await res.json();
        setRows(data);
      } catch (err) {
        setError('Failed to load AHJs');
        console.error(err);
      }
    }
    load();
  }, []);

  async function create(e: FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/ahj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error('Failed to create AHJ');
      setName('');
      const r = await fetch('/ahj');
      if (!r.ok) throw new Error('Failed to fetch AHJs');
      const data: AHJ[] = await r.json();
      setRows(data);
    } catch (err) {
      setError('Failed to save AHJ');
      console.error(err);
    }
  }

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold">AHJ Directory</h1>
      {error && <p className="text-red-600">{error}</p>}
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
