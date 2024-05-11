<template>
  <v-card class="snack-card" @click="open">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      />
    </template>

    <v-img
      v-if="snack.images.length > 0"
      :src="snack.images[0]"
      height="250"
      cover
    />

    <template #title>
      <v-card-title class="snack-card__title">
        {{ snack.name }}

        <v-icon
          v-if="snack.discount"
          color="error"
          icon="mdi-fire-circle"
          size="small"
        />
      </v-card-title>
    </template>

    <v-card-text>
      <div v-if="!snack.inStock" class="snack-card__price">Нет в наличии</div>
      <div class="snack-card__price" v-if="snack.price">
        {{ snack.price }} ₽
      </div>

      <div class="snack-card__description">
        {{ snack.description }}
      </div>

      <div class="snack-card__locations">
        <v-chip
          v-for="location in snack.locations"
          class="snack-card__location"
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

      <snack-modal
        v-model="isOpen"
        :snack="snack"
        @close="close"
        :food="food"
        :discount="discount"
        :service="service"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { SnackData } from '@/types/product'
import { locations } from '@/utils/drink'
import { useModal } from '@/composables/useModal'
import { SnackModal } from '@/components/modals/SnackModal'

defineProps({
  snack: {
    type: Object as PropType<SnackData>,
    default: null,
  },
  food: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Boolean,
    default: false,
  },
  service: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits({
  'open:modal': () => undefined,
})

const { isOpen, open, close } = useModal()

const getLocation = (location: number) =>
  locations[location as keyof typeof locations]
</script>

<style lang="scss" src="./SnackCard.scss"></style>
