<script setup lang="ts">
import type { Cell, Position } from '@/domain/reversi.types'
import PieceDisc from './PieceDisc.vue'

const props = defineProps<{
  cell: Cell
  row: number
  col: number
  isValidMove: boolean
  showHints: boolean
  isLastMove: boolean
}>()

const emit = defineEmits<{
  place: [pos: Position]
}>()

function handleClick() {
  if (props.isValidMove) {
    emit('place', { row: props.row, col: props.col })
  }
}
</script>

<template>
  <div
    class="board-cell"
    :class="{
      'cursor-pointer hover:brightness-110': isValidMove,
      'hint-dot': isValidMove && showHints,
    }"
    @click="handleClick"
  >
    <div v-if="cell !== 0" class="flex items-center justify-center w-full h-full">
      <PieceDisc :player="cell as 1 | 2" :is-new="isLastMove" />
    </div>
    <div
      v-else-if="isValidMove && showHints"
      class="hint-marker"
    />
  </div>
</template>

<style scoped>
.board-cell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2d6a4f;
  border: 1px solid #1a3a2a;
  aspect-ratio: 1;
}

.board-cell:hover .hint-marker {
  opacity: 0.8;
}

.hint-marker {
  width: 28%;
  height: 28%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  transition: opacity 0.15s;
}
</style>
