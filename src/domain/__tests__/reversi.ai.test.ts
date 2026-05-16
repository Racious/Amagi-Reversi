import { describe, it, expect } from 'vitest'
import { BLACK, WHITE } from '../reversi.constants'
import { easyAi, hardAi, normalAi } from '../reversi.ai'
import { createInitialBoard, isValidMove } from '../reversi.rules'

describe('easyAi', () => {
  it('returns a valid move on initial board', () => {
    const board = createInitialBoard()
    const move = easyAi(board, BLACK)
    expect(move).not.toBeNull()
    if (move) {
      expect(isValidMove(board, move.row, move.col, BLACK)).toBe(true)
    }
  })

  it('returns null when no valid moves', () => {
    const board = Array.from({ length: 8 }, () => Array(8).fill(BLACK)) as any
    const move = easyAi(board, WHITE)
    expect(move).toBeNull()
  })
})

describe('normalAi', () => {
  it('returns a valid move on initial board', () => {
    const board = createInitialBoard()
    const move = normalAi(board, WHITE)
    expect(move).not.toBeNull()
    if (move) {
      expect(isValidMove(board, move.row, move.col, WHITE)).toBe(true)
    }
  })

  it('returns null when no valid moves', () => {
    const board = Array.from({ length: 8 }, () => Array(8).fill(WHITE)) as any
    const move = normalAi(board, BLACK)
    expect(move).toBeNull()
  })
})

describe('hardAi', () => {
  it('returns a valid move on initial board', () => {
    const board = createInitialBoard()
    const move = hardAi(board, BLACK)
    expect(move).not.toBeNull()
    if (move) {
      expect(isValidMove(board, move.row, move.col, BLACK)).toBe(true)
    }
  })

  it('returns null when no valid moves', () => {
    const board = Array.from({ length: 8 }, () => Array(8).fill(BLACK)) as any
    const move = hardAi(board, WHITE)
    expect(move).toBeNull()
  })
})
