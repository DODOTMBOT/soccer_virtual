"use client"; // Этот компонент работает в браузере

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ nickname: '', firstName: '', lastName: '', dob: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      router.push('/login?registered=true');
    } else {
      const data = await res.json();
      setError(data.message);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 border border-gray-200 shadow-sm w-96">
        <h1 className="text-2xl font-black uppercase mb-6 border-l-4 border-blue-600 pl-3">Регистрация</h1>
        
        {error && <div className="bg-red-100 text-red-700 p-2 text-sm mb-4">{error}</div>}

        <div className="space-y-4">
          <input type="text" placeholder="Никнейм" required
            className="w-full p-2 border border-gray-300 focus:border-slate-900 outline-none"
            onChange={e => setForm({...form, nickname: e.target.value})} />
            
          <input type="text" placeholder="Имя" required
            className="w-full p-2 border border-gray-300 focus:border-slate-900 outline-none"
            onChange={e => setForm({...form, firstName: e.target.value})} />
            
          <input type="text" placeholder="Фамилия" required
            className="w-full p-2 border border-gray-300 focus:border-slate-900 outline-none"
            onChange={e => setForm({...form, lastName: e.target.value})} />
            
          <div className="text-xs text-gray-500">Дата рождения:</div>
          <input type="date" required
            className="w-full p-2 border border-gray-300 focus:border-slate-900 outline-none"
            onChange={e => setForm({...form, dob: e.target.value})} />
            
          <input type="password" placeholder="Пароль" required
            className="w-full p-2 border border-gray-300 focus:border-slate-900 outline-none"
            onChange={e => setForm({...form, password: e.target.value})} />

          <button type="submit" className="w-full bg-slate-900 text-white font-bold uppercase p-3 hover:bg-blue-600 transition">
            Создать аккаунт
          </button>
        </div>
        
        <div className="mt-4 text-center text-sm">
          Уже есть аккаунт? <Link href="/login" className="text-blue-600 font-bold hover:underline">Войти</Link>
        </div>
      </form>
    </main>
  );
}