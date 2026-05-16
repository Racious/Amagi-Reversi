<script setup lang="ts">
import { useSettingsStore } from '@/stores/settingsStore'

const settings = useSettingsStore()
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <span class="app-title">Amagi Reversi</span>
      <button class="theme-btn" @click="settings.toggleTheme()">
        {{ settings.theme === 'dark' ? '☀️' : '🌙' }}
      </button>
    </header>
    <main class="app-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  background: var(--bg-base);
  color: var(--text-primary);
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border);
}

.app-title {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--accent);
}

.theme-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px;
  border-radius: 6px;
  transition: background 0.15s;
}

.theme-btn:hover {
  background: rgba(128, 128, 128, 0.15);
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
