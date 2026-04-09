// frontend/src/app/country/[id]/page.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function CountryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const country = await prisma.country.findUnique({
    where: { id: parseInt(id) },
    include: { leagues: { include: { clubs: true } } }
  });

  if (!country) notFound();
  const clubs = country.leagues[0]?.clubs || [];

  return (
    <main className="p-10">
      <h1 className="text-3xl font-black uppercase mb-6">{country.name}: Таблица D1</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100 text-left text-xs uppercase font-bold text-slate-600">
              <th className="p-3 border">№</th>
              <th className="p-3 border">Команда</th>
              <th className="p-3 border text-center">И</th>
              <th className="p-3 border text-center">В</th>
              <th className="p-3 border text-center">Н</th>
              <th className="p-3 border text-center">П</th>
              <th className="p-3 border text-center font-black text-slate-900">О</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club, i) => (
              <tr key={club.id} className="hover:bg-blue-50 transition-colors">
                <td className="p-3 border text-center text-gray-400">{i + 1}</td>
                <td className="p-3 border font-bold text-blue-700">
                  <Link href={`/club/${club.id}`}>{club.name}</Link>
                </td>
                <td className="p-3 border text-center">0</td>
                <td className="p-3 border text-center">0</td>
                <td className="p-3 border text-center">0</td>
                <td className="p-3 border text-center">0</td>
                <td className="p-3 border text-center font-bold bg-slate-50">0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}