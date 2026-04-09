// frontend/src/app/free-clubs/TakeClubButton.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TakeClubButton({ clubId, clubName }: { clubId: number, clubName: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTakeClub = async () => {
    if (!confirm(`Вы уверены, что хотите стать менеджером клуба ${clubName}?`)) return;
    
    setLoading(true);
    const res = await fetch('/api/clubs/take', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clubId })
    });

    if (res.ok) {
      router.push('/profile'); // Успех -> кидаем в профиль
      router.refresh();
    } else {
      const data = await res.json();
      alert(`Ошибка: ${data.message}`);
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleTakeClub} 
      disabled={loading}
      className="bg-slate-900 text-white text-xs font-bold uppercase px-3 py-2 hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
    >
      {loading ? "Оформление..." : "Взять клуб"}
    </button>
  );
}