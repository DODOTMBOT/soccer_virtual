// frontend/src/app/api/clubs/take/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: 'Не авторизован' }, { status: 401 });
    }

    const { clubId } = await req.json();
    const userId = parseInt((session.user as any).id);

    // 1. Получаем пользователя и проверяем его лимит команд
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { clubs: true }
    });

    if (!user) return NextResponse.json({ message: 'Менеджер не найден' }, { status: 404 });

    if (user.clubs.length >= user.maxTeams) {
      return NextResponse.json({ message: `Ваш лимит команд: ${user.maxTeams}. Достигнут максимум.` }, { status: 400 });
    }

    // 2. Проверяем, свободен ли клуб
    const club = await prisma.club.findUnique({ where: { id: clubId } });
    if (!club) return NextResponse.json({ message: 'Клуб не найден' }, { status: 404 });
    if (club.userId !== null) {
      return NextResponse.json({ message: 'У этого клуба уже есть менеджер' }, { status: 400 });
    }

    // 3. Привязываем клуб к менеджеру
    await prisma.club.update({
      where: { id: clubId },
      data: { userId: user.id }
    });

    return NextResponse.json({ message: 'Успешно' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}