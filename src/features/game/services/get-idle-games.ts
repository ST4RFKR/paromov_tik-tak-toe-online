import { GameIdleEntity } from '../domain';
import { gamesRepository } from '../repositories/game';

export async function getIdleGames(): Promise<GameIdleEntity[]> {
  const games = await gamesRepository.gamesList({ status: 'idle' });

  return games as GameIdleEntity[];
}
