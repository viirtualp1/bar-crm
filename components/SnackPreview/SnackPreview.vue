<template>
  <div v-if="drink">
    <div class="product-page__header">
      <h2>{{ snack.name }}</h2>

      <v-chip color="success" class="product-page__price">
        {{ snack.price }} ₽
      </v-chip>
    </div>

    <div>{{ snack.description }}</div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { SnackData } from '@/types/product'

defineProps({
  snack: {
    type: Object as PropType<SnackData>,
    default: null,
  },
})
</script>
