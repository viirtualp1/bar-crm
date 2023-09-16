<template>
  <product-modal v-model="currentValue">
    <v-card class="snack-modal__card">
      <product-title>
        {{ snack.name }}
      </product-title>

      <v-card-text>
        <div class="mb-4">{{ snack.description }}</div>

        <bar-locations :locations="snack.location" />

        <images-slider v-if="snack.images.length > 0" :photos="snack.images" />
      </v-card-text>
      <product-actions @delete:product="deleteSnack" />
    </v-card>
  </product-modal>
</template>

<script setup lang="ts">
import { SnackData } from '@/types/product'
import ImagesSlider from '@/components/ImagesSlider/ImagesSlider.vue'
import BarLocations from '@/components/BarLocations/BarLocations.vue'
import ProductModal from '@/components/ProductModal/ProductModal.vue'
import ProductTitle from '@/components/ProductTitle/ProductTitle.vue'
import ProductActions from '~/components/ProductActions/ProductActions.vue'

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  snack: {
    type: Object as PropType<SnackData>,
    default: null,
  },
})

const emit = defineEmits({
  close: () => undefined,
})

const currentValue = ref(false)

watch(
  () => props.value,
  () => (currentValue.value = props.value),
)

function deleteSnack() {}
</script>

<style lang="scss" src="./SnackModal.scss"></style>
