// frontend/src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'
import path from 'path'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Находим абсолютный путь к папке vsol-clone (корень проекта)
const rootPath = path.resolve(process.cwd(), '..')
const dbPath = path.join(rootPath, 'prisma', 'vsol.db')

// Лог в консоль терминала, чтобы мы видели путь (проверь его!)
console.log('📡 Попытка подключения к БД по пути:', dbPath)

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: `file:${dbPath}`,
      },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma