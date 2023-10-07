<template>
  <div class="snack-modal-body">
    <div v-if="!snack.inStock" class="snack-modal-body__price">
      Нет в наличии
    </div>
    <div v-else class="snack-modal-body__price">{{ snack.price }} ₽</div>

    <div class="mb-4">{{ snack.description }}</div>

    <div class="snack-modal-body__locations">
      <v-chip
        v-for="location in snack.locations"
        color="teal"
        text-color="white"
      >
        <v-icon
          v-if="location === 0"
          icon="mdi-glass-mug-variant"
          class="mr-1"
        />
        <v-icon v-if="location === 1" icon="mdi-car-back" class="mr-1" />

        {{ getLocation(location) }}
      </v-chip>
    </div>

    <images-slider v-if="snack.images.length > 0" :photos="snack.images" />
  </div>
</template>

<script setup lang="ts">
import { SnackData } from '@/types/product'
import { locations } from '@/services/drink'

defineProps({
  snack: {
    type: Object as PropType<SnackData>,
    default: null,
  },
})

const getLocation = (location: number) =>
  locations[location as keyof typeof locations]
</script>

<style lang="scss" src="./SnackModalBody.scss"></style>
