export type Cell = 0 | 1 | 2;
export type Player = 1 | 2;
export type Board = Cell[][];

export type GameMode = 'human-vs-human' | 'human-vs-ai';
export type AiDifficulty = 'easy' | 'normal' | 'hard';
export type GameStatus = 'playing' | 'finished';
export type Winner = Player | 'draw' | null;

export type Position = {
  row: number;
  col: number;
};

export interface MoveRecord {
  moveNumber: number;
  player: Player;
  position: Position;
  flippedCells: Position[];
  boardBefore: string;
  boardAfter: string;
  createdAt: string;
}

export interface GameState {
  board: Board;
  currentPlayer: Player;
  mode: GameMode;
  aiDifficulty: AiDifficulty;
  status: GameStatus;
  winner: Winner;
  moveHistory: MoveRecord[];
  passCount: number;
  showHints: boolean;
  startedAt: string;
  updatedAt: string;
}
