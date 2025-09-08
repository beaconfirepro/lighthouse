'use client';
import { useEffect, useState } from 'react';

type Row = { project_id: number; project_name: string; status?: string };

export default function Projects() {
  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => {
    fetch('/projects/list/all')
      .then((r) => r.json())
      .then(setRows)
      .catch(() => setRows([]));
  }, []);
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Projects</h1>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.project_id}>{r.project_name}</li>
        ))}
      </ul>
    </main>
  );
}
