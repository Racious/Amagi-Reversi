<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'

const game = useGameStore()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="game.isGameOver" class="overlay">
        <div class="dialog">
          <div class="result-icon">
            {{ game.winner === 'draw' ? '🤝' : game.winner === 1 ? '⚫' : '⚪' }}
          </div>
          <h2 class="result-title">{{ game.winnerLabel }}</h2>
          <div class="score-summary">
            黑棋 {{ game.blackCount }} — 白棋 {{ game.whiteCount }}
          </div>
          <div class="dialog-actions">
            <button class="btn-primary" @click="game.restart()">再來一局</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.dialog {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px 40px;
  text-align: center;
  min-width: 240px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.result-icon {
  font-size: 3rem;
  margin-bottom: 12px;
}

.result-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--warning);
  margin-bottom: 8px;
}

.score-summary {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 24px;
}

.dialog-actions {
  display: flex;
  justify-content: center;
}

.btn-primary {
  padding: 10px 28px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: var(--accent);
  color: #fff;
  transition: background 0.15s;
}

.btn-primary:hover {
  background: var(--accent-hover);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
