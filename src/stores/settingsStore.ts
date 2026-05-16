import { defineStore } from 'pinia'
import { ref } from 'vue'

export type Theme = 'light' | 'dark'

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref<Theme>('dark')
  const showHints = ref(true)

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    applyTheme()
    save()
  }

  function applyTheme() {
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function load() {
    try {
      const saved = localStorage.getItem('amagi_settings')
      if (saved) {
        const data = JSON.parse(saved) as { theme?: Theme; showHints?: boolean }
        if (data.theme) theme.value = data.theme
        if (data.showHints !== undefined) showHints.value = data.showHints
      }
    } catch {
      // ignore
    }
  }

  function save() {
    try {
      localStorage.setItem('amagi_settings', JSON.stringify({ theme: theme.value, showHints: showHints.value }))
    } catch {
      // ignore
    }
  }

  function init() {
    load()
    applyTheme()
  }

  return { theme, showHints, toggleTheme, applyTheme, init, save }
})
