import { getIdleGames } from '@/features/game/server';
import { GameCard } from '../ui/game-card';
import { Layout } from '../ui/layout';
import { CreateButton } from './create-button';

export async function GamesList() {
  const games = await getIdleGames();
  console.log(games);

  return (
    <Layout actions={<CreateButton />}>
      {games.map((game) => (
        <GameCard key={game.id} login={game.creator.login} rating={game.creator.rating} />
      ))}
    </Layout>
  );
}
