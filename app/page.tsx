import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function HomePage() {
  const countries = await prisma.country.findMany({
    orderBy: { name: 'asc' }
  });

  return (
    <main className="p-10">
      <h1 className="text-3xl font-black uppercase italic mb-8 border-l-8 border-slate-900 pl-4">
        Список Федераций
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {countries.map((country: any) => (
          <Link 
            key={country.id} 
            href={`/country/${country.id}`} 
            className="group p-6 border border-gray-200 hover:border-slate-900 hover:bg-slate-50 transition-all"
          >
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">Федерация</span>
            <span className="text-xl font-bold block">{country.name}</span>
            <span className="text-xs text-gray-400 mt-4 block">Перейти к лиге →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}