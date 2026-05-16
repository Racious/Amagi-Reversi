import type { Winner } from '@/domain/reversi.types'

export interface GameStatistics {
  total: number
  blackWins: number
  whiteWins: number
  draws: number
}

const STATS_KEY = 'amagi_reversi_statistics'

const defaultStats = (): GameStatistics => ({
  total: 0,
  blackWins: 0,
  whiteWins: 0,
  draws: 0,
})

export const statisticsService = {
  load(): GameStatistics {
    try {
      const raw = localStorage.getItem(STATS_KEY)
      if (!raw) return defaultStats()
      return JSON.parse(raw) as GameStatistics
    } catch {
      return defaultStats()
    }
  },

  record(winner: Winner): GameStatistics {
    const stats = this.load()
    stats.total++
    if (winner === 1) stats.blackWins++
    else if (winner === 2) stats.whiteWins++
    else if (winner === 'draw') stats.draws++
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(stats))
    } catch {
      // ignore
    }
    return stats
  },

  reset(): void {
    try {
      localStorage.removeItem(STATS_KEY)
    } catch {
      // ignore
    }
  },
}
