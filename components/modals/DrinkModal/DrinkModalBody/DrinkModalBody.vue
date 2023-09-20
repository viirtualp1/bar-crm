<template>
  <div class="drink-modal-body">
    <div v-if="!drink.inStock" class="drink-card__price">Нет в наличии</div>
    <div v-else-if="!drink.priceBigSize" class="drink-card__price">
      {{ drink.priceLittleSize }} ₽
    </div>

    <div class="drink-modal-body__description">{{ drink.description }}</div>

    <div
      class="drink-modal-body__discount"
      v-if="drink.inStock && drink.discount && drink.priceLittleSize"
    >
      <div class="drink-modal-body__discount-with drink-card__price">
        {{ priceLittleWithDiscount }}
      </div>

      <div class="drink-modal-body__discount-without">
        {{ drink.priceLittleSize }} ₽
      </div>

      <span class="drink-modal-body__size">за 0,33</span>
    </div>

    <div
      class="drink-modal-body__discount"
      v-if="drink.discount && drink.priceBigSize"
    >
      <div class="drink-modal-body__discount-with drink-card__price">
        {{ priceBigWithDiscount }}
      </div>

      <div class="drink-modal-body__discount-without">
        {{ drink.priceBigSize }} ₽
      </div>

      <span class="drink-modal-body__size">за 0,5</span>
    </div>

    <images-slider v-if="drink.images.length > 0" :photos="drink.images" />

    <drink-characteristics
      class="drink-modal-body__characteristics"
      :drink="drink"
    />
  </div>
</template>

<script setup lang="ts">
import { getPriceWithDiscount } from '@/services/drink'
import { DrinkData } from '@/types/product'

const props = defineProps({
  drink: {
    type: Object as PropType<DrinkData>,
    default: null,
  },
})

const priceLittleWithDiscount = computed(() => {
  if (!props.drink.discount) {
    return 0
  }

  return getPriceWithDiscount(props.drink.priceLittleSize, props.drink.discount)
})

const priceBigWithDiscount = computed(() => {
  if (!props.drink.discount) {
    return 0
  }

  return getPriceWithDiscount(props.drink.priceBigSize, props.drink.discount)
})
</script>

<style lang="scss" src="./DrinkModalBody.scss"></style>
