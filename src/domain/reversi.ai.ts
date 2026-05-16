import type { Board, Player, Position } from './reversi.types'
import { POSITION_WEIGHTS } from './reversi.constants'
import { getFlippableCells, getValidMoves } from './reversi.rules'

export function easyAi(board: Board, player: Player): Position | null {
  const moves = getValidMoves(board, player)
  if (moves.length === 0) return null
  return moves[Math.floor(Math.random() * moves.length)]
}

export function normalAi(board: Board, player: Player): Position | null {
  const moves = getValidMoves(board, player)
  if (moves.length === 0) return null

  let best: Position = moves[0]
  let bestScore = -1

  for (const move of moves) {
    const score = getFlippableCells(board, move.row, move.col, player).length
    if (score > bestScore) {
      bestScore = score
      best = move
    }
  }

  return best
}

export function hardAi(board: Board, player: Player): Position | null {
  const moves = getValidMoves(board, player)
  if (moves.length === 0) return null

  let best: Position = moves[0]
  let bestScore = -Infinity

  for (const move of moves) {
    const score = POSITION_WEIGHTS[move.row][move.col]
    if (score > bestScore) {
      bestScore = score
      best = move
    }
  }

  return best
}
