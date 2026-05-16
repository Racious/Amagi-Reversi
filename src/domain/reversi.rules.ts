import type { Board, Cell, Player, Position, Winner } from './reversi.types'
import { BLACK, BOARD_SIZE, DIRECTIONS, EMPTY, WHITE } from './reversi.constants'

export function createInitialBoard(): Board {
  const board: Board = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(EMPTY) as Cell[],
  )
  const mid = BOARD_SIZE / 2
  board[mid - 1][mid - 1] = WHITE
  board[mid - 1][mid] = BLACK
  board[mid][mid - 1] = BLACK
  board[mid][mid] = WHITE
  return board
}

export function getOpponent(player: Player): Player {
  return player === BLACK ? WHITE : BLACK
}

export function isInsideBoard(row: number, col: number): boolean {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE
}

export function getFlippableCells(
  board: Board,
  row: number,
  col: number,
  player: Player,
): Position[] {
  if (board[row][col] !== EMPTY) return []

  const opponent = getOpponent(player)
  const flippable: Position[] = []

  for (const [dr, dc] of DIRECTIONS) {
    const candidates: Position[] = []
    let r = row + dr
    let c = col + dc

    while (isInsideBoard(r, c) && board[r][c] === opponent) {
      candidates.push({ row: r, col: c })
      r += dr
      c += dc
    }

    if (candidates.length > 0 && isInsideBoard(r, c) && board[r][c] === player) {
      flippable.push(...candidates)
    }
  }

  return flippable
}

export function isValidMove(
  board: Board,
  row: number,
  col: number,
  player: Player,
): boolean {
  if (board[row][col] !== EMPTY) return false
  return getFlippableCells(board, row, col, player).length > 0
}

export function getValidMoves(board: Board, player: Player): Position[] {
  const moves: Position[] = []
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (isValidMove(board, r, c, player)) {
        moves.push({ row: r, col: c })
      }
    }
  }
  return moves
}

export function placePiece(
  board: Board,
  row: number,
  col: number,
  player: Player,
): { board: Board; flippedCells: Position[] } {
  const flippedCells = getFlippableCells(board, row, col, player)

  const newBoard: Board = board.map(r => [...r] as Cell[])
  newBoard[row][col] = player
  for (const { row: fr, col: fc } of flippedCells) {
    newBoard[fr][fc] = player
  }

  return { board: newBoard, flippedCells }
}

export function countPieces(board: Board): { black: number; white: number } {
  let black = 0
  let white = 0
  for (const row of board) {
    for (const cell of row) {
      if (cell === BLACK) black++
      else if (cell === WHITE) white++
    }
  }
  return { black, white }
}

export function isBoardFull(board: Board): boolean {
  return board.every(row => row.every(cell => cell !== EMPTY))
}

export function hasAnyValidMove(board: Board, player: Player): boolean {
  return getValidMoves(board, player).length > 0
}

export function calculateWinner(board: Board): Winner {
  const { black, white } = countPieces(board)
  if (black > white) return BLACK
  if (white > black) return WHITE
  return 'draw'
}
