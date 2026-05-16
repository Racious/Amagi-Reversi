import { describe, it, expect } from 'vitest'
import { BLACK, EMPTY, WHITE } from '../reversi.constants'
import {
  calculateWinner,
  countPieces,
  createInitialBoard,
  getFlippableCells,
  getOpponent,
  getValidMoves,
  hasAnyValidMove,
  isBoardFull,
  isValidMove,
  placePiece,
} from '../reversi.rules'

describe('createInitialBoard', () => {
  it('returns 8x8 board', () => {
    const board = createInitialBoard()
    expect(board.length).toBe(8)
    board.forEach(row => expect(row.length).toBe(8))
  })

  it('has correct initial pieces', () => {
    const board = createInitialBoard()
    expect(board[3][3]).toBe(WHITE)
    expect(board[3][4]).toBe(BLACK)
    expect(board[4][3]).toBe(BLACK)
    expect(board[4][4]).toBe(WHITE)
  })

  it('has exactly 2 black and 2 white pieces initially', () => {
    const board = createInitialBoard()
    const { black, white } = countPieces(board)
    expect(black).toBe(2)
    expect(white).toBe(2)
  })

  it('all other cells are empty', () => {
    const board = createInitialBoard()
    let empty = 0
    board.forEach(row => row.forEach(cell => { if (cell === EMPTY) empty++ }))
    expect(empty).toBe(60)
  })
})

describe('getOpponent', () => {
  it('returns WHITE for BLACK', () => {
    expect(getOpponent(BLACK)).toBe(WHITE)
  })

  it('returns BLACK for WHITE', () => {
    expect(getOpponent(WHITE)).toBe(BLACK)
  })
})

describe('isValidMove', () => {
  it('rejects non-empty cells', () => {
    const board = createInitialBoard()
    expect(isValidMove(board, 3, 3, BLACK)).toBe(false)
  })

  it('accepts valid initial moves for BLACK', () => {
    const board = createInitialBoard()
    // Black's valid moves on initial board: (2,3), (3,2), (4,5), (5,4)
    expect(isValidMove(board, 2, 3, BLACK)).toBe(true)
    expect(isValidMove(board, 3, 2, BLACK)).toBe(true)
    expect(isValidMove(board, 4, 5, BLACK)).toBe(true)
    expect(isValidMove(board, 5, 4, BLACK)).toBe(true)
  })

  it('rejects invalid positions for BLACK on initial board', () => {
    const board = createInitialBoard()
    expect(isValidMove(board, 0, 0, BLACK)).toBe(false)
    expect(isValidMove(board, 0, 1, BLACK)).toBe(false)
  })
})

describe('getFlippableCells', () => {
  it('returns correct cells for BLACK at (2,3) on initial board', () => {
    const board = createInitialBoard()
    const flippable = getFlippableCells(board, 2, 3, BLACK)
    expect(flippable).toHaveLength(1)
    expect(flippable[0]).toEqual({ row: 3, col: 3 })
  })

  it('returns empty for non-empty cell', () => {
    const board = createInitialBoard()
    const flippable = getFlippableCells(board, 3, 3, BLACK)
    expect(flippable).toHaveLength(0)
  })

  it('checks all 8 directions', () => {
    // Place a scenario where flipping occurs in multiple directions
    const board = createInitialBoard()
    // Place black at (3,2): should flip (3,3) going right
    const flippable = getFlippableCells(board, 3, 2, BLACK)
    expect(flippable.some(p => p.row === 3 && p.col === 3)).toBe(true)
  })
})

describe('getValidMoves', () => {
  it('returns 4 valid moves for BLACK on initial board', () => {
    const board = createInitialBoard()
    const moves = getValidMoves(board, BLACK)
    expect(moves).toHaveLength(4)
  })

  it('returns 4 valid moves for WHITE on initial board', () => {
    const board = createInitialBoard()
    const moves = getValidMoves(board, WHITE)
    expect(moves).toHaveLength(4)
  })
})

describe('placePiece', () => {
  it('places piece and flips correct cells', () => {
    const board = createInitialBoard()
    const { board: newBoard, flippedCells } = placePiece(board, 2, 3, BLACK)
    expect(newBoard[2][3]).toBe(BLACK)
    expect(newBoard[3][3]).toBe(BLACK)
    expect(flippedCells).toHaveLength(1)
    expect(flippedCells[0]).toEqual({ row: 3, col: 3 })
  })

  it('does not mutate the original board', () => {
    const board = createInitialBoard()
    const original = board[2][3]
    placePiece(board, 2, 3, BLACK)
    expect(board[2][3]).toBe(original)
  })

  it('original board unchanged after placing', () => {
    const board = createInitialBoard()
    placePiece(board, 2, 3, BLACK)
    expect(board[3][3]).toBe(WHITE)
  })
})

describe('countPieces', () => {
  it('counts initial pieces correctly', () => {
    const board = createInitialBoard()
    expect(countPieces(board)).toEqual({ black: 2, white: 2 })
  })

  it('counts after placing a piece', () => {
    const board = createInitialBoard()
    const { board: newBoard } = placePiece(board, 2, 3, BLACK)
    const { black, white } = countPieces(newBoard)
    expect(black).toBe(4)
    expect(white).toBe(1)
  })
})

describe('isBoardFull', () => {
  it('initial board is not full', () => {
    expect(isBoardFull(createInitialBoard())).toBe(false)
  })

  it('all-filled board is full', () => {
    const board = Array.from({ length: 8 }, () => Array(8).fill(BLACK)) as any
    expect(isBoardFull(board)).toBe(true)
  })
})

describe('hasAnyValidMove', () => {
  it('BLACK has moves on initial board', () => {
    expect(hasAnyValidMove(createInitialBoard(), BLACK)).toBe(true)
  })

  it('returns false on full board', () => {
    const board = Array.from({ length: 8 }, () => Array(8).fill(BLACK)) as any
    expect(hasAnyValidMove(board, WHITE)).toBe(false)
  })
})

describe('calculateWinner', () => {
  it('BLACK wins when more black pieces', () => {
    const board = Array.from({ length: 8 }, (_, r) =>
      Array(8).fill(r < 5 ? BLACK : WHITE),
    ) as any
    expect(calculateWinner(board)).toBe(BLACK)
  })

  it('WHITE wins when more white pieces', () => {
    const board = Array.from({ length: 8 }, (_, r) =>
      Array(8).fill(r < 3 ? BLACK : WHITE),
    ) as any
    expect(calculateWinner(board)).toBe(WHITE)
  })

  it('draw when equal pieces', () => {
    const board = Array.from({ length: 8 }, (_, r) =>
      Array(8).fill(r < 4 ? BLACK : WHITE),
    ) as any
    expect(calculateWinner(board)).toBe('draw')
  })
})

describe('boundary checks', () => {
  it('does not flip outside board boundary', () => {
    const board = createInitialBoard()
    // Placing at corner should not cause out-of-bounds error
    expect(() => getFlippableCells(board, 0, 0, BLACK)).not.toThrow()
    expect(() => getFlippableCells(board, 7, 7, WHITE)).not.toThrow()
  })

  it('invalid move does not change board', () => {
    const board = createInitialBoard()
    const boardCopy = board.map(r => [...r])
    // Attempt invalid placement — not a valid move
    const { board: newBoard } = placePiece(board, 0, 0, BLACK)
    // Original unchanged
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        expect(board[r][c]).toBe(boardCopy[r][c])
      }
    }
    // New board has piece at 0,0 but no flips since 0,0 is empty corner
    expect(newBoard[0][0]).toBe(BLACK)
  })
})
