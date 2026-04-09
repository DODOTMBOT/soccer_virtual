import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nickname, firstName, lastName, dob, password } = body;

    // 1. Проверяем, не занят ли никнейм
    const existingUser = await prisma.user.findUnique({
      where: { nickname }
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Никнейм уже занят' }, { status: 400 });
    }

    // 2. Хэшируем пароль (10 - уровень соли)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Создаем юзера
    const newUser = await prisma.user.create({
      data: {
        nickname,
        firstName,
        lastName,
        dob: new Date(dob), // Парсим строку в дату
        password: hashedPassword,
      }
    });

    return NextResponse.json({ message: 'Успешная регистрация' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 });
  }
}