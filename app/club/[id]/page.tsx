// frontend/src/app/club/[id]/page.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function ClubPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const clubId = parseInt(id);

  const club = await prisma.club.findUnique({
    where: { id: clubId },
    include: {
      players: { orderBy: { power: 'desc' } },
      league: { include: { country: true } }
    }
  });

  if (!club) notFound();

  return (
    <main className="p-8">
      <div className="mb-4 flex gap-2 text-sm text-gray-500">
        <Link href="/" className="hover:underline">Мир</Link> <span>/</span>
        <Link href={`/country/${club.league.countryId}`} className="hover:underline">{club.league.country.name}</Link>
      </div>

      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold">{club.name}</h1>
        <p className="text-gray-500">{club.city} | Бюджет: {club.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $</p>
      </div>

      <table className="vsol-table">
        <thead>
          <tr>
            <th>Имя</th>
            <th className="text-center">Возраст</th>
            <th className="text-center">Поз</th>
            <th className="text-center">Сила</th>
          </tr>
        </thead>
        <tbody>
          {club.players.map((player: any) => (
            <tr key={player.id}>
              <td className="font-medium">{player.name}</td>
              <td className="text-center">{player.age}</td>
              <td className="text-center text-blue-600 font-bold">{player.position}</td>
              <td className="text-center font-mono">{player.power}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}