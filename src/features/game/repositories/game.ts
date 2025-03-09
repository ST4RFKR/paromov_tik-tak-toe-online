import { prisma } from '@/shared/lib/db';
import { z } from 'zod';
import { GameEntity, GameIdleEntity, GameOverEntity } from '../domain';
import { Game, Prisma, User } from '@prisma/client';
import { removePassword } from '@/shared/lib/password';

async function gamesList(where?: Prisma.GameWhereInput): Promise<GameEntity[]> {
  const games = await prisma.game.findMany({
    where,
    include: {
      winner: true,
      players: true,
    },
  });
  return games.map(dbGameToGameEntity);
}
const fieldSchema = z.array(z.union([z.string(), z.null()]));
function dbGameToGameEntity(game: Game & { players: User[]; winner?: User | null }): GameEntity {
  const players = game.players.map(removePassword);

  switch (game.status) {
    case 'idle': {
      const [creator] = players;
      if (!creator) {
        throw new Error('Game idle but no creator');
      }
      return {
        id: game.id,
        creator: creator,
        status: game.status,
      } satisfies GameIdleEntity;
    }
    case 'gameOverDrow':
    case 'inProgress': {
      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
      };
    }
    case 'gameOver': {
      if (!game.winner) {
        throw new Error('Game over but no winner');
      }
      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
        winner: removePassword(game.winner),
      } satisfies GameOverEntity;
    }
  }
}
async function createGame(game: GameIdleEntity): Promise<GameEntity> {
  const createdGame = await prisma.game.create({
    data: {
      status: game.status,
      field: Array(9).fill(null),
      id: game.id,
      players: {
        connect: { id: game.creator.id },
      },
    },
    include: {
      players: true,
      winner: true,
    },
  });
  return dbGameToGameEntity(createdGame);
}
export const gamesRepository = {
  gamesList,
  createGame,
};
