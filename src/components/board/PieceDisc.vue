<script setup lang="ts">
defineProps<{
  player: 1 | 2
  isNew?: boolean
}>()
</script>

<template>
  <div
    class="piece-disc"
    :class="[
      player === 1 ? 'black-piece' : 'white-piece',
      isNew ? 'piece-new' : '',
    ]"
  />
</template>

<style scoped>
.piece-disc {
  width: 80%;
  height: 80%;
  border-radius: 50%;
  transition: transform 0.25s ease;
}

.black-piece {
  background: radial-gradient(circle at 35% 35%, #555, #000);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
}

.white-piece {
  background: radial-gradient(circle at 35% 35%, #fff, #ccc);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
}

.piece-new {
  animation: place-in 0.2s ease-out;
}

@keyframes place-in {
  from {
    transform: scale(0.4);
    opacity: 0.6;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
