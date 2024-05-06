<template>
  <div class="photo-uploader">
    <div class="photo-uploader__input">
      <v-file-input
        v-model="images"
        label="Загрузите изображение"
        variant="outlined"
        hide-details="auto"
        :disabled="isLoading"
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
        :disabled="isLoading"
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
import { uploadProductImage, removeProductImage } from '@/services/product'

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
const images = ref<File[]>()

const isLoading = ref(false)

const productName = computed(() => {
  return props.drink ? 'drink' : 'snack'
})

async function add() {
  if (!images.value) {
    return
  }

  for (const image of images.value) {
    currentImages.value.push(image.name)

    isLoading.value = true

    try {
      await uploadProductImage(productName.value, props.id, image)
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  emit('update:images', currentImages.value)
}

async function remove(image: string) {
  isLoading.value = true

  try {
    await removeProductImage(productName.value, props.id, image)
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" src="./PhotoUploader.scss"></style>
