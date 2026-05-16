<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import BoardCell from './BoardCell.vue'

const game = useGameStore()

const lastMovePos = computed(() => {
  const hist = game.moveHistory
  if (hist.length === 0) return null
  return hist[hist.length - 1].position
})

const validMoveSet = computed(() =>
  new Set(game.validMoves.map(p => `${p.row},${p.col}`)),
)

const cells = computed(() => {
  const result = []
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const isLast =
        lastMovePos.value?.row === r && lastMovePos.value?.col === c
      result.push({
        key: `${r}-${c}`,
        row: r,
        col: c,
        cell: game.board[r][c],
        isValidMove: validMoveSet.value.has(`${r},${c}`),
        isLastMove: isLast,
      })
    }
  }
  return result
})
</script>

<template>
  <div class="board-wrapper">
    <div class="board-grid">
      <BoardCell
        v-for="item in cells"
        :key="item.key"
        :cell="item.cell"
        :row="item.row"
        :col="item.col"
        :is-valid-move="item.isValidMove"
        :show-hints="game.showHints"
        :is-last-move="item.isLastMove"
        @place="game.placeAt($event.row, $event.col)"
      />
    </div>
  </div>
</template>

<style scoped>
.board-wrapper {
  padding: 8px;
  background: #1b4332;
  border-radius: 4px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 480px;
}

.board-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  border: 2px solid #1a3a2a;
}
</style>
