import './globals.css';
import { Providers } from './providers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ru">
      <body className="bg-gray-50 antialiased">
        <Providers>
          <nav className="bg-slate-900 text-white p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
              <Link href="/" className="font-bold text-xl tracking-tighter">
                VSOL <span className="text-blue-400">2026</span>
              </Link>
              
              <div className="flex gap-6 items-center text-xs uppercase font-bold">
                <Link href="/" className="hover:text-blue-400">Федерации</Link>
                <Link href="/free-clubs" className="hover:text-blue-400">Свободные клубы</Link>
                
                <div className="border-l border-gray-700 pl-6 flex gap-4">
                  {session ? (
                    <>
                      <Link href="/profile" className="text-blue-400 hover:underline">
                        Менеджер: {session.user?.name}
                      </Link>
                      {/* Кнопка выхода */}
                      <Link href="/api/auth/signout" className="text-red-400 hover:underline">Выход</Link>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="hover:text-blue-400">Вход</Link>
                      <Link href="/register" className="bg-blue-600 px-3 py-1 hover:bg-blue-500">Регистрация</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>
          
          <div className="max-w-6xl mx-auto bg-white min-h-screen shadow-lg">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}