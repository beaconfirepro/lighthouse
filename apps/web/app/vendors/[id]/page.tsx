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

    retur
