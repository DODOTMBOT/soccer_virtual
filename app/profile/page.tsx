// frontend/src/app/profile/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect('/login');
  }

  const userId = parseInt((session.user as any).id);

  // Достаем юзера и все клубы, которыми он управляет
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      clubs: {
        include: {
          league: { include: { country: true } }
        }
      }
    }
  });

  if (!user) redirect('/login');

  return (
    <main className="p-10">
      <div className="flex justify-between items-end border-b-2 border-slate-900 pb-4 mb-8">
        <div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Профиль менеджера</div>
          <h1 className="text-4xl font-black uppercase">{user.nickname}</h1>
          <div className="text-gray-600 mt-1">{user.firstName} {user.lastName}</div>
        </div>
        <div className="text-right">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Рейтинг</div>
          <div className="text-3xl font-mono font-bold text-blue-600">{user.rating}</div>
        </div>
      </div>

      <h2 className="text-xl font-bold uppercase mb-4">Мои клубы ({user.clubs.length} / {user.maxTeams})</h2>
      
      {user.clubs.length === 0 ? (
        <div className="bg-gray-100 p-8 text-center border border-gray-200">
          <p className="text-gray-500 mb-4">У вас пока нет ни одного клуба под управлением.</p>
          <Link href="/free-clubs" className="bg-slate-900 text-white font-bold uppercase px-6 py-3 hover:bg-blue-600 transition-colors">
            Найти свободный клуб
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {user.clubs.map(club => (
            <Link key={club.id} href={`/club/${club.id}`} className="block p-5 border border-gray-300 hover:border-slate-900 transition-colors">
              <div className="text-xs text-gray-500 uppercase">{club.league.country.name} | {club.league.name}</div>
              <div className="text-2xl font-bold my-2">{club.name}</div>
              <div className="text-sm font-mono text-gray-600">Бюджет: {club.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} $</div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}