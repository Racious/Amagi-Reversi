import { describe, it, expect } from 'vitest'
import { createInitialBoard } from '../reversi.rules'
import { deserializeBoard, serializeBoard } from '../reversi.serializer'

describe('serializeBoard', () => {
  it('serializes initial board to 64-char string', () => {
    const board = createInitialBoard()
    const result = serializeBoard(board)
    expect(result).toHaveLength(64)
  })

  it('contains only 0, 1, 2 characters', () => {
    const board = createInitialBoard()
    const result = serializeBoard(board)
    expect(result).toMatch(/^[012]+$/)
  })

  it('encodes initial board positions correctly', () => {
    const board = createInitialBoard()
    const result = serializeBoard(board)
    // [3][3]=2 => index 27
    expect(result[27]).toBe('2')
    // [3][4]=1 => index 28
    expect(result[28]).toBe('1')
    // [4][3]=1 => index 35
    expect(result[35]).toBe('1')
    // [4][4]=2 => index 36
    expect(result[36]).toBe('2')
  })
})

describe('deserializeBoard', () => {
  it('round-trips initial board', () => {
    const board = createInitialBoard()
    const serialized = serializeBoard(board)
    const restored = deserializeBoard(serialized)
    expect(restored).toEqual(board)
  })

  it('throws on invalid length', () => {
    expect(() => deserializeBoard('0'.repeat(63))).toThrow()
    expect(() => deserializeBoard('0'.repeat(65))).toThrow()
  })

  it('throws on invalid character', () => {
    const valid = '0'.repeat(63) + '3'
    expect(() => deserializeBoard(valid)).toThrow()
  })
})
