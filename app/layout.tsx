import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-gray-50 antialiased">
        <nav className="bg-slate-900 text-white p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <span className="font-bold text-xl tracking-tighter">VSOL <span className="text-blue-400">2026</span></span>
            <div className="flex gap-6 text-xs uppercase font-bold">
              <a href="/" className="hover:text-blue-400">Федерации</a>
              <span className="text-gray-600">Трансферы</span>
              <span className="text-gray-600">Матчи</span>
            </div>
          </div>
        </nav>
        <div className="max-w-6xl mx-auto bg-white min-h-screen shadow-lg">
          {children}
        </div>
      </body>
    </html>
  );
}