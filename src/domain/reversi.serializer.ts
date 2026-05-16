import type { Board, Cell } from './reversi.types'
import { BOARD_SIZE } from './reversi.constants'

export function serializeBoard(board: Board): string {
  return board.flat().join('')
}

export function deserializeBoard(value: string): Board {
  if (value.length !== BOARD_SIZE * BOARD_SIZE) {
    throw new Error(`Invalid board string length: ${value.length}`)
  }
  const board: Board = []
  for (let r = 0; r < BOARD_SIZE; r++) {
    const row: Cell[] = []
    for (let c = 0; c < BOARD_SIZE; c++) {
      const ch = value[r * BOARD_SIZE + c]
      if (ch !== '0' && ch !== '1' && ch !== '2') {
        throw new Error(`Invalid cell value at [${r},${c}]: ${ch}`)
      }
      row.push(Number(ch) as Cell)
    }
    board.push(row)
  }
  return board
}
