export type GameEntity =
  | GameIdleEntity
  | GameInProgressEntity
  | GameOverEntity
  | GameOverDrowEntity;

export type GameIdleEntity = {
  id: string;
  creator: PlayerEntity;
  status: 'idle';
};
export type GameInProgressEntity = {
  id: string;
  players: PlayerEntity[];
  field: Field;
  status: 'inProgress';
};
export type GameOverEntity = {
  id: string;
  players: PlayerEntity[];
  status: 'gameOver';
  field: Field;
  winner?: PlayerEntity;
};
export type GameOverDrowEntity = {
  id: string;
  players: PlayerEntity[];
  field: Field;
  status: 'gameOverDrow';
  isDrow?: boolean;
};

export type PlayerEntity = {
  id: string;
  login: string;
  rating: number;
};
export type Field = Cell[];

export type Cell = GameSymbol | null;
export type GameSymbol = string;
