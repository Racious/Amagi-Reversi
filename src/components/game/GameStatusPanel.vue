<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'

const game = useGameStore()

function resetStatistics() {
  if (!window.confirm('確定要重置戰績嗎？')) return
  game.resetStatistics()
}
</script>

<template>
  <div class="status-panel">
    <div class="score-row">
      <div class="score-item" :class="{ active: game.currentPlayer === 1 && !game.isGameOver }">
        <div class="disc black-disc" />
        <span class="label">黑棋</span>
        <span class="count">{{ game.blackCount }}</span>
      </div>
      <div class="score-item" :class="{ active: game.currentPlayer === 2 && !game.isGameOver }">
        <div class="disc white-disc" />
        <span class="label">白棋</span>
        <span class="count">{{ game.whiteCount }}</span>
      </div>
    </div>

    <div v-if="!game.isGameOver" class="turn-indicator">
      <span v-if="game.isAiThinking" class="thinking">AI 思考中…</span>
      <span v-else>輪到：{{ game.currentPlayerLabel }}</span>
    </div>

    <div v-else class="result-badge">
      {{ game.winnerLabel }}
    </div>

    <div class="stats-row">
      <span>總場次 {{ game.statistics.total }}</span>
      <span>黑 {{ game.statistics.blackWins }}</span>
      <span>白 {{ game.statistics.whiteWins }}</span>
      <span>和 {{ game.statistics.draws }}</span>
    </div>

    <button class="reset-stats-button" type="button" @click="resetStatistics">
      重置戰績
    </button>
  </div>
</template>

<style scoped>
.status-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
}

.score-row {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.score-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  border: 2px solid transparent;
  opacity: 0.6;
  transition: opacity 0.2s, border-color 0.2s;
}

.score-item.active {
  opacity: 1;
  border-color: var(--accent);
}

.disc {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.black-disc {
  background: radial-gradient(circle at 35% 35%, #555, #000);
}

.white-disc {
  background: radial-gradient(circle at 35% 35%, #fff, #ccc);
  box-shadow: 0 0 0 1px #999;
}

.label {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.count {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  min-width: 24px;
  text-align: right;
}

.turn-indicator {
  text-align: center;
  font-size: 0.9rem;
  color: var(--accent);
}

.thinking {
  animation: blink 1s step-start infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.result-badge {
  text-align: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--warning);
  padding: 4px 8px;
  background: rgba(251, 191, 36, 0.1);
  border-radius: 6px;
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.stats-row {
  display: flex;
  justify-content: space-around;
  font-size: 0.75rem;
  color: var(--text-muted);
  border-top: 1px solid var(--border);
  padding-top: 8px;
}

.reset-stats-button {
  align-self: center;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.75rem;
  padding: 4px 10px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.reset-stats-button:hover {
  border-color: var(--danger);
  color: var(--danger);
  background: rgba(239, 68, 68, 0.08);
}
</style>
