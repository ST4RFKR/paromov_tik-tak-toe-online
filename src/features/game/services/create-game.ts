import { left, right } from '@/shared/lib/either';
import { PlayerEntity } from '../domain';
import { gamesRepository } from '../repositories/game';
import cuid from 'cuid';

export async function createGame(player: PlayerEntity) {
  const playerGames = await gamesRepository.gamesList({
    players: { some: { id: player.id } },
    status: 'idle',
  });

  const isGameInIdleStatus = playerGames.some(
    (game) => game.status === 'idle' && game.creator.id === player.id,
  );
  if (isGameInIdleStatus) {
    return left('create-game-error' as const);
  }

  const createdGame = await gamesRepository.createGame({
    id: cuid(),
    status: 'idle',
    creator: player,
  });

  return right(createdGame);
}
