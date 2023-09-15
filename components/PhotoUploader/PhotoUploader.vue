<template>
  <div class="photo-uploader">
    <div class="photo-uploader__input">
      <v-text-field
        v-model="photo"
        label="Вставьте ссылку на изображение"
        variant="outlined"
        hide-details="auto"
      />
      <v-btn x-small @click="add">Добавить</v-btn>
    </div>

    <div class="photo-uploader__added">
      <v-chip
        class="photo-uploader__photo"
        v-for="(photo, idx) in currentPhotos"
        :key="idx"
      >
        {{ truncatedPhoto(photo) }}

        <button
          type="button"
          class="photo-uploader__photo-delete"
          size="x-small"
          icon
          @click="remove(idx)"
        >
          <v-icon size="small">mdi-trash-can</v-icon>
        </button>
      </v-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  photos: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

const emit = defineEmits({
  'update:photos': (_photos: string[]) => true,
})

const currentPhotos = ref<string[]>([])
const photo = ref('')

function add() {
  currentPhotos.value.push(photo.value)

  emit('update:photos', currentPhotos.value)
}

function remove(idx: number) {
  currentPhotos.value.splice(idx, 1)
}

function truncatedPhoto(name: string) {
  return `${name.slice(0, 16)}...`
}
</script>

<style lang="scss" src="./PhotoUploader.scss"></style>
