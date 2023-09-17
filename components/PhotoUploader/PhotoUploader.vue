<template>
  <div class="photo-uploader">
    <div class="photo-uploader__input">
      <v-text-field
        v-model="image"
        label="Вставьте ссылку на изображение"
        variant="outlined"
        hide-details="auto"
      />

      <v-btn class="photo-uploader__add" x-small @click="add">Добавить</v-btn>
    </div>

    <div class="photo-uploader__added">
      <v-chip
        color="info"
        class="photo-uploader__photo"
        v-for="(photo, idx) in currentImages"
        :key="idx"
        closable
        label
      >
        <v-icon start icon="mdi-camera"></v-icon>

        {{ truncate(photo) }}
      </v-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { truncate } from '@/utils/text'

defineProps({
  images: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

const emit = defineEmits({
  'update:images': (_images: string[]) => true,
})

const currentImages = ref<string[]>([])
const image = ref('')

function add() {
  if (!image.value) {
    return
  }

  currentImages.value.push(image.value)

  emit('update:images', currentImages.value)
}

function remove(idx: number) {
  currentImages.value.splice(idx, 1)
}
</script>

<style lang="scss" src="./PhotoUploader.scss"></style>
