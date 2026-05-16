import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { AiDifficulty, Board, GameMode, GameStatus, MoveRecord, Player, Position, Winner } from '@/domain/reversi.types'
import { BLACK, WHITE } from '@/domain/reversi.constants'
import {
  calculateWinner,
  countPieces,
  createInitialBoard,
  getOpponent,
  getValidMoves,
  hasAnyValidMove,
  isBoardFull,
  placePiece,
} from '@/domain/reversi.rules'
import { easyAi, hardAi, normalAi } from '@/domain/reversi.ai'
import { deserializeBoard, serializeBoard } from '@/domain/reversi.serializer'
import { gameStorageService } from '@/services/gameStorageService'
import { statisticsService } from '@/services/statisticsService'

export const useGameStore = defineStore('game', () => {
  const board = ref<Board>(createInitialBoard())
  const currentPlayer = ref<Player>(BLACK)
  const mode = ref<GameMode>('human-vs-human')
  const aiDifficulty = ref<AiDifficulty>('normal')
  const status = ref<GameStatus>('playing')
  const winner = ref<Winner>(null)
  const moveHistory = ref<MoveRecord[]>([])
  const showHints = ref(true)
  const isAiThinking = ref(false)
  const passCount = ref(0)

  // Getters
  const blackCount = computed(() => countPieces(board.value).black)
  const whiteCount = computed(() => countPieces(board.value).white)
  const validMoves = computed(() => getValidMoves(board.value, currentPlayer.value))
  const isGameOver = computed(() => status.value === 'finished')

  const currentPlayerLabel = computed(() =>
    currentPlayer.value === BLACK ? '黑棋' : '白棋',
  )

  const winnerLabel = computed(() => {
    if (winner.value === BLACK) return '黑棋勝'
    if (winner.value === WHITE) return '白棋勝'
    if (winner.value === 'draw') return '平手'
    return null
  })

  // Actions
  function startNewGame(options?: { mode?: GameMode; aiDifficulty?: AiDifficulty }) {
    board.value = createInitialBoard()
    currentPlayer.value = BLACK
    mode.value = options?.mode ?? mode.value
    aiDifficulty.value = options?.aiDifficulty ?? aiDifficulty.value
    status.value = 'playing'
    winner.value = null
    moveHistory.value = []
    passCount.value = 0
    isAiThinking.value = false
  }

  function placeAt(row: number, col: number) {
    if (status.value !== 'playing') return
    if (isAiThinking.value) return

    const validMove = validMoves.value.some(m => m.row === row && m.col === col)
    if (!validMove) return

    const boardBefore = serializeBoard(board.value)
    const { board: newBoard, flippedCells } = placePiece(board.value, row, col, currentPlayer.value)

    const record: MoveRecord = {
      moveNumber: moveHistory.value.length + 1,
      player: currentPlayer.value,
      position: { row, col },
      flippedCells,
      boardBefore,
      boardAfter: serializeBoard(newBoard),
      createdAt: new Date().toISOString(),
    }

    board.value = newBoard
    moveHistory.value = [...moveHistory.value, record]
    passCount.value = 0

    advanceTurn()
    saveCurrentGame()
  }

  function advanceTurn() {
    if (isBoardFull(board.value)) {
      finishGame()
      return
    }

    const next = getOpponent(currentPlayer.value)

    if (hasAnyValidMove(board.value, next)) {
      currentPlayer.value = next
      return
    }

    // Next player has no valid moves — current player continues
    if (hasAnyValidMove(board.value, currentPlayer.value)) {
      passCount.value++
      // currentPlayer stays the same (opponent is passed)
      return
    }

    // Both players have no valid moves
    finishGame()
  }

  function undo() {
    if (moveHistory.value.length === 0) return
    if (status.value !== 'playing' && status.value !== 'finished') return

    // In AI mode, undo two moves to keep it as human's turn
    const undoCount = mode.value === 'human-vs-ai' ? 2 : 1
    const history = [...moveHistory.value]

    let undone = 0
    while (undone < undoCount && history.length > 0) {
      history.pop()
      undone++
    }

    if (history.length === 0) {
      board.value = createInitialBoard()
      currentPlayer.value = BLACK
    } else {
      const last = history[history.length - 1]
      board.value = deserializeBoard(last.boardAfter)
      currentPlayer.value = getOpponent(last.player)
    }

    moveHistory.value = history
    status.value = 'playing'
    winner.value = null
    passCount.value = 0
  }

  function restart() {
    startNewGame()
  }

  function toggleHints() {
    showHints.value = !showHints.value
  }

  async function applyAiMoveIfNeeded(): Promise<void> {
    if (status.value !== 'playing') return
    if (mode.value !== 'human-vs-ai') return
    if (currentPlayer.value !== WHITE) return
    if (isAiThinking.value) return

    isAiThinking.value = true

    await new Promise<void>(resolve => setTimeout(resolve, 400))

    let move: Position | null = null
    const b = board.value
    const p = currentPlayer.value
    const diff = aiDifficulty.value

    if (diff === 'easy') move = easyAi(b, p)
    else if (diff === 'normal') move = normalAi(b, p)
    else move = hardAi(b, p)

    isAiThinking.value = false

    if (move) {
      placeAt(move.row, move.col)
    } else {
      // AI has no moves — pass
      advanceTurn()
    }
  }

  function finishGame() {
    status.value = 'finished'
    winner.value = calculateWinner(board.value)
    if (winner.value !== null) {
      statisticsService.record(winner.value)
    }
    saveCurrentGame()
  }

  async function saveCurrentGame(): Promise<void> {
    gameStorageService.save({
      board: board.value,
      currentPlayer: currentPlayer.value,
      mode: mode.value,
      aiDifficulty: aiDifficulty.value,
      status: status.value,
      winner: winner.value,
      moveHistory: moveHistory.value,
      passCount: passCount.value,
      showHints: showHints.value,
      startedAt: moveHistory.value[0]?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }

  async function loadLastGame(): Promise<void> {
    const saved = gameStorageService.load()
    if (!saved) return

    board.value = saved.board
    currentPlayer.value = saved.currentPlayer
    mode.value = saved.mode
    aiDifficulty.value = saved.aiDifficulty
    status.value = saved.status
    winner.value = saved.winner
    moveHistory.value = saved.moveHistory
    passCount.value = saved.passCount
    showHints.value = saved.showHints
  }

  return {
    board,
    currentPlayer,
    mode,
    aiDifficulty,
    status,
    winner,
    moveHistory,
    showHints,
    isAiThinking,
    passCount,
    blackCount,
    whiteCount,
    validMoves,
    isGameOver,
    currentPlayerLabel,
    winnerLabel,
    startNewGame,
    placeAt,
    undo,
    restart,
    toggleHints,
    applyAiMoveIfNeeded,
    finishGame,
    saveCurrentGame,
    loadLastGame,
  }
})
