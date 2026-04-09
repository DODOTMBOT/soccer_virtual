"use client";

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ nickname: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      nickname: form.nickname,
      password: form.password,
    });

    if (res?.error) {
      setError('Неверный никнейм или пароль');
    } else {
      router.push('/'); // На главную при успехе
      router.refresh(); // Обновляем шапку
    }
  };

  return (
    <main className="flex justify-center items-center min-h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 border border-gray-200 shadow-sm w-96">
        <h1 className="text-2xl font-black uppercase mb-6 border-l-4 border-slate-900 pl-3">Вход в офис</h1>
        
        {error && <div className="bg-red-100 text-red-700 p-2 text-sm mb-4">{error}</div>}

        <div className="space-y-4">
          <input type="text" placeholder="Никнейм" required
            className="w-full p-2 border border-gray-300 outline-none"
            onChange={e => setForm({...form, nickname: e.target.value})} />
            
          <input type="password" placeholder="Пароль" required
            className="w-full p-2 border border-gray-300 outline-none"
            onChange={e => setForm({...form, password: e.target.value})} />

          <button type="submit" className="w-full bg-slate-900 text-white font-bold uppercase p-3 hover:bg-blue-600 transition">
            Войти
          </button>
        </div>
        
        <div className="mt-4 text-center text-sm">
          Нет аккаунта? <Link href="/register" className="text-blue-600 font-bold hover:underline">Регистрация</Link>
        </div>
      </form>
    </main>
  );
}