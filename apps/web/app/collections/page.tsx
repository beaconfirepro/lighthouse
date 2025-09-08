'use client';
import { useEffect, useState } from 'react';

type Row = {
  invoice_id: number;
  client_name: string;
  open_balance: number;
  due_date?: string;
  expected_receipt_date?: string;
};

export default function Collections() {
  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => {
    fetch('/collections/run')
      .then((r) => r.json())
      .then(setRows);
  }, []);
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">Collections</h1>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Client</th>
            <th>Due</th>
            <th>Open</th>
            <th>Expected</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.invoice_id} className="border-t">
              <td className="py-2">{r.invoice_id}</td>
              <td>{r.client_name}</td>
              <td className="text-center">{r.due_date || '-'}</td>
              <td className="text-right">{r.open_balance?.toFixed?.(2)}</td>
              <td className="text-center">{r.expected_receipt_date || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
