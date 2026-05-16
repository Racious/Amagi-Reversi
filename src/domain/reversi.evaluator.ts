import type { Board, Player } from './reversi.types'
import { POSITION_WEIGHTS } from './reversi.constants'
import { BLACK } from './reversi.constants'
import { countPieces } from './reversi.rules'

export function evaluateBoard(board: Board, player: Player): number {
  let score = 0
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      const cell = board[r][c]
      if (cell === player) score += POSITION_WEIGHTS[r][c]
      else if (cell !== 0) score -= POSITION_WEIGHTS[r][c]
    }
  }
  return score
}

export function getPieceAdvantage(board: Board): number {
  const { black, white } = countPieces(board)
  return black - white
}

export function getScoreForPlayer(board: Board, player: Player): number {
  const { black, white } = countPieces(board)
  return player === BLACK ? black : white
}
