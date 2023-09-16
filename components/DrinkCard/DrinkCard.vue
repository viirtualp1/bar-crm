<template>
  <v-card class="drink-card mx-auto" @click="openDrinkModal">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      v-if="drink.images.length > 0"
      :src="drink.images[0]"
      height="250"
      cover
    />

    <template #title>
      <v-card-title class="drink-card__title">
        {{ drink.name }}

        <v-icon
          v-if="drink.discount"
          color="error"
          icon="mdi-fire-circle"
          size="small"
        />
      </v-card-title>
    </template>

    <v-card-text>
      <div class="drink-card__discount" v-if="drink.discount">
        <div class="drink-card__discount-with drink-card__price">
          {{ priceWithDiscount }}
        </div>

        <div class="drink-card__discount-without">{{ drink.price }} ₽</div>
      </div>

      <div v-else class="drink-card__price">{{ drink.price }} ₽</div>

      <div class="text-subtitle-1">
        {{ drink.description }}
      </div>

      <div class="drink-card__chips mt-2">
        <v-chip class="drink-card__chip mr-2" color="error">
          Крепкость {{ drink.strength }}
        </v-chip>
        <v-chip class="drink-card__chip" color="success">
          Плотность {{ drink.density }}
        </v-chip>
      </div>

      <v-chip
        v-for="location in drink.location"
        class="drink-card__location mr-2"
        color="info"
        text-color="white"
      >
        <v-icon icon="mdi-glass-mug-variant" class="mr-1"></v-icon>
        {{ getLocation(location) }}
      </v-chip>
    </v-card-text>

    <drink-modal
      v-model="isDrinkModalOpen"
      :drink="drink"
      @close="closeDrinkModal"
    />
  </v-card>
</template>

<script setup lang="ts">
import { DrinkData } from '@/types/product'
import { locations } from '@/services/drink'

import useDrinkModal from '@/components/modals/DrinkModal/useDrinkModal'
import DrinkModal from '@/components/modals/DrinkModal/DrinkModal.vue'

const props = defineProps({
  drink: {
    type: Object as PropType<DrinkData>,
    default: null,
  },
})

const { isDrinkModalOpen, openDrinkModal, closeDrinkModal } = useDrinkModal()

const priceWithDiscount = computed(() => {
  if (!props.drink.discount) {
    return 0
  }

  return props.drink.price - props.drink.price * (props.drink.discount / 100)
})

const getLocation = (location: number) =>
  locations[location as keyof typeof locations]
</script>

<style lang="scss" src="./DrinkCard.scss"></style>
