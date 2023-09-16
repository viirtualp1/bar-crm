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
        closable
        color="info"
        label
        class="photo-uploader__photo"
        v-for="(photo, idx) in currentImages"
        :key="idx"
      >
        <v-icon start icon="mdi-camera"></v-icon>

        {{ truncatedPhoto(photo) }}
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
  if (!image.value) {
    return
  }

  currentImages.value.push(image.value)

  emit('update:images', currentImages.value)
}

function remove(idx: number) {
  currentImages.value.splice(idx, 1)
}

function truncatedPhoto(name: string) {
  return name.length > 20 ? `${name.slice(0, 40)}...` : name
}
</script>

<style lang="scss" src="./PhotoUploader.scss"></style>
