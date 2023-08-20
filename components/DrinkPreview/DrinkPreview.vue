<template>
  <div v-if="drink" class="drink-preview">
    <div class="drink-preview__header">
      <h2>{{ drink.name }}</h2>

      <v-chip color="success" class="drink-preview__price">
        {{ drink.price }} ₽
      </v-chip>
    </div>

    <div class="drink-preview__description">{{ drink.description }}</div>

    <div v-if="drink.image">
      <v-img :src="drink.image" cover />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { DrinkData } from '@/types/product'

defineProps({
  drink: {
    type: Object as PropType<DrinkData>,
    default: null,
  },
})
</script>

<style lang="scss" src="./DrinkPreview.scss"></style>
