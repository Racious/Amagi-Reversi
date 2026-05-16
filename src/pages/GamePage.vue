<script setup lang="ts">
import { onMounted, watch } from 'vue'
import ReversiBoard from '@/components/board/ReversiBoard.vue'
import GameStatusPanel from '@/components/game/GameStatusPanel.vue'
import GameControlPanel from '@/components/game/GameControlPanel.vue'
import ModeSelector from '@/components/game/ModeSelector.vue'
import ResultDialog from '@/components/game/ResultDialog.vue'
import { useGameStore } from '@/stores/gameStore'

const game = useGameStore()

onMounted(async () => {
  await game.loadActiveGame()
  if (game.status === 'playing') {
    await game.applyAiMoveIfNeeded()
  }
})

watch(
  () => game.currentPlayer,
  async () => {
    await game.applyAiMoveIfNeeded()
  },
)
</script>

<template>
  <div class="game-page">
    <div class="game-layout">
      <div class="board-area">
        <ReversiBoard />
      </div>
      <aside class="side-panel">
        <GameStatusPanel />
        <div class="divider" />
        <GameControlPanel />
        <div class="divider" />
        <ModeSelector />
      </aside>
    </div>
    <ResultDialog />
  </div>
</template>

<style scoped>
.game-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.game-layout {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.board-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  min-height: 0;
}

.side-panel {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
}

.divider {
  width: 1px;
  height: 40px;
  background: var(--border);
}

@media (min-width: 768px) {
  .game-layout {
    flex-direction: row;
  }

  .board-area {
    padding: 24px;
  }

  .side-panel {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    justify-content: flex-start;
    width: 220px;
    min-width: 220px;
    border-top: none;
    border-left: 1px solid var(--border);
    padding: 20px 16px;
    gap: 0;
  }

  .divider {
    width: auto;
    height: 1px;
    margin: 12px 0;
  }
}
</style>
