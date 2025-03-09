import { prisma } from "@/shared/lib/db";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
export default async function Home() {
  const games = await prisma.game.findMany();
  console.log(games);

  return (
    <div>
      {games.map((game) => (
        <Card key={game.id}>{game.name}</Card>
      ))}
      <Button>Hollo</Button>
    </div>
  );
}
