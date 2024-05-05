<template>
  <div class="photo-uploader">
    <div class="photo-uploader__input">
      <v-file-input
        v-model="image"
        label="Загрузите изображение"
        variant="outlined"
        hide-details="auto"
        multiple
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
        @click:close="remove(photo)"
      >
        <v-icon start icon="mdi-camera"></v-icon>

        {{ truncate(photo) }}
      </v-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { truncate } from '@/utils/text'
import { uploadDrinkImage, removeDrinkImage } from '~/utils/drink'
import { uploadSnackImage, removeSnackImage } from '~/services/product'

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
  drink: {
    type: Boolean,
    default: false,
  },
  images: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
})

const emit = defineEmits({
  'update:images': (_images: string[]) => true,
})

const currentImages = ref<string[]>([])
const image = ref<File[]>()

function add() {
  if (!image.value) {
    return
  }

  image.value?.forEach(async (image: File) => {
    currentImages.value.push(image.name)

    props.drink
      ? await uploadDrinkImage(props.id, image)
      : await uploadSnackImage(props.id, image)
  })

  emit('update:images', currentImages.value)
}

async function remove(image: string) {
  props.drink
    ? await removeDrinkImage(props.id, image)
    : await removeSnackImage(props.id, image)
}
</script>

<style lang="scss" src="./PhotoUploader.scss"></style>
