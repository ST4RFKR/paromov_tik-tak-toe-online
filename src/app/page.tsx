import { GamesList } from '@/features/games-list/server';

export default async function Home() {
  return (
    <div className="flex flex-col gap-4 container mx-auto pt-[200px]">
      <h1 className="text-3xl">Игры</h1>
      <GamesList />
    </div>
  );
}
