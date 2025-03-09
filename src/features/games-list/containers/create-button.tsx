'use client';
import { useActionState } from '@/shared/lib/react';
import { Button } from '@/shared/ui/button';
import { createGameAction } from '../actions/create-game';
import { mapLeft, right } from '@/shared/lib/either';
import { startTransition } from 'react';

export function CreateButton() {
  const [data, dispatch, isPendings] = useActionState(createGameAction, right(undefined));
  return (
    <div className="flex flex-col gap-1">
      <Button
        disabled={isPendings}
        onClick={() => startTransition(dispatch)}
        result={mapLeft(
          data,
          (e) =>
            ({
              'user-not-found': 'Пользователь не найден',
              'create-game-error': 'Игра уже создана',
            })[e],
        )}>
        Создать игру
      </Button>
    </div>
  );
}
