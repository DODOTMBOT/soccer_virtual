// frontend/src/app/free-clubs/page.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import TakeClubButton from './TakeClubButton';

export default async function FreeClubsPage() {
  // Ищем клубы, у которых userId = null (нет менеджера)
  const freeClubs = await prisma.club.findMany({
    where: { userId: null },
    include: {
      league: { include: { country: true } }
    },
    orderBy: { budget: 'desc' }, // Богатые сверху
    take: 50 // Выведем пока 50 богатейших
  });

  return (
    <main className="p-10">
      <h1 className="text-3xl font-black uppercase italic mb-6 border-l-8 border-slate-900 pl-4">Свободные клубы</h1>
      <p className="mb-6 text-gray-600 text-sm">Список команд, оставшихся без руководства. Выберите клуб с умом.</p>

      <table className="vsol-table">
        <thead>
          <tr>
            <th>Клуб</th>
            <th>Федерация</th>
            <th className="text-center">Бюджет</th>
            <th className="text-center">Действие</th>
          </tr>
        </thead>
        <tbody>
          {freeClubs.map((club) => (
            <tr key={club.id} className="hover:bg-gray-50">
              <td className="font-bold">
                <Link href={`/club/${club.id}`} className="hover:text-blue-600 hover:underline">
                  {club.name}
                </Link>
              </td>
              <td className="text-sm text-gray-600">{club.league.country.name}</td>
              <td className="text-center font-mono">{club.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $</td>
              <td className="text-center w-32">
                <TakeClubButton clubId={club.id} clubName={club.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}