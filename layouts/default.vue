<template>
  <div>
    <nav-bar :subtitle="subtitle" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from '#app'

const router = useRouter()

const subtitles = ref({
  'drink-id': 'Просмотр',
  'snack-id': 'Просмотр',
  'edit-id': 'Редактирование',
  create: 'Создание',
})

type SubtitleType = keyof typeof subtitles.value

const subtitle = computed(
  () => subtitles.value[router.currentRoute.value.name as SubtitleType],
)
</script>
