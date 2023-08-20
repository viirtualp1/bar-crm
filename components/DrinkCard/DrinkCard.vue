<template>
  <nuxt-link :to="`drink/${drink.id}`">
    <v-card class="mx-auto" max-width="374">
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img v-if="drink.image" :cover="true" height="250" :src="drink.image" />

      <template #title>
        <v-card-title>
          {{ drink.name }}

          <v-icon
            v-if="drink.strength > 1"
            color="error"
            icon="mdi-fire-circle"
            size="small"
          />
        </v-card-title>
      </template>
      <template #append>
        <v-btn icon size="small">
          <nuxt-link :to="`/edit/${drink.id}`">
            <v-icon>mdi-pen</v-icon>
          </nuxt-link>
        </v-btn>
      </template>

      <v-card-text>
        <div class="text-subtitle-1 font-weight-bold">{{ drink.price }} ₽</div>

        <v-chip
          v-for="location in drink.location"
          class="mt-2 mr-2"
          size="small"
          variant="outlined"
          color="success"
        >
          {{ getLocation(location) }}
        </v-chip>
      </v-card-text>
    </v-card>
  </nuxt-link>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { DrinkData } from '@/types/product'
import { locations } from '~/services/drink'

defineProps({
  drink: {
    type: Object as PropType<DrinkData>,
    default: null,
  },
})

const getLocation = (location: number) =>
  locations[location as keyof typeof locations]
</script>

<style lang="scss" src="./DrinkCard.scss"></style>
