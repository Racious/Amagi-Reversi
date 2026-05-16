<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'

const game = useGameStore()
</script>

<template>
  <div class="control-panel">
    <button
      class="btn btn-secondary"
      :disabled="game.moveHistory.length === 0"
      @click="game.undo()"
    >
      悔棋
    </button>
    <button class="btn btn-secondary" @click="game.restart()">
      重開
    </button>
    <button
      class="btn"
      :class="game.showHints ? 'btn-primary' : 'btn-secondary'"
      @click="game.toggleHints()"
    >
      {{ game.showHints ? '提示 ON' : '提示 OFF' }}
    </button>
  </div>
</template>

<style scoped>
.control-panel {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: opacity 0.15s, transform 0.1s;
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn:not(:disabled):active {
  transform: scale(0.96);
}

.btn-primary {
  background: var(--accent);
  color: #fff;
}

.btn-primary:not(:disabled):hover {
  background: var(--accent-hover);
}

.btn-secondary {
  background: var(--bg-surface-2);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
}

.btn-secondary:not(:disabled):hover {
  filter: brightness(1.1);
}
</style>
