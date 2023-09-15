<template>
  <div class="photo-uploader">
    <div class="photo-uploader__input">
      <v-text-field
        v-model="image"
        label="Вставьте ссылку на изображение"
        variant="outlined"
        hide-details="auto"
      />
      <v-btn x-small @click="add">Добавить</v-btn>
    </div>

    <div class="photo-uploader__added">
      <v-chip
        class="photo-uploader__photo"
        v-for="(photo, idx) in currentImages"
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
  currentImages.value.push(image.value)

  emit('update:images', currentImages.value)
}

function remove(idx: number) {
  currentImages.value.splice(idx, 1)
}

function truncatedPhoto(name: string) {
  return `${name.slice(0, 16)}...`
}
</script>

<style lang="scss" src="./PhotoUploader.scss"></style>
