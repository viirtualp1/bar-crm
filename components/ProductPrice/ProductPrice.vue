<template>
  <div class="product-price">
    <div v-if="!inStock" class="product-price__price">Нет в наличии</div>

    <div v-if="discount" class="product-price__discount">
      {{ priceWithDiscount }}
    </div>
    <div v-if="price.big" class="product-price__price-big">
      {{ price.big }} <small>за 0.5</small>
    </div>
    <div v-if="price.small" class="product-price__price-small">
      {{ price.small }} <small>за 0.33</small>
    </div>

    <div v-else class="drink-card__price">{{ price.default }} ₽</div>
  </div>
</template>

<script setup lang="ts">
import {
  type PriceData,
  type ProductDiscountData,
  DiscountSelectorType,
} from '@/types/product'

const props = defineProps({
  inStock: {
    type: Boolean,
    default: false,
  },
  price: {
    type: Object as PropType<PriceData>,
    default: null,
  },
  discount: {
    type: Object as PropType<ProductDiscountData>,
    default: null,
  },
})

const priceToDiscount = computed(() => {
  switch (props.discount.selector) {
    case DiscountSelectorType.BIG:
      return props.price.big
    case DiscountSelectorType.SMALL:
      return props.price.small
    default:
      return props.price.default
  }
})

const priceWithDiscount = computed(() => {
  return getPriceWithDiscount(priceToDiscount.value, props.discount.value)
})
</script>

<style scoped lang="scss"></style>
