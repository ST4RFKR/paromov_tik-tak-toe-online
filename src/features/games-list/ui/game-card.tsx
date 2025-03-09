import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/card';

export async function GameCard({ login, rating }: { login: string; rating: number }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Игра с: {login}</CardTitle>
        </CardHeader>
        <CardContent>Рейтинг: {rating}</CardContent>
      </Card>
    </div>
  );
}
