<template>
  <div class="snack-modal-body">
    <div class="mb-4">{{ snack.description }}</div>

    <bar-locations :locations="snack.locations" />

    <images-slider v-if="snack.images.length > 0" :photos="snack.images" />
  </div>
</template>

<script setup lang="ts">
import { SnackData } from '@/types/product'

const props = defineProps({
  snack: {
    type: Object as PropType<SnackData>,
    default: null,
  },
})
</script>
