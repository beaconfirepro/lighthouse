'use client';
import { useEffect, useState } from 'react';

interface HealthResponse {
  status: string;
  service: string;
}

type Status = 'checking' | 'ok' | 'error';

export default function Home() {
  const [status, setStatus] = useState<Status>('checking');

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch('/health');
        if (!res.ok) throw new Error('bad response');
        const data: HealthResponse = await res.json();
        setStatus(data.status === 'ok' ? 'ok' : 'error');
      } catch {
        setStatus('error');
      }
    }
    check();
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">System Status</h1>
      {status === 'checking' && <p>Checking...</p>}
      {status === 'ok' && <p className="text-green-600">All systems operational</p>}
      {status === 'error' && <p className="text-red-600">Unable to confirm system health</p>}
    </main>
  );
}
