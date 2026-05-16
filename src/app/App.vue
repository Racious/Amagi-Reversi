<script setup lang="ts">
import { onMounted } from 'vue'
import AppShell from '@/components/layout/AppShell.vue'
import { useSettingsStore } from '@/stores/settingsStore'

const settings = useSettingsStore()
onMounted(() => settings.init())
</script>

<template>
  <AppShell>
    <RouterView />
  </AppShell>
</template>
