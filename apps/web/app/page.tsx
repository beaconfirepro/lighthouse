import Link from 'next/link';

const Card = ({ href, title, desc }: any) => (
  <Link href={href} className="block rounded-xl border bg-white p-6 shadow hover:shadow-md">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-600 mt-1">{desc}</p>
  </Link>
);

export default function Home() {
  const items = [
    { href: '/vendors', title: 'Vendors', desc: 'Manage vendor master and push to QBO' },
    { href: '/projects', title: 'Projects', desc: 'Standardized phases and Knowify maps' },
    { href: '/ap-run', title: 'AP Run', desc: 'Bills with pay decisions' },
    { href: '/collections', title: 'Collections', desc: 'Invoices and expected receipts' },
    { href: '/ahj', title: 'AHJ', desc: 'Authorities having jurisdiction directory' },
  ];
  return (
    <main className="max-w-4xl mx-auto p-8 grid gap-4 sm:grid-cols-2">
      {items.map((i) => (
        <Card key={i.href} {...i} />
      ))}
    </main>
  );
}
