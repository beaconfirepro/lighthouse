'use client';
import { useEffect, useState } from 'react';

type Row = {
  bill_id: number;
  vendor_name: string;
  open_balance: number;
  due_date?: string;
  pay_decision: string;
};

export default function APRun() {
  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => {
    fetch('/ap/run')
      .then((r) => r.json())
      .then(setRows);
  }, []);
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">AP Run</h1>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Bill</th>
            <th>Vendor</th>
            <th>Due</th>
            <th>Open</th>
            <th>Decision</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.bill_id} className="border-t">
              <td className="py-2">{r.bill_id}</td>
              <td>{r.vendor_name}</td>
              <td className="text-center">{r.due_date || '-'}</td>
              <td className="text-right">{r.open_balance?.toFixed?.(2)}</td>
              <td className="text-center">{r.pay_decision}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
