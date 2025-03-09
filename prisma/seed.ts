import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Создаем пользователя
  const user = await prisma.user.create({
    data: {
      login: 'User 1',
      rating: 1000,
      passwordHash: 'hash',
    },
  });
  const user2 = await prisma.user.create({
    data: {
      login: 'User 2',
      rating: 2000,
      passwordHash: 'hash',
    },
  });
  // Создаем игры
  // await prisma.game.create({
  //   data: {
  //     status: 'idle',
  //     field: Array(9).fill(null),
  //     players: {
  //       connect: {
  //         id: user.id,
  //       },
  //     },
  //   },
  // });

  // await prisma.game.create({
  //   data: {
  //     status: 'idle',
  //     field: Array(9).fill(null),
  //     players: {
  //       connect: {
  //         id: user2.id,
  //       },
  //     },
  //   },
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
