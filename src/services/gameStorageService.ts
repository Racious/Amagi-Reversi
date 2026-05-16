import type { GameState } from '@/domain/reversi.types'

const STORAGE_KEY = 'amagi_reversi_current_game'

export const gameStorageService = {
  save(state: GameState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // localStorage may be unavailable in some environments
    }
  },

  load(): GameState | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      return JSON.parse(raw) as GameState
    } catch {
      return null
    }
  },

  clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  },
}
