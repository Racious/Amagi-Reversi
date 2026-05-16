<script setup lang="ts">
import type { AiDifficulty, GameMode } from '@/domain/reversi.types'
import { useGameStore } from '@/stores/gameStore'

const game = useGameStore()

const modes: { value: GameMode; label: string }[] = [
  { value: 'human-vs-human', label: '雙人對戰' },
  { value: 'human-vs-ai', label: '人機對戰' },
]

const difficulties: { value: AiDifficulty; label: string }[] = [
  { value: 'easy', label: '簡單' },
  { value: 'normal', label: '普通' },
  { value: 'hard', label: '困難' },
]

function selectMode(m: GameMode) {
  game.startNewGame({ mode: m, aiDifficulty: game.aiDifficulty })
}

function selectDifficulty(d: AiDifficulty) {
  game.startNewGame({ mode: game.mode, aiDifficulty: d })
}
</script>

<template>
  <div class="mode-selector">
    <div class="section-label">遊戲模式</div>
    <div class="btn-group">
      <button
        v-for="m in modes"
        :key="m.value"
        class="toggle-btn"
        :class="{ active: game.mode === m.value }"
        @click="selectMode(m.value)"
      >
        {{ m.label }}
      </button>
    </div>

    <template v-if="game.mode === 'human-vs-ai'">
      <div class="section-label mt-2">AI 難度</div>
      <div class="btn-group">
        <button
          v-for="d in difficulties"
          :key="d.value"
          class="toggle-btn"
          :class="{ active: game.aiDifficulty === d.value }"
          @click="selectDifficulty(d.value)"
        >
          {{ d.label }}
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.mode-selector {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.section-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.mt-2 {
  margin-top: 4px;
}

.btn-group {
  display: flex;
  gap: 4px;
}

.toggle-btn {
  flex: 1;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  border: 1px solid var(--border-subtle);
  background: var(--bg-surface-2);
  color: var(--text-secondary);
  transition: background 0.15s, color 0.15s;
}

.toggle-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  font-weight: 600;
}
</style>
