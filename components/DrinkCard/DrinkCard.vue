<template>
  <v-card class="drink-card" @click="open">
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
      <div v-if="!drink.inStock" class="drink-card__price">Нет в наличии</div>
      <div v-else-if="drink.discount" class="drink-card__discount">
        <div class="drink-card__discount-with drink-card__price">
          {{ priceWithDiscount }}
        </div>

        <div class="drink-card__discount-without">
          {{ drink.price.small }} ₽
        </div>
      </div>

      <div v-else class="drink-card__price">{{ drink.price.default }} ₽</div>

      <div v-if="drink.description" class="drink-card__description">
        {{ truncate(drink.description) }}
      </div>

      <drink-characteristics :drink="drink" />
    </v-card-text>

    <drink-modal v-model="isOpen" :drink="drink" @close="close" />
  </v-card>
</template>

<script setup lang="ts">
import type { DrinkData } from '@/types/product'
import { getPriceWithDiscount } from '@/utils/price'
import { truncate } from '@/utils/text'
import { useModal } from '@/composables/useModal'
import { DrinkModal } from '@/components/modals/DrinkModal'

const props = defineProps({
  drink: {
    type: Object as PropType<DrinkData>,
    default: null,
  },
})

const { isOpen, open, close } = useModal()

const priceWithDiscount = computed(() => {
  return getPriceWithDiscount(props.drink.price.default, props.drink.discount)
})
</script>

<style lang="scss" src="./DrinkCard.scss"></style>
