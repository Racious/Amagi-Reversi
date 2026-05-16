<script setup lang="ts">
import GameControlPanel from '@/components/game/GameControlPanel.vue'
</script>

<template>
  <div class="mobile-bar">
    <GameControlPanel />
  </div>
</template>

<style scoped>
.mobile-bar {
  padding: 10px 16px;
  background: #1e293b;
  border-top: 1px solid #2d3748;
  safe-area-inset-bottom: env(safe-area-inset-bottom);
}
</style>
