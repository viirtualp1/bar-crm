<template>
  <product-modal v-model="currentValue">
    <v-card class="drink-modal__card">
      <product-title @close="close">
        {{ drink.name }}
      </product-title>

      <v-card-text>
        <div class="mb-4">{{ drink.description }}</div>

        <div class="drink-modal__tags">
          <v-chip color="error" class="mb-3">
            Крепкость {{ drink.strength }}
          </v-chip>
          <v-chip color="success" class="mb-2">
            Плотность {{ drink.density }}
          </v-chip>

          <bar-locations :locations="drink.location" />
        </div>

        <images-slider v-if="drink.images.length > 0" :photos="drink.images" />
      </v-card-text>

      <product-actions @delete:product="deleteDrink" />
    </v-card>
  </product-modal>
</template>

<script setup lang="ts">
import { DrinkData } from '@/types/product'
import ImagesSlider from '@/components/ImagesSlider/ImagesSlider.vue'
import ProductTitle from '@/components/ProductTitle/ProductTitle.vue'
import ProductModal from '@/components/ProductModal/ProductModal.vue'
import BarLocations from '@/components/BarLocations/BarLocations.vue'
import ProductActions from '~/components/ProductActions/ProductActions.vue'

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  drink: {
    type: Object as PropType<DrinkData>,
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

function deleteDrink() {}

function close() {
  emit('close')
}
</script>

<style lang="scss" src="./DrinkModal.scss"></style>
